import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Tu primer Claude que cobra solo — Guía 02 · Nico IA',
  description: 'Las 5 piezas que separan un chat caro de un sistema que factura. Pack de 7 días para montar un agente que entrega trabajo a clientes.',
}

const toc = [
  { id: 'que-es', label: 'Qué es este pack' },
  { id: 'que-hay', label: 'Qué hay dentro · las 5 piezas' },
  { id: 'dia-1', label: 'Día 01 · Output — qué entrega el agente' },
  { id: 'dia-2', label: 'Día 02 · Cerebro — el modelo correcto' },
  { id: 'dia-3', label: 'Día 03 · Contexto — los 5 archivos del Project' },
  { id: 'dia-4', label: 'Día 04 · Ejecución — la Skill que repite el entregable' },
  { id: 'dia-5', label: 'Día 05 · Manos — los connectors que actúan' },
  { id: 'dia-6', label: 'Día 06 · Test — el agente bajo fuego' },
  { id: 'dia-7', label: 'Día 07 · Live — tu primer cliente real' },
  { id: 'bloqueo', label: 'Si te bloqueas' },
]

const piezas = [
  { n: '01', name: 'Output', desc: 'Qué entrega tu agente, cuánto cuesta, en cuánto tiempo. Sin esto no hay agente.' },
  { n: '02', name: 'Cerebro', desc: 'El plan y el modelo correctos. Opus para decidir, Sonnet para producir, Haiku para tareas simples.' },
  { n: '03', name: 'Contexto', desc: 'Un Project en Claude con 5 archivos .md que enseñan a la IA quién eres y a quién le hablas.' },
  { n: '04', name: 'Ejecución', desc: 'Un SKILL.md que documenta el entregable una vez. Después, Claude lo repite igual cada vez.' },
  { n: '05', name: 'Manos', desc: 'Stripe, Gmail, Drive, Calendar. Connectors que pasan a Claude de chat a sistema que actúa.' },
]

const archivos = [
  { file: 'about-me.md', purpose: 'Quién eres, qué haces, cómo trabajas. La base de todo lo que Claude diga en tu nombre.' },
  { file: 'servicios.md', purpose: 'Cada servicio con precio, plazo y entregable. Lo que el agente ofrece y lo que rechaza.' },
  { file: 'tono-de-voz.md', purpose: 'Las palabras que usas, las que NO usas. Lo que separa "suena a IA" de "suena a ti".' },
  { file: 'cliente-ideal.md', purpose: 'A quién atiende y a quién dice no. Define el filtro que aplica el agente.' },
  { file: 'ejemplos-entregas.md', purpose: '2-3 entregas reales que ya hiciste. Lo que más calidad da al output.' },
]

