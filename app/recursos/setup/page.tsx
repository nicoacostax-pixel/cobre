import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Setup de Claude — Guía 01 · Nico IA',
  description: 'Los 5 pasos que separan un chatbot mediocre de un asistente que sabe quién eres. Plan, modelo, Project, Skills y connectors. Configurado en una tarde.',
}

const toc = [
  { id: 'diagnostico', label: 'Diagnóstico · por qué Claude te da respuestas mediocres' },
  { id: 'paso-1',      label: 'Paso 01 · Plan' },
  { id: 'paso-2',      label: 'Paso 02 · Modelo' },
  { id: 'paso-3',      label: 'Paso 03 · Project' },
  { id: 'paso-4',      label: 'Paso 04 · Skills' },
  { id: 'paso-5',      label: 'Paso 05 · Connect' },
  { id: 'checklist',   label: 'Checklist de 45 minutos' },
]

const pasos = [
  { n: '01', name: 'Plan',    meta: 'elige Pro o Max' },
  { n: '02', name: 'Modelo',  meta: 'Opus · Sonnet · Haiku' },
  { n: '03', name: 'Project', meta: 'tu contexto, siempre' },
  { n: '04', name: 'Skills',  meta: 'tu voz en código' },
  { n: '05', name: 'Connect', meta: 'apps reales · MCP' },
]

const modelos = `Opus 4.7   → estrategia · análisis complejo
Sonnet 4.6 → producción de contenido
Haiku 4.5  → tareas rápidas y repetitivas

# usar el modelo equivocado es el error
# más caro y silencioso que existe`

const archivos = `# carga estos archivos al crear el Project:
→ voz-de-marca.md
→ clientes-ideales.md
→ servicios.md
→ ejemplos-que-funcionan.md
→ plantillas/`

const skillExample = `---
name: "content"
description: "asistente con mi voz,
  mis clientes y mi criterio"
---

# Tono de voz
- directo · cercano · sin corporativismo
- frases cortas · sin tecnicismos
- prohibido: "delve", "vital", "crucial"

# Plantillas
→ post-linkedin.md
→ carrusel-instagram.md
→ email-cliente.md`

const checklist = `# sábado por la tarde · 45 min · una vez

[ ] 10 min → elegir Plan (Pro o Max)
[ ]  2 min → entender los 3 modelos (Opus / Sonnet / Haiku)
[ ] 15 min → escribir tus 4 .md base del Project
[ ] 10 min → crear tu primer Project y subirlos
[ ]  5 min → escribir 1 sola Skill (la más repetitiva)
[ ]  3 min → conectar Gmail · Drive · Calendar

# después: úsalo una semana antes de añadir más`

const tiempoTotal = `# tiempo total
$ setup --completo
→ 45 minutos un sábado por la tarde
→ ROI: cada semana del resto del año`

const planesData = [
  { tag: 'Apenas empezás', name: 'Pro', desc: 'Si nunca configuraste un setup como este. Te sobra para probar el flujo completo y ver si vale la pena escalar.', recommended: false },
  { tag: 'Lo usás todo el día', name: 'Max', desc: 'Si Claude ya es tu herramienta diaria. Más uso, modelos top sin frenos, prioridad en horas pico.', recommended: true },
]

const modelosCards = [
  { name: 'Opus 4.7',   desc: 'Decide. Estrategia, análisis complejo, criterio editorial.' },
  { name: 'Sonnet 4.6', desc: 'Produce. Volumen de contenido, escritura, traducción, formateo.' },
  { name: 'Haiku 4.5',  desc: 'Resuelve. Clasificar, extraer un dato, tareas rápidas y repetitivas.' },
]

const archivosProject = [
  { name: 'voz-de-marca',   desc: 'Cómo hablás. Palabras prohibidas. Frases tipo. 3 ejemplos de tu mejor copy.' },
  { name: 'clientes',       desc: 'Quién te paga, qué problema le resolvés, cómo habla, qué le mueve.' },
  { name: 'servicios',      desc: 'Qué vendés, precios, qué incluye, qué NO incluye.' },
  { name: 'ejemplos',       desc: 'Los 3-5 posts, emails o piezas que mejor te funcionaron. Reales.' },
]

const connectoresEsenciales = ['Gmail', 'Drive', 'Calendar']
const connectoresExtras = ['Notion', 'Slack', 'Figma', 'GitHub', 'Linear', 'Stripe']

