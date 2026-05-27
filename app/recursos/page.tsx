import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guías — Nico IA',
  description: 'Tutoriales para dominar la IA en español, paso a paso.',
}

const guides = [
  {
    num: '01',
    cat: 'Fundamentos',
    title: 'Tu primer prompt con Claude',
    desc: 'Modelo, instrucciones, tono y formato. El setup que hace que Claude entienda exactamente lo que necesitas desde el primer mensaje.',
    meta: '· 6 min · ideal para empezar',
    href: '/recursos/01',
  },
  {
    num: '02',
    cat: 'Negocio',
    title: 'Automatiza tus DMs con Claude',
    desc: 'Cómo liberar 2 horas al día sin contratar a nadie. El sistema de categorías + ManyChat que construí con Claude en una tarde.',
    meta: '· 8 min · caso real',
    href: '/recursos/02',
  },
  {
    num: '03',
    cat: 'Contenido',
    title: 'Carruseles que paran el scroll',
    desc: 'Una skill de Claude lista para usar. Hook, setup, contenido, cierre y CTA. 6 tipos de carrusel adaptables a cualquier nicho.',
    meta: '· skill · descarga directa',
    href: null,
    soon: true,
  },
  {
    num: '04',
    cat: 'Prompts',
    title: 'El sistema de instrucciones que funciona',
    desc: '1 prompt + 1 template + 3 reglas. Lo que uso antes de escribir cualquier instrucción. El filtro que te ahorra empezar de cero.',
    meta: '· 1 prompt · 1 template · 3 reglas',
    href: null,
    soon: true,
  },
  {
    num: '05',
    cat: 'Avanzado',
    title: 'Tu propia IA empleada',
    desc: 'Construye un asistente entrenado con tus documentos, tu marca y tus procesos. Sin código. Sin plataformas de pago extra.',
    meta: '· 10 min de lectura',
    href: null,
    soon: true,
  },
  {
    num: '06',
    cat: 'Contenido',
    title: 'Crea 100 posts en una tarde',
    desc: 'Sin After Effects, sin timeline, sin keyframes. Un sistema completo: ideas → guión → imagen → publicación automática.',
    meta: '· setup en 1 tarde · 0€ extra',
    href: null,
    soon: true,
  },
  {
    num: '07',
    cat: 'Negocio',
    title: 'Saber qué publica tu competencia antes que ella',
    desc: 'Un agente que vigila 5-10 competidores y te avisa cuando publican algo viral. 15 min de setup con Claude + una herramienta gratuita.',
    meta: '· 5 pasos · 15 min · 0€ extra',
    href: null,
    soon: true,
  },
  {
    num: '08',
    cat: 'Fundamentos',
    title: 'Prompts que funcionan siempre',
    desc: 'La guía completa de técnicas de prompting que realmente funcionan en el día a día. Sin teoría, todo con ejemplos reales.',
    meta: '· 8 min',
    href: null,
    soon: true,
  },
]

const catColor: Record<string, string> = {
  Fundamentos: 'rgba(255,42,109,.12)',
  Negocio:     'rgba(0,255,128,.1)',
  Contenido:   'rgba(255,100,50,.1)',
  Prompts:     'rgba(255,200,0,.1)',
  Avanzado:    'rgba(100,180,255,.1)',
}
const catText: Record<string, string> = {
  Fundamentos: '#ff6b9d',
  Negocio:     '#00d97e',
  Contenido:   '#ff7043',
  Prompts:     '#ffc500',
  Avanzado:    '#64b5ff',
}

