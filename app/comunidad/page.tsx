'use client'

import { useState } from 'react'

const TABS = ['Comunidad', 'Clases', 'Calendario', 'Ranking']

const CATS = ['Todo', 'General', 'Anuncios', 'Retos', 'Presentaciones', 'Victorias']

const POSTS = [
  {
    id: 1,
    avatar: 'N',
    avatarColor: '#7C5CBF',
    name: 'Nico Acosta',
    badge: '👑',
    time: '2h',
    cat: 'Anuncios',
    catColor: '#fce8ef',
    catText: '#8a2a4a',
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
    avatarColor: '#7C5CBF',
    name: 'Nico Acosta',
    badge: '👑',
    time: '5d',
    cat: 'Anuncios',
    catColor: '#fce8ef',
    catText: '#8a2a4a',
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
    avatarColor: '#574088',
    name: 'Andrea M.',
    badge: null,
    time: '3h',
    cat: 'Victorias',
    catColor: '#e8f8ef',
    catText: '#1a6640',
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
    avatarColor: '#8a5a1a',
    name: 'Roberto C.',
    badge: null,
    time: '1d',
    cat: 'General',
    catColor: '#ede8f8',
    catText: '#574088',
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
    avatarColor: '#1a6640',
    name: 'Laura P.',
    badge: null,
    time: '2d',
    cat: 'Presentaciones',
    catColor: '#fff8e1',
    catText: '#7a5800',
    pinned: false,
    title: '¡Hola! Me presento — soy consultora de marketing en Barcelona',
    body: 'Acabo de unirme y ya me he leído las dos primeras guías. Llevo un año usando ChatGPT pero nunca de forma estructurada. Aquí para aprender y aportar lo que pueda 🙌',
    likes: 28,
    comments: 15,
    commentAvatars: ['N', 'A', 'R'],
  },
]

const CLASES = [
  { num: '01', title: 'Tu primer prompt con Claude', dur: '12 min', free: true },
  { num: '02', title: 'Cómo montar un agente desde cero', dur: '28 min', free: false },
  { num: '03', title: 'El sistema de instrucciones que funciona', dur: '19 min', free: false },
  { num: '04', title: 'Automatiza tus respuestas en 7 días', dur: '35 min', free: false },
  { num: '05', title: 'Carruseles virales con IA', dur: '22 min', free: false },
]

