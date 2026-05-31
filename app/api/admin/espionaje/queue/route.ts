import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('spy_queue')
    .select('*')
    .order('added_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message, setup: true }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const { data, error } = await supabase
    .from('spy_queue')
    .upsert({
      instagram_id:      body.instagram_id,
      competitor_handle: body.competitor_handle,
      type:              body.type,
      thumbnail_url:     body.thumbnail_url,
      video_url:         body.video_url ?? null,
      caption:           body.caption,
      likes:             body.likes,
      comments:          body.comments,
      views:             body.views,
      post_url:          body.post_url,
      status:            'pending',
    }, { onConflict: 'instagram_id', ignoreDuplicates: false })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: Request) {
  const { id, status, notes } = await req.json()
  const update: Record<string, unknown> = { status }
  if (notes !== undefined) update.notes = notes
  if (status === 'done') update.done_at = new Date().toISOString()
  const { data, error } = await supabase
    .from('spy_queue')
    .update(update)
    .eq('id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  const { error } = await supabase.from('spy_queue').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
