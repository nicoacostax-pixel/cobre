import type { Metadata } from 'next'
import { CopperNav } from '../components/CopperNav'

export const metadata: Metadata = {
  title: 'Guías — Nico IA',
  description: 'Tutoriales para dominar la IA en español, paso a paso.',
}

const guides = [
  {
    num: '01', cat: 'Fundamentos',
    title: 'Tu primer prompt con Claude',
    desc: 'Modelo, instrucciones, tono y formato. El setup que hace que Claude entienda exactamente lo que necesitas desde el primer mensaje.',
    meta: '6 min · ideal para empezar',
    href: '/recursos/01',
  },
  {
    num: '02', cat: 'Negocio',
    title: 'Automatiza tus DMs con Claude',
    desc: 'Cómo liberar 2 horas al día sin contratar a nadie. El sistema de categorías + ManyChat que construí con Claude en una tarde.',
    meta: '8 min · caso real',
    href: '/recursos/02',
  },
  {
    num: '03', cat: 'Producto',
    title: 'Construye tu app con IA',
    desc: 'De la idea al producto completo: Claude para validar, Claude Code para construir, Supabase, Vercel, Stripe y redes sociales para captar usuarios.',
    meta: '20 min · stack completo',
    href: '/recursos/03',
  },
  {
    num: '04', cat: 'Prompts',
    title: 'El archivo que le enseña a Claude tu proyecto',
    desc: 'Cómo hacer un CLAUDE.md que funcione: las 5 secciones, las reglas que sí importan, el template completo y los errores que arruinan el archivo.',
    meta: '10 min · template incluido',
    href: '/recursos/04',
  },
  {
    num: '05', cat: 'Avanzado',
    title: 'Tu propia IA empleada',
    desc: 'Construye un asistente entrenado con tus documentos, tu marca y tus procesos. Sin código. Sin plataformas de pago extra.',
    meta: '10 min de lectura',
    href: null, soon: true,
  },
  {
    num: '06', cat: 'Contenido',
    title: 'Crea 100 posts en una tarde',
    desc: 'Sin After Effects, sin timeline, sin keyframes. Un sistema completo: ideas → guión → imagen → publicación automática.',
    meta: 'setup en 1 tarde · 0€ extra',
    href: null, soon: true,
  },
  {
    num: '07', cat: 'Negocio',
    title: 'Saber qué publica tu competencia antes que ella',
    desc: 'Un agente que vigila 5-10 competidores y te avisa cuando publican algo viral. 15 min de setup con Claude + una herramienta gratuita.',
    meta: '5 pasos · 15 min · 0€ extra',
    href: null, soon: true,
  },
  {
    num: '08', cat: 'Fundamentos',
    title: 'Prompts que funcionan siempre',
    desc: 'La guía completa de técnicas de prompting que realmente funcionan en el día a día. Sin teoría, todo con ejemplos reales.',
    meta: '8 min',
    href: null, soon: true,
  },
]

const catStyle: Record<string, { bg: string; color: string }> = {
  Fundamentos: { bg: 'rgba(200,117,51,0.12)',  color: '#C87533' },
  Negocio:     { bg: 'rgba(61,122,110,0.14)',  color: '#4A9B8A' },
  Contenido:   { bg: 'rgba(232,168,78,0.12)',  color: '#E8A84E' },
  Prompts:     { bg: 'rgba(237,232,220,0.08)', color: '#998E82' },
  Avanzado:    { bg: 'rgba(180,150,80,0.14)',  color: '#C8A84A' },
  Producto:    { bg: 'rgba(61,122,110,0.14)',  color: '#4A9B8A' },
}

