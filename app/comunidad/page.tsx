'use client'

import { useState } from 'react'

const TABS = ['Comunidad', 'Clases', 'Calendario', 'Ranking']

const CATS = ['Todo', 'General', 'Anuncios', 'Retos', 'Presentaciones', 'Victorias']

const POSTS = [
  {
    id: 1,
    avatar: 'N',
    avatarColor: '#ff2a6d',
    name: 'Nico Acosta',
    badge: '👑',
    time: '2h',
    cat: 'Anuncios',
    catColor: 'rgba(255,42,109,.12)',
    catText: '#ff6b9d',
    pinned: true,
    title: '🚀 Resumen semanal: herramientas, trends y lo mejor de la comunidad',
    body: 'Otra semana increíble dentro de la comunidad. Bienvenidos a todos los que se unieron este mes 👋 Si estás empezando, el mejor primer paso es presentarte en Presentaciones y hacer el reto de la semana.',
    likes: 34,
    comments: 12,
    commentAvatars: ['A', 'M', 'L'],
  },
  {
    id: 2,
    avatar: 'N',
    avatarColor: '#ff2a6d',
    name: 'Nico Acosta',
    badge: '👑',
    time: '5d',
    cat: 'Anuncios',
    catColor: 'rgba(255,42,109,.12)',
    catText: '#ff6b9d',
    pinned: true,
    title: '🔥 RETO DE LA SEMANA: Monta tu primer agente en 15 minutos',
    body: 'Esta semana el reto es crear un agente en Claude que responda correos por ti. No necesitas saber código. Comparte tu resultado en #Retos y el más votado gana acceso a la masterclass del mes.',
    likes: 89,
    comments: 45,
    commentAvatars: ['R', 'C', 'P', 'S'],
  },
  {
    id: 3,
    avatar: 'A',
    avatarColor: '#7c3aed',
    name: 'Andrea M.',
    badge: null,
    time: '3h',
    cat: 'Victorias',
    catColor: 'rgba(0,255,128,.08)',
    catText: '#00d97e',
    pinned: false,
    title: '¡Ahorré 6 horas esta semana usando las instrucciones de la guía 01!',
    body: 'Llevaba meses perdiendo tiempo escribiendo lo mismo en cada prompt. Apliqué la fórmula de Nico y ahora tengo todo mi sistema montado. El agente de correos funciona de lujo.',
    likes: 41,
    comments: 8,
    commentAvatars: ['N', 'M'],
  },
  {
    id: 4,
    avatar: 'R',
    avatarColor: '#d97706',
    name: 'Roberto C.',
    badge: null,
    time: '1d',
    cat: 'General',
    catColor: 'rgba(150,100,255,.1)',
    catText: '#a78bfa',
    pinned: false,
    title: '¿Cuál es el mejor modelo de Claude para contenido largo?',
    body: 'Estoy evaluando si usar Sonnet o Opus para mis newsletters largas. ¿Alguien ha probado los dos y nota diferencia real en calidad?',
    likes: 17,
    comments: 23,
    commentAvatars: ['N', 'A', 'L'],
  },
  {
    id: 5,
    avatar: 'L',
    avatarColor: '#059669',
    name: 'Laura P.',
    badge: null,
    time: '2d',
    cat: 'Presentaciones',
    catColor: 'rgba(255,200,0,.08)',
    catText: '#fbbf24',
    pinned: false,
    title: '¡Hola! Me presento — soy consultora de marketing en Barcelona',
    body: 'Acabo de unirme y ya me he leído las dos primeras guías. Llevo un año usando ChatGPT pero nunca de forma estructurada. Aquí para aprender y aportar lo que pueda 🙌',
    likes: 28,
    comments: 15,
    commentAvatars: ['N', 'A', 'R'],
  },
]