export default function SetupPage() {
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

        .gc-paso-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--copper); margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
        .gc-paso-label::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--copper); opacity: 0.7; }

        .gc-pasos-list { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-bottom: 32px; }
        .gc-paso-row { display: flex; align-items: baseline; gap: 20px; padding: 14px 20px; border-bottom: 1px solid var(--border); }
        .gc-paso-row:last-child { border-bottom: none; }
        .gc-paso-num { font-family: 'DM Mono', monospace; font-size: 11px; color: #4A3D30; flex-shrink: 0; }
        .gc-paso-name { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 500; color: var(--cream); flex: 1; }
        .gc-paso-meta { font-family: 'DM Mono', monospace; font-size: 11px; color: #4A3D30; text-align: right; }

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
        .gc-grid-3 { display: grid; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-grid-3 { grid-template-columns: 1fr 1fr 1fr; } }

        .gc-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; }
        .gc-card.highlight { border-color: var(--border-mid); background: rgba(200,117,51,0.06); }
        .gc-card-tag { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: #4A3D30; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
        .gc-card-rec { color: var(--copper); }
        .gc-card-name { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-style: italic; font-weight: 700; color: var(--cream); margin-bottom: 8px; }
        .gc-card-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

        .gc-archivo { display: flex; flex-direction: column; gap: 4px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 18px; margin-bottom: 8px; }
        @media(min-width:560px){ .gc-archivo { flex-direction: row; align-items: baseline; gap: 16px; } }
        .gc-archivo-name { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); flex-shrink: 0; min-width: 120px; }
        .gc-archivo-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.5; }

        .gc-connect-box { background: var(--bg2); border: 1px solid var(--border-mid); border-radius: 14px; padding: 24px; margin: 20px 0; }
        .gc-connect-stat { display: flex; align-items: baseline; gap: 16px; margin-bottom: 16px; }
        .gc-connect-num { font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-style: italic; font-weight: 700; color: var(--copper); line-height: 1; }
        .gc-connect-info { flex: 1; }
        .gc-connect-label { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 4px; }
        .gc-connect-sub { font-size: 13px; color: var(--cream-dim); line-height: 1.5; }
        .gc-connect-sub strong { color: var(--cream); }
        .gc-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .gc-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; color: var(--copper); background: var(--copper-dim); border: 1px solid var(--border-mid); border-radius: 4px; padding: 3px 10px; display: flex; align-items: center; gap: 5px; }
        .gc-tag-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--copper); }
        .gc-tag-extra { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; color: #4A3D30; background: var(--bg3); border: 1px solid var(--border); border-radius: 4px; padding: 3px 10px; }

        .gc-diagnostic-list { display: flex; flex-direction: column; gap: 8px; margin: 20px 0; }
        .gc-diag-item { display: flex; align-items: baseline; gap: 16px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 18px; }
        .gc-diag-n { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; color: #4A3D30; flex-shrink: 0; }
        .gc-diag-text { font-size: 14px; color: var(--cream-dim); }
        .gc-diag-bad { color: #C84040; font-weight: 600; }

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
          <div className="gc-kicker">Guía 01 · Setup completo de Claude · 2026</div>
          <div className="gc-pill">5 pasos · 45 minutos · gratis</div>
          <h1 className="gc-h1">
            Los 5 pasos que separan<br />
            un chatbot mediocre de un<br />
            asistente que sabe <em>quién sos.</em>
          </h1>
          <p className="gc-intro">
            Si los hacés en orden, en <strong>una tarde</strong> tenés Claude configurado para el resto del año. Sin saltarte ninguno. Cada paso desbloquea el siguiente.
          </p>
          <div className="gc-divider-h" />
        </div>

        {/* PASOS RÁPIDOS */}
        <div className="gc-pasos-list">
          {pasos.map(p => (
            <div key={p.n} className="gc-paso-row">
              <span className="gc-paso-num">{p.n}</span>
              <span className="gc-paso-name">{p.name}</span>
              <span className="gc-paso-meta">{p.meta}</span>
            </div>
          ))}
        </div>

        {/* TOC */}
        <div className="gc-toc">
          <div className="gc-toc-title">En esta guía</div>
          <div className="gc-toc-links">
            {toc.map(item => (
              <a key={item.id} href={`#${item.id}`}>{item.label}</a>
            ))}
          </div>
        </div>

        {/* DIAGNÓSTICO */}
        <div className="gc-section" id="diagnostico">
          <div className="gc-section-kicker">Diagnóstico</div>
          <h2 className="gc-h2">La mayoría<br /><em>hace esto.</em></h2>
          <p className="gc-intro">Pregunta de partida: <em>¿por qué Claude me da respuestas mediocres?</em> El patrón se repite siempre.</p>
          <div className="gc-diagnostic-list">
            {[
              { n: '01.', text: 'Abren Claude por primera vez.' },
              { n: '02.', text: 'Escriben un prompt suelto.' },
              { n: '03.', text: 'Reciben algo mediocre.', bad: true },
              { n: '04.', text: 'Asumen que la IA es una mierda.' },
            ].map((item, i) => (
              <div key={i} className="gc-diag-item">
                <span className="gc-diag-n">{item.n}</span>
                <span className="gc-diag-text">
                  {item.bad ? <><span className="gc-diag-bad">Reciben algo mediocre.</span></> : item.text}
                </span>
              </div>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— El problema no es Claude</div>
            <div className="gc-tip-body">
              Es <strong>tu setup</strong>. Sin contexto, sin modelo correcto, sin Skill, sin connectors. Cualquier IA del mercado te va a dar respuestas planas en esas condiciones.
            </div>
          </div>
          <div className="gc-body" style={{ marginTop: 20 }}>
            <p>Lo que vamos a hacer: configurar Claude en 5 pasos. En este orden. <strong>Sin saltarte ninguno.</strong> Cada paso desbloquea el siguiente. Si te saltás uno, rompés la cadena.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">~ tiempo total</span>
            </div>
            <pre>{tiempoTotal}</pre>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 01 — PLAN */}
        <div className="gc-section" id="paso-1">
          <div className="gc-paso-label">Paso 01 · Plan</div>
          <h2 className="gc-h2">Empezá por<br /><em>lo básico.</em></h2>
          <div className="gc-body">
            <p>Antes de tocar nada técnico, decidí qué plan de Claude vas a usar. Esto no es trivial: el plan limita cuántos modelos top podés correr al día, cuántos Projects podés crear, y cuántos connectors vas a poder enchufar.</p>
          </div>
          <div className="gc-grid-2">
            {planesData.map(p => (
              <div key={p.name} className={`gc-card ${p.recommended ? 'highlight' : ''}`}>
                <div className="gc-card-tag">
                  {p.tag}
                  {p.recommended && <span className="gc-card-rec">· recomendado</span>}
                </div>
                <div className="gc-card-name">{p.name}</div>
                <div className="gc-card-desc">{p.desc}</div>
              </div>
            ))}
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Truco</div>
            <div className="gc-tip-body">
              Empezá con <strong>Pro</strong>. Si en una semana de uso real sentís que te quedás corto, subís a Max. Pagar Max sin haber configurado el setup es tirar dinero.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 02 — MODELO */}
        <div className="gc-section" id="paso-2">
          <div className="gc-paso-label">Paso 02 · Modelo</div>
          <h2 className="gc-h2">Opus para pensar.<br /><em>Sonnet para hacer. Haiku para repetir.</em></h2>
          <div className="gc-body">
            <p>Cada modelo de Claude está optimizado para un tipo de tarea. Usar el equivocado es el error más caro y silencioso que existe: tu prompt funciona, pero la respuesta no es la que debería ser.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">choose-your-model.md</span>
            </div>
            <pre>{modelos}</pre>
          </div>
          <div className="gc-grid-3">
            {modelosCards.map(m => (
              <div key={m.name} className="gc-card">
                <div className="gc-card-name" style={{ fontSize: '1.15rem' }}>{m.name}</div>
                <div className="gc-card-desc">{m.desc}</div>
              </div>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Regla</div>
            <div className="gc-tip-body">
              Si usás Opus para una lista de la compra, gastás tokens y tiempo. Si usás Haiku para tu estrategia anual, recibís una respuesta plana. <strong>Cambiá de modelo según la tarea.</strong>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 03 — PROJECT */}
        <div className="gc-section" id="paso-3">
          <div className="gc-paso-label">Paso 03 · Project</div>
          <h2 className="gc-h2">Creá tu primer<br /><em>Project.</em></h2>
          <div className="gc-body">
            <p>Un Project en Claude es como una carpeta con memoria. Subís archivos una vez y Claude los aplica en cada chat sin volver a explicárselos. Sin Project, cada chat empieza de cero. Le explicás todo otra vez. Cada vez.</p>
          </div>
          <div className="gc-grid-2">
            <div className="gc-card">
              <div className="gc-card-tag">Sin Project</div>
              <div className="gc-card-name" style={{ fontSize: '1.1rem' }}>Cada chat empieza de cero</div>
              <div className="gc-card-desc">Le explicás todo otra vez. Cada. Vez.</div>
            </div>
            <div className="gc-card highlight">
              <div className="gc-card-tag">Con Project <span className="gc-card-rec">· recomendado</span></div>
              <div className="gc-card-name" style={{ fontSize: '1.1rem' }}>Ya sabe quién sos</div>
              <div className="gc-card-desc">Empezás donde lo dejaste. Aplica tu contexto siempre.</div>
            </div>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">archivos-base/</span>
            </div>
            <pre>{archivos}</pre>
          </div>
          <h3 className="gc-h3">Qué meter en cada archivo</h3>
          {archivosProject.map(a => (
            <div key={a.name} className="gc-archivo">
              <span className="gc-archivo-name">{a.name}</span>
              <span className="gc-archivo-desc">{a.desc}</span>
            </div>
          ))}
          <div className="gc-tip">
            <div className="gc-tip-head">— Truco</div>
            <div className="gc-tip-body">
              Los archivos no tienen que ser perfectos. Tienen que <strong>existir</strong>. Versión v1 ahora {'>'} versión v3 dentro de tres semanas.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 04 — SKILLS */}
        <div className="gc-section" id="paso-4">
          <div className="gc-paso-label">Paso 04 · Skills</div>
          <h2 className="gc-h2">Las Skills son<br /><em>tu voz en código.</em></h2>
          <div className="gc-body">
            <p>El Project guarda <strong>el contexto</strong>. La Skill guarda <strong>cómo te comportás con ese contexto</strong>. Project = tu archivo. Skill = tu manual de instrucciones. Sin Skill, Claude improvisa cada vez que ejecuta.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">content / SKILL.md</span>
            </div>
            <pre>{skillExample}</pre>
          </div>
          <div className="gc-grid-2" style={{ marginTop: 24 }}>
            <div className="gc-card">
              <div className="gc-card-tag">Sin Skills</div>
              <div className="gc-card-name" style={{ fontSize: '1.1rem', color: '#4A3D30' }}>Suena a IA.</div>
              <div className="gc-card-desc">Claude improvisa cada vez que ejecuta. No tiene manual.</div>
            </div>
            <div className="gc-card highlight">
              <div className="gc-card-tag">Con Skills</div>
              <div className="gc-card-name" style={{ fontSize: '1.1rem' }}>Suena a vos.</div>
              <div className="gc-card-desc">Cada output suena exactamente como escribirías ese entregable, sin tener que recordárselo cada vez.</div>
            </div>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Truco</div>
            <div className="gc-tip-body">
              Empezá con <strong>UNA sola</strong> skill: la más repetitiva. Si hacés carruseles cada semana → <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>carrusel.md</code> primero. Escalá después.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 05 — CONNECT */}
        <div className="gc-section" id="paso-5">
          <div className="gc-paso-label">Paso 05 · Connect</div>
          <h2 className="gc-h2">Conectá tus<br /><em>apps reales.</em></h2>
          <div className="gc-body">
            <p>Sin connectors, Claude se queda en la conversación. Seguís copiando y pegando entre Claude y tus apps. Con connectors, Claude actúa: lee tu email, agenda en tu calendario, escribe en tu Notion.</p>
          </div>
          <div className="gc-connect-box">
            <div className="gc-connect-stat">
              <div className="gc-connect-num">80%</div>
              <div className="gc-connect-info">
                <div className="gc-connect-label">Empezá por las esenciales.</div>
                <div className="gc-connect-sub">El 80% de tu trabajo diario pasa por <strong>Gmail · Drive · Calendar</strong>. Empezá por ahí.</div>
              </div>
            </div>
            <div className="gc-tags">
              {connectoresEsenciales.map(c => (
                <span key={c} className="gc-tag"><span className="gc-tag-dot" />{c}</span>
              ))}
            </div>
          </div>
          <h3 className="gc-h3">Cuando tengas tiempo, sumá las que usás todos los días</h3>
          <div className="gc-tags" style={{ marginTop: 12 }}>
            {connectoresExtras.map(c => (
              <span key={c} className="gc-tag-extra">{c}</span>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Regla</div>
            <div className="gc-tip-body">
              Si abrís una app todos los días, conectala. Si no la abrís en una semana, no pierdas el tiempo configurándola hoy. <strong>Empezá por las esenciales.</strong>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* CHECKLIST */}
        <div className="gc-section" id="checklist">
          <div className="gc-section-kicker">Checklist</div>
          <h2 className="gc-h2">45 minutos.<br /><em>Un sábado por la tarde.</em></h2>
          <div className="gc-body">
            <p>Configúralo este finde. Una vez hecho, Claude sabe quién sos el resto del año.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">checklist-setup.md</span>
            </div>
            <pre>{checklist}</pre>
          </div>
          <div className="gc-tip info">
            <div className="gc-tip-head">— Lo más importante</div>
            <div className="gc-tip-body">
              Esto no se hace en 45 minutos si son de interrupción en interrupción. Son 45 minutos de foco. Cerrá las notificaciones, abrí Claude, y seguí el orden exacto.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>El setup está.<br /><em>Ahora usalo de verdad.</em></h3>
          <p>La comunidad es para aprender IA desde cero y montar tus primeras automatizaciones, paso a paso y en español. Ahí construís la base que necesitás para sacarle el máximo.</p>
          <p>Siguiente guía: cómo convertir Claude en un <strong>agente que cobra solo.</strong></p>
          <a href="/recursos/agente" className="gc-btn-primary">Guía 02 · El agente →</a>
        </div>

      </div>
    </>
  )
}