export default function RecursosPage() {
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
        .rc-hero {
          position: relative; z-index: 1;
          padding: 64px 24px 52px;
          text-align: center;
          max-width: 640px;
          margin: 0 auto;
        }
        .rc-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #C87533;
          background: rgba(200,117,51,0.12);
          border: 1px solid rgba(200,117,51,0.28);
          border-radius: 4px; padding: 5px 12px;
          margin-bottom: 22px;
        }
        .rc-tag-line { width: 16px; height: 1px; background: #C87533; opacity: 0.7; }
        .rc-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 7vw, 5rem);
          font-weight: 700;
          line-height: 0.96; letter-spacing: -0.02em;
          color: #EDE8DC; margin-bottom: 18px;
        }
        .rc-h1 em { font-style: italic; color: #C87533; }
        .rc-sub {
          font-size: 15px; color: #998E82;
          line-height: 1.75;
        }

        /* ── GRID ── */
        .rc-grid {
          position: relative; z-index: 1;
          max-width: 960px; margin: 0 auto;
          padding: 0 20px 80px;
          display: grid; grid-template-columns: 1fr; gap: 10px;
        }
        @media(min-width: 700px) { .rc-grid { grid-template-columns: 1fr 1fr; } }

        /* ── CARD ── */
        .rc-card {
          background: #141009;
          border-radius: 14px; padding: 24px;
          border: 1px solid rgba(200,117,51,0.15);
          display: flex; flex-direction: column;
          justify-content: space-between; gap: 14px;
          text-decoration: none; color: inherit;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          position: relative; overflow: hidden;
        }
        .rc-card::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(200,117,51,0.06), transparent 60%);
          opacity: 0; transition: opacity 0.3s; pointer-events: none;
        }
        .rc-card:hover { border-color: rgba(200,117,51,0.4); box-shadow: 0 0 28px rgba(200,117,51,0.08); transform: translateY(-2px); }
        .rc-card:hover::before { opacity: 1; }
        .rc-card.soon { opacity: 0.42; cursor: default; border-style: dashed; }
        .rc-card.soon:hover { border-color: rgba(200,117,51,0.15); box-shadow: none; transform: none; }

        .rc-card-top { display: flex; align-items: center; justify-content: space-between; }
        .rc-num {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em;
          color: #4A3D30; text-transform: uppercase;
        }
        .rc-num.soon-label { color: rgba(200,117,51,0.4); }
        .rc-cat {
          font-family: 'DM Mono', monospace;
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          border-radius: 3px; padding: 3px 9px;
        }
        .rc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 600;
          line-height: 1.2; color: #EDE8DC;
          margin: 10px 0 6px;
        }
        .rc-card.soon .rc-title { color: #4A3D30; }
        .rc-desc { font-size: 13px; color: #998E82; line-height: 1.7; flex: 1; }

        .rc-card-bot {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 6px; padding-top: 14px;
          border-top: 1px solid rgba(200,117,51,0.1);
        }
        .rc-meta {
          font-family: 'DM Mono', monospace;
          font-size: 10px; color: #4A3D30;
          letter-spacing: 0.06em;
        }
        .rc-read {
          font-family: 'DM Mono', monospace;
          font-size: 11px; font-weight: 500;
          color: #C87533; letter-spacing: 0.06em;
          transition: color 0.2s;
        }
        .rc-card:hover .rc-read { color: #E8A84E; }
        .rc-soon-lbl {
          font-family: 'DM Mono', monospace;
          font-size: 10px; color: #4A3D30;
          letter-spacing: 0.08em; text-transform: uppercase;
        }

        /* ── BIG NUM ── */
        .rc-card-num-bg {
          position: absolute; bottom: -8px; right: 12px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem; font-weight: 700;
          color: rgba(200,117,51,0.06);
          line-height: 1; pointer-events: none;
          user-select: none;
        }
      `}</style>

      <CopperNav activeHref="/recursos" />

      <div className="rc-hero">
        <div className="rc-tag">
          <span className="rc-tag-line" />
          biblioteca de nico
          <span className="rc-tag-line" />
        </div>
        <h1 className="rc-h1">Las <em>guías</em>.</h1>
        <p className="rc-sub">
          Tutoriales para dominar la IA en español, paso a paso.<br />
          Acceso libre para todos los suscriptores.
        </p>
      </div>

      <div className="rc-grid">
        {guides.map((g) => {
          const style = catStyle[g.cat] ?? catStyle.Fundamentos
          const inner = (
            <>
              <div>
                <div className="rc-card-top">
                  <span className={`rc-num${g.soon ? ' soon-label' : ''}`}>
                    {g.soon ? 'PRÓXIMAMENTE' : `GUÍA Nº ${g.num}`}
                  </span>
                  <span className="rc-cat" style={{ background: style.bg, color: style.color }}>{g.cat}</span>
                </div>
                <div className="rc-title">{g.title}</div>
                <p className="rc-desc">{g.desc}</p>
              </div>
              <div className="rc-card-bot">
                <span className="rc-meta">{g.meta}</span>
                {g.soon
                  ? <span className="rc-soon-lbl">EN CAMINO</span>
                  : <span className="rc-read">LEER →</span>
                }
              </div>
              <span className="rc-card-num-bg">{g.num}</span>
            </>
          )

          return g.href ? (
            <a key={g.num} href={g.href} className="rc-card">{inner}</a>
          ) : (
            <div key={g.num} className={`rc-card${g.soon ? ' soon' : ''}`}>{inner}</div>
          )
        })}
      </div>
    </>
  )
}
