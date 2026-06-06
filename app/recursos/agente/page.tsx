import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Tu primer Claude que cobra solo — Guía 02 · Nico IA',
  description: 'Las 5 piezas que separan un chat caro de un sistema que factura. Pack de 7 días para montar un agente que entrega trabajo a clientes.',
}

const toc = [
  { id: 'que-es',   label: 'Cómo usar este pack' },
  { id: 'que-hay',  label: 'Las 5 piezas de un agente real' },
  { id: 'dia-1',    label: 'Día 01 · Output' },
  { id: 'dia-2',    label: 'Día 02 · Cerebro' },
  { id: 'dia-3',    label: 'Día 03 · Contexto' },
  { id: 'dia-4',    label: 'Día 04 · Ejecución' },
  { id: 'dia-5',    label: 'Día 05 · Manos' },
  { id: 'dia-6',    label: 'Día 06 · Test' },
  { id: 'dia-7',    label: 'Día 07 · Live' },
  { id: 'bloqueo',  label: 'Si te bloqueás' },
]

const piezas = [
  { n: '01', title: 'Output',    desc: 'Qué entrega tu agente, cuánto cuesta, en cuánto tiempo. Sin esto no hay agente.' },
  { n: '02', title: 'Cerebro',   desc: 'El plan y el modelo correctos. Opus para decidir, Sonnet para producir, Haiku para tareas simples.' },
  { n: '03', title: 'Contexto',  desc: 'Un Project en Claude con 5 archivos .md que enseñan a la IA quién sos y a quién le hablás.' },
  { n: '04', title: 'Ejecución', desc: 'Un SKILL.md que documenta el entregable una vez. Después, Claude lo repite igual cada vez.' },
  { n: '05', title: 'Manos',     desc: 'Stripe, Gmail, Drive, Calendar. Connectors que pasan a Claude de chat a sistema que actúa.' },
]

const specMd = `---
servicio: auditoría de marca en Instagram
precio: 249 USD
entrega: PDF de 8 páginas + loom de 3 min
tiempo: < 10 minutos automático
trigger: link de pago en bio
input cliente: @username de Instagram
output cliente: email con PDF + link al loom
---

# si no podés describir lo que cobra el agente
# en una frase de menos de 15 palabras,
# el output todavía no está claro.`

const archivosKnowledge = `→ about-me.md          — quién sos, contexto profesional
→ servicios.md         — qué ofrecés, precios, plazos
→ tono-de-voz.md       — cómo hablás, qué evitar
→ cliente-ideal.md     — a quién le hablás
→ ejemplos-entregas.md — 2-3 ejemplos reales de tu trabajo
→ system-prompt.md     — va en "Custom Instructions"`

const systemPrompt = `Sos mi asistente personal. Trabajás conmigo, no con
un cliente cualquiera.

## Tu rol

Tu trabajo es producir entregables para mis clientes en mi nombre, con mi
tono, con mi criterio. No sonás como una IA. Sonás como yo. Si dudás entre
sonar técnicamente correcto y sonar como yo, sonás como yo.

## Antes de empezar cualquier tarea

Siempre, sin excepción, leés estos archivos del Project:

1. tono-de-voz.md       — para no usar palabras que delatan IA
2. ejemplos-entregas.md — para imitar mi estilo real
3. cliente-ideal.md     — para saber a quién le hablás
4. servicios.md         — para saber qué cobramos y qué entregamos
5. about-me.md          — para sonar como yo y no como un genérico

Si te falta info de alguno de estos archivos, NO improvises. Preguntame.

## Reglas no negociables

- NO uses estas palabras: "delve", "vital", "crucial", "fundamental",
  "aprovechar" (sentido vago), "desbloquear", "panorama actual",
  "es importante destacar", "cabe mencionar".
- NO inventes datos del cliente. Si te falta un dato, preguntalo.
- NO entregues outputs que parezcan plantillas genéricas.
- NO uses emojis decorativos.

## Cómo respondés

- Frases cortas, párrafos de 1-3 líneas máximo.
- Primera persona del singular.
- Si no estás seguro de algo, lo decís.
- Si te pido algo y creés que estoy equivocado, me lo decís con argumento.`

