import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Tracker de competencia en Instagram — Guía 07 · Nico IA',
  description: 'Un agente que vigila 5-10 competidores en Instagram y te avisa por Telegram cuando publican algo viral. 15 min de setup con Claude Code + Apify.',
}

const toc = [
  { id: 'intro',   label: 'Intro · qué tendrás y qué necesitás' },
  { id: 'paso-1',  label: 'Paso 01 · Generá el PRD' },
  { id: 'paso-2',  label: 'Paso 02 · Ejecutá en Claude Code' },
  { id: 'paso-3',  label: 'Paso 03 · Token de Apify' },
  { id: 'paso-4',  label: 'Paso 04 · Bot de Telegram' },
  { id: 'paso-5',  label: 'Paso 05 · Competidores y prueba' },
  { id: 'debug',   label: 'Si se rompe · los 5 errores típicos' },
  { id: 'costo',   label: 'Costo total y siguiente nivel' },
]

const promptPrd = `# pegalo en claude.ai — no en Claude Code todavía

Genera un PRD para rastrear a mis competidores en Instagram
cuando publiquen un post viral. Incluye: stack en Python o Node,
integración con Apify, base de datos para detectar posts nuevos,
notificaciones por Telegram, lógica de viralidad por views,
cron job cada X horas, manejo de rate limits. Hazme las preguntas
que necesites antes de generarlo.`

const promptClaudeCode = `# pegalo dentro de Claude Code, en la carpeta del PRD

Ejecuta el PRD en este directorio. Muéstrame el plan antes
de cada cambio grande. No instales nada sin avisarme.`

const terminalCmd = `~ terminal
$ cd ruta/a/tu/carpeta
$ claude`

const competidores = `# reemplaza por las cuentas reales de tu nicho
@cuenta1, @cuenta2, @cuenta3, @cuenta4, @cuenta5`

const flujo = [
  { color: 'amber',   title: 'Cron',     sub: 'cada 2h' },
  { color: 'violet',  title: 'Apify',    sub: 'scrapea IG' },
  { color: 'verdigris', title: 'Claude', sub: 'filtra viral' },
  { color: 'copper',  title: 'Telegram', sub: 'te avisa' },
]

const preguntas = [
  { label: 'Umbral viral', value: '"más de 100 mil views"' },
  { label: 'Notificación', value: '"Telegram"' },
  { label: 'Competidores', value: '"empieza con 5"' },
  { label: 'Qué info',     value: '"link, views, hook, tipo"' },
]

const errores = [
  { title: 'Apify devuelve "rate limit exceeded"', fix: 'Estás scrapeando muy seguido. Pedile a Claude Code que suba el cron a 4 horas o que baje el número de competidores a 5. Cualquiera de las dos arregla el problema.' },
  { title: 'Telegram nunca te avisa, aunque hay un post viral', fix: 'El bot no tiene permiso para escribirte. Abrí tu bot en Telegram y mandale "hola". Sin ese primer mensaje desde tu cuenta, Telegram bloquea todos los envíos del bot. Después correlo de nuevo.' },
  { title: 'Claude Code se queda en blanco o "pensando" mucho rato', fix: 'Le falta info para seguir. Decile literalmente: "dime exactamente qué necesitas para seguir". Te va a pedir el dato puntual (token, ruta de archivo, etc.) y arrancás de nuevo.' },
  { title: 'El bot detecta posts viejos como si fueran nuevos', fix: 'La base de datos arrancó vacía. La primera corrida siempre da falsos positivos porque considera "nuevo" todo lo que ve por primera vez. Después de la segunda pasada (2-4 horas), se estabiliza sola. No hagas nada.' },
  { title: 'Llegan alertas pero el "hook" viene vacío o cortado', fix: 'El scraper no captó bien la caption. Pedile a Claude Code: "el campo hook a veces sale vacío, revisa el parsing de la caption en Apify". Suele ser un ajuste de 2 minutos.' },
]