export default function RecursosPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#050505;color:#e0e0e0;min-height:100vh;-webkit-font-smoothing:antialiased}
        body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,42,109,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,42,109,.03) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0}
        :root{--pink:#ff2a6d;--pink-dim:rgba(255,42,109,.15);--pink-glow:rgba(255,42,109,.35);--surface:#0f0f0f;--surface2:#161616;--border:rgba(255,255,255,.06);--border-pink:rgba(255,42,109,.25)}

        /* nav */
        .rc-nav{position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border);background:rgba(5,5,5,.92);backdrop-filter:blur(12px)}
        .rc-logo{font-family:'Poppins',sans-serif;font-weight:900;font-size:18px;color:#fff;text-decoration:none}
        .rc-logo span{color:var(--pink)}
        .rc-nav-back{display:flex;align-items:center;gap:6px;font-size:13px;color:#666;text-decoration:none;font-weight:500;transition:color .2s}
        .rc-nav-back:hover{color:var(--pink)}

        /* hero */
        .rc-hero{position:relative;z-index:1;padding:56px 24px 48px;text-align:center;max-width:640px;margin:0 auto}
        .rc-pill{display:inline-flex;align-items:center;gap:6px;background:var(--pink-dim);border:1px solid var(--border-pink);border-radius:999px;padding:6px 16px;font-size:11px;font-weight:700;color:var(--pink);letter-spacing:.06em;text-transform:uppercase;margin-bottom:20px}
        .rc-dot{width:7px;height:7px;border-radius:50%;background:var(--pink)}
        .rc-h1{font-family:'Poppins',sans-serif;font-size:3rem;font-weight:900;line-height:1.05;letter-spacing:-.025em;margin-bottom:16px;color:#fff}
        .rc-sp{color:var(--pink)}
        .rc-sub{font-size:15px;color:#ccc;line-height:1.75}

        /* grid */
        .rc-grid{position:relative;z-index:1;max-width:900px;margin:0 auto;padding:0 20px 80px;display:grid;grid-template-columns:1fr;gap:14px}
        @media(min-width:700px){.rc-grid{grid-template-columns:1fr 1fr}}

        /* card */
        .rc-card{background:var(--surface);border-radius:20px;padding:26px;border:1px solid var(--border);display:flex;flex-direction:column;justify-content:space-between;gap:16px;transition:border-color .2s,box-shadow .2s,transform .2s;text-decoration:none;color:inherit}
        .rc-card:hover{border-color:var(--border-pink);box-shadow:0 0 32px rgba(255,42,109,.08);transform:translateY(-2px)}
        .rc-card.soon{opacity:.45;cursor:default;border-style:dashed}
        .rc-card.soon:hover{border-color:var(--border);box-shadow:none;transform:none}
        .rc-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
        .rc-num{font-size:11px;font-weight:700;letter-spacing:.1em;color:#444;text-transform:uppercase}
        .rc-cat{border-radius:999px;padding:4px 12px;font-size:11px;font-weight:700;letter-spacing:.04em}
        .rc-title{font-family:'Poppins',sans-serif;font-size:1.2rem;font-weight:700;line-height:1.25;color:var(--pink);margin:10px 0 8px}
        .rc-card.soon .rc-title{color:#444}
        .rc-desc{font-size:13px;color:#ccc;line-height:1.65;flex:1}
        .rc-card-bot{display:flex;align-items:center;justify-content:space-between;margin-top:8px;padding-top:14px;border-top:1px solid var(--border)}
        .rc-meta{font-size:12px;color:#888;font-weight:500}
        .rc-read{font-size:13px;font-weight:700;color:var(--pink)}
        .rc-soon-lbl{font-size:12px;color:#444;font-weight:600;letter-spacing:.04em}
      `}</style>

      <nav className="rc-nav">
        <a className="rc-logo" href="/">Nico <span>IA_</span></a>
        <a className="rc-nav-back" href="/">← Inicio</a>
      </nav>

      <div className="rc-hero">
        <span className="rc-pill"><span className="rc-dot" />biblioteca de nico</span>
        <h1 className="rc-h1">Las <span className="rc-sp">guías</span> .</h1>
        <p className="rc-sub">Tutoriales para dominar la IA en español, paso a paso.<br />Acceso libre para todos los suscriptores.</p>
      </div>

      <div className="rc-grid">
        {guides.map((g) => (
          g.href ? (
            <a key={g.num} href={g.href} className="rc-card">
              <div>
                <div className="rc-card-top">
                  <span className="rc-num">GUÍA Nº {g.num}</span>
                  <span className="rc-cat" style={{ background: catColor[g.cat] ?? 'rgba(255,42,109,.12)', color: catText[g.cat] ?? '#ff6b9d' }}>{g.cat}</span>
                </div>
                <div className="rc-title">{g.title}</div>
                <p className="rc-desc">{g.desc}</p>
              </div>
              <div className="rc-card-bot">
                <span className="rc-meta">{g.meta}</span>
                <span className="rc-read">Leer →</span>
              </div>
            </a>
          ) : (
            <div key={g.num} className={`rc-card${g.soon ? ' soon' : ''}`}>
              <div>
                <div className="rc-card-top">
                  <span className="rc-num">{g.soon ? 'PRÓXIMAMENTE' : `GUÍA Nº ${g.num}`}</span>
                  <span className="rc-cat" style={{ background: catColor[g.cat] ?? 'rgba(255,42,109,.12)', color: catText[g.cat] ?? '#ff6b9d' }}>{g.cat}</span>
                </div>
                <div className="rc-title">{g.title}</div>
                <p className="rc-desc">{g.desc}</p>
              </div>
              <div className="rc-card-bot">
                <span className="rc-meta">{g.meta}</span>
                {g.soon ? <span className="rc-soon-lbl">En camino</span> : <span className="rc-read">Leer →</span>}
              </div>
            </div>
          )
        ))}
      </div>
    </>
  )
}
