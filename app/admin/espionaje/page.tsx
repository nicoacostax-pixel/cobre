'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, X, RefreshCw, ExternalLink, TrendingUp, Eye, MessageCircle, Heart, Film, Grid, Image, Check, BookmarkPlus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'

interface Competitor { id: string; handle: string; display_name?: string; avatar_url?: string; follower_count?: number }
interface Post {
  id: string; competitor_id: string; instagram_id: string;
  type: 'reel' | 'image' | 'carousel'; thumbnail_url: string | null;
  video_url?: string | null;
  caption: string; likes: number; comments: number; views: number;
  post_url: string; posted_at: string | null; fetched_at: string;
}
interface QueueItem {
  id: string; instagram_id: string; competitor_handle: string;
  type: string; thumbnail_url: string | null; caption: string;
  likes: number; comments: number; views: number; post_url: string;
  status: 'pending' | 'done'; notes: string | null;
  added_at: string; done_at: string | null;
}

type Filter = 'all' | 'reel' | 'image' | 'carousel'
type Sort   = 'viral' | 'recent'

const TYPE_ICON = { reel: <Film size={11} />, image: <Image size={11} />, carousel: <Grid size={11} /> }
const TYPE_LABEL = { reel: 'Reel', image: 'Foto', carousel: 'Carrusel' }
const TYPE_COLOR = { reel: 'rgba(200,117,51,0.18)', image: 'rgba(61,122,110,0.15)', carousel: 'rgba(232,168,78,0.15)' }
const TYPE_TEXT  = { reel: '#C87533', image: '#4A9B8A', carousel: '#D4924A' }

function engagement(p: Post) { return p.likes + p.comments * 3 + (p.views > 0 ? p.views * 0.01 : 0) }

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function timeAgo(iso: string | null) {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const d = Math.floor(diff / 86400000)
  if (d === 0) return 'hoy'
  if (d === 1) return 'ayer'
  if (d < 7) return `hace ${d}d`
  if (d < 30) return `hace ${Math.floor(d / 7)}sem`
  return `hace ${Math.floor(d / 30)}mes`
}

/* ─── Progress bar component ─────────────────────────────────────── */
type FetchPhase = 'idle' | 'starting' | 'scraping' | 'saving' | 'done' | 'error'

interface FetchState {
  phase: FetchPhase
  pct: number
  msg: string
  itemCount: number
  saved: number
  runId?: string
  datasetId?: string
  total: number
}

const PHASE_MSGS: Record<FetchPhase, string> = {
  idle:     '',
  starting: 'Iniciando conexión con Instagram…',
  scraping: 'Scrapeando perfiles…',
  saving:   'Guardando posts en la base de datos…',
  done:     '',
  error:    '',
}

