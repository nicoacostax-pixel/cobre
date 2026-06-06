'use client'

import { useState, useEffect } from 'react'
import { CopperNav } from '../components/CopperNav'

const TABS = ['Comunidad', 'Clases', 'Calendario', 'Ranking']

type Course = {
  id: string
  title: string
  description: string
  level_required: string | null
  is_published: boolean
  order_index: number
  cover_url?: string | null
}

// Portadas CSS por índice de curso
const COVERS: Record<number, { bg: string; icon: string; label: string; accent: string }> = {
  1: {
    bg: 'linear-gradient(135deg, #0a1a0a 0%, #0d2e0d 40%, #1a4a1a 100%)',
    icon: '🚀',
    label: 'EMPIEZA AQUÍ',
    accent: '#4ade80',
  },
  2: {
    bg: 'linear-gradient(135deg, #0a0a1a 0%, #0d0d2e 40%, #1a1a4a 100%)',
    icon: '🧠',
    label: 'MEMORIA DE CLAUDE',
    accent: '#818cf8',
  },
  3: {
    bg: 'linear-gradient(135deg, #0a1520 0%, #0d2235 40%, #1a3a50 100%)',
    icon: '🌐',
    label: 'WEBSITE',
    accent: '#38bdf8',
  },
  4: {
    bg: 'linear-gradient(135deg, #1a0a0a 0%, #2e0d0d 40%, #4a1a1a 100%)',
    icon: '📈',
    label: 'LANDING PAGES',
    accent: '#f87171',
  },
  5: {
    bg: 'linear-gradient(135deg, #1a100a 0%, #2e1a0d 40%, #4a2e1a 100%)',
    icon: '⚙️',
    label: 'SKILLS & MCPs',
    accent: '#C87533',
  },
  6: {
    bg: 'linear-gradient(135deg, #0f0a1a 0%, #1a0d2e 40%, #2e1a4a 100%)',
    icon: '🎮',
    label: 'TU PROPIO JUEGO',
    accent: '#a78bfa',
  },
}