const RANKING = [
  { pos: 1, avatar: 'N', color: '#7C5CBF', name: 'Nico Acosta', pts: 4820, badge: '👑' },
  { pos: 2, avatar: 'A', color: '#574088', name: 'Andrea M.', pts: 1240, badge: null },
  { pos: 3, avatar: 'L', color: '#1a6640', name: 'Laura P.', pts: 980, badge: null },
  { pos: 4, avatar: 'R', color: '#8a5a1a', name: 'Roberto C.', pts: 745, badge: null },
  { pos: 5, avatar: 'M', color: '#8a2a4a', name: 'María F.', pts: 612, badge: null },
  { pos: 6, avatar: 'C', color: '#1a3a8a', name: 'Carlos V.', pts: 430, badge: null },
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
        body{font-family:'Inter',sans-serif;background:#FDFAE6;color:#1a1a1a;min-height:100vh;-webkit-font-smoothing:antialiased}

        /* site nav */
        .cm-sitenav{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;background:#FDFAE6;border-bottom:1px solid rgba(124,92,191,.1)}
        .cm-sitelogo{font-family:'Poppins',sans-serif;font-weight:900;font-size:18px;color:#574088;text-decoration:none}
        .cm-siteback{font-size:13px;color:#aaa;text-decoration:none;font-weight:500;transition:color .2s}
        .cm-siteback:hover{color:#7C5CBF}

        /* community header */
        .cm-header{background:#FDFAE6;border-bottom:1px solid rgba(124,92,191,.15);padding:28px 24px 0}
        .cm-header-inner{max-width:960px;margin:0 auto;display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-bottom:0}
        .cm-header-left{display:flex;align-items:center;gap:16px}
        .cm-community-icon{width:56px;height:56px;border-radius:14px;background:#ede8f8;border:2px solid #d4c8f0;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;color:#7C5CBF;font-family:'Poppins',sans-serif;flex-shrink:0}
        .cm-community-name{font-family:'Poppins',sans-serif;font-size:1.35rem;font-weight:900;color:#574088;line-height:1.2}
        .cm-community-sub{font-size:13px;color:#9a80c8;margin-top:3px}
        .cm-header-right{padding-bottom:12px}
        .cm-join-btn{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#7C5CBF,#574088);color:white;padding:11px 22px;border-radius:12px;font-size:14px;font-weight:800;font-family:'Inter',sans-serif;text-decoration:none;transition:transform .15s,box-shadow .15s;box-shadow:0 4px 16px rgba(124,92,191,.3)}
        .cm-join-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(124,92,191,.4)}

        /* tabs */
        .cm-tabs{background:#FDFAE6;border-bottom:1px solid rgba(124,92,191,.15)}
        .cm-tabs-inner{max-width:960px;margin:0 auto;display:flex;gap:0;padding:0 24px;overflow-x:auto}
        .cm-tab{padding:14px 18px;font-size:14px;font-weight:600;color:#aaa;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap;transition:color .2s,border-color .2s;user-select:none}
        .cm-tab:hover{color:#7C5CBF}
        .cm-tab.active{color:#574088;border-bottom-color:#7C5CBF;font-weight:800}

        /* layout */
        .cm-body{max-width:960px;margin:0 auto;padding:24px 16px;display:grid;grid-template-columns:1fr 300px;gap:20px;align-items:start}
        @media(max-width:700px){.cm-body{grid-template-columns:1fr}}

        /* write box */
        .cm-write{background:white;border-radius:14px;border:1px solid #e8e0f8;padding:14px 16px;display:flex;align-items:center;gap:12px;margin-bottom:14px;cursor:pointer;transition:box-shadow .2s}
        .cm-write:hover{box-shadow:0 2px 12px rgba(0,0,0,.07)}
        .cm-write-avatar{width:36px;height:36px;border-radius:50%;background:#7C5CBF;color:white;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;flex-shrink:0}
        .cm-write-placeholder{font-size:14px;color:#aaa;flex:1}

        /* onboarding banner */
        .cm-onboard{background:white;border-radius:14px;border:1px solid #e8e0f8;padding:12px 16px;margin-bottom:14px;display:flex;align-items:center;gap:10px;font-size:13px;color:#555}
        .cm-onboard-icon{font-size:16px}
        .cm-onboard strong{color:#1a1a1a}
        .cm-onboard-time{margin-left:auto;font-size:12px;color:#7C5CBF;font-weight:700}

        /* category pills */
        .cm-cats{display:flex;gap:8px;margin-bottom:14px;overflow-x:auto;padding-bottom:2px}
        .cm-cat{padding:6px 14px;border-radius:999px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .15s,color .15s;border:1.5px solid transparent}
        .cm-cat.active{background:#7C5CBF;color:white;border-color:#7C5CBF}
        .cm-cat:not(.active){background:white;color:#555;border-color:#e4e4e7}
        .cm-cat:not(.active):hover{border-color:#7C5CBF;color:#7C5CBF}

        /* welcome widget */
        .cm-welcome{background:white;border-radius:14px;border:1px solid #e8e0f8;padding:18px;margin-bottom:14px}
        .cm-welcome-title{font-size:14px;font-weight:800;color:#1a1a1a;margin-bottom:12px;display:flex;align-items:center;gap:8px}
        .cm-welcome-item{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #ede8f8;cursor:pointer}
        .cm-welcome-item:last-child{border-bottom:none}
        .cm-welcome-circle{width:20px;height:20px;border-radius:50%;border:2px solid #d4c8f0;flex-shrink:0}
        .cm-welcome-link{font-size:13px;color:#7C5CBF;font-weight:500;text-decoration:none}
        .cm-welcome-link:hover{text-decoration:underline}

        /* post card */
        .cm-post{background:white;border-radius:14px;border:1px solid #e8e0f8;padding:18px;margin-bottom:12px;transition:box-shadow .2s}
        .cm-post:hover{box-shadow:0 2px 16px rgba(0,0,0,.07)}
        .cm-post.pinned{border-color:#e8e0f8}
        .cm-post-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
        .cm-post-author{display:flex;align-items:center;gap:10px}
        .cm-avatar{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:white;flex-shrink:0}
        .cm-author-name{font-size:14px;font-weight:700;color:#1a1a1a}
        .cm-author-meta{display:flex;align-items:center;gap:6px;font-size:12px;color:#aaa;margin-top:1px}
        .cm-post-pin{font-size:12px;color:#aaa;display:flex;align-items:center;gap:4px;font-weight:600}
        .cm-post-cat{border-radius:999px;padding:3px 10px;font-size:11px;font-weight:700;letter-spacing:.03em}
        .cm-post-title{font-size:15px;font-weight:800;color:#1a1a1a;margin-bottom:7px;line-height:1.4}
        .cm-post-body{font-size:13px;color:#666;line-height:1.65;margin-bottom:14px}
        .cm-post-foot{display:flex;align-items:center;gap:16px}
        .cm-post-action{display:flex;align-items:center;gap:5px;font-size:13px;color:#888;font-weight:500;cursor:pointer;transition:color .15s}
        .cm-post-action:hover{color:#7C5CBF}
        .cm-post-avatars{display:flex;align-items:center;margin-left:auto}
        .cm-micro-avatar{width:22px;height:22px;border-radius:50%;background:#ede8f8;border:2px solid white;margin-left:-6px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#7C5CBF}
        .cm-micro-avatar:first-child{margin-left:0}
        .cm-new-comment{font-size:12px;color:#7C5CBF;font-weight:600;margin-left:8px}

        /* sidebar */
        .cm-sidebar{display:flex;flex-direction:column;gap:14px}
        .cm-sidebar-card{background:white;border-radius:14px;border:1px solid #e8e0f8;padding:18px}
        .cm-sidebar-title{font-size:13px;font-weight:800;color:#1a1a1a;margin-bottom:14px}
        .cm-stat-row{display:flex;gap:12px;margin-bottom:12px}
        .cm-stat{flex:1;text-align:center;background:#FDFAE6;border-radius:10px;padding:12px 8px}
        .cm-stat-num{font-family:'Poppins',sans-serif;font-size:1.3rem;font-weight:900;color:#7C5CBF}
        .cm-stat-label{font-size:11px;color:#888;font-weight:600;margin-top:2px}
        .cm-join-sidebar-btn{display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#7C5CBF,#574088);color:white;padding:13px;border-radius:12px;font-size:14px;font-weight:800;font-family:'Inter',sans-serif;text-decoration:none;transition:opacity .2s,transform .15s;box-shadow:0 4px 16px rgba(124,92,191,.3);width:100%}
        .cm-join-sidebar-btn:hover{opacity:.9;transform:translateY(-1px)}
        .cm-member-row{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid #ede8f8}
        .cm-member-row:last-child{border-bottom:none}
        .cm-member-name{font-size:13px;font-weight:600;color:#1a1a1a;flex:1}
        .cm-member-pts{font-size:12px;color:#7C5CBF;font-weight:700}

        /* clases tab */
        .cm-clase-card{background:white;border-radius:14px;border:1px solid #e8e0f8;padding:18px 20px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:12px}
        .cm-clase-left{display:flex;align-items:center;gap:14px}
        .cm-clase-num{font-family:'Poppins',sans-serif;font-size:11px;font-weight:900;color:#ddd;letter-spacing:.05em;width:24px}
        .cm-clase-title{font-size:14px;font-weight:700;color:#1a1a1a}
        .cm-clase-dur{font-size:12px;color:#aaa;margin-top:2px}
        .cm-clase-badge{font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px}
        .cm-clase-badge.free{background:#e8f8ef;color:#1a6640}
        .cm-clase-badge.locked{background:#FDFAE6;color:#aaa;display:flex;align-items:center;gap:4px}

        /* calendario */
        .cm-evento{background:white;border-radius:14px;border:1px solid #e8e0f8;padding:16px 18px;margin-bottom:10px;display:flex;align-items:center;gap:16px}
        .cm-evento-date{width:48px;height:48px;background:#ede8f8;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0}
        .cm-evento-day{font-family:'Poppins',sans-serif;font-size:1.2rem;font-weight:900;color:#574088;line-height:1}
        .cm-evento-month{font-size:9px;font-weight:700;letter-spacing:.07em;color:#9a80c8;text-transform:uppercase}
        .cm-evento-title{font-size:14px;font-weight:700;color:#1a1a1a}
        .cm-evento-meta{font-size:12px;color:#aaa;margin-top:2px}
        .cm-evento-type{margin-left:auto;font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;background:#ede8f8;color:#574088;white-space:nowrap}

        /* ranking */
        .cm-rank-row{display:flex;align-items:center;gap:12px;padding:12px 16px;background:white;border-radius:14px;border:1px solid #e8e0f8;margin-bottom:8px}
        .cm-rank-pos{font-family:'Poppins',sans-serif;font-size:14px;font-weight:900;color:#ddd;width:24px;text-align:center}
        .cm-rank-pos.top{color:#7C5CBF}
        .cm-rank-name{font-size:14px;font-weight:700;color:#1a1a1a;flex:1}
        .cm-rank-pts{font-size:13px;font-weight:700;color:#7C5CBF}
        .cm-rank-medal{font-size:16px;margin-left:4px}

        /* lock overlay hint */
        .cm-lock-hint{background:linear-gradient(to bottom,transparent,white 60%);border-radius:0 0 14px 14px;padding:40px 20px 20px;text-align:center;margin-top:-30px;position:relative}
        .cm-lock-hint-text{font-size:13px;color:#888;margin-bottom:12px}
        .cm-lock-hint-btn{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#7C5CBF,#574088);color:white;padding:11px 22px;border-radius:12px;font-size:13px;font-weight:800;font-family:'Inter',sans-serif;text-decoration:none}

        @media(max-width:700px){
          .cm-header-inner{flex-direction:column;align-items:flex-start}
          .cm-header-right{width:100%;padding-bottom:0;margin-bottom:-1px}
          .cm-join-btn{width:100%;justify-content:center}
          .cm-body{padding:16px 12px}
        }
      `}</style>

      {/* SITE NAV */}
      <nav className="cm-sitenav">
        <a className="cm-sitelogo" href="/">Nico IA_</a>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <a className="cm-siteback" href="/">← Inicio</a>
          <a className="cm-join-btn" href="/#registro">Unirme gratis →</a>
        </div>
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
        <div>
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
                <span><strong>5 clases disponibles</strong> · La primera es gratis</span>
              </div>
              {CLASES.map(c => (
                <div key={c.num} className="cm-clase-card">
                  <div className="cm-clase-left">
                    <span className="cm-clase-num">{c.num}</span>
                    <div>
                      <div className="cm-clase-title">{c.title}</div>
                      <div className="cm-clase-dur">⏱ {c.dur}</div>
                    </div>
                  </div>
                  {c.free
                    ? <span className="cm-clase-badge free">Gratis</span>
                    : <span className="cm-clase-badge locked">🔒 Miembros</span>
                  }
                </div>
              ))}
              <div className="cm-lock-hint">
                <p className="cm-lock-hint-text">Regístrate gratis para desbloquear todas las clases</p>
                <a className="cm-lock-hint-btn" href="/#registro">Acceder gratis →</a>
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
