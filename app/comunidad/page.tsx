'use client'

import { useState, useEffect } from 'react'

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#050505;color:#e0e0e0;min-height:100vh;-webkit-font-smoothing:antialiased}
        body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,42,109,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,42,109,.03) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0}
        :root{--pink:#ff2a6d;--pink-dim:rgba(255,42,109,.15);--pink-glow:rgba(255,42,109,.35);--surface:#0f0f0f;--surface2:#161616;--border:rgba(255,255,255,.06);--border-pink:rgba(255,42,109,.25)}

        /* site nav */
        .cm-sitenav{position:relative;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:14px 24px;background:rgba(5,5,5,.92);border-bottom:1px solid var(--border);gap:12px;backdrop-filter:blur(12px)}
        .cm-sitelogo{font-family:'Poppins',sans-serif;font-weight:900;font-size:18px;color:#fff;text-decoration:none;white-space:nowrap}
        .cm-sitelogo span{color:var(--pink)}
        .cm-siteback{font-size:13px;color:#aaa;text-decoration:none;font-weight:500;transition:color .2s;white-space:nowrap}
        .cm-siteback:hover{color:var(--pink)}
        .cm-join-btn{display:inline-flex;align-items:center;gap:7px;background:var(--pink);color:white;padding:10px 18px;border-radius:12px;font-size:13px;font-weight:800;font-family:'Inter',sans-serif;text-decoration:none;transition:opacity .2s,box-shadow .2s;box-shadow:0 0 16px var(--pink-glow);white-space:nowrap;flex-shrink:0}
        .cm-join-btn:hover{opacity:.88;box-shadow:0 0 28px var(--pink-glow)}

        /* tabs */
        .cm-tabs{position:relative;z-index:10;background:var(--surface);border-bottom:1px solid var(--border)}
        .cm-tabs-inner{max-width:960px;margin:0 auto;display:flex;padding:0 24px;overflow-x:auto}
        .cm-tab{padding:14px 18px;font-size:14px;font-weight:600;color:#555;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap;transition:color .2s,border-color .2s;user-select:none}
        .cm-tab:hover{color:#e0e0e0}
        .cm-tab.active{color:#fff;border-bottom-color:var(--pink);font-weight:800}

        /* body */
        .cm-body{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:32px 24px}

        /* clases grid */
        .cm-clases-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:0 8px}
        @media(max-width:700px){.cm-clases-grid{grid-template-columns:1fr}}
        @media(min-width:701px) and (max-width:900px){.cm-clases-grid{grid-template-columns:1fr 1fr}}

        /* course card */
        .cm-course-card{background:var(--surface);border-radius:16px;border:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;transition:border-color .2s,transform .2s,box-shadow .2s}
        .cm-course-card:hover{border-color:var(--border-pink);transform:translateY(-2px);box-shadow:0 0 24px rgba(255,42,109,.07)}
        .cm-course-thumb{aspect-ratio:16/9;background:linear-gradient(135deg,#1a000d,#2d0018);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center;position:relative}
        .cm-course-num{font-family:'Poppins',sans-serif;font-size:2.5rem;font-weight:900;color:rgba(255,42,109,.15);line-height:1;margin-bottom:4px}
        .cm-course-thumb-title{font-family:'Poppins',sans-serif;font-size:1rem;font-weight:800;color:#fff;line-height:1.3}
        .cm-course-badge{position:absolute;top:12px;right:12px;font-size:10px;font-weight:700;letter-spacing:.06em;padding:4px 10px;border-radius:999px}
        .cm-course-badge.published{background:rgba(255,42,109,.15);color:var(--pink);border:1px solid var(--border-pink)}
        .cm-course-badge.draft{background:rgba(255,255,255,.05);color:#555;border:1px solid var(--border)}
        .cm-course-body{padding:16px;flex:1;display:flex;flex-direction:column;gap:10px}
        .cm-course-title{font-size:14px;font-weight:800;color:#fff;line-height:1.35}
        .cm-course-desc{font-size:12px;color:#bbb;line-height:1.6;flex:1}
        .cm-course-foot{display:flex;align-items:center;justify-content:space-between;margin-top:4px}
        .cm-course-level{font-size:11px;font-weight:700;color:var(--pink);letter-spacing:.04em;text-transform:uppercase}
        .cm-course-level.none{color:#444}
        .cm-course-btn{font-size:12px;font-weight:700;color:var(--pink);text-decoration:none;transition:opacity .2s}
        .cm-course-btn:hover{opacity:.7}
        .cm-course-btn.locked{color:#444;cursor:default}

        /* empty + loading */
        .cm-empty{text-align:center;padding:60px 20px;color:#444;font-size:14px}
        .cm-loading{text-align:center;padding:60px 20px;color:#555;font-size:13px}

        @media(max-width:700px){
          .cm-sitenav{padding:12px 16px}
          .cm-tabs-inner{padding:0 16px}
          .cm-body{padding:20px 16px}
        }
      `}</style>

      <nav className="cm-sitenav">
        <div style={{display:'flex',alignItems:'center',gap:20}}>
          <a className="cm-sitelogo" href="/">Nico <span>IA_</span></a>
          <a className="cm-siteback" href="/">← Inicio</a>
        </div>
        <a className="cm-join-btn" href="/#registro">Unirme gratis →</a>
      </nav>

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

        {tab === 'Clases' && (
          <>
            {loadingCourses && (
              <div className="cm-loading">Cargando clases…</div>
            )}

            {!loadingCourses && courses.length === 0 && (
              <div className="cm-empty">Todavía no hay clases publicadas.</div>
            )}

            {!loadingCourses && courses.length > 0 && (
              <div className="cm-clases-grid">
                {courses.map((c, i) => (
                  <div key={c.id} className="cm-course-card">
                    <div className="cm-course-thumb">
                      {c.cover_url ? (
                        <img
                          src={c.cover_url}
                          alt={c.title}
                          style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}
                        />
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
                          ? <a className="cm-course-btn" href={`/cursos/${c.id}`}>Ver clase →</a>
                          : <span className="cm-course-btn locked">En camino</span>
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </>
  )
}
