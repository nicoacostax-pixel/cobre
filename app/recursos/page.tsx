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
  Fundamentos: '#ede8f8',
  Negocio:     '#e8f8ef',
  Contenido:   '#fce8ef',
  Prompts:     '#fff8e1',
  Avanzado:    '#e8edf8',
}
const catText: Record<string, string> = {
  Fundamentos: '#574088',
  Negocio:     '#1a6640',
  Contenido:   '#8a2a4a',
  Prompts:     '#7a5800',
  Avanzado:    '#1a3a8a',
}

export default function RecursosPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Poppins:wght@700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#FDFAE6;color:#1a1a1a;min-height:100vh;-webkit-font-smoothing:antialiased}

        /* nav */
        .rc-nav{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid rgba(124,92,191,.1);background:#FDFAE6}
        .rc-logo{font-family:'Poppins',sans-serif;font-style:normal;font-weight:900;font-size:18px;color:#574088;text-decoration:none}
        .rc-nav-back{display:flex;align-items:center;gap:6px;font-size:13px;color:#aaa;text-decoration:none;font-weight:500;transition:color .2s}
        .rc-nav-back:hover{color:#7C5CBF}

        /* hero */
        .rc-hero{padding:56px 24px 48px;text-align:center;max-width:640px;margin:0 auto}
        .rc-pill{display:inline-flex;align-items:center;gap:6px;background:white;border:1.5px solid #e8e0f8;border-radius:999px;padding:6px 16px;font-size:11px;font-weight:700;color:#7C5CBF;letter-spacing:.06em;text-transform:uppercase;margin-bottom:20px}
        .rc-dot{width:7px;height:7px;border-radius:50%;background:#7C5CBF}
        .rc-h1{font-size:3rem;font-weight:900;line-height:1.05;letter-spacing:-.025em;margin-bottom:16px;font-family:'Poppins',sans-serif}
        .rc-sp{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;color:#7C5CBF}
        .rc-sub{font-size:15px;color:#888;line-height:1.75}

        /* grid */
        .rc-grid{max-width:900px;margin:0 auto;padding:0 20px 80px;display:grid;grid-template-columns:1fr;gap:14px}
        @media(min-width:700px){.rc-grid{grid-template-columns:1fr 1fr}}

        /* card */
        .rc-card{background:white;border-radius:20px;padding:26px;border:1px solid #f0ecff;display:flex;flex-direction:column;justify-content:space-between;gap:16px;transition:box-shadow .2s,transform .2s;text-decoration:none;color:inherit}
        .rc-card:hover{box-shadow:0 8px 32px rgba(124,92,191,.12);transform:translateY(-2px)}
        .rc-card.soon{border-style:dashed;opacity:.65;cursor:default}
        .rc-card.soon:hover{box-shadow:none;transform:none}
        .rc-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
        .rc-num{font-size:11px;font-weight:700;letter-spacing:.1em;color:#ccc;text-transform:uppercase}
        .rc-cat{border-radius:999px;padding:4px 12px;font-size:11px;font-weight:700;letter-spacing:.04em}
        .rc-title{font-family:'Poppins',sans-serif;font-size:1.2rem;font-weight:700;line-height:1.25;color:#7C5CBF;margin:10px 0 8px}
        .rc-card.soon .rc-title{color:#bbb}
        .rc-desc{font-size:13px;color:#777;line-height:1.65;flex:1}
        .rc-card-bot{display:flex;align-items:center;justify-content:space-between;margin-top:8px;padding-top:14px;border-top:1px solid #f5f0ff}
        .rc-meta{font-size:12px;color:#bbb;font-weight:500}
        .rc-read{font-size:13px;font-weight:700;color:#7C5CBF}
        .rc-soon-lbl{font-size:12px;color:#ccc;font-weight:600;letter-spacing:.04em}
      `}</style>

      <nav className="rc-nav">
        <a className="rc-logo" href="/">Nico IA_</a>
        <a className="rc-nav-back" href="/">← Inicio</a>
      </nav>

      <div className="rc-hero">
        <span className="rc-pill"><span className="rc-dot" />biblioteca de nico</span>
        <h1 className="rc-h1">Las <span style={{ color: '#7C5CBF' }}>guías</span> .</h1>
        <p className="rc-sub">Tutoriales para dominar la IA en español, paso a paso.<br />Acceso libre para todos los suscriptores.</p>
      </div>

      <div className="rc-grid">
        {guides.map((g) => (
          g.href ? (
            <a key={g.num} href={g.href} className="rc-card">
              <div>
                <div className="rc-card-top">
                  <span className="rc-num">GUÍA Nº {g.num}</span>
                  <span className="rc-cat" style={{ background: catColor[g.cat] ?? '#f5f0ff', color: catText[g.cat] ?? '#574088' }}>{g.cat}</span>
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
                  <span className="rc-cat" style={{ background: catColor[g.cat] ?? '#f5f0ff', color: catText[g.cat] ?? '#574088' }}>{g.cat}</span>
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
