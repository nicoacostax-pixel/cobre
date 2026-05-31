import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const APIFY_TOKEN = process.env.APIFY_TOKEN
const ACTOR_ID    = 'apify~instagram-scraper'

/* ─── POST: Start async Apify run ───────────────────────────────── */
export async function POST() {
  if (!APIFY_TOKEN) {
    return NextResponse.json({ error: 'APIFY_TOKEN no configurado', noToken: true }, { status: 400 })
  }

  const { data: competitors, error: ce } = await supabase
    .from('spy_competitors').select('id, handle')
  if (ce || !competitors?.length) {
    return NextResponse.json({ error: 'No hay competidores configurados' }, { status: 400 })
  }

  const directUrls = competitors.map(c => `https://www.instagram.com/${c.handle}/`)

  // Start the run WITHOUT waiting (non-blocking)
  const startRes = await fetch(
    `https://api.apify.com/v2/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        directUrls,
        resultsType: 'posts',
        resultsLimit: 12,
      }),
    }
  )

  if (!startRes.ok) {
    const err = await startRes.text()
    return NextResponse.json({ error: `No se pudo iniciar el run: ${err}` }, { status: 500 })
  }

  const { data: run } = await startRes.json()
  return NextResponse.json({
    runId:     run.id,
    datasetId: run.defaultDatasetId,
    total:     competitors.length * 12, // max expected posts
  })
}

/* ─── GET: Poll run status + save when done ─────────────────────── */
export async function GET(req: Request) {
  if (!APIFY_TOKEN) {
    return NextResponse.json({ error: 'APIFY_TOKEN no configurado' }, { status: 400 })
  }

  const { searchParams } = new URL(req.url)
  const runId     = searchParams.get('runId')
  const datasetId = searchParams.get('datasetId')
  if (!runId || !datasetId) {
    return NextResponse.json({ error: 'runId y datasetId requeridos' }, { status: 400 })
  }

  // Get run status from Apify
  const statusRes = await fetch(
    `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`
  )
  const { data: run } = await statusRes.json()
  const status    = run.status as string        // RUNNING, SUCCEEDED, FAILED, TIMED-OUT
  const itemCount = run.stats?.itemCount ?? 0   // posts scraped so far

  if (status === 'FAILED' || status === 'TIMED-OUT' || status === 'ABORTED') {
    return NextResponse.json({ status: 'error', message: `Run terminó con estado: ${status}` })
  }

  if (status !== 'SUCCEEDED') {
    return NextResponse.json({ status: 'running', itemCount })
  }

  // ── Run succeeded → fetch items and save to Supabase ──
  const itemsRes = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}&limit=500`
  )
  const apifyData: ApifyPost[] = await itemsRes.json()

  if (!Array.isArray(apifyData) || apifyData.length === 0) {
    return NextResponse.json({ status: 'done', fetched: 0, saved: 0 })
  }

  const { data: competitors } = await supabase.from('spy_competitors').select('id, handle')
  const competitorMap = Object.fromEntries(
    (competitors ?? []).map(c => [c.handle.toLowerCase(), c.id])
  )

  const postsToUpsert = apifyData
    .filter(p => p.shortCode)
    .map(p => {
      const username = (
        p.ownerUsername ??
        p.inputUrl?.replace(/.*instagram\.com\//, '').replace(/\/$/, '') ?? ''
      ).toLowerCase()
      const competitorId = competitorMap[username] ?? null

      const typeRaw = (p.type ?? '').toLowerCase()
      const type =
        typeRaw.includes('video') || typeRaw === 'clips' ? 'reel'
        : typeRaw.includes('sidecar') || typeRaw.includes('carousel') ? 'carousel'
        : 'image'

      return {
        competitor_id: competitorId,
        instagram_id:  p.shortCode,
        type,
        thumbnail_url: p.displayUrl ?? null,
        video_url:     (type === 'reel' ? (p.videoUrl ?? p.url ?? null) : null),
        caption:       (p.caption ?? '').slice(0, 1000),
        likes:         p.likesCount ?? 0,
        comments:      p.commentsCount ?? 0,
        views:         p.videoViewCount ?? p.videoPlayCount ?? 0,
        post_url:      p.url ?? `https://www.instagram.com/p/${p.shortCode}/`,
        posted_at:     p.timestamp ?? null,
        fetched_at:    new Date().toISOString(),
      }
    })
    .filter(p => p.competitor_id !== null)

  const { error: upsertErr } = await supabase
    .from('spy_posts')
    .upsert(postsToUpsert, { onConflict: 'instagram_id' })

  if (upsertErr) {
    return NextResponse.json({ status: 'error', message: upsertErr.message })
  }

  return NextResponse.json({ status: 'done', fetched: apifyData.length, saved: postsToUpsert.length })
}

interface ApifyPost {
  shortCode?: string; type?: string; caption?: string
  commentsCount?: number; displayUrl?: string; likesCount?: number
  videoViewCount?: number; videoPlayCount?: number; videoUrl?: string
  ownerUsername?: string; timestamp?: string; url?: string; inputUrl?: string
}