const skillAuditoria = `---
name: "auditoria-marca"
description: "Audita una cuenta de Instagram y entrega un PDF de 8 páginas
  + un loom de 3 minutos. Activar cuando se pase un @username de IG."
---

# Skill · Auditoría de marca en Instagram

## Inputs que necesitás del cliente

- @username de Instagram (obligatorio)
- Sector o nicho del cliente (obligatorio)
- Objetivo principal de su cuenta (opcional pero útil)

## Pasos del entregable

### 1. Análisis de los últimos 30 posts
- Tipo de contenido, frecuencia, engagement promedio, tono dominante.

### 2. Detección de fricciones · exactamente 5
- 2 visuales (paleta, composición, jerarquía)
- 2 de copy (hooks, CTA, voz)
- 1 estratégica (formato, frecuencia, tema dominante)

### 3. Generar el PDF (8 páginas)
- Pág 1: portada con @username, fecha, resumen en 3 líneas
- Págs 3-7: una página por fricción
- Pág 8: plan de los próximos 30 días en 3 acciones

### 4. Email de entrega
Asunto: Tu auditoría de [@username] · [día/mes]
Cuerpo: máximo 5 líneas, adjunta PDF + link al loom.

## Tiempo objetivo

De pago confirmado a email enviado: menos de 15 minutos.`

const metricas = [
  { metric: 'uptime',          value: '24/7',    desc: 'el agente no descansa' },
  { metric: 'trabajo manual',  value: '0h',      desc: 'si tenés que tocarlo, hay un bug' },
  { metric: 'tiempo entrega',  value: '< 15 min', desc: 'de pago a output' },
  { metric: 'clientes en par.', value: '∞',      desc: 'el cuello de botella ya no sos vos' },
]

const plantillas = [
  { file: 'about-me.md',          purpose: 'Quién sos, qué hacés, cómo trabajás. La base de todo lo que Claude diga en tu nombre.' },
  { file: 'servicios.md',         purpose: 'Cada servicio con precio, plazo y entregable. Lo que el agente ofrece y lo que rechaza.' },
  { file: 'tono-de-voz.md',       purpose: 'Las palabras que usás, las que NO usás. Lo que separa "suena a IA" de "suena a vos".' },
  { file: 'cliente-ideal.md',     purpose: 'A quién atiende y a quién dice no. Define el filtro que aplica el agente.' },
  { file: 'ejemplos-entregas.md', purpose: '2-3 entregas reales que ya hiciste. Lo que más calidad da al output.' },
]