function ProgressBar({ state }: { state: FetchState }) {
  if (state.phase === 'idle') return null
  const isError = state.phase === 'error'
  const isDone  = state.phase === 'done'

  return (
    <div className="bg-[#111] border border-white/5 rounded-xl p-4 mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium" style={{ color: isError ? '#ef4444' : isDone ? '#4ade80' : '#e0e0e0' }}>
          {isDone  ? `✓ ${state.saved} posts actualizados`  :
           isError ? `✗ ${state.msg}` :
           state.msg}
        </span>
        {!isError && !isDone && (
          <span className="text-xs text-gray-600 font-mono">
            {state.itemCount > 0 ? `${state.itemCount} posts encontrados` : ''}
          </span>
        )}
        {!isError && !isDone && (
          <span className="text-xs text-gray-500 font-mono">{state.pct}%</span>
        )}
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${state.pct}%`,
            background: isError ? '#ef4444' : isDone ? '#4ade80' : 'linear-gradient(90deg, #C87533, #E8A84E)',
          }}
        />
      </div>
      {!isDone && !isError && state.phase === 'scraping' && (
        <p className="text-[11px] text-gray-700 mt-2">
          Instagram tarda ~60-90s en scrapear {state.total > 0 ? `${Math.ceil(state.total / 12)} cuentas` : 'todas las cuentas'}. Podés seguir navegando.
        </p>
      )}
    </div>
  )
}

export default function EspionajePage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [posts, setPosts]             = useState<Post[]>([])
  const [loading, setLoading]         = useState(true)
  const [setup, setSetup]             = useState(false)
  const [noToken, setNoToken]         = useState(false)
  const [filter, setFilter]           = useState<Filter>('all')
  const [sort, setSort]               = useState<Sort>('viral')
  const [addOpen, setAddOpen]         = useState(false)
  const [newHandle, setNewHandle]     = useState('')
  const [adding, setAdding]           = useState(false)

  const [fetchState, setFetchState] = useState<FetchState>({
    phase: 'idle', pct: 0, msg: '', itemCount: 0, saved: 0, total: 0,
  })
  const [queue, setQueue]         = useState<QueueItem[]>([])
  const [hideQueued, setHideQueued] = useState(true)
  const [hideDone, setHideDone]     = useState(true)
  const [queueOpen, setQueueOpen]   = useState(true)
  const [savingId, setSavingId]     = useState<string | null>(null)
  const [markingId, setMarkingId]   = useState<string | null>(null)

  const isFetching = fetchState.phase !== 'idle' && fetchState.phase !== 'done' && fetchState.phase !== 'error'

  const queueIds  = new Set(queue.map(q => q.instagram_id))
  const doneIds   = new Set(queue.filter(q => q.status === 'done').map(q => q.instagram_id))
  const todayCount = queue.filter(q => {
    const d = new Date(q.added_at)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  }).length
  const pendingCount = queue.filter(q => q.status === 'pending').length

  const load = useCallback(async () => {
    setLoading(true)
    const [compRes, queueRes] = await Promise.all([
      fetch('/api/admin/espionaje/competitors'),
      fetch('/api/admin/espionaje/queue'),
    ])
    const compData = await compRes.json()
    if (compData.setup || !compRes.ok) { setSetup(true); setLoading(false); return }
    setCompetitors(compData.competitors ?? [])
    setPosts(compData.posts ?? [])
    if (queueRes.ok) {
      const qd = await queueRes.json()
      setQueue(Array.isArray(qd) ? qd : [])
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function addCompetitor() {
    if (!newHandle.trim()) return
    setAdding(true)
    const res = await fetch('/api/admin/espionaje/competitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ handle: newHandle }),
    })
    if (res.ok) { setNewHandle(''); setAddOpen(false); load() }
    setAdding(false)
  }

  async function removeCompetitor(id: string) {
    if (!confirm('¿Eliminar este competidor y todos sus posts?')) return
    await fetch('/api/admin/espionaje/competitors', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    load()
  }

  // ─── Start fetch ──────────────────────────────────────────────────
  async function fetchPosts() {
    setFetchState({ phase: 'starting', pct: 5, msg: PHASE_MSGS.starting, itemCount: 0, saved: 0, total: 0 })

    const res = await fetch('/api/admin/espionaje/fetch', { method: 'POST' })
    const data = await res.json()

    if (!res.ok) {
      if (data.noToken) setNoToken(true)
      setFetchState(s => ({ ...s, phase: 'error', pct: 100, msg: data.error ?? 'Error desconocido' }))
      return
    }

    const { runId, datasetId, total } = data
    setFetchState({ phase: 'scraping', pct: 15, msg: PHASE_MSGS.scraping, itemCount: 0, saved: 0, total, runId, datasetId })

    // Poll every 3 seconds
    const pollInterval = setInterval(async () => {
      try {
        const pollRes = await fetch(`/api/admin/espionaje/fetch?runId=${runId}&datasetId=${datasetId}`)
        const poll    = await pollRes.json()

        if (poll.status === 'running') {
          const items = poll.itemCount ?? 0
          const expected = total || 300
          const pct = Math.min(15 + Math.round((items / expected) * 70), 84)
          setFetchState(s => ({
            ...s, phase: 'scraping', pct, itemCount: items,
            msg: items > 0 ? `Scrapeando… ${items} posts encontrados` : PHASE_MSGS.scraping,
          }))
          return
        }

        clearInterval(pollInterval)

        if (poll.status === 'error') {
          setFetchState(s => ({ ...s, phase: 'error', pct: 100, msg: poll.message ?? 'Error al procesar' }))
          return
        }

        if (poll.status === 'done') {
          setFetchState(s => ({ ...s, phase: 'saving', pct: 92, msg: PHASE_MSGS.saving }))
          await new Promise(r => setTimeout(r, 600))
          setFetchState(s => ({ ...s, phase: 'done', pct: 100, saved: poll.saved ?? 0, msg: '' }))
          load()
        }
      } catch {
        clearInterval(pollInterval)
        setFetchState(s => ({ ...s, phase: 'error', pct: 100, msg: 'Error de red al verificar el estado' }))
      }
    }, 3000)
  }

  // ─── Queue actions ────────────────────────────────────────────────
  async function saveToQueue(post: Post, compHandle: string) {
    setSavingId(post.instagram_id)
    const res = await fetch('/api/admin/espionaje/queue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instagram_id:      post.instagram_id,
        competitor_handle: compHandle,
        type:              post.type,
        thumbnail_url:     post.thumbnail_url,
        video_url:         post.video_url ?? null,
        caption:           post.caption,
        likes:             post.likes,
        comments:          post.comments,
        views:             post.views,
        post_url:          post.post_url,
      }),
    })
    if (res.ok) {
      const newItem = await res.json()
      setQueue(prev => [newItem, ...prev.filter(q => q.instagram_id !== post.instagram_id)])
    }
    setSavingId(null)
  }

  async function markAsDone(post: Post, compHandle: string) {
    setMarkingId(post.instagram_id)
    const existing = queue.find(q => q.instagram_id === post.instagram_id)
    if (existing) {
      // toggle: if already done → pending, if pending → done
      const newStatus = existing.status === 'done' ? 'pending' : 'done'
      const res = await fetch('/api/admin/espionaje/queue', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: existing.id, status: newStatus }),
      })
      if (res.ok) {
        const updated = await res.json()
        setQueue(prev => prev.map(q => q.id === existing.id ? updated : q))
      }
    } else {
      // not in queue yet → add directly as done
      const res = await fetch('/api/admin/espionaje/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instagram_id: post.instagram_id, competitor_handle: compHandle,
          type: post.type, thumbnail_url: post.thumbnail_url,
          video_url: post.video_url ?? null, caption: post.caption,
          likes: post.likes, comments: post.comments, views: post.views,
          post_url: post.post_url,
        }),
      })
      if (res.ok) {
        const newItem = await res.json()
        // immediately mark as done
        const res2 = await fetch('/api/admin/espionaje/queue', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: newItem.id, status: 'done' }),
        })
        if (res2.ok) {
          const done = await res2.json()
          setQueue(prev => [done, ...prev])
        }
      }
    }
    setMarkingId(null)
  }

  async function toggleDone(item: QueueItem) {
    const newStatus = item.status === 'done' ? 'pending' : 'done'
    const res = await fetch('/api/admin/espionaje/queue', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, status: newStatus }),
    })
    if (res.ok) {
      const updated = await res.json()
      setQueue(prev => prev.map(q => q.id === item.id ? updated : q))
    }
  }

  async function removeFromQueue(id: string) {
    await fetch('/api/admin/espionaje/queue', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setQueue(prev => prev.filter(q => q.id !== id))
  }

  const competitorMap = Object.fromEntries(competitors.map(c => [c.id, c]))

  const filtered = posts
    .filter(p =>
      (filter === 'all' || p.type === filter) &&
      (!hideQueued || !queueIds.has(p.instagram_id)) &&
      (!hideDone || !doneIds.has(p.instagram_id))
    )
    .sort((a, b) => sort === 'viral' ? engagement(b) - engagement(a) : new Date(b.posted_at ?? 0).getTime() - new Date(a.posted_at ?? 0).getTime())

  /* ─── SETUP SCREEN ─── */
  if (setup) return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-[#111] border border-orange-600/20 rounded-2xl p-8">
        <div className="text-2xl mb-3">🔧</div>
        <h2 className="text-xl font-black mb-2">Configuración inicial requerida</h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Antes de usar el módulo de espionaje, necesitás crear dos tablas en Supabase.<br />
          Ejecutá este SQL en tu proyecto Supabase → <strong className="text-white">SQL Editor → New query</strong>:
        </p>
        <pre className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 text-xs text-gray-400 overflow-x-auto leading-relaxed mb-6">{`create table spy_competitors (
  id uuid default gen_random_uuid() primary key,
  handle text unique not null,
  display_name text, avatar_url text, follower_count integer,
  created_at timestamptz default now()
);
create table spy_posts (
  id uuid default gen_random_uuid() primary key,
  competitor_id uuid references spy_competitors(id) on delete cascade,
  instagram_id text unique, type text, thumbnail_url text, caption text,
  likes integer default 0, comments integer default 0, views integer default 0,
  post_url text, posted_at timestamptz, fetched_at timestamptz default now()
);
create table spy_queue (
  id uuid default gen_random_uuid() primary key,
  instagram_id text unique not null,
  competitor_handle text, type text, thumbnail_url text, caption text,
  likes integer default 0, comments integer default 0, views integer default 0,
  post_url text, status text default 'pending', notes text,
  added_at timestamptz default now(), done_at timestamptz
);`}</pre>
        <button onClick={load} className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
          Ya ejecuté el SQL → Continuar
        </button>
      </div>
    </div>
  )

  /* ─── NO TOKEN SCREEN ─── */
  if (noToken) return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-[#111] border border-orange-600/20 rounded-2xl p-8">
        <div className="text-2xl mb-3">🔑</div>
        <h2 className="text-xl font-black mb-2">Configurá tu token de Apify</h2>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">
          Apify es el servicio que obtiene los datos de Instagram. El plan gratuito da <strong className="text-white">$5/mes de crédito</strong> — más que suficiente para monitorear 10 competidores diariamente.
        </p>
        <ol className="text-sm text-gray-400 space-y-2 mb-6 list-decimal list-inside">
          <li>Creá cuenta gratis en <a href="https://apify.com" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">apify.com</a></li>
          <li>Andá a <strong className="text-white">Settings → Integrations → API tokens</strong></li>
          <li>Copiá tu token personal</li>
          <li>Agregalo al <code className="bg-white/5 px-1.5 py-0.5 rounded text-xs">.env.local</code> en el VPS:</li>
        </ol>
        <pre className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 text-xs text-orange-400 mb-4">APIFY_TOKEN=apify_api_xxxxxxxxxxxxxxxxxx</pre>
        <p className="text-xs text-gray-600 mb-4">Después de agregar el token, hacé rebuild en el VPS: <code className="bg-white/5 px-1.5 py-0.5 rounded text-xs">npm run build && pm2 restart cobre</code></p>
        <button onClick={() => setNoToken(false)} className="text-gray-500 hover:text-white text-sm transition-colors">← Volver</button>
      </div>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <TrendingUp size={22} className="text-orange-500" />
            Espionaje de Competencia
          </h1>
          <p className="text-gray-600 text-sm mt-1">Contenido más viral de tus competidores en Instagram</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={fetchPosts}
            disabled={isFetching || competitors.length === 0}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-40 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
            {isFetching ? 'Actualizando…' : 'Actualizar datos'}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <ProgressBar state={fetchState} />

      {/* ── MI COLA DE CONTENIDO ── */}
      {queue.length > 0 && (
        <div className="bg-[#111] border border-orange-600/20 rounded-xl mb-6 overflow-hidden">
          <button
            onClick={() => setQueueOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/2 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Mi cola de contenido</span>
              <span className="bg-orange-600/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full">{pendingCount} pendientes</span>
              <span className="text-[10px] text-gray-600">· {todayCount} guardados hoy · {queue.filter(q=>q.status==='done').length} creados</span>
            </div>
            {queueOpen ? <ChevronUp size={14} className="text-gray-600" /> : <ChevronDown size={14} className="text-gray-600" />}
          </button>

          {queueOpen && (
            <div className="px-5 pb-5">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
                {queue.map(item => (
                  <div
                    key={item.id}
                    className="relative rounded-lg overflow-hidden border transition-colors"
                    style={{ borderColor: item.status === 'done' ? 'rgba(74,158,138,0.35)' : 'rgba(200,117,51,0.25)', aspectRatio: '1/1', cursor: 'pointer' }}
                  >
                    {item.thumbnail_url
                      ? <img src={item.thumbnail_url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', opacity: item.status==='done' ? 0.45 : 1 }} />
                      : <div style={{ width:'100%', height:'100%', background:'#1a1a1a', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <span style={{ fontSize: 24, opacity: 0.3 }}>📸</span>
                        </div>
                    }
                    {/* overlay */}
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'6px 6px 5px' }}>
                      <span style={{ fontSize:9, fontFamily:'monospace', color:'rgba(237,232,220,0.7)', letterSpacing:'0.04em', textTransform:'uppercase', lineHeight:1.2 }}>
                        @{item.competitor_handle}
                      </span>
                    </div>
                    {/* done badge */}
                    {item.status === 'done' && (
                      <div style={{ position:'absolute', top:4, left:4, background:'rgba(74,158,138,0.85)', borderRadius:999, width:18, height:18, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Check size={10} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                    {/* type badge */}
                    <div style={{ position:'absolute', top:4, right:4, background:'rgba(0,0,0,0.65)', borderRadius:3, padding:'2px 5px', fontSize:8, color:'rgba(237,232,220,0.8)', fontFamily:'monospace', letterSpacing:'0.04em', textTransform:'uppercase' }}>
                      {item.type}
                    </div>
                    {/* action buttons on hover */}
                    <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                      <a
                        href={`/admin/espionaje/post/${item.instagram_id}`}
                        target="_blank"
                        rel="noreferrer"
                        title="Ver caption y transcript"
                        style={{ width:28, height:28, borderRadius:999, background:'rgba(200,117,51,0.85)', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none' }}
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink size={12} color="#fff" />
                      </a>
                      <button
                        onClick={() => toggleDone(item)}
                        title={item.status === 'done' ? 'Marcar pendiente' : 'Marcar como creado ✓'}
                        style={{ width:28, height:28, borderRadius:999, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', background: item.status==='done' ? 'rgba(237,232,220,0.2)' : 'rgba(74,158,138,0.85)' }}
                      >
                        <Check size={13} color="#fff" />
                      </button>
                      <button
                        onClick={() => removeFromQueue(item.id)}
                        style={{ width:28, height:28, borderRadius:999, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(239,68,68,0.7)' }}
                      >
                        <Trash2 size={12} color="#fff" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-700 mt-3">
                Hover sobre una miniatura → <span className="text-emerald-600">✓</span> marcar como creado · <span className="text-orange-500">↗</span> abrir post · <span className="text-red-600">🗑</span> eliminar de la cola
              </p>
            </div>
          )}
        </div>
      )}

      {/* Competitors row */}
      <div className="bg-[#111] border border-white/5 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Competidores monitoreados</span>
          <button
            onClick={() => setAddOpen(a => !a)}
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-orange-500 transition-colors font-bold"
          >
            <Plus size={13} /> Agregar
          </button>
        </div>

        {addOpen && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-600 text-sm font-mono">@</span>
            <input
              autoFocus
              value={newHandle}
              onChange={e => setNewHandle(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addCompetitor(); if (e.key === 'Escape') { setAddOpen(false); setNewHandle('') } }}
              placeholder="username de Instagram"
              className="bg-[#1a1a1a] border border-orange-600/30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 outline-none flex-1 max-w-xs"
            />
            <button
              onClick={addCompetitor}
              disabled={adding}
              className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              {adding ? '…' : 'Agregar'}
            </button>
            <button onClick={() => { setAddOpen(false); setNewHandle('') }} className="text-gray-600 hover:text-white text-xs px-2 transition-colors">
              Cancelar
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-gray-700 text-xs py-2">Cargando…</div>
        ) : competitors.length === 0 ? (
          <p className="text-gray-700 text-sm py-2">No hay competidores. Agregá el primero con el botón de arriba.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {competitors.map(c => {
              const count = posts.filter(p => p.competitor_id === c.id).length
              return (
                <div key={c.id} className="flex items-center gap-2 bg-[#1a1a1a] border border-white/5 rounded-full pl-3 pr-2 py-1.5 group">
                  <div className="w-5 h-5 rounded-full bg-orange-600/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-black text-orange-500 uppercase">{c.handle[0]}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-300">@{c.handle}</span>
                  {count > 0 && <span className="text-[10px] text-gray-600 font-mono">{count}</span>}
                  <button
                    onClick={() => removeCompetitor(c.id)}
                    className="w-4 h-4 flex items-center justify-center rounded-full text-gray-700 hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={10} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {posts.length === 0 && !loading ? (
        <div className="border border-dashed border-white/10 rounded-xl py-20 text-center">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-gray-500 text-sm mb-2">No hay posts todavía.</p>
          <p className="text-gray-700 text-xs">
            {competitors.length === 0
              ? 'Agregá al menos un competidor y luego hacé clic en "Actualizar datos".'
              : 'Hacé clic en "Actualizar datos" para obtener el contenido de tus competidores.'}
          </p>
        </div>
      ) : posts.length > 0 ? (
        <>
          {/* Filters */}
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <div className="flex items-center gap-1 bg-[#111] border border-white/5 rounded-lg p-1">
              {(['all', 'reel', 'image', 'carousel'] as Filter[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md transition-colors ${filter === f ? 'bg-orange-600 text-white' : 'text-gray-500 hover:text-white'}`}
                >
                  {f === 'all' ? `Todos` : f === 'reel' ? <><Film size={11} /> Reels</> : f === 'image' ? <><Image size={11} /> Fotos</> : <><Grid size={11} /> Carruseles</>}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto flex-wrap">
              {/* Hide queued toggle */}
              <button
                onClick={() => setHideQueued(h => !h)}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${hideQueued ? 'bg-orange-600/15 border-orange-600/30 text-orange-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
              >
                <BookmarkPlus size={12} />
                {hideQueued ? `Guardados (${queueIds.size})` : 'Mostrando todos'}
              </button>
              {/* Hide done toggle */}
              {doneIds.size > 0 && (
                <button
                  onClick={() => setHideDone(h => !h)}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${hideDone ? 'bg-emerald-600/15 border-emerald-600/30 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
                >
                  <Check size={12} />
                  {hideDone ? `Ya hechos (${doneIds.size})` : 'Mostrando hechos'}
                </button>
              )}
              <div className="flex items-center gap-1 bg-[#111] border border-white/5 rounded-lg p-1">
                {(['viral', 'recent'] as Sort[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors ${sort === s ? 'bg-orange-600 text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    {s === 'viral' ? '🔥 Más viral' : '🕐 Más reciente'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {filtered.map(post => {
              const comp = competitorMap[post.competitor_id]
              const eng = Math.round(engagement(post))
              const inQueue = queueIds.has(post.instagram_id)
              const isDone  = doneIds.has(post.instagram_id)
              const isSaving = savingId === post.instagram_id
              const isMarking = markingId === post.instagram_id
              return (
                <div
                  key={post.id}
                  className="bg-[#111] border rounded-xl overflow-hidden transition-colors group"
                  style={{ borderColor: isDone ? 'rgba(74,158,138,0.35)' : inQueue ? 'rgba(200,117,51,0.35)' : 'rgba(255,255,255,0.05)' }}
                >
                  {/* Thumbnail */}
                  <div className="relative" style={{ aspectRatio: '1/1', background: '#1a1a1a' }}>
                    <a href={post.post_url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                      {post.thumbnail_url ? (
                        <img
                          src={post.thumbnail_url}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 32, opacity: 0.2 }}>📸</span>
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink size={18} className="text-white" />
                      </div>
                    </a>
                    {/* Type badge */}
                    <div style={{
                      position: 'absolute', top: 8, left: 8, pointerEvents: 'none',
                      display: 'flex', alignItems: 'center', gap: 4,
                      background: TYPE_COLOR[post.type], color: TYPE_TEXT[post.type],
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                      padding: '3px 8px', borderRadius: 4, backdropFilter: 'blur(8px)',
                    }}>
                      {TYPE_ICON[post.type]} {TYPE_LABEL[post.type]}
                    </div>
                    {/* Save button */}
                    <button
                      onClick={() => inQueue ? null : saveToQueue(post, comp?.handle ?? '')}
                      disabled={isSaving || inQueue}
                      style={{
                        position: 'absolute', top: 8, right: 8,
                        width: 28, height: 28, borderRadius: 999, border: 'none', cursor: inQueue ? 'default' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: inQueue ? 'rgba(200,117,51,0.85)' : 'rgba(12,10,7,0.75)',
                        transition: 'background 0.2s, transform 0.15s',
                        transform: isSaving ? 'scale(0.9)' : 'scale(1)',
                      }}
                      title={inQueue ? 'Ya guardado en tu cola' : 'Guardar en mi cola'}
                    >
                      {inQueue
                        ? <Check size={13} color="#EDE8DC" strokeWidth={3} />
                        : isSaving
                          ? <span style={{ fontSize: 9, color: '#C87533', fontWeight: 700 }}>…</span>
                          : <BookmarkPlus size={13} color="#C87533" />
                      }
                    </button>
                    {/* Viral score */}
                    <div style={{
                      position: 'absolute', bottom: 8, right: 8, pointerEvents: 'none',
                      background: 'rgba(12,10,7,0.75)', color: '#C87533',
                      fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                      fontFamily: 'monospace', letterSpacing: '0.04em',
                    }}>
                      🔥 {fmt(eng)}
                    </div>
                    {/* Mark as done button */}
                    <button
                      onClick={e => { e.preventDefault(); e.stopPropagation(); markAsDone(post, comp?.handle ?? '') }}
                      disabled={isMarking}
                      title={isDone ? 'Desmarcar (no hecho)' : 'Ya lo hice — marcar como hecho'}
                      style={{
                        position: 'absolute', bottom: 8, left: 8,
                        height: 26, borderRadius: 6, border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px',
                        background: isDone ? 'rgba(74,158,138,0.9)' : 'rgba(12,10,7,0.72)',
                        transition: 'background 0.2s, opacity 0.15s',
                        opacity: isMarking ? 0.6 : 1,
                      }}
                    >
                      <Check size={11} color={isDone ? '#fff' : 'rgba(237,232,220,0.55)'} strokeWidth={isDone ? 3 : 2} />
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: isDone ? '#fff' : 'rgba(237,232,220,0.55)', fontFamily: 'monospace' }}>
                        {isDone ? 'Hecho' : 'Ya lo hice'}
                      </span>
                    </button>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '12px 14px' }}>
                    {/* Competitor */}
                    {comp && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(200,117,51,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: 9, fontWeight: 900, color: '#C87533', textTransform: 'uppercase' }}>{comp.handle[0]}</span>
                        </div>
                        <span style={{ fontSize: 12, color: '#999', fontWeight: 500 }}>@{comp.handle}</span>
                        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#555' }}>{timeAgo(post.posted_at)}</span>
                      </div>
                    )}

                    {/* Caption */}
                    {post.caption && (
                      <p style={{ fontSize: 11, color: '#888', lineHeight: 1.5, marginBottom: 10, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {post.caption}
                      </p>
                    )}

                    {/* Metrics */}
                    <div style={{ display: 'flex', gap: 12 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#e0e0e0', fontWeight: 600 }}>
                        <Heart size={12} style={{ color: '#C87533' }} /> {fmt(post.likes)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#e0e0e0', fontWeight: 600 }}>
                        <MessageCircle size={12} style={{ color: '#C87533' }} /> {fmt(post.comments)}
                      </span>
                      {post.views > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#e0e0e0', fontWeight: 600 }}>
                          <Eye size={12} style={{ color: '#C87533' }} /> {fmt(post.views)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-700 text-sm py-12">
              {hideDone && doneIds.size > 0 && hideQueued && queueIds.size > 0
                ? `Todos los posts están guardados o ya hechos.`
                : hideDone && doneIds.size > 0
                  ? `Todos los posts de este tipo ya están marcados como hechos. Desactivá "Ya hechos" para verlos.`
                  : hideQueued && queueIds.size > 0
                    ? `Todos los posts visibles ya están en tu cola. Desactivá "Guardados" para verlos.`
                    : `No hay posts de tipo "${filter}" todavía.`}
            </p>
          )}
        </>
      ) : null}
    </div>
  )
}
