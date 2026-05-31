'use client'

import { useEffect, useState, use } from 'react'
import { ExternalLink, ArrowLeft, Heart, MessageCircle, Eye, Mic, Check, Copy, Film, Grid, Image as ImageIcon, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface QueueItem {
  id: string; instagram_id: string; competitor_handle: string;
  type: string; thumbnail_url: string | null; video_url: string | null;
  caption: string; likes: number; comments: number; views: number;
  post_url: string; status: string; transcript: string | null; added_at: string;
}

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

const TYPE_ICON  = { reel: <Film size={13} />, image: <ImageIcon size={13} />, carousel: <Grid size={13} /> }
const TYPE_LABEL = { reel: 'Reel / Video', image: 'Foto', carousel: 'Carrusel' }

type TranscriptState = 'idle' | 'submitting' | 'processing' | 'done' | 'error'

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [item, setItem]           = useState<QueueItem | null>(null)
  const [loading, setLoading]     = useState(true)
  const [notFound, setNotFound]   = useState(false)

  const [txState, setTxState]       = useState<TranscriptState>('idle')
  const [txId, setTxId]             = useState<string | null>(null)
  const [transcript, setTranscript] = useState<string | null>(null)
  const [txMsg, setTxMsg]           = useState('')
  const [copied, setCopied]         = useState(false)
  const [noKey, setNoKey]           = useState(false)

  useEffect(() => {
    async function load() {
      const res  = await fetch('/api/admin/espionaje/queue')
      const data = await res.json()
      if (!Array.isArray(data)) { setNotFound(true); setLoading(false); return }
      const found = data.find((q: QueueItem) => q.instagram_id === id)
      if (!found) { setNotFound(true); setLoading(false); return }
      setItem(found)
      if (found.transcript) { setTranscript(found.transcript); setTxState('done') }
      setLoading(false)
    }
    load()
  }, [id])

  // Poll transcription status
  useEffect(() => {
    if (txState !== 'processing' || !txId) return
    const interval = setInterval(async () => {
      const res  = await fetch(`/api/admin/espionaje/transcribe?transcriptId=${txId}&queueId=${item?.id}`)
      const data = await res.json()
      if (data.status === 'completed') {
        clearInterval(interval)
        setTranscript(data.transcript)
        setTxState('done')
        setItem(prev => prev ? { ...prev, transcript: data.transcript } : prev)
      } else if (data.status === 'error') {
        clearInterval(interval)
        setTxState('error')
        setTxMsg(data.message ?? 'Error en la transcripción')
      } else {
        setTxMsg(data.status === 'queued' ? 'En cola…' : 'Procesando audio…')
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [txState, txId, item?.id])

  async function startTranscription() {
    if (!item?.video_url) {
      setTxState('error'); setTxMsg('No hay URL de video guardada. Actualizá los datos del feed.'); return
    }
    setTxState('submitting'); setTxMsg('Enviando a transcribir…')
    const res  = await fetch('/api/admin/espionaje/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queueId: item.id, videoUrl: item.video_url }),
    })
    const data = await res.json()
    if (!res.ok) {
      if (data.noKey) setNoKey(true)
      setTxState('error'); setTxMsg(data.error ?? 'Error al iniciar')
      return
    }
    setTxId(data.transcriptId)
    setTxState('processing')
    setTxMsg('Procesando audio…')
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.1em' }}>
      CARGANDO…
    </div>
  )

  if (notFound) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div style={{ fontSize: 32 }}>🔍</div>
      <p style={{ color: '#555', fontSize: 14 }}>Post no encontrado en tu cola.</p>
      <a href="/admin/espionaje" style={{ color: '#C87533', fontSize: 13, textDecoration: 'none' }}>← Volver al espionaje</a>
    </div>
  )

  if (!item) return null

  const isVideo    = item.type === 'reel'
  const isCarousel = item.type === 'carousel'
  const captionText = item.caption ?? ''

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a !important; color: #e0e0e0; font-family: var(--font-geist-sans), sans-serif; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: rgba(200,117,51,0.3); border-radius: 4px; }
        .prose { font-size: 14px; color: #ccc; line-height: 1.85; white-space: pre-wrap; word-break: break-word; }
      `}</style>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Back */}
        <div style={{ marginBottom: 28 }}>
          <a href="/admin/espionaje" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#555', fontSize: 12, textDecoration: 'none', fontFamily: "'DM Mono', monospace", letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color='#C87533')} onMouseLeave={e => (e.currentTarget.style.color='#555')}>
            ← Espionaje
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 32, alignItems: 'start' }}>

          {/* ── Left: thumbnail + meta ── */}
          <div>
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', marginBottom: 16, aspectRatio: '1/1', background: '#111', position: 'relative' }}>
              {item.thumbnail_url
                ? <img src={item.thumbnail_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, opacity: 0.2 }}>📸</div>
              }
              {/* type badge */}
              <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(12,10,7,0.8)', color: '#C87533', fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 4 }}>
                {TYPE_ICON[item.type as keyof typeof TYPE_ICON]} {TYPE_LABEL[item.type as keyof typeof TYPE_LABEL] ?? item.type}
              </div>
            </div>

            {/* Meta */}
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px 18px' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#C87533', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                @{item.competitor_handle}
              </div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 600 }}>
                  <Heart size={13} style={{ color: '#C87533' }} /> {fmt(item.likes)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 600 }}>
                  <MessageCircle size={13} style={{ color: '#C87533' }} /> {fmt(item.comments)}
                </span>
                {item.views > 0 && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 14, fontWeight: 600 }}>
                    <Eye size={13} style={{ color: '#C87533' }} /> {fmt(item.views)}
                  </span>
                )}
              </div>
              <a
                href={item.post_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C87533', textDecoration: 'none', padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.06)', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <ExternalLink size={12} /> Ver en Instagram
              </a>
            </div>
          </div>

          {/* ── Right: caption + transcript ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Caption */}
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#C87533', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {isCarousel ? '📊 Caption del carrusel' : isVideo ? '📝 Caption del video' : '📝 Descripción'}
                </span>
                {captionText && (
                  <button
                    onClick={() => copyText(captionText)}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: copied ? '#4ade80' : '#555', transition: 'color 0.2s' }}
                  >
                    {copied ? <><Check size={11} /> Copiado</> : <><Copy size={11} /> Copiar</>}
                  </button>
                )}
              </div>
              <div style={{ padding: '16px 18px' }}>
                {captionText
                  ? <p className="prose">{captionText}</p>
                  : <p style={{ color: '#444', fontSize: 13, fontStyle: 'italic' }}>Sin caption disponible.</p>
                }
              </div>
            </div>

            {/* Transcript (only for videos) */}
            {isVideo && (
              <div style={{ background: '#111', border: `1px solid ${txState === 'done' ? 'rgba(74,158,138,0.3)' : txState === 'error' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: txState === 'done' ? '#4A9B8A' : '#C87533', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Mic size={11} /> Transcript del video
                  </span>
                  {txState === 'done' && transcript && (
                    <button
                      onClick={() => copyText(transcript)}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: copied ? '#4ade80' : '#555', transition: 'color 0.2s' }}
                    >
                      {copied ? <><Check size={11} /> Copiado</> : <><Copy size={11} /> Copiar</>}
                    </button>
                  )}
                </div>

                <div style={{ padding: '16px 18px' }}>
                  {txState === 'idle' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                      <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>
                        Transcribí automáticamente lo que se habla en el video usando IA.<br />
                        <span style={{ color: '#444', fontSize: 12 }}>Soporta español, inglés y más idiomas · ~30-60 segundos</span>
                      </p>
                      {!item.video_url && (
                        <p style={{ fontSize: 12, color: '#ef4444', fontFamily: "'DM Mono', monospace", letterSpacing: '0.04em' }}>
                          ⚠ URL de video no guardada. Actualizá el feed para re-fetchear.
                        </p>
                      )}
                      <button
                        onClick={startTranscription}
                        disabled={!item.video_url}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, background: item.video_url ? 'linear-gradient(135deg, #C87533, #A86025)' : '#2a2a2a', color: item.video_url ? '#EDE8DC' : '#555', border: 'none', cursor: item.video_url ? 'pointer' : 'not-allowed', padding: '10px 20px', borderRadius: 8, fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'opacity 0.2s' }}
                      >
                        <Mic size={14} /> Transcribir video
                      </button>
                    </div>
                  )}

                  {(txState === 'submitting' || txState === 'processing') && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <RefreshCw size={14} style={{ color: '#C87533', animation: 'spin 1s linear infinite' }} />
                        <span style={{ fontSize: 13, color: '#ccc' }}>{txMsg}</span>
                      </div>
                      {/* fake progress pulse */}
                      <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '60%', background: 'linear-gradient(90deg, #C87533, #E8A84E)', borderRadius: 99, animation: 'pulse-bar 1.5s ease-in-out infinite' }} />
                      </div>
                      <p style={{ fontSize: 11, color: '#444', fontFamily: "'DM Mono', monospace" }}>Powered by AssemblyAI · ~30-60s</p>
                      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes pulse-bar { 0%,100%{opacity:0.5} 50%{opacity:1} }`}</style>
                    </div>
                  )}

                  {txState === 'error' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <p style={{ fontSize: 13, color: '#ef4444' }}>✗ {txMsg}</p>
                      {noKey && (
                        <div style={{ background: '#1a1a1a', border: '1px solid rgba(200,117,51,0.2)', borderRadius: 8, padding: 12 }}>
                          <p style={{ fontSize: 12, color: '#ccc', marginBottom: 8, lineHeight: 1.65 }}>
                            Necesitás configurar el token de AssemblyAI:
                          </p>
                          <ol style={{ fontSize: 12, color: '#888', paddingLeft: 16, lineHeight: 1.9 }}>
                            <li>Creá cuenta gratis en <a href="https://assemblyai.com" target="_blank" rel="noreferrer" style={{ color: '#C87533' }}>assemblyai.com</a></li>
                            <li>Copiá tu API key del dashboard</li>
                            <li>Agregala al VPS: <code style={{ background: '#111', padding: '1px 6px', borderRadius: 3, fontSize: 11 }}>ASSEMBLYAI_API_KEY=tu_key</code></li>
                          </ol>
                        </div>
                      )}
                      <button
                        onClick={() => { setTxState('idle'); setTxMsg('') }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C87533', fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: '0.06em', textAlign: 'left', padding: 0 }}
                      >
                        ← Reintentar
                      </button>
                    </div>
                  )}

                  {txState === 'done' && transcript && (
                    <p className="prose">{transcript}</p>
                  )}
                </div>
              </div>
            )}

            {/* For carousels: extra note */}
            {isCarousel && (
              <div style={{ background: 'rgba(200,117,51,0.06)', border: '1px solid rgba(200,117,51,0.15)', borderRadius: 10, padding: '12px 16px' }}>
                <p style={{ fontSize: 12, color: '#998E82', lineHeight: 1.7 }}>
                  💡 Los carruseles no tienen audio que transcribir. El caption de arriba es el texto completo que publicó @{item.competitor_handle} con este carrusel.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