export default function ComunidadPage() {
  const [tab, setTab] = useState('Comunidad')
  const [courses, setCourses] = useState<Course[]>([])
  const [loadingCourses, setLoadingCourses] = useState(false)

  useEffect(() => {
    if (tab !== 'Clases') return
    setLoadingCourses(true)
    fetch('/api/admin/cursos')
      .then(r => r.json())
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]))
      .finally(() => setLoadingCourses(false))
  }, [tab])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: var(--font-geist-sans), sans-serif !important;
          background: #0C0A07 !important;
          color: #EDE8DC;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }
        body::after {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          pointer-events: none; z-index: 1000; opacity: 0.4;
        }

        /* ── HERO ── */
        .cm-hero {
          max-width: 960px; margin: 0 auto;
          padding: 56px 24px 32px;
        }
        .cm-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #C87533;
          background: rgba(200,117,51,0.12);
          border: 1px solid rgba(200,117,51,0.28);
          border-radius: 4px; padding: 5px 12px;
          margin-bottom: 20px;
        }
        .cm-tag-line { width: 16px; height: 1px; background: #C87533; opacity: 0.7; }
        .cm-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 6vw, 4.2rem);
          font-weight: 700; line-height: 0.96;
          letter-spacing: -0.02em; color: #EDE8DC;
          margin-bottom: 14px;
        }
        .cm-h1 em { font-style: italic; color: #C87533; }
        .cm-sub { font-size: 15px; color: #998E82; line-height: 1.75; }

        /* ── TABS ── */
        .cm-tabs {
          position: relative; z-index: 10;
          background: #141009;
          border-bottom: 1px solid rgba(200,117,51,0.15);
          border-top: 1px solid rgba(200,117,51,0.1);
        }
        .cm-tabs-inner {
          max-width: 960px; margin: 0 auto;
          display: flex; padding: 0 24px;
          overflow-x: auto;
        }
        .cm-tab {
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 14px 18px;
          color: #4A3D30; cursor: pointer;
          border-bottom: 2px solid transparent;
          white-space: nowrap;
          transition: color 0.2s, border-color 0.2s;
          user-select: none;
        }
        .cm-tab:hover { color: #998E82; }
        .cm-tab.active { color: #C87533; border-bottom-color: #C87533; }

        /* ── BODY ── */
        .cm-body {
          position: relative; z-index: 1;
          max-width: 960px; margin: 0 auto;
          padding: 32px 24px 80px;
        }

        /* ── EMPTY STATE ── */
        .cm-empty, .cm-loading {
          text-align: center; padding: 80px 20px;
          font-family: 'DM Mono', monospace;
          font-size: 12px; letter-spacing: 0.08em;
          text-transform: uppercase; color: #4A3D30;
        }

        /* ── COMING SOON TAB ── */
        .cm-soon-panel {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 80px 20px; text-align: center; gap: 16px;
        }
        .cm-soon-icon {
          font-size: 2.5rem; opacity: 0.5;
        }
        .cm-soon-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.14em;
          text-transform: uppercase; color: #4A3D30;
        }
        .cm-soon-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; font-weight: 600;
          color: #EDE8DC; line-height: 1.2;
        }
        .cm-soon-title em { font-style: italic; color: #C87533; }
        .cm-soon-sub { font-size: 14px; color: #998E82; max-width: 380px; line-height: 1.7; }

        /* ── COURSE GRID ── */
        .cm-clases-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px; padding: 0 4px;
        }
        @media(max-width: 700px) { .cm-clases-grid { grid-template-columns: 1fr; } }
        @media(min-width: 701px) and (max-width: 900px) { .cm-clases-grid { grid-template-columns: 1fr 1fr; } }

        /* ── COURSE CARD ── */
        .cm-course-card {
          background: #141009;
          border-radius: 14px;
          border: 1px solid rgba(200,117,51,0.15);
          display: flex; flex-direction: column;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .cm-course-card:hover {
          border-color: rgba(200,117,51,0.4);
          transform: translateY(-2px);
          box-shadow: 0 0 24px rgba(200,117,51,0.08);
        }
        .cm-course-thumb {
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, #1C1008, #2A180A);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 20px; text-align: center;
          position: relative; overflow: hidden;
        }
        .cm-course-thumb::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 110%, rgba(255,255,255,0.04), transparent 65%);
          pointer-events: none;
        }
        /* CSS cover elements */
        .cm-cover-icon {
          font-size: 3rem; line-height: 1;
          margin-bottom: 10px; position: relative; z-index: 1;
          filter: drop-shadow(0 0 20px rgba(255,255,255,0.15));
        }
        .cm-cover-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          position: relative; z-index: 1;
          line-height: 1.3;
        }
        .cm-cover-num {
          position: absolute; bottom: 10px; left: 14px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 4.5rem; font-weight: 700;
          line-height: 1; opacity: 0.07; color: #fff;
          user-select: none;
        }
        /* fallback (no cover meta) */
        .cm-course-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem; font-weight: 700;
          color: rgba(200,117,51,0.12); line-height: 1;
          margin-bottom: 6px; position: relative;
        }
        .cm-course-thumb-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem; font-weight: 600;
          color: #EDE8DC; line-height: 1.3;
          position: relative;
        }
        .cm-course-badge {
          position: absolute; top: 10px; right: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 3px 9px; border-radius: 3px;
        }
        .cm-course-badge.published {
          background: rgba(200,117,51,0.12);
          color: #C87533;
          border: 1px solid rgba(200,117,51,0.3);
        }
        .cm-course-badge.draft {
          background: rgba(237,232,220,0.04);
          color: #4A3D30;
          border: 1px solid rgba(200,117,51,0.1);
        }
        .cm-course-body {
          padding: 16px; flex: 1;
          display: flex; flex-direction: column; gap: 8px;
        }
        .cm-course-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 600;
          color: #EDE8DC; line-height: 1.3;
        }
        .cm-course-desc { font-size: 12px; color: #998E82; line-height: 1.65; flex: 1; }
        .cm-course-foot {
          display: flex; align-items: center;
          justify-content: space-between; margin-top: 6px;
          padding-top: 12px;
          border-top: 1px solid rgba(200,117,51,0.1);
        }
        .cm-course-level {
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 0.1em;
          text-transform: uppercase; color: #C87533;
        }
        .cm-course-level.none { color: #4A3D30; }
        .cm-course-btn {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #C87533; text-decoration: none;
          transition: color 0.2s;
        }
        .cm-course-btn:hover { color: #E8A84E; }
        .cm-course-btn.locked { color: #4A3D30; cursor: default; }

        @media(max-width: 700px) {
          .cm-hero { padding: 40px 20px 24px; }
          .cm-tabs-inner { padding: 0 16px; }
          .cm-body { padding: 24px 16px 60px; }
        }
      `}</style>

      <CopperNav activeHref="/comunidad" />

      <div className="cm-hero">
        <div className="cm-tag">
          <span className="cm-tag-line" />
          espacio de la comunidad
          <span className="cm-tag-line" />
        </div>
        <h1 className="cm-h1">La <em>comunidad</em>.</h1>
        <p className="cm-sub">Donde aprendemos, compartimos y nos apoyamos en español.</p>
      </div>

      <div className="cm-tabs">
        <div className="cm-tabs-inner">
          {TABS.map(t => (
            <div key={t} className={`cm-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="cm-body">

        {tab === 'Comunidad' && (
          <div className="cm-soon-panel">
            <div className="cm-soon-icon">🌐</div>
            <span className="cm-soon-label">acceso completo</span>
            <h2 className="cm-soon-title">El foro está en <em>Skool.</em></h2>
            <p className="cm-soon-sub">El espacio completo de la comunidad vive en Skool. Registrate gratis para acceder a debates, retos y soporte directo.</p>
            <a href="/#registro" style={{
              fontFamily: "'DM Mono', monospace", fontSize: 12,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#EDE8DC', background: 'linear-gradient(135deg, #C87533, #A86025)',
              padding: '12px 24px', borderRadius: 8, textDecoration: 'none',
              marginTop: 8, display: 'inline-block',
            }}>
              UNIRME GRATIS →
            </a>
          </div>
        )}

        {tab === 'Clases' && (
          <>
            {loadingCourses && <div className="cm-loading">Cargando clases…</div>}
            {!loadingCourses && courses.length === 0 && (
              <div className="cm-empty">Todavía no hay clases publicadas.</div>
            )}
            {!loadingCourses && courses.length > 0 && (
              <div className="cm-clases-grid">
                {courses.map((c, i) => {
                  const cover = COVERS[c.order_index]
                  return (
                  <div key={c.id} className="cm-course-card">
                    <div
                      className="cm-course-thumb"
                      style={cover ? { background: cover.bg } : undefined}
                    >
                      {c.cover_url ? (
                        <img
                          src={c.cover_url} alt={c.title}
                          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
                        />
                      ) : cover ? (
                        <>
                          <div className="cm-cover-icon">{cover.icon}</div>
                          <div className="cm-cover-label" style={{ color: cover.accent }}>
                            {cover.label}
                          </div>
                          <div className="cm-cover-num">{String(c.order_index).padStart(2, '0')}</div>
                        </>
                      ) : (
                        <>
                          <div className="cm-course-num">{String(i + 1).padStart(2, '0')}</div>
                          <div className="cm-course-thumb-title">{c.title}</div>
                        </>
                      )}
                      <span className={`cm-course-badge ${c.is_published ? 'published' : 'draft'}`}>
                        {c.is_published ? 'Disponible' : 'Próximamente'}
                      </span>
                    </div>
                    <div className="cm-course-body">
                      <div className="cm-course-title">{c.title}</div>
                      {c.description && <p className="cm-course-desc">{c.description}</p>}
                      <div className="cm-course-foot">
                        <span className={`cm-course-level${c.level_required ? '' : ' none'}`}>
                          {c.level_required ?? 'Libre acceso'}
                        </span>
                        {c.is_published
                          ? <a className="cm-course-btn" href={`/cursos/${c.id}`}>VER CLASE →</a>
                          : <span className="cm-course-btn locked">EN CAMINO</span>
                        }
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {(tab === 'Calendario' || tab === 'Ranking') && (
          <div className="cm-soon-panel">
            <div className="cm-soon-icon">{tab === 'Calendario' ? '📅' : '🏆'}</div>
            <span className="cm-soon-label">en desarrollo</span>
            <h2 className="cm-soon-title"><em>{tab}</em> pronto.</h2>
            <p className="cm-soon-sub">Esta sección está en camino. Mientras tanto, todo lo que necesitás está en la comunidad.</p>
          </div>
        )}

      </div>
    </>
  )
}