const CLASES = [
  {
    num: '00',
    label: 'Empieza aquí',
    sub: 'Tu ruta de inicio',
    title: 'Bienvenida a la comunidad',
    desc: 'El primer paso antes de todo. Te explico cómo sacarle el máximo partido a la comunidad y por dónde empezar.',
    dur: '5 min',
    free: true,
    level: null,
    grad: 'linear-gradient(135deg,#1a0015,#2d0a2a)',
  },
  {
    num: '01',
    label: '1.- Tu primer prompt',
    sub: 'La base de todo',
    title: 'Tu primer prompt con Claude',
    desc: 'Modelo, instrucciones, tono y formato. El setup que hace que Claude entienda exactamente lo que necesitas.',
    dur: '12 min',
    free: true,
    level: null,
    grad: 'linear-gradient(135deg,#1a000d,#3d0020)',
  },
  {
    num: '02',
    label: '2.- Agentes desde cero',
    sub: 'Sin código',
    title: 'Cómo montar un agente desde cero',
    desc: 'Crea tu primer agente autónomo en Claude. Gestiona correos, califica leads y agenda reuniones sin escribir código.',
    dur: '28 min',
    free: false,
    level: 'Nivel 2',
    grad: 'linear-gradient(135deg,#0a0a0a,#1a0a10)',
  },
  {
    num: '03',
    label: '3.- Sistema de instrucciones',
    sub: 'El método definitivo',
    title: 'El sistema de instrucciones que funciona',
    desc: '1 prompt + 1 template + 3 reglas. Lo que uso antes de escribir cualquier instrucción para Claude.',
    dur: '19 min',
    free: false,
    level: 'Nivel 2',
    grad: 'linear-gradient(135deg,#0a0a0a,#150a10)',
  },
  {
    num: '04',
    label: '4.- Automatiza en 7 días',
    sub: 'Setup completo',
    title: 'Automatiza tus respuestas en 7 días',
    desc: 'Pack de 7 días para montar un sistema que gestiona correos, califica leads y agenda reuniones por ti.',
    dur: '35 min',
    free: false,
    level: 'Nivel 3',
    grad: 'linear-gradient(135deg,#0a0a0a,#100a15)',
  },
  {
    num: '05',
    label: '5.- Carruseles virales',
    sub: '6 formatos listos',
    title: 'Carruseles que paran el scroll',
    desc: 'Una skill de Claude lista para usar. Hook, setup, contenido, cierre y CTA. 6 tipos de carrusel para cualquier nicho.',
    dur: '22 min',
    free: false,
    level: 'Nivel 3',
    grad: 'linear-gradient(135deg,#0a0a0a,#1a0a05)',
  },
]

const RANKING = [
  { pos: 1, avatar: 'N', color: '#ff2a6d', name: 'Nico Acosta', pts: 4820, badge: '👑' },
  { pos: 2, avatar: 'A', color: '#7c3aed', name: 'Andrea M.', pts: 1240, badge: null },
  { pos: 3, avatar: 'L', color: '#059669', name: 'Laura P.', pts: 980, badge: null },
  { pos: 4, avatar: 'R', color: '#d97706', name: 'Roberto C.', pts: 745, badge: null },
  { pos: 5, avatar: 'M', color: '#db2777', name: 'María F.', pts: 612, badge: null },
  { pos: 6, avatar: 'C', color: '#2563eb', name: 'Carlos V.', pts: 430, badge: null },
]

const EVENTOS = [
  { day: '28', month: 'MAY', title: 'Call de onboarding', time: '18:00 CET', type: 'En vivo' },
  { day: '4', month: 'JUN', title: 'Masterclass: Agentes avanzados', time: '19:00 CET', type: 'Masterclass' },
  { day: '11', month: 'JUN', title: 'Sesión de Q&A en directo', time: '18:00 CET', type: 'En vivo' },
  { day: '18', month: 'JUN', title: 'Reto mensual — cierre y premios', time: '17:00 CET', type: 'Reto' },
]

