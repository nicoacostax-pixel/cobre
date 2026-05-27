'use client'

import { useState } from 'react'

const TABS = ['Comunidad', 'Clases', 'Calendario', 'Ranking']

export default function ComunidadPage() {
  const [tab, setTab] = useState('Comunidad')

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
        .cm-body{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:40px 24px}

        @media(max-width:700px){
          .cm-sitenav{padding:12px 16px}
          .cm-tabs-inner{padding:0 16px}
          .cm-body{padding:24px 16px}
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
      </div>
    </>
  )
}