const costos = [
  { name: 'Claude Pro',    meta: 'que ya pagás para el chat',         price: '20 USD/mes', extra: '+0' },
  { name: 'Apify',         meta: 'plan free, alcanza con creces',     price: '0 USD',      extra: '+0' },
  { name: 'Telegram bot',  meta: '100% gratis para siempre',          price: '0 USD',      extra: '+0' },
  { name: 'Servidor / VPS', meta: 'corre en tu propia compu',         price: '0 USD',      extra: '+0' },
]

const siguientesNiveles = [
  { n: 'Nivel 1', desc: 'Que Claude resuma el post viral y te diga por qué está pegando.' },
  { n: 'Nivel 2', desc: 'Que arme un borrador tuyo del mismo tema, en tu voz, listo para revisar.' },
]

export default function TrackerPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-geist-sans), sans-serif !important; background: #0C0A07 !important; color: #EDE8DC; min-height: 100vh; -webkit-font-smoothing: antialiased; }
        body::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); background-size: 180px 180px; pointer-events: none; z-index: 1000; opacity: 0.4; }
        :root { --copper: #C87533; --copper-dim: rgba(200,117,51,0.12); --copper-glow: rgba(200,117,51,0.28); --amber: #E8A84E; --verdigris: #3D7A6E; --cream: #EDE8DC; --cream-dim: #998E82; --bg: #0C0A07; --bg2: #141009; --bg3: #1C160C; --border: rgba(200,117,51,0.15); --border-mid: rgba(200,117,51,0.28); }

        .gc-wrap { max-width: 740px; margin: 0 auto; padding: 0 24px 120px; position: relative; z-index: 1; }
        .gc-header { padding: 48px 0 36px; }
        .gc-kicker { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: #4A3D30; margin-bottom: 20px; }
        .gc-pill { display: inline-flex; align-items: center; gap: 8px; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); background: var(--copper-dim); border: 1px solid var(--border-mid); border-radius: 4px; padding: 5px 12px; margin-bottom: 24px; }
        .gc-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.8rem, 7vw, 4.5rem); font-weight: 700; line-height: 0.97; letter-spacing: -0.02em; color: var(--cream); margin-bottom: 24px; }
        .gc-h1 em { font-style: italic; color: var(--copper); }
        .gc-intro { font-size: 16px; color: var(--cream-dim); line-height: 1.85; margin-bottom: 10px; }
        .gc-intro strong { color: var(--cream); font-weight: 600; }
        .gc-intro em { font-style: italic; color: var(--amber); }
        .gc-divider-h { height: 1px; background: linear-gradient(90deg, transparent, var(--border-mid), transparent); margin: 28px 0; }

        .gc-toc { background: var(--copper-dim); border: 1px solid var(--border-mid); border-radius: 12px; padding: 18px 20px; margin: 0 0 52px; }
        .gc-toc-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); margin-bottom: 10px; }
        .gc-toc-links { display: flex; flex-wrap: wrap; gap: 6px 20px; }
        .gc-toc-links a { font-size: 13px; color: var(--cream-dim); text-decoration: none; transition: color 0.2s; }
        .gc-toc-links a:hover { color: var(--cream); }

        .gc-section { margin-bottom: 72px; scroll-margin-top: 80px; }
        .gc-section-kicker { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--copper); margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
        .gc-section-kicker::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--copper); opacity: 0.7; }
        .gc-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; color: var(--cream); margin-bottom: 20px; }
        .gc-h2 em { font-style: italic; color: var(--copper); }
        .gc-h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 700; color: var(--cream); margin: 24px 0 12px; }
        .gc-body { font-size: 15px; color: var(--cream-dim); line-height: 1.85; }
        .gc-body p { margin-bottom: 14px; }
        .gc-body p:last-child { margin-bottom: 0; }
        .gc-body strong { color: var(--cream); font-weight: 600; }
        .gc-body em { font-style: italic; color: var(--amber); }

        .gc-paso-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--copper); margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
        .gc-paso-label::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--copper); opacity: 0.7; }

        .gc-code { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow-x: auto; margin: 20px 0; }
        .gc-code-header { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-bottom: 1px solid var(--border); }
        .gc-code-dots { display: flex; gap: 5px; }
        .gc-code-dot { width: 10px; height: 10px; border-radius: 50%; }
        .gc-code-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; }
        .gc-code pre { font-family: 'DM Mono', monospace; font-size: 12.5px; line-height: 1.8; color: var(--cream-dim); white-space: pre-wrap; word-break: break-word; padding: 18px 20px; }

        .gc-tip { background: var(--bg2); border: 1px solid var(--border); border-left: 2px solid var(--copper); border-radius: 10px; padding: 16px 20px; margin: 20px 0; }
        .gc-tip.warn { border-left-color: var(--amber); }
        .gc-tip.info { border-left-color: var(--verdigris); }
        .gc-tip-head { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--copper); margin-bottom: 7px; }
        .gc-tip.warn .gc-tip-head { color: var(--amber); }
        .gc-tip.info .gc-tip-head { color: var(--verdigris); }
        .gc-tip-body { font-size: 13.5px; color: var(--cream-dim); line-height: 1.7; }
        .gc-tip-body strong { color: var(--cream); font-weight: 600; }

        .gc-grid-2 { display: grid; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-grid-2 { grid-template-columns: 1fr 1fr; } }
        .gc-grid-4 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-grid-4 { grid-template-columns: repeat(4, 1fr); } }

        .gc-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; }
        .gc-card.accent { border-color: var(--border-mid); background: rgba(200,117,51,0.06); }
        .gc-card-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); margin-bottom: 6px; }
        .gc-card-value { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-style: italic; font-weight: 700; color: var(--cream); }
        .gc-card-body { font-size: 12px; color: var(--cream-dim); line-height: 1.5; margin-top: 4px; }

        .gc-flujo-box { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 24px; margin: 20px 0; }
        .gc-flujo-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; margin-bottom: 16px; }
        .gc-flujo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media(min-width:500px){ .gc-flujo-grid { grid-template-columns: repeat(4, 1fr); } }
        .gc-flujo-item { text-align: center; border: 1px solid var(--border); border-radius: 10px; padding: 12px 8px; }
        .gc-flujo-title { font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 600; color: var(--cream); }
        .gc-flujo-sub { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--cream-dim); margin-top: 4px; }

        .gc-qas { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0; }
        .gc-qa { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; }
        .gc-qa-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); margin-bottom: 6px; }
        .gc-qa-value { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-style: italic; font-weight: 700; color: var(--cream); }

        .gc-lo-que-vas { display: grid; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-lo-que-vas { grid-template-columns: 1fr 1fr; } }
        .gc-ly { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; }
        .gc-ly.accent { border-color: var(--border-mid); background: rgba(200,117,51,0.06); }
        .gc-ly-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); margin-bottom: 10px; }
        .gc-ly-ul { display: flex; flex-direction: column; gap: 6px; }
        .gc-ly-item { display: flex; gap: 8px; font-size: 13px; color: var(--cream-dim); }
        .gc-ly-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--copper); flex-shrink: 0; margin-top: 8px; }

        .gc-ol { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-ol-item { display: flex; gap: 14px; align-items: baseline; }
        .gc-ol-n { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; color: var(--copper); flex-shrink: 0; }
        .gc-ol-text { font-size: 14px; color: var(--cream-dim); line-height: 1.6; }
        .gc-ol-text strong { color: var(--cream); }

        .gc-errores { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
        .gc-error { background: var(--bg2); border: 1px solid var(--border); border-left: 2px solid var(--amber); border-radius: 10px; padding: 16px 20px; }
        .gc-error-header { display: flex; align-items: baseline; gap: 10px; margin-bottom: 8px; }
        .gc-error-num { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 700; color: var(--amber); }
        .gc-error-title { font-size: 14px; font-weight: 600; color: var(--cream); }
        .gc-error-fix { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

        .gc-costos { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin: 20px 0; }
        .gc-costo-row { display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: baseline; padding: 14px 20px; border-bottom: 1px solid var(--border); }
        .gc-costo-row:last-child { border-bottom: none; }
        @media(min-width:500px){ .gc-costo-row { grid-template-columns: 1fr auto auto; } }
        .gc-costo-name { font-size: 14px; font-weight: 600; color: var(--cream); }
        .gc-costo-meta { font-size: 12px; color: #4A3D30; }
        .gc-costo-price { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--cream-dim); }
        .gc-costo-extra { display: none; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; color: var(--verdigris); }
        @media(min-width:500px){ .gc-costo-extra { display: block; } }

        .gc-total-box { background: rgba(61,122,110,0.08); border: 1px solid rgba(61,122,110,0.25); border-radius: 12px; padding: 20px; margin: 16px 0; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .gc-total-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--verdigris); }
        .gc-total-value { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; font-style: italic; font-weight: 700; color: var(--verdigris); }

        .gc-siguiente { display: grid; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-siguiente { grid-template-columns: 1fr 1fr; } }
        .gc-sig { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; }
        .gc-sig-tag { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); margin-bottom: 8px; }
        .gc-sig-body { font-size: 14px; color: var(--cream-dim); line-height: 1.6; }

        .gc-blockquote { border-left: 2px solid var(--border-mid); padding: 16px 20px; margin: 28px 0; }
        .gc-blockquote em { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-style: italic; color: var(--cream-dim); line-height: 1.7; }

        .gc-divider { height: 1px; margin: 60px 0; background: linear-gradient(90deg, transparent, var(--border-mid), transparent); }

        .gc-cta { background: var(--bg2); border: 1px solid var(--border-mid); border-radius: 16px; padding: 40px; text-align: center; margin-top: 24px; }
        .gc-cta-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); margin-bottom: 16px; }
        .gc-cta h3 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: var(--cream); line-height: 1.1; margin-bottom: 12px; }
        .gc-cta h3 em { font-style: italic; color: var(--copper); }
        .gc-cta p { font-size: 14px; color: var(--cream-dim); line-height: 1.75; margin-bottom: 10px; }
        .gc-cta p strong { color: var(--cream); }
        .gc-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: var(--copper); color: var(--cream); padding: 13px 24px; border-radius: 8px; font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; transition: box-shadow 0.2s, opacity 0.2s; margin-top: 24px; }
        .gc-btn-primary:hover { box-shadow: 0 0 32px var(--copper-glow); opacity: 0.9; }
      `}</style>

      <CopperNav activeHref="/recursos" />

      <div className="gc-wrap">

        {/* HEADER */}
        <div className="gc-header">
          <div className="gc-kicker">Guía 07 · Build con Claude · 2026</div>
          <div className="gc-pill">5 pasos · 15 min · 0 USD extra</div>
          <h1 className="gc-h1">
            Tracker de competencia<br />en <em>Instagram.</em>
          </h1>
          <p className="gc-intro">
            Un agente que vigila a tus competidores y te avisa por <strong>Telegram</strong> cuando publican algo viral. Sin tocar una línea de código vos mismo.
          </p>
          <p className="gc-intro">
            15 minutos de setup con Claude Code, Apify y Telegram. <em>Cero servidores. Cero VPS.</em>
          </p>
          <div className="gc-divider-h" />
        </div>

        {/* TOC */}
        <div className="gc-toc">
          <div className="gc-toc-title">El recorrido</div>
          <div className="gc-toc-links">
            {toc.map(item => (
              <a key={item.id} href={`#${item.id}`}>{item.label}</a>
            ))}
          </div>
        </div>

        {/* INTRO */}
        <div className="gc-section" id="intro">
          <div className="gc-section-kicker">Intro</div>
          <h2 className="gc-h2">Qué vas a tener.<br /><em>Y qué necesitás.</em></h2>
          <div className="gc-body">
            <p>Esta guía es un paso a paso real. La idea no es entender de código — es montarlo. Lo único que tenés que hacer es <strong>leer y pegar</strong>. Si te trabás, Claude Code te saca.</p>
          </div>
          <div className="gc-lo-que-vas">
            <div className="gc-ly accent">
              <div className="gc-ly-tag">Qué vas a tener</div>
              <div className="gc-ly-ul">
                {['Un bot vigilando 5-10 competidores', 'Alerta por Telegram cuando publican algo viral', 'Cada alerta incluye: link, views, hook, tipo de contenido'].map((item, i) => (
                  <div key={i} className="gc-ly-item"><div className="gc-ly-dot" /><span>{item}</span></div>
                ))}
              </div>
            </div>
            <div className="gc-ly">
              <div className="gc-ly-tag">Qué necesitás</div>
              <div className="gc-ly-ul">
                {['Claude Pro · 20 USD/mes', 'Claude Code instalado', 'Cuenta gratis en apify.com', 'Bot de Telegram (lo creás en el paso 04)'].map((item, i) => (
                  <div key={i} className="gc-ly-item"><div className="gc-ly-dot" /><span>{item}</span></div>
                ))}
              </div>
            </div>
          </div>
          <h3 className="gc-h3">El flujo, en una imagen</h3>
          <div className="gc-flujo-box">
            <div className="gc-flujo-tag">4 piezas · 0 humanos</div>
            <div className="gc-flujo-grid">
              {flujo.map(f => (
                <div key={f.title} className="gc-flujo-item">
                  <div className="gc-flujo-title">{f.title}</div>
                  <div className="gc-flujo-sub">{f.sub}</div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 20, paddingTop: 16, borderTop: '1px dashed var(--border)', fontSize: 13, color: 'var(--cream-dim)', lineHeight: 1.7 }}>
              Cada 2 horas el cron despierta a Apify, Apify scrapea las cuentas, Claude decide si algo cruza el umbral viral y Telegram te lo manda al teléfono. <em>Vos solo recibís lo que vale la pena mirar.</em>
            </p>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 01 — PRD */}
        <div className="gc-section" id="paso-1">
          <div className="gc-paso-label">Paso 01 · PRD · 5 min</div>
          <h2 className="gc-h2">Generá el<br /><em>PRD.</em></h2>
          <div className="gc-body">
            <p>El PRD es el documento que le decís a Claude Code qué construir. Sin esto, Claude improvisa. Con esto, sabe exactamente qué montar.</p>
            <p>Abrí un chat nuevo en <strong>claude.ai</strong> y pegá este prompt:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">~ prompt-prd.md</span>
            </div>
            <pre>{promptPrd}</pre>
          </div>
          <h3 className="gc-h3">Claude te va a preguntar. Contestá así:</h3>
          <div className="gc-qas">
            {preguntas.map(p => (
              <div key={p.label} className="gc-qa">
                <div className="gc-qa-label">{p.label}</div>
                <div className="gc-qa-value">{p.value}</div>
              </div>
            ))}
          </div>
          <div className="gc-body" style={{ marginTop: 16 }}>
            <p>Cuando termine, vas a tener un PRD largo. Copialo, abrí una carpeta nueva en tu compu (por ejemplo <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>tracker-ig</code>) y guardalo como <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>prd-viral-tracker.md</code>.</p>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Si te entrega el PRD sin preguntar nada</div>
            <div className="gc-tip-body">
              Es porque asumió. Decile literalmente: "hazme las preguntas primero" y volvé a empezar. El PRD bueno sale de tus respuestas, no de adivinanzas.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 02 — CLAUDE CODE */}
        <div className="gc-section" id="paso-2">
          <div className="gc-paso-label">Paso 02 · Claude Code · 3 min</div>
          <h2 className="gc-h2">Ejecutá en<br /><em>Claude Code.</em></h2>
          <div className="gc-body">
            <p>Aquí pasamos del chat al terminal. Claude Code va a leer el PRD y empezar a construir la app entera dentro de tu carpeta.</p>
            <p>Abrí el terminal y entrá en la carpeta donde guardaste el PRD:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">~ terminal</span>
            </div>
            <pre>{terminalCmd}</pre>
          </div>
          <div className="gc-body">
            <p>Una vez dentro, pegale este mensaje exacto:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">~ prompt-claude-code.md</span>
            </div>
            <pre>{promptClaudeCode}</pre>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Por qué este prompt funciona</div>
            <div className="gc-tip-body">
              Le pedís que muestre el plan <strong>antes de actuar</strong>. Eso evita que se ponga a instalar 30 paquetes que no querés. Mantenés el control.
            </div>
          </div>
          <h3 className="gc-h3">Qué va a empezar a pasar</h3>
          <div className="gc-ol">
            {[
              { n: '01', text: 'Claude lee el PRD y te resume qué va a hacer.' },
              { n: '02', text: 'Te pregunta el token de Apify y el de Telegram. Los conseguís en los próximos pasos — podés pausar aquí y volver.' },
              { n: '03', text: <span>Empieza a crear archivos: <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>scraper.js</code>, <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>db.js</code>, <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>notifier.js</code>, etc. Cada uno te lo muestra antes de escribirlo.</span> },
            ].map(item => (
              <div key={item.n} className="gc-ol-item">
                <span className="gc-ol-n">{item.n}</span>
                <span className="gc-ol-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 03 — APIFY */}
        <div className="gc-section" id="paso-3">
          <div className="gc-paso-label">Paso 03 · Apify · 2 min</div>
          <h2 className="gc-h2">Token de<br /><em>Apify.</em></h2>
          <div className="gc-body">
            <p>Apify es lo que va a scrapear Instagram por vos. Gratis hasta cierto volumen — para 5-10 cuentas cada 2 horas, no vas a pagar nada.</p>
          </div>
          <div className="gc-ol">
            {[
              { n: '01', text: <span>Entrá en <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>apify.com</code> y créate una cuenta gratis.</span> },
              { n: '02', text: <span>Click en tu avatar (arriba a la derecha) → <strong>Settings</strong> → <strong>Integrations</strong> → <strong>API tokens</strong>.</span> },
              { n: '03', text: 'Copiá el token, volvé al terminal donde corre Claude Code y pegáselo cuando te lo pida.' },
            ].map(item => (
              <div key={item.n} className="gc-ol-item">
                <span className="gc-ol-n">{item.n}</span>
                <span className="gc-ol-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 04 — TELEGRAM */}
        <div className="gc-section" id="paso-4">
          <div className="gc-paso-label">Paso 04 · Telegram · 2 min</div>
          <h2 className="gc-h2">Bot de<br /><em>Telegram.</em></h2>
          <div className="gc-body">
            <p>Aquí creamos el bot que te va a escribir cuando un competidor publique algo viral. Dos minutos reales.</p>
          </div>
          <div className="gc-ol">
            {[
              { n: '01', text: <span>Abrí Telegram, buscá <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>@BotFather</code> y abrí el chat.</span> },
              { n: '02', text: <span>Escribile <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>/newbot</code>. Te va a pedir un nombre y un username (terminado en <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>_bot</code>).</span> },
              { n: '03', text: 'Copiá el token que te devuelve y pegáselo a Claude Code cuando te lo pida.' },
              { n: '04', text: <span><strong>Importante:</strong> mandale "hola" a tu bot recién creado. Sin ese primer mensaje, Telegram no le da permiso al bot para escribirte.</span> },
            ].map(item => (
              <div key={item.n} className="gc-ol-item">
                <span className="gc-ol-n">{item.n}</span>
                <span className="gc-ol-text">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— El paso donde se traba todo el mundo</div>
            <div className="gc-tip-body">
              Si después <strong>no te llegan las alertas</strong>, casi seguro es porque no le diste el "hola" inicial al bot. Es contraintuitivo, pero es así.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 05 — FINAL */}
        <div className="gc-section" id="paso-5">
          <div className="gc-paso-label">Paso 05 · El final</div>
          <h2 className="gc-h2">Cargá competidores<br /><em>y probá.</em></h2>
          <div className="gc-body">
            <p>Última parte. Le pasás a quién vigilar, hacés una corrida manual de prueba y, si llega la alerta, activás el cron para que corra solo.</p>
            <p>Cuando Claude Code te pida los competidores, pasaselos exactamente así:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">~ competidores.txt</span>
            </div>
            <pre>{competidores}</pre>
          </div>
          <div className="gc-body">
            <p>Después, antes de activar el cron, pedile esto:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">claude code</span>
            </div>
            <pre>{`> "Haz una prueba manual con un competidor antes de poner el cron."`}</pre>
          </div>
          <h3 className="gc-h3">Decisión binaria</h3>
          <div className="gc-grid-2">
            <div className="gc-card accent">
              <div className="gc-card-tag" style={{ color: 'var(--verdigris)' }}>Si llega la alerta</div>
              <div className="gc-card-value" style={{ color: 'var(--verdigris)' }}>Funciona.</div>
              <div className="gc-card-body">Activá el cron job cada 2 horas. Claude Code lo configura por vos — pedíselo.</div>
            </div>
            <div className="gc-card">
              <div className="gc-card-tag" style={{ color: '#E8A84E' }}>Si no llega</div>
              <div className="gc-card-value" style={{ color: '#E8A84E' }}>A debug.</div>
              <div className="gc-card-body">Pasá a la siguiente sección — están los 5 errores más comunes y cómo arreglarlos.</div>
            </div>
          </div>
          <div className="gc-tip info">
            <div className="gc-tip-head">— Una vez activo el cron</div>
            <div className="gc-tip-body">
              Ya no tenés que hacer nada. Cada 2 horas el bot revisa, filtra por viralidad, y si encuentra algo, te avisa por Telegram. Vos solo recibís alertas <em>con valor</em>.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* DEBUG */}
        <div className="gc-section" id="debug">
          <div className="gc-section-kicker">Si se rompe</div>
          <h2 className="gc-h2">Los 5 errores que se rompen<br /><em>siempre.</em></h2>
          <div className="gc-body">
            <p>Si tu error no está aquí, copiá el mensaje entero y pegáselo a Claude Code en el mismo chat donde montaste todo: <em>"esto me tira, qué hago"</em>. Tiene el contexto, sabe qué archivos tocó, y suele arreglarlo en 1-2 turnos.</p>
          </div>
          <div className="gc-errores">
            {errores.map((e, i) => (
              <div key={i} className="gc-error">
                <div className="gc-error-header">
                  <span className="gc-error-num">✕ {String(i + 1).padStart(2, '0')}</span>
                  <span className="gc-error-title">{e.title}</span>
                </div>
                <div className="gc-error-fix">{e.fix}</div>
              </div>
            ))}
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Regla general</div>
            <div className="gc-tip-body">
              Cualquier error: copialo entero, pegáselo a Claude Code en el mismo chat. Ahí está todo el contexto de tu build. No empieces un chat nuevo — perdés el hilo.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* COSTO */}
        <div className="gc-section" id="costo">
          <div className="gc-section-kicker">Costo + cierre</div>
          <h2 className="gc-h2">Costo total<br /><em>por mes.</em></h2>
          <div className="gc-body">
            <p>La gracia de montarlo con Claude Code es que no pagás SaaS de scraping ni de automatización. Reusás lo que ya tenés.</p>
          </div>
          <div className="gc-costos">
            {costos.map(c => (
              <div key={c.name} className="gc-costo-row">
                <div>
                  <div className="gc-costo-name">{c.name}</div>
                  <div className="gc-costo-meta">{c.meta}</div>
                </div>
                <div className="gc-costo-price">{c.price}</div>
                <div className="gc-costo-extra">{c.extra}</div>
              </div>
            ))}
          </div>
          <div className="gc-total-box">
            <div className="gc-total-label">Extra sobre lo que ya pagás</div>
            <div className="gc-total-value">0 USD</div>
          </div>
          <h3 className="gc-h3">Lo que se viene después</h3>
          <div className="gc-siguiente">
            {siguientesNiveles.map(n => (
              <div key={n.n} className="gc-sig">
                <div className="gc-sig-tag">Siguiente · {n.n}</div>
                <div className="gc-sig-body">{n.desc}</div>
              </div>
            ))}
          </div>
          <div className="gc-blockquote">
            <em>"La mayoría espía a su competencia a mano. Yo dejé que un bot lo haga — y me avise cuando vale la pena mirar."</em>
          </div>
        </div>

        {/* CTA */}
        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Tenés el tracker.<br /><em>Ahora aprendé a montar más bots como este.</em></h3>
          <p>Dentro de la comunidad: builds reales en directo, soporte cuando se rompe el primer deploy, y plantillas para automatizar el resto de tu negocio. Casos de gente que ya tiene 3-4 bots corriendo solos.</p>
          <a href="/recursos" className="gc-btn-primary">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}