export default function ComunidadPage() {
  const [tab, setTab] = useState('Comunidad')
  const [cat, setCat] = useState('Todo')

  const filtered = cat === 'Todo' ? POSTS : POSTS.filter(p => {
    const map: Record<string, string> = { 'Anuncios': 'Anuncios', 'Retos': 'Retos', 'Presentaciones': 'Presentaciones', 'Victorias': 'Victorias', 'General': 'General' }
    return p.cat === map[cat]
  })

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
        .cm-siteback{font-size:13px;color:#555;text-decoration:none;font-weight:500;transition:color .2s;white-space:nowrap}
        .cm-siteback:hover{color:var(--pink)}
        .cm-join-btn{display:inline-flex;align-items:center;gap:7px;background:var(--pink);color:white;padding:10px 18px;border-radius:12px;font-size:13px;font-weight:800;font-family:'Inter',sans-serif;text-decoration:none;transition:opacity .2s,box-shadow .2s;box-shadow:0 0 16px var(--pink-glow);white-space:nowrap;flex-shrink:0}
        .cm-join-btn:hover{opacity:.88;box-shadow:0 0 28px var(--pink-glow)}

        /* tabs */
        .cm-tabs{position:relative;z-index:10;background:var(--surface);border-bottom:1px solid var(--border)}
        .cm-tabs-inner{max-width:960px;margin:0 auto;display:flex;gap:0;padding:0 24px;overflow-x:auto}
        .cm-tab{padding:14px 18px;font-size:14px;font-weight:600;color:#555;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap;transition:color .2s,border-color .2s;user-select:none}
        .cm-tab:hover{color:#e0e0e0}
        .cm-tab.active{color:#fff;border-bottom-color:var(--pink);font-weight:800}

        /* layout */
        .cm-body{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:24px 24px;display:grid;grid-template-columns:minmax(0,75%) minmax(0,25%);gap:24px;align-items:start}
        @media(max-width:700px){.cm-body{grid-template-columns:1fr;padding:16px 16px}}
        .cm-feed-col{min-width:0;width:100%}

        /* write box */
        .cm-write{background:var(--surface);border-radius:14px;border:1px solid var(--border);padding:14px 16px;display:flex;align-items:center;gap:12px;margin-bottom:14px;cursor:pointer;transition:border-color .2s}
        .cm-write:hover{border-color:var(--border-pink)}
        .cm-write-avatar{width:36px;height:36px;border-radius:50%;background:var(--pink);color:white;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;flex-shrink:0;box-shadow:0 0 10px rgba(255,42,109,.25)}
        .cm-write-placeholder{font-size:14px;color:#444;flex:1}

        /* onboarding banner */
        .cm-onboard{background:var(--surface);border-radius:14px;border:1px solid var(--border);padding:12px 16px;margin-bottom:14px;display:flex;align-items:center;gap:10px;font-size:13px;color:#777}
        .cm-onboard-icon{font-size:16px}
        .cm-onboard strong{color:#e0e0e0}
        .cm-onboard-time{margin-left:auto;font-size:12px;color:var(--pink);font-weight:700}

        /* category pills */
        .cm-cats{display:flex;gap:8px;margin-bottom:14px;overflow-x:auto;padding-bottom:2px}
        .cm-cat{padding:6px 14px;border-radius:999px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .15s,color .15s,border-color .15s;border:1.5px solid transparent}
        .cm-cat.active{background:var(--pink);color:white;border-color:var(--pink);box-shadow:0 0 12px rgba(255,42,109,.25)}
        .cm-cat:not(.active){background:var(--surface);color:#666;border-color:var(--border)}
        .cm-cat:not(.active):hover{border-color:var(--border-pink);color:var(--pink)}

        /* post card */
        .cm-post{background:var(--surface);border-radius:14px;border:1px solid var(--border);padding:18px;margin-bottom:12px;transition:border-color .2s}
        .cm-post:hover{border-color:rgba(255,255,255,.1)}
        .cm-post.pinned{border-color:rgba(255,42,109,.15)}
        .cm-post-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
        .cm-post-author{display:flex;align-items:center;gap:10px}
        .cm-avatar{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:white;flex-shrink:0}
        .cm-author-name{font-size:14px;font-weight:700;color:#e0e0e0}
        .cm-author-meta{display:flex;align-items:center;gap:6px;font-size:12px;color:#555;margin-top:1px}
        .cm-post-pin{font-size:12px;color:#444;display:flex;align-items:center;gap:4px;font-weight:600}
        .cm-post-cat{border-radius:999px;padding:3px 10px;font-size:11px;font-weight:700;letter-spacing:.03em}
        .cm-post-title{font-size:15px;font-weight:800;color:#fff;margin-bottom:7px;line-height:1.4}
        .cm-post-body{font-size:13px;color:#777;line-height:1.65;margin-bottom:14px}
        .cm-post-foot{display:flex;align-items:center;gap:16px}
        .cm-post-action{display:flex;align-items:center;gap:5px;font-size:13px;color:#555;font-weight:500;cursor:pointer;transition:color .15s}
        .cm-post-action:hover{color:var(--pink)}
        .cm-post-avatars{display:flex;align-items:center;margin-left:auto}
        .cm-micro-avatar{width:22px;height:22px;border-radius:50%;background:var(--surface2);border:2px solid #0f0f0f;margin-left:-6px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#e0e0e0}
        .cm-micro-avatar:first-child{margin-left:0}
        .cm-new-comment{font-size:12px;color:var(--pink);font-weight:600;margin-left:8px}

        /* sidebar */
        .cm-sidebar{display:flex;flex-direction:column;gap:14px}
        .cm-sidebar-card{background:var(--surface);border-radius:14px;border:1px solid var(--border);padding:18px}
        .cm-sidebar-title{font-size:13px;font-weight:800;color:#e0e0e0;margin-bottom:14px}
        .cm-stat-row{display:flex;gap:12px;margin-bottom:12px}
        .cm-stat{flex:1;text-align:center;background:var(--surface2);border-radius:10px;padding:12px 8px;border:1px solid var(--border)}
        .cm-stat-num{font-family:'Poppins',sans-serif;font-size:1.3rem;font-weight:900;color:var(--pink)}
        .cm-stat-label{font-size:11px;color:#555;font-weight:600;margin-top:2px}
        .cm-join-sidebar-btn{display:flex;align-items:center;justify-content:center;gap:8px;background:var(--pink);color:white;padding:13px;border-radius:12px;font-size:14px;font-weight:800;font-family:'Inter',sans-serif;text-decoration:none;transition:opacity .2s,transform .15s,box-shadow .2s;box-shadow:0 0 20px var(--pink-glow);width:100%}
        .cm-join-sidebar-btn:hover{opacity:.9;transform:translateY(-1px);box-shadow:0 0 32px var(--pink-glow)}
        .cm-member-row{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--border)}
        .cm-member-row:last-child{border-bottom:none}
        .cm-member-name{font-size:13px;font-weight:600;color:#e0e0e0;flex:1}
        .cm-member-pts{font-size:12px;color:var(--pink);font-weight:700}

        /* welcome widget */
        .cm-welcome-title{font-size:14px;font-weight:800;color:#e0e0e0;margin-bottom:12px;display:flex;align-items:center;gap:8px}
        .cm-welcome-item{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer}
        .cm-welcome-item:last-child{border-bottom:none}
        .cm-welcome-circle{width:20px;height:20px;border-radius:50%;border:2px solid rgba(255,42,109,.3);flex-shrink:0}
        .cm-welcome-link{font-size:13px;color:var(--pink);font-weight:500;text-decoration:none}
        .cm-welcome-link:hover{opacity:.7}

        /* clases grid */
        .cm-clases-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px}
        @media(max-width:700px){.cm-clases-grid{grid-template-columns:1fr;gap:14px}}
        .cm-course-card{background:var(--surface);border-radius:16px;overflow:hidden;border:1px solid var(--border);display:flex;flex-direction:column;transition:border-color .2s}
        .cm-course-card:hover{border-color:var(--border-pink)}
        .cm-course-thumb{position:relative;aspect-ratio:4/3;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;text-align:center}
        .cm-course-thumb.locked-thumb{filter:brightness(.4)}
        .cm-course-label{font-size:15px;font-weight:700;color:white;line-height:1.3;text-shadow:0 1px 4px rgba(0,0,0,.6)}
        .cm-course-sublabel{font-size:12px;color:rgba(255,255,255,.6);margin-top:4px}
        .cm-course-lock-badge{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);background:rgba(255,42,109,.8);color:white;font-size:12px;font-weight:700;padding:5px 14px;border-radius:999px;white-space:nowrap}
        .cm-course-body{padding:14px 16px;flex:1;display:flex;flex-direction:column;gap:8px}
        .cm-course-title{font-size:14px;font-weight:800;color:#e0e0e0;line-height:1.35}
        .cm-course-desc{font-size:12px;color:#666;line-height:1.6;flex:1}
        .cm-course-btn{display:block;text-align:center;padding:11px;border-radius:10px;font-size:13px;font-weight:700;font-family:'Inter',sans-serif;text-decoration:none;margin-top:4px;transition:opacity .2s,box-shadow .2s}
        .cm-course-btn.active{background:var(--pink);color:white;box-shadow:0 0 14px rgba(255,42,109,.3)}
        .cm-course-btn.active:hover{opacity:.88;box-shadow:0 0 22px rgba(255,42,109,.4)}
        .cm-course-btn.blocked{background:var(--surface2);color:#333;cursor:default;border:1px solid var(--border)}

        /* calendario */
        .cm-evento{background:var(--surface);border-radius:14px;border:1px solid var(--border);padding:16px 18px;margin-bottom:10px;display:flex;align-items:center;gap:16px;transition:border-color .2s}
        .cm-evento:hover{border-color:var(--border-pink)}
        .cm-evento-date{width:48px;height:48px;background:rgba(255,42,109,.08);border:1px solid var(--border-pink);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0}
        .cm-evento-day{font-family:'Poppins',sans-serif;font-size:1.2rem;font-weight:900;color:var(--pink);line-height:1}
        .cm-evento-month{font-size:9px;font-weight:700;letter-spacing:.07em;color:#ff6b9d;text-transform:uppercase}
        .cm-evento-title{font-size:14px;font-weight:700;color:#e0e0e0}
        .cm-evento-meta{font-size:12px;color:#555;margin-top:2px}
        .cm-evento-type{margin-left:auto;font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;background:rgba(255,42,109,.1);color:#ff6b9d;white-space:nowrap}

        /* ranking */
        .cm-rank-row{display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--surface);border-radius:14px;border:1px solid var(--border);margin-bottom:8px;transition:border-color .2s}
        .cm-rank-row:hover{border-color:var(--border-pink)}
        .cm-rank-pos{font-family:'Poppins',sans-serif;font-size:14px;font-weight:900;color:#333;width:24px;text-align:center}
        .cm-rank-pos.top{color:var(--pink)}
        .cm-rank-name{font-size:14px;font-weight:700;color:#e0e0e0;flex:1}
        .cm-rank-pts{font-size:13px;font-weight:700;color:var(--pink)}
        .cm-rank-medal{font-size:16px;margin-left:4px}

        /* lock overlay hint */
        .cm-lock-hint{background:linear-gradient(to bottom,transparent,#050505 60%);border-radius:0 0 14px 14px;padding:40px 20px 20px;text-align:center;margin-top:-30px;position:relative}
        .cm-lock-hint-text{font-size:13px;color:#666;margin-bottom:12px}
        .cm-lock-hint-btn{display:inline-flex;align-items:center;gap:7px;background:var(--pink);color:white;padding:11px 22px;border-radius:12px;font-size:13px;font-weight:800;font-family:'Inter',sans-serif;text-decoration:none;box-shadow:0 0 20px var(--pink-glow);transition:opacity .2s}
        .cm-lock-hint-btn:hover{opacity:.88}

        @media(max-width:700px){
          .cm-sitenav{padding:12px 16px}
          .cm-tabs-inner{padding:0 16px}
          .cm-body{padding:16px 16px}
        }
      `}</style>

      {/* SITE NAV */}
      <nav className="cm-sitenav">
        <div style={{display:'flex',alignItems:'center',gap:20}}>
          <a className="cm-sitelogo" href="/">Nico <span>IA_</span></a>
          <a className="cm-siteback" href="/">← Inicio</a>
        </div>
        <a className="cm-join-btn" href="/#registro">Unirme gratis →</a>
      </nav>

      {/* TABS */}
      <div className="cm-tabs">
        <div className="cm-tabs-inner">
          {TABS.map(t => (
            <div
              key={t}
              className={`cm-tab${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div className="cm-body">

        {/* MAIN COLUMN */}
        <div className="cm-feed-col">
          {tab === 'Comunidad' && (
            <>
              {/* write box */}
              <div className="cm-write">
                <div className="cm-write-avatar">N</div>
                <span className="cm-write-placeholder">Escribe algo en la comunidad…</span>
              </div>

              {/* onboarding banner */}
              <div className="cm-onboard">
                <span className="cm-onboard-icon">📅</span>
                <span><strong>Call de bienvenida</strong> en 22 horas</span>
                <span className="cm-onboard-time">Ver horario →</span>
              </div>

              {/* category pills */}
              <div className="cm-cats">
                {CATS.map(c => (
                  <div
                    key={c}
                    className={`cm-cat${cat === c ? ' active' : ''}`}
                    onClick={() => setCat(c)}
                  >
                    {c}
                  </div>
                ))}
              </div>

              {/* posts */}
              {filtered.map(p => (
                <div key={p.id} className={`cm-post${p.pinned ? ' pinned' : ''}`}>
                  <div className="cm-post-top">
                    <div className="cm-post-author">
                      <div className="cm-avatar" style={{ background: p.avatarColor }}>{p.avatar}</div>
                      <div>
                        <div className="cm-author-name">{p.name} {p.badge}</div>
                        <div className="cm-author-meta">
                          <span>{p.time}</span>
                          <span>·</span>
                          <span
                            className="cm-post-cat"
                            style={{ background: p.catColor, color: p.catText }}
                          >{p.cat}</span>
                        </div>
                      </div>
                    </div>
                    {p.pinned && <span className="cm-post-pin">📌 Fijado</span>}
                  </div>
                  <div className="cm-post-title">{p.title}</div>
                  <div className="cm-post-body">{p.body}</div>
                  <div className="cm-post-foot">
                    <span className="cm-post-action">👍 {p.likes}</span>
                    <span className="cm-post-action">💬 {p.comments}</span>
                    <div className="cm-post-avatars">
                      {p.commentAvatars.map((a, i) => (
                        <div key={i} className="cm-micro-avatar">{a}</div>
                      ))}
                      <span className="cm-new-comment">Nuevo comentario</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* lock hint */}
              <div className="cm-lock-hint">
                <p className="cm-lock-hint-text">Únete gratis para participar, comentar y acceder a todo el contenido</p>
                <a className="cm-lock-hint-btn" href="/#registro">Unirme a la comunidad →</a>
              </div>
            </>
          )}

          {tab === 'Clases' && (
            <>
              <div className="cm-onboard">
                <span className="cm-onboard-icon">🎓</span>
                <span><strong>6 clases disponibles</strong> · Las 2 primeras son gratis</span>
              </div>
              <div className="cm-clases-grid">
                {CLASES.map(c => (
                  <div key={c.num} className="cm-course-card">
                    <div
                      className={`cm-course-thumb${c.free ? '' : ' locked-thumb'}`}
                      style={{ background: c.grad }}
                    >
                      <div className="cm-course-label">{c.label}</div>
                      <div className="cm-course-sublabel">{c.sub}</div>
                      {!c.free && c.level && (
                        <div className="cm-course-lock-badge">🔒 {c.level} requerido</div>
                      )}
                    </div>
                    <div className="cm-course-body">
                      <div className="cm-course-title">{c.title}</div>
                      <div className="cm-course-desc">{c.desc}</div>
                      {c.free
                        ? <a className="cm-course-btn active" href="/recursos/01">Ver curso →</a>
                        : <span className="cm-course-btn blocked">🔒 Bloqueado</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'Calendario' && (
            <>
              <div className="cm-onboard">
                <span className="cm-onboard-icon">📅</span>
                <span><strong>4 eventos</strong> programados este mes</span>
              </div>
              {EVENTOS.map((e, i) => (
                <div key={i} className="cm-evento">
                  <div className="cm-evento-date">
                    <div className="cm-evento-day">{e.day}</div>
                    <div className="cm-evento-month">{e.month}</div>
                  </div>
                  <div>
                    <div className="cm-evento-title">{e.title}</div>
                    <div className="cm-evento-meta">🕕 {e.time}</div>
                  </div>
                  <div className="cm-evento-type">{e.type}</div>
                </div>
              ))}
            </>
          )}

          {tab === 'Ranking' && (
            <>
              <div className="cm-onboard">
                <span className="cm-onboard-icon">🏆</span>
                <span><strong>Top miembros</strong> del mes · Se actualiza cada semana</span>
              </div>
              {RANKING.map(r => (
                <div key={r.pos} className="cm-rank-row">
                  <span className={`cm-rank-pos${r.pos <= 3 ? ' top' : ''}`}>{r.pos}</span>
                  <div className="cm-avatar" style={{ background: r.color, width: 32, height: 32, fontSize: 13 }}>{r.avatar}</div>
                  <span className="cm-rank-name">{r.name} {r.badge}</span>
                  <span className="cm-rank-pts">{r.pts.toLocaleString()} pts</span>
                  {r.pos === 1 && <span className="cm-rank-medal">🥇</span>}
                  {r.pos === 2 && <span className="cm-rank-medal">🥈</span>}
                  {r.pos === 3 && <span className="cm-rank-medal">🥉</span>}
                </div>
              ))}
            </>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="cm-sidebar">

          {/* join CTA */}
          <div className="cm-sidebar-card">
            <div className="cm-stat-row">
              <div className="cm-stat">
                <div className="cm-stat-num">1.2k</div>
                <div className="cm-stat-label">Miembros</div>
              </div>
              <div className="cm-stat">
                <div className="cm-stat-num">5</div>
                <div className="cm-stat-label">Clases</div>
              </div>
              <div className="cm-stat">
                <div className="cm-stat-num">4</div>
                <div className="cm-stat-label">Eventos/mes</div>
              </div>
            </div>
            <a className="cm-join-sidebar-btn" href="/#registro">
              Unirme gratis →
            </a>
          </div>

          {/* top members */}
          <div className="cm-sidebar-card">
            <div className="cm-sidebar-title">🏆 Top miembros</div>
            {RANKING.slice(0, 5).map(r => (
              <div key={r.pos} className="cm-member-row">
                <div className="cm-avatar" style={{ background: r.color, width: 28, height: 28, fontSize: 11 }}>{r.avatar}</div>
                <span className="cm-member-name">{r.name} {r.badge}</span>
                <span className="cm-member-pts">{r.pts.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* welcome */}
          <div className="cm-sidebar-card">
            <div className="cm-welcome-title">
              <span>👋</span> Empieza aquí
            </div>
            <div className="cm-welcome-item">
              <div className="cm-welcome-circle" />
              <a className="cm-welcome-link" href="/recursos/01">Lee la guía 01</a>
            </div>
            <div className="cm-welcome-item">
              <div className="cm-welcome-circle" />
              <span className="cm-welcome-link">Preséntate en la comunidad</span>
            </div>
            <div className="cm-welcome-item">
              <div className="cm-welcome-circle" />
              <span className="cm-welcome-link">Completa el reto de la semana</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