const dias = [
  {
    id: 'dia-1', n: '01', label: 'DÍA 01 · OUTPUT',
    title: 'Definí qué entrega el agente',
    body: `Antes de tocar Claude, definí el output. Sin esto no hay agente. Hay un chat haciéndose el listo. La regla más cara que se viola: empezar a configurar antes de saber qué entrega.

Las 5 preguntas que tenés que responder hoy:`,
    questions: [
      { q: '¿Qué entrega exactamente?', a: 'Un PDF, un loom, un código, un email. Algo que el cliente pueda recibir y entender en 2 segundos.' },
      { q: '¿Cuánto cobra?', a: 'Poné un precio fijo, no por hora. Si dudás: $199-299 USD para empezar.' },
      { q: '¿En cuánto tiempo?', a: 'Tiene que poder hacerlo en menos de 15 minutos automático.' },
      { q: '¿Cómo lo activa el cliente?', a: 'Un link de pago, un formulario, un email. Algo que el cliente presione.' },
      { q: '¿Qué necesita del cliente?', a: 'Idealmente un solo dato: URL, archivo, descripción.' },
    ],
    code: `servicio: auditoría de Instagram
entrega: PDF de 8 páginas + loom de 3 min
precio: $199 USD (fijo, no por hora)
tiempo: < 10 minutos automático
trigger: link de pago en bio
input cliente: @username de Instagram
output cliente: email con PDF + link al loom

---

# si no puedes describir lo que cobra el agente
# en una frase de menos de 15 palabras,
# el output todavía no está claro.`,
  },
  {
    id: 'dia-2', n: '02', label: 'DÍA 02 · CEREBRO',
    title: 'Elegí el modelo correcto para cada tarea',
    body: `El error más caro y silencioso es usar el modelo equivocado. Sonnet para todo parece eficiente. Es suficiente para los primeros agentes. Si automatizás más de 1 cliente al día, sale a cuenta revisar.`,
    models: [
      { name: 'Opus', role: 'Decide', desc: 'Cuando la tarea define algo: qué cliente atender, si el output está OK, qué precio sugerir.' },
      { name: 'Sonnet', role: 'Produce', desc: 'Cuando la tarea es volumen: escribir, resumir, traducir, formatear.' },
      { name: 'Haiku', role: 'Resuelve', desc: 'Cuando la tarea es simple y repetitiva: clasificar, extraer un dato.' },
    ],
    tip: 'Usá Opus en los pasos donde el agente decide. El modelo más caro no es el más caro. El más caro es usar el equivocado.',
  },
  {
    id: 'dia-3', n: '03', label: 'DÍA 03 · CONTEXTO',
    title: 'Creá el Project con los 5 archivos base',
    body: `Un Project en Claude es como una carpeta con memoria. Subís archivos una vez y Claude los aplica en cada chat sin volver a explicárselos.

Abrí Claude en la web (claude.ai) → barra lateral izquierda → click en "+" → nuevo Project. Después subís los 5 archivos.`,
  },
  {
    id: 'dia-4', n: '04', label: 'DÍA 04 · EJECUCIÓN',
    title: 'Creá el SKILL.md del entregable',
    body: `El Project sabe quién sos. La Skill garantiza que cada output suena exactamente como vos escribirías ese entregable, sin tener que recordárselo cada vez.

La Skill documenta el entregable una vez. Después, Claude lo repite igual en cada activación.`,
    code: `---
name: Auditoría de Instagram
trigger: cuando el cliente pasa un @username con
  instrucción "audita esta cuenta" o similar
---

## Qué entrego
PDF de 8 páginas + loom de 3 minutos.
De pago confirmado a email enviado: menos de 15 minutos.

## Reglas de entrega
✓ Email de entrega: tono cálido, máximo 5 líneas
✓ Asunto del email: claro, sin clickbait
✗ No menciones a otros clientes ni casos genéricos
✗ No prometas resultados específicos`,
  },
  {
    id: 'dia-5', n: '05', label: 'DÍA 05 · MANOS',
    title: 'Conectá las apps que ya usás',
    body: `Sin connectors, Claude se queda en la conversación. Vos seguís copiando y pegando. Con connectors, Claude actúa: lee el email del cliente, genera el PDF, lo manda.

Empezá por las tres que ya usás todos los días.`,
    apps: ['Stripe', 'Gmail', 'Drive', 'Calendar', 'Notion'],
  },
  {
    id: 'dia-6', n: '06', label: 'DÍA 06 · TEST',
    title: 'Probá el agente bajo fuego antes de lanzar',
    body: `Activá el agente vos mismo, como si fueras el cliente. Completá el pago de prueba. Chequeá que el PDF llega. Escuchá el loom. Revisá el email de entrega.

Si algo tarda más de 15 minutos o suena genérico, volvé al día 4 y ajustá el SKILL.md.`,
    tip: 'Un test con datos reales vale más que 10 iteraciones de prompt en el vacío.',
  },
  {
    id: 'dia-7', n: '07', label: 'DÍA 07 · LIVE',
    title: 'Publicá el link y conseguí el primer cliente',
    body: `El agente está configurado, testeado y listo. Hoy publicás el link de pago en tu bio, mandás un email a tu lista, o avisás en tu canal.

El primer cliente revela lo que ningún test revela. Las mejores iteraciones vienen del uso real.`,
    tip: 'No esperés a que sea perfecto. El agente v1 que cobra hoy vale más que el agente v3 que lanzás en tres semanas.',
  },
]