export default function AgentePage() {
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

        .gc-piezas-grid { display: grid; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-piezas-grid { grid-template-columns: 1fr 1fr; } }
        .gc-pieza { display: flex; align-items: baseline; gap: 14px; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; }
        .gc-pieza-n { font-family: 'DM Mono', monospace; font-size: 10px; color: #4A3D30; flex-shrink: 0; }
        .gc-pieza-l { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 3px; }
        .gc-pieza-d { font-size: 12px; color: var(--cream-dim); line-height: 1.5; }

        .gc-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 24px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin: 24px 0; }
        .gc-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; font-style: italic; font-weight: 700; color: var(--copper); line-height: 1; }
        .gc-stat-label { font-size: 12px; color: var(--cream-dim); margin-top: 4px; }

        .gc-preguntas { display: flex; flex-direction: column; gap: 8px; margin: 20px 0; }
        .gc-pregunta { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 18px; display: flex; gap: 12px; align-items: baseline; }
        .gc-pregunta-label { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--copper); flex-shrink: 0; text-transform: uppercase; letter-spacing: 0.08em; }
        .gc-pregunta-text { font-size: 14px; color: var(--cream-dim); line-height: 1.5; }
        .gc-pregunta-text strong { color: var(--cream); }

        .gc-ol { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-ol-item { display: flex; gap: 14px; align-items: baseline; }
        .gc-ol-n { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; color: var(--copper); flex-shrink: 0; }
        .gc-ol-text { font-size: 14px; color: var(--cream-dim); line-height: 1.6; }
        .gc-ol-text strong { color: var(--cream); }

        .gc-plantilla { display: flex; flex-direction: column; gap: 4px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 18px; margin-bottom: 8px; }
        @media(min-width:560px){ .gc-plantilla { flex-direction: row; align-items: baseline; gap: 16px; } }
        .gc-plantilla-name { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; color: var(--copper); flex-shrink: 0; min-width: 160px; }
        .gc-plantilla-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.5; }

        .gc-metricas { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-metricas { grid-template-columns: repeat(4, 1fr); } }
        .gc-metrica { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
        .gc-metrica-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: #4A3D30; margin-bottom: 8px; }
        .gc-metrica-value { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-style: italic; font-weight: 700; color: var(--copper); line-height: 1; margin-bottom: 6px; }
        .gc-metrica-desc { font-size: 11px; color: var(--cream-dim); line-height: 1.4; }

        .gc-connectors { display: flex; flex-direction: column; gap: 8px; margin: 20px 0; }
        .gc-connector { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 18px; }
        .gc-connector-name { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 3px; font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; }
        .gc-connector-desc { font-size: 12px; color: var(--cream-dim); margin-bottom: 4px; }
        .gc-connector-path { font-family: 'DM Mono', monospace; font-size: 10px; color: #4A3D30; }

        .gc-bloqueo { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 12px; }
        .gc-bloqueo-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 8px; }
        .gc-bloqueo-body { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

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
          <div className="gc-kicker">Guía 02 · Pack agente Claude · 2026</div>
          <div className="gc-pill">Setup completo · 7 días · 100% en español</div>
          <h1 className="gc-h1">
            Las 5 piezas que separan<br />
            un chat caro de un sistema<br />
            que <em>factura.</em>
          </h1>
          <p className="gc-intro">
            Si hacés los 7 días en orden, al final del día 7 tenés un agente que entrega trabajo a clientes <strong>sin que vos toques nada.</strong>
          </p>
          <p className="gc-intro">No hace falta que sean 7 días seguidos. Lo importante no es la velocidad. Es <strong>el orden.</strong></p>
          <div className="gc-divider-h" />
        </div>

        {/* STATS */}
        <div className="gc-stats">
          <div>
            <div className="gc-stat-num">5</div>
            <div className="gc-stat-label">Piezas que importan</div>
          </div>
          <div>
            <div className="gc-stat-num">7</div>
            <div className="gc-stat-label">Días con plantilla</div>
          </div>
          <div>
            <div className="gc-stat-num">{'< 15'}min</div>
            <div className="gc-stat-label">De pago a entrega</div>
          </div>
        </div>

        {/* TOC */}
        <div className="gc-toc">
          <div className="gc-toc-title">El recorrido de los 7 días</div>
          <div className="gc-toc-links">
            {toc.map(item => (
              <a key={item.id} href={`#${item.id}`}>{item.label}</a>
            ))}
          </div>
        </div>

        {/* QUÉ ES */}
        <div className="gc-section" id="que-es">
          <div className="gc-section-kicker">Cómo usar este pack</div>
          <h2 className="gc-h2">Esto no es un curso.<br /><em>Es una checklist visual.</em></h2>
          <div className="gc-body">
            <p>Cada día tiene un objetivo claro, una plantilla lista para pegar dentro de Claude, y una regla que <strong>no podés saltarte</strong>. Si hacés los 7 días en orden, al final tenés un agente real que entrega trabajo a clientes mientras dormís.</p>
            <p>Si te saltás un día, el siguiente no funciona.</p>
          </div>
        </div>

        <div className="gc-divider" />

        {/* LAS 5 PIEZAS */}
        <div className="gc-section" id="que-hay">
          <div className="gc-section-kicker">Qué hay dentro</div>
          <h2 className="gc-h2">Las 5 piezas de<br /><em>un agente real.</em></h2>
          <div className="gc-body">
            <p>Antes de empezar, mirá el mapa completo. Cada día construye una de estas piezas. Si te falta una, no es un agente. Es un chat haciéndose el listo.</p>
          </div>
          <div className="gc-piezas-grid">
            {piezas.map(p => (
              <div key={p.n} className="gc-pieza">
                <span className="gc-pieza-n">{p.n}</span>
                <div>
                  <div className="gc-pieza-l">{p.title}</div>
                  <div className="gc-pieza-d">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* DÍA 01 — OUTPUT */}
        <div className="gc-section" id="dia-1">
          <div className="gc-paso-label">Día 01 · Output · Qué cobra el agente</div>
          <h2 className="gc-h2">Definí qué<br /><em>cobra el agente.</em></h2>
          <div className="gc-body">
            <p>Antes de tocar Claude, definí el output. Sin esto no hay agente. Hay un chat haciéndose el listo. La regla más cara que se viola: empezar a configurar antes de saber qué entrega.</p>
          </div>
          <h3 className="gc-h3">Las 5 preguntas que tenés que responder hoy</h3>
          <div className="gc-preguntas">
            {[
              { label: 'Qué', text: <><strong>¿Qué entrega?</strong> Un PDF, un loom, un código, un email. Algo que el cliente pueda recibir y entender en 2 segundos.</> },
              { label: 'Cuánto', text: <><strong>¿Cuánto cobra?</strong> Pon un precio fijo, no por hora. Si dudás: $199-299 USD para empezar.</> },
              { label: 'Cuándo', text: <><strong>¿En cuánto tiempo?</strong> Tiene que poder hacerlo en menos de 15 minutos automático.</> },
              { label: 'Trigger', text: <><strong>¿Quién lo activa?</strong> Un link de pago, un formulario, un email. Algo que el cliente presione.</> },
              { label: 'Input', text: <><strong>¿Qué necesita del cliente?</strong> Idealmente un solo dato: URL, archivo, descripción.</> },
            ].map((item, i) => (
              <div key={i} className="gc-pregunta">
                <span className="gc-pregunta-label">{item.label}</span>
                <span className="gc-pregunta-text">{item.text}</span>
              </div>
            ))}
          </div>
          <h3 className="gc-h3">Plantilla · spec.md</h3>
          <div className="gc-body">
            <p>Pegá esto en un archivo nuevo y completá con tus datos. Si no podés completarlo en 5 minutos, el output todavía no está claro.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">~/agente/spec.md</span>
            </div>
            <pre>{specMd}</pre>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Regla del día 01</div>
            <div className="gc-tip-body">
              Si no podés describir lo que cobra el agente en una frase de menos de 15 palabras, no es un agente todavía. Volvé aquí mañana.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* DÍA 02 — CEREBRO */}
        <div className="gc-section" id="dia-2">
          <div className="gc-paso-label">Día 02 · Cerebro · Plan y modelo</div>
          <h2 className="gc-h2">Plan y modelo<br /><em>correctos.</em></h2>
          <div className="gc-body">
            <p>El error más caro y silencioso es usar el modelo equivocado. Usá Sonnet para todo parece eficiente. Es tirar dinero en las decisiones que importan.</p>
          </div>
          <h3 className="gc-h3">Regla práctica de modelos</h3>
          <div className="gc-preguntas">
            {[
              { label: 'Opus 4.7',   text: 'Si la tarea DECIDE algo: qué cliente atender, si el output está bien, qué precio sugerir.' },
              { label: 'Sonnet 4.6', text: 'Si la tarea PRODUCE volumen: escribir, resumir, traducir, formatear.' },
              { label: 'Haiku 4.5',  text: 'Si la tarea es REPETITIVA y simple: clasificar, extraer un dato.' },
            ].map((item, i) => (
              <div key={i} className="gc-pregunta">
                <span className="gc-pregunta-label" style={{ minWidth: 90 }}>{item.label}</span>
                <span className="gc-pregunta-text">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Regla del día 02</div>
            <div className="gc-tip-body">
              El modelo más caro no es el más caro. El más caro es <strong>el equivocado.</strong>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* DÍA 03 — CONTEXTO */}
        <div className="gc-section" id="dia-3">
          <div className="gc-paso-label">Día 03 · Contexto · Creá el Project</div>
          <h2 className="gc-h2">Creá el Project<br /><em>con tu negocio.</em></h2>
          <div className="gc-body">
            <p>Un Project en Claude es como una carpeta con memoria. Subís archivos una vez y Claude los aplica en cada chat sin volver a explicárselos.</p>
          </div>
          <h3 className="gc-h3">Pasos para hoy (15 min)</h3>
          <div className="gc-ol">
            {[
              { n: '01', text: 'Abrí Claude en la web (claude.ai) → barra lateral izquierda → click en Projects → Create Project.' },
              { n: '02', text: 'Nombre descriptivo: "Agente · [tu servicio]".' },
              { n: '03', text: 'En Project knowledge, click en "Add files" y subí los 5 archivos personalizados (NO subas system-prompt.md aquí).' },
              { n: '04', text: 'En Custom instructions, abrí system-prompt.md, copiá todo el texto y pegalo en el campo.' },
              { n: '05', text: 'Personalizá cada .md con tus datos reales. Sustituí TODO lo que está entre [corchetes]. No dejes placeholders.' },
            ].map(item => (
              <div key={item.n} className="gc-ol-item">
                <span className="gc-ol-n">{item.n}</span>
                <span className="gc-ol-text">{item.text}</span>
              </div>
            ))}
          </div>
          <h3 className="gc-h3">Los 6 archivos del pack</h3>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">Projects / agente / knowledge /</span>
            </div>
            <pre>{archivosKnowledge}</pre>
          </div>
          <h3 className="gc-h3">Las 5 plantillas listas para copiar</h3>
          {plantillas.map(p => (
            <div key={p.file} className="gc-plantilla">
              <span className="gc-plantilla-name">{p.file}</span>
              <span className="gc-plantilla-desc">{p.purpose}</span>
            </div>
          ))}
          <h3 className="gc-h3">El system prompt que va en Custom Instructions</h3>
          <div className="gc-body">
            <p>Este NO se sube como archivo. Se pega directamente en el campo Custom Instructions del Project. Es lo que le dice a Claude <em>cómo</em> usar las 5 plantillas anteriores.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">plantillas / system-prompt.md</span>
            </div>
            <pre>{systemPrompt}</pre>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Regla del día 03</div>
            <div className="gc-tip-body">
              Claude deja de ser un chat genérico. Ya sabe quién sos y a quién le hablás. <strong>Eso lo cambia todo.</strong>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* DÍA 04 — EJECUCIÓN */}
        <div className="gc-section" id="dia-4">
          <div className="gc-paso-label">Día 04 · Ejecución · El Skill del entregable</div>
          <h2 className="gc-h2">El Skill del<br /><em>entregable.</em></h2>
          <div className="gc-body">
            <p>El Project es <em>quién es</em> Claude. El Skill es <em>cómo lo hace</em>. Los dos hacen falta. Sin Skill, Claude improvisa cada vez que ejecuta.</p>
            <p>Un Skill es un archivo SKILL.md con instrucciones paso a paso para producir un entregable. Lo activa una palabra clave. Lo importante: la primera vez lo escribís bien y luego se ejecuta igual <em>siempre.</em></p>
          </div>
          <h3 className="gc-h3">Ejemplo real · skill-auditoria/SKILL.md</h3>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">skill-auditoria / SKILL.md</span>
            </div>
            <pre>{skillAuditoria}</pre>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Cómo se activa</div>
            <div className="gc-tip-body">
              Dentro del Project, escribile a Claude: "ejecuta auditoria-marca para @username". Claude detecta el Skill y sigue los pasos exactos del SKILL.md. Sin improvisar.
            </div>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Regla del día 04</div>
            <div className="gc-tip-body">
              El Skill se escribe <strong>una vez.</strong> Después tu agente entrega exactamente igual cada vez. Eso es lo que te libera el tiempo. No la IA.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* DÍA 05 — MANOS */}
        <div className="gc-section" id="dia-5">
          <div className="gc-paso-label">Día 05 · Manos · Stripe + Gmail + Drive</div>
          <h2 className="gc-h2">Conectá Stripe,<br /><em>Gmail y Drive.</em></h2>
          <div className="gc-body">
            <p>Sin connectors, todo termina en el portapapeles. O sea: seguís haciéndolo a mano. Esto es donde la IA deja de ser chat y empieza a actuar.</p>
          </div>
          <h3 className="gc-h3">Las 4 que necesitás mínimo</h3>
          <div className="gc-connectors">
            {[
              { name: 'Stripe',          desc: 'Genera el link de pago y confirma el cobro.',                                      path: 'Settings → Connectors → Stripe → autorizá con tu cuenta.' },
              { name: 'Gmail',           desc: 'Manda la confirmación al cliente y entrega el output.',                            path: 'Settings → Connectors → Gmail → autorizá con la cuenta desde la que mandás.' },
              { name: 'Google Drive',    desc: 'Guarda automáticamente el PDF y el loom.',                                         path: 'Settings → Connectors → Drive → dá permisos de lectura/escritura.' },
              { name: 'Google Calendar', desc: 'Bloquea hueco si el cliente pide llamada.',                                        path: 'Settings → Connectors → Calendar.' },
            ].map(c => (
              <div key={c.name} className="gc-connector">
                <div className="gc-connector-name">{c.name}</div>
                <div className="gc-connector-desc">{c.desc}</div>
                <div className="gc-connector-path">{c.path}</div>
              </div>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Regla del día 05</div>
            <div className="gc-tip-body">
              Si abrís una app todos los días, conectala. Si no la abrís en una semana, no pierdas el tiempo configurándola hoy. <strong>Empezá por las esenciales.</strong>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* DÍA 06 — TEST */}
        <div className="gc-section" id="dia-6">
          <div className="gc-paso-label">Día 06 · Test · Probalo con un cliente real</div>
          <h2 className="gc-h2">Probalo con<br /><em>un cliente real.</em></h2>
          <div className="gc-body">
            <p>Hoy no se publica. Hoy se rompe. Necesitás un cliente real (puede ser una amiga) que pase de inicio a fin <strong>sin que vos toques nada.</strong></p>
          </div>
          <h3 className="gc-h3">Plan del día</h3>
          <div className="gc-ol">
            {[
              { n: '01', text: 'Elegí a una persona de tu círculo que encaje con tu cliente ideal.' },
              { n: '02', text: 'Ofrecelo gratis o con 50% off "a cambio de feedback brutal".' },
              { n: '03', text: 'Mandale el link de pago. Gratis si querés, pero pasando por Stripe igual.' },
              { n: '04', text: 'Observá el flujo entero sin intervenir. Si se rompe algo, anotalo. No lo arregles en directo.' },
              { n: '05', text: 'Cuando termine, pedile 3 cosas: qué le sobró, qué le faltó, qué le confundió.' },
            ].map(item => (
              <div key={item.n} className="gc-ol-item">
                <span className="gc-ol-n">{item.n}</span>
                <span className="gc-ol-text">{item.text}</span>
              </div>
            ))}
          </div>
          <h3 className="gc-h3">Checklist de cosas que tienen que pasar solas</h3>
          <div className="gc-ol">
            {[
              'Llega el link de pago al cliente.',
              'Stripe procesa el pago (o lo simula si es gratis).',
              'El agente recibe el trigger de "pago confirmado".',
              'Se genera el output en menos de 15 minutos.',
              'Llega un email al cliente con la entrega.',
              'El output queda guardado en Drive.',
              'Vos no tocaste nada en todo el proceso.',
            ].map((item, i) => (
              <div key={i} className="gc-ol-item">
                <span className="gc-ol-n" style={{ color: '#4A3D30' }}>→</span>
                <span className="gc-ol-text">{item}</span>
              </div>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Regla del día 06</div>
            <div className="gc-tip-body">
              Si tuviste que intervenir, no es un agente todavía. Anotá dónde se rompió y volvé al día correspondiente. No pasés al día 07 hasta que pase end-to-end.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* DÍA 07 — LIVE */}
        <div className="gc-section" id="dia-7">
          <div className="gc-paso-label">Día 07 · Live · Ponelo en vivo</div>
          <h2 className="gc-h2">Poné el agente<br /><em>en vivo y a dormir.</em></h2>
          <div className="gc-body">
            <p>Si llegaste hasta acá, lo difícil ya pasó. Hoy es publicar el link y confiar en lo que construiste.</p>
          </div>
          <div className="gc-ol">
            {[
              { n: '01', text: 'Poné el link de pago de Stripe en tu bio de Instagram, en tu LinkedIn, y en tu firma de email.' },
              { n: '02', text: 'Anunciá el servicio en una publicación. Sin promociones agresivas. Solo "esto existe, esto cuesta, esto entrego".' },
              { n: '03', text: 'Configurá una alerta en tu celular cuando entre un pago de Stripe. No para intervenir, para celebrar.' },
              { n: '04', text: 'Activá una review semanal: cada lunes mirá los outputs de la semana anterior y mejorá una cosa del Skill.' },
            ].map(item => (
              <div key={item.n} className="gc-ol-item">
                <span className="gc-ol-n">{item.n}</span>
                <span className="gc-ol-text">{item.text}</span>
              </div>
            ))}
          </div>
          <h3 className="gc-h3">Indicadores de que está bien montado</h3>
          <div className="gc-metricas">
            {metricas.map(m => (
              <div key={m.metric} className="gc-metrica">
                <div className="gc-metrica-label">{m.metric}</div>
                <div className="gc-metrica-value">{m.value}</div>
                <div className="gc-metrica-desc">{m.desc}</div>
              </div>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Regla del día 07</div>
            <div className="gc-tip-body">
              Trabajá mientras dormís. Literal. El cron no descansa. <strong>Vos, sí.</strong>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* SI TE BLOQUEÁS */}
        <div className="gc-section" id="bloqueo">
          <div className="gc-section-kicker">Si te bloqueás</div>
          <h2 className="gc-h2">Lo que se atasca<br /><em>de verdad.</em></h2>
          <div className="gc-body">
            <p>Lo más probable: te atascarás en el día 1 (definir el output) o en el día 5 (connectors). Es normal.</p>
          </div>
          {[
            { title: 'Si te quedás en el día 1', body: 'No tenés claro qué cobrar. Solución: agarrá tu último servicio entregado y descomponelo en pasos. El agente automatiza el más repetitivo. Empezar por el servicio que ya vendés es mucho más fácil que inventar uno nuevo.' },
            { title: 'Si te quedás en el día 4 (Skill)', body: 'Probablemente nunca documentaste cómo entregás. Solución: la próxima vez que lo entregués a mano, grabá un loom contándote a vos mismo cada paso. Después le pedís a Claude que convierta el loom en un SKILL.md. Hecho.' },
            { title: 'Si te quedás en el día 5 (connectors)', body: 'Algo no autoriza. Solución: empezá por Gmail. Si funciona Gmail, el resto suele funcionar. Si no, revisá que tenés la cuenta correcta logueada en el navegador antes de autorizar.' },
          ].map(b => (
            <div key={b.title} className="gc-bloqueo">
              <div className="gc-bloqueo-title">{b.title}</div>
              <div className="gc-bloqueo-body">{b.body}</div>
            </div>
          ))}
          <div className="gc-tip info">
            <div className="gc-tip-head">— Lo más importante</div>
            <div className="gc-tip-body">
              Esto no se hace en 7 días si los 7 días son seguidos y de 12 horas. Se hace en 7 sesiones de 1 hora. Repartidas en 2-3 semanas si hace falta. Lo importante no es la velocidad. Es <strong>el orden.</strong>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Tenés el plano.<br /><em>Ahora montalo con apoyo.</em></h3>
          <p>Esta guía te enseña la estructura. La comunidad te da las plantillas listas, casos reales de gente cobrando con su agente, y soporte directo cuando un día se rompe y no sabés por qué.</p>
          <a href="/recursos" className="gc-btn-primary">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