export default function AgentePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: var(--font-geist-sans), sans-serif !important;
          background: #0C0A07 !important;
          color: #EDE8DC; min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }
        body::after {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px 180px; pointer-events: none; z-index: 1000; opacity: 0.4;
        }
        :root {
          --copper: #C87533; --copper-dim: rgba(200,117,51,0.12);
          --copper-glow: rgba(200,117,51,0.28);
          --amber: #E8A84E;
          --cream: #EDE8DC; --cream-dim: #998E82;
          --bg: #0C0A07; --bg2: #141009; --bg3: #1C160C;
          --border: rgba(200,117,51,0.15); --border-mid: rgba(200,117,51,0.28);
          --border-bright: rgba(200,117,51,0.45);
        }

        .gc-wrap { max-width: 740px; margin: 0 auto; padding: 0 24px 120px; position: relative; z-index: 1; }
        .gc-header { padding: 48px 0 44px; }
        .gc-kicker { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: #4A3D30; margin-bottom: 20px; }
        .gc-pill { display: inline-flex; align-items: center; gap: 8px; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); background: var(--copper-dim); border: 1px solid var(--border-mid); border-radius: 4px; padding: 5px 12px; margin-bottom: 24px; }
        .gc-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.8rem, 7vw, 4.5rem); font-weight: 700; line-height: 0.97; letter-spacing: -0.02em; color: var(--cream); margin-bottom: 24px; }
        .gc-h1 em { font-style: italic; color: var(--copper); }
        .gc-intro { font-size: 16px; color: var(--cream-dim); line-height: 1.85; margin-bottom: 28px; }
        .gc-intro strong { color: var(--cream); font-weight: 600; }
        .gc-meta-row { display: flex; flex-wrap: wrap; gap: 20px; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: #4A3D30; }

        .gc-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin: 36px 0; }
        .gc-stat { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; }
        .gc-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 700; color: var(--copper); line-height: 1; text-shadow: 0 0 24px var(--copper-glow); }
        .gc-stat-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; margin-top: 6px; }

        .gc-toc { background: var(--copper-dim); border: 1px solid var(--border-mid); border-radius: 12px; padding: 22px 24px; margin: 0 0 52px; }
        .gc-toc-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); margin-bottom: 14px; }
        .gc-toc-list { list-style: none; display: flex; flex-direction: column; }
        .gc-toc-list li { border-bottom: 1px dashed var(--border); }
        .gc-toc-list li:last-child { border-bottom: none; }
        .gc-toc-list a { display: flex; align-items: baseline; gap: 14px; padding: 10px 0; font-size: 14px; color: var(--cream-dim); text-decoration: none; transition: color 0.2s; }
        .gc-toc-list a:hover { color: var(--cream); }
        .gc-toc-num { font-family: 'DM Mono', monospace; font-size: 10px; color: #4A3D30; flex-shrink: 0; width: 20px; }

        .gc-section { margin-bottom: 72px; }
        .gc-section-kicker { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--copper); margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
        .gc-section-kicker::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--copper); opacity: 0.7; }
        .gc-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; color: var(--cream); margin-bottom: 20px; }
        .gc-h2 em { font-style: italic; color: var(--copper); }
        .gc-body { font-size: 15px; color: var(--cream-dim); line-height: 1.85; }
        .gc-body p { margin-bottom: 14px; }
        .gc-body p:last-child { margin-bottom: 0; }
        .gc-body strong { color: var(--cream); font-weight: 600; }

        .gc-piezas { display: flex; flex-direction: column; gap: 8px; margin: 20px 0; }
        .gc-pieza { display: flex; gap: 18px; align-items: flex-start; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; }
        .gc-pieza-n { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 700; color: var(--copper); flex-shrink: 0; line-height: 1; margin-top: 2px; text-shadow: 0 0 20px var(--copper-glow); }
        .gc-pieza-name { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 5px; }
        .gc-pieza-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.65; }

        .gc-dia { background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; padding: 28px; margin-bottom: 16px; }
        .gc-dia-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--copper); margin-bottom: 10px; }
        .gc-dia-title { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 700; color: var(--cream); margin-bottom: 16px; line-height: 1.2; }
        .gc-dia-body { font-size: 14px; color: var(--cream-dim); line-height: 1.8; white-space: pre-wrap; }

        .gc-questions { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-question { background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; }
        .gc-question-q { font-size: 13px; font-weight: 600; color: var(--cream); margin-bottom: 4px; }
        .gc-question-a { font-size: 12px; color: var(--cream-dim); line-height: 1.6; }

        .gc-models { display: grid; gap: 8px; margin: 16px 0; }
        @media(min-width:560px) { .gc-models { grid-template-columns: repeat(3,1fr); } }
        .gc-model { background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; }
        .gc-model-name { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 700; color: var(--amber); margin-bottom: 2px; }
        .gc-model-role { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); margin-bottom: 8px; }
        .gc-model-desc { font-size: 12px; color: var(--cream-dim); line-height: 1.6; }

        .gc-archivos { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-archivo { display: flex; align-items: flex-start; gap: 12px; background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; }
        .gc-archivo-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--copper); flex-shrink: 0; margin-top: 5px; }
        .gc-archivo-name { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--copper); margin-bottom: 3px; }
        .gc-archivo-desc { font-size: 12px; color: var(--cream-dim); line-height: 1.55; }

        .gc-apps { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0; }
        .gc-app-tag { font-family: 'DM Mono', monospace; font-size: 11px; background: var(--bg3); border: 1px solid var(--border-mid); border-radius: 6px; padding: 5px 12px; color: var(--cream); }

        .gc-code { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow-x: auto; margin: 16px 0; }
        .gc-code-header { padding: 10px 18px; border-bottom: 1px solid var(--border); }
        .gc-code-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; }
        .gc-code pre { font-family: 'DM Mono', monospace; font-size: 12.5px; line-height: 1.8; color: var(--cream-dim); white-space: pre-wrap; word-break: break-word; padding: 18px 20px; }

        .gc-tip { background: var(--bg2); border: 1px solid var(--border); border-left: 2px solid var(--copper); border-radius: 10px; padding: 16px 20px; margin: 20px 0; }
        .gc-tip-head { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--copper); margin-bottom: 7px; }
        .gc-tip-body { font-size: 13.5px; color: var(--cream-dim); line-height: 1.7; }

        .gc-divider { height: 1px; margin: 60px 0; background: linear-gradient(90deg, transparent, var(--border-mid), transparent); }

        .gc-cta { background: var(--bg2); border: 1px solid var(--border-mid); border-radius: 16px; padding: 40px; text-align: center; margin-top: 72px; }
        .gc-cta-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); margin-bottom: 16px; }
        .gc-cta h3 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: var(--cream); line-height: 1.1; margin-bottom: 12px; }
        .gc-cta h3 em { font-style: italic; color: var(--copper); }
        .gc-cta p { font-size: 14px; color: var(--cream-dim); line-height: 1.75; margin-bottom: 28px; }
        .gc-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: var(--copper); color: var(--cream); padding: 13px 24px; border-radius: 8px; font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; transition: box-shadow 0.2s, opacity 0.2s; }
        .gc-btn-primary:hover { box-shadow: 0 0 32px var(--copper-glow); opacity: 0.9; }
      `}</style>

      <CopperNav activeHref="/recursos" />

      <div className="gc-wrap">

        <div className="gc-header">
          <div className="gc-kicker">Guía · Pack agente Claude</div>
          <div className="gc-pill">Setup completo · 7 días · 100% en español</div>
          <h1 className="gc-h1">
            Tu primer <em>Claude</em><br />
            que cobra solo.
          </h1>
          <p className="gc-intro">
            Las <strong>5 piezas</strong> que separan un chat caro de un sistema que factura.
            Si hacés los 7 días en orden, al final del día 7 tenés un agente que entrega trabajo a clientes <em>sin que vos toques nada</em>.
          </p>
          <div className="gc-meta-row">
            <span>— 7 días de ~1h cada uno</span>
            <span>— plantillas listas para pegar</span>
            <span>— accionable hoy</span>
          </div>
        </div>

        <div className="gc-stats">
          <div className="gc-stat">
            <div className="gc-stat-num">5</div>
            <div className="gc-stat-label">piezas que importan</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">7</div>
            <div className="gc-stat-label">días con plantilla</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">&lt;15m</div>
            <div className="gc-stat-label">de pago a entrega</div>
          </div>
        </div>

        <div className="gc-toc">
          <div className="gc-toc-title">El recorrido de los 7 días ↓</div>
          <ol className="gc-toc-list">
            {toc.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>
                  <span className="gc-toc-num">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="gc-section" id="que-es">
          <div className="gc-section-kicker">Cómo usar este pack</div>
          <h2 className="gc-h2">Esto no es un curso.<br /><em>Es una checklist visual.</em></h2>
          <div className="gc-body">
            <p>
              Cada día tiene un objetivo claro, una plantilla lista para pegar dentro de Claude, y una regla que <strong>no podés saltarte</strong>. Si hacés los 7 días en orden, al final tenés un agente real que entrega trabajo a clientes mientras dormís.
            </p>
            <p>
              No hace falta que sean 7 días seguidos. Lo importante no es la velocidad. Es <em>el orden</em>. Si te saltás un día, el siguiente no funciona.
            </p>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="que-hay">
          <div className="gc-section-kicker">Qué hay dentro</div>
          <h2 className="gc-h2">Las 5 piezas<br /><em>de un agente real</em></h2>
          <div className="gc-body">
            <p>
              Antes de empezar, mirá el mapa completo. Cada día construye una de estas piezas. Si te falta una, no es un agente. Es un chat haciéndose el listo.
            </p>
          </div>
          <div className="gc-piezas">
            {piezas.map(p => (
              <div key={p.n} className="gc-pieza">
                <span className="gc-pieza-n">{p.n}</span>
                <div>
                  <div className="gc-pieza-name">{p.name}</div>
                  <div className="gc-pieza-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {dias.map((dia) => (
          <div key={dia.id} className="gc-section" id={dia.id}>
            <div className="gc-section-kicker">{dia.label}</div>
            <h2 className="gc-h2"><em>{dia.title}</em></h2>

            <div className="gc-dia">
              <div className="gc-dia-label">{dia.label}</div>
              <div className="gc-dia-title">{dia.title}</div>
              <div className="gc-dia-body">{dia.body}</div>

              {dia.questions && (
                <div className="gc-questions">
                  {dia.questions.map(q => (
                    <div key={q.q} className="gc-question">
                      <div className="gc-question-q">{q.q}</div>
                      <div className="gc-question-a">{q.a}</div>
                    </div>
                  ))}
                </div>
              )}

              {dia.code && (
                <div className="gc-code" style={{ marginTop: 16 }}>
                  <div className="gc-code-header">
                    <span className="gc-code-title">ejemplo · output.md</span>
                  </div>
                  <pre>{dia.code}</pre>
                </div>
              )}

              {dia.models && (
                <div className="gc-models" style={{ marginTop: 16 }}>
                  {dia.models.map(m => (
                    <div key={m.name} className="gc-model">
                      <div className="gc-model-name">{m.name}</div>
                      <div className="gc-model-role">{m.role}</div>
                      <div className="gc-model-desc">{m.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {dia.id === 'dia-3' && (
                <div className="gc-archivos" style={{ marginTop: 16 }}>
                  {archivos.map(a => (
                    <div key={a.file} className="gc-archivo">
                      <span className="gc-archivo-dot" />
                      <div>
                        <div className="gc-archivo-name">{a.file}</div>
                        <div className="gc-archivo-desc">{a.purpose}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {dia.apps && (
                <div className="gc-apps" style={{ marginTop: 16 }}>
                  {dia.apps.map(a => (
                    <span key={a} className="gc-app-tag">{a}</span>
                  ))}
                </div>
              )}

              {dia.tip && (
                <div className="gc-tip" style={{ marginTop: 16 }}>
                  <div className="gc-tip-head">— La regla</div>
                  <div className="gc-tip-body">{dia.tip}</div>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="gc-divider" />

        <div className="gc-section" id="bloqueo">
          <div className="gc-section-kicker">Si te bloqueás</div>
          <h2 className="gc-h2">Volvé al<br /><em>output del día 1.</em></h2>
          <div className="gc-body">
            <p>
              Si en algún punto el agente no funciona como esperás, el problema casi siempre es el mismo: el output del día 1 no estaba claro del todo.
            </p>
            <p>
              Revisá: ¿el entregable es concreto? ¿el tiempo es menos de 15 minutos? ¿el cliente necesita dar un solo dato para activarlo? Si alguna respuesta es vaga, ahí está el problema.
            </p>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Si no puedes describir lo que cobra el agente</div>
            <div className="gc-tip-body">
              En una frase de menos de 15 palabras, no es un agente todavía. Volvé al día 1 y respondé las 5 preguntas de nuevo con más precisión.
            </div>
          </div>
        </div>

        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>El agente cobra.<br /><em>Vos escalás.</em></h3>
          <p>
            Día 7 completado. Tu agente entrega trabajo mientras dormís.<br />
            La siguiente guía: construí tu app desde un PRD real.
          </p>
          <a href="/recursos/prd" className="gc-btn-primary">Guía 04 · El PRD →</a>
        </div>

      </div>
    </>
  )
}
