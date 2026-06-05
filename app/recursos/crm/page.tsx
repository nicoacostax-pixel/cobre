import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'CRM con bot calificador — Guía 10 · Nico IA',
  description: 'Qué es, las 4 piezas que lleva, cómo se ve corriendo de verdad, y cuánto cuesta la IA por debajo (desde $8/mes). El mapa completo, sin equipo.',
}

const toc = [
  { id: 'que-es', label: 'Qué es un CRM con bot calificador' },
  { id: 'piezas', label: 'Las 4 piezas que lo componen' },
  { id: 'flujo', label: 'Cómo funciona · el flujo real' },
  { id: 'pieza-1', label: 'Pieza 01 · Base de datos de leads' },
  { id: 'pieza-2', label: 'Pieza 02 · Formulario de entrada' },
  { id: 'pieza-3', label: 'Pieza 03 · Bot calificador con IA' },
  { id: 'pieza-4', label: 'Pieza 04 · Automatización y alertas' },
  { id: 'costos', label: 'Cuánto cuesta — desde $8/mes' },
  { id: 'prompt', label: 'El prompt del bot calificador' },
]

const piezas = [
  {
    n: '01', name: 'Base de datos de leads',
    desc: 'Dónde viven todos los leads con su estado, puntuación y conversaciones. Notion o Airtable son las opciones más simples de conectar con IA.',
    opciones: ['Notion · gratis hasta 1000 registros, fácil de conectar con Claude', 'Airtable · más potente para automatizaciones, plan gratis sirve para empezar', 'Google Sheets · la más simple, ideal si ya la usás para todo'],
  },
  {
    n: '02', name: 'Formulario de entrada',
    desc: 'Cómo entra el lead al sistema. Puede ser un formulario, un DM de Instagram, un email, o un link de Calendly.',
    opciones: ['Typeform · experiencia conversacional, engancha mejor', 'Tally · gratis, sin límites, conecta con Notion directo', 'Instagram DM · integración con ManyChat o Manychat'],
  },
  {
    n: '03', name: 'Bot calificador con IA',
    desc: 'El componente de IA que analiza el lead, hace preguntas de calificación, asigna una puntuación y decide si pasa a la siguiente etapa.',
    opciones: ['Claude API · mejor para seguir conversaciones largas y complejas', 'GPT-4o · más económico en volumen alto', 'Claude via Claude.ai Projects · sin código si el volumen es bajo'],
  },
  {
    n: '04', name: 'Automatización y alertas',
    desc: 'Qué pasa cuando el bot califica un lead. El lead caliente va automáticamente al pipeline, vos recibís una alerta y el lead recibe un email de seguimiento.',
    opciones: ['n8n · sin límites de automatizaciones, self-hosted gratis', 'Make · más fácil de configurar, plan gratis con 1000 ops/mes', 'Zapier · más caro pero el más fácil si nunca usaste automatizaciones'],
  },
]

const costos = [
  { item: 'Base de datos (Notion free)', mensual: '$0', nota: 'Hasta 1000 leads. Cuando escales: $8/mes.' },
  { item: 'Formulario (Tally free)', mensual: '$0', nota: 'Ilimitado en el plan gratuito.' },
  { item: 'Claude API (Haiku)', mensual: '$0.25-2', nota: 'Depende del volumen. 1000 leads al mes cuesta ~$0.50.' },
  { item: 'Automatización (n8n cloud)', mensual: '$0-8', nota: 'Self-hosted es gratis. Cloud desde $8/mes.' },
  { item: 'Total mínimo', mensual: '$0-8', nota: 'Hasta 1000 leads al mes. Todo gratis si lo hosteas vos.' },
  { item: 'Total a escala (5000 leads)', mensual: '$15-25', nota: 'Notion pro + Claude + n8n cloud.' },
]

const etapas = [
  { etapa: 'NUEVO', color: '#4A3D30', desc: 'El lead acaba de entrar. El bot todavía no lo habló.' },
  { etapa: 'CALIFICANDO', color: '#C87533', desc: 'El bot está en conversación activa con el lead.' },
  { etapa: 'CALIFICADO', color: '#3D7A6E', desc: 'Puntuación >= threshold. Listo para que vos lo tomes.' },
  { etapa: 'NO CALIFICADO', color: 'rgba(239,68,68,0.7)', desc: 'No cumple los criterios. Se archiva automáticamente.' },
  { etapa: 'EN PROCESO', color: '#E8A84E', desc: 'Vos lo tomaste y estás en conversación.' },
  { etapa: 'CERRADO', color: '#C87533', desc: 'Venta cerrada. Pasa al pipeline de clientes.' },
]

const botPrompt = `Eres un asistente de calificación de leads para [NOMBRE_NEGOCIO].
Tu objetivo es entender si este lead encaja con nuestro servicio y asignarle
una puntuación de 0-100.

SERVICIO QUE OFRECEMOS:
[Describe tu servicio, precio y perfil de cliente ideal]

CRITERIOS DE CALIFICACIÓN:
- Presupuesto disponible (peso: 40%)
- Urgencia del problema (peso: 30%)
- Fit con el perfil de cliente ideal (peso: 30%)

REGLAS DE CONVERSACIÓN:
- Hacé UNA pregunta por mensaje
- Nunca mencionés precios ni hacés promesas
- Sé amable pero directo
- Si el lead da señales claras de no calificar (ej: presupuesto muy bajo),
  terminá la conversación con gracia

PREGUNTAS EN ORDEN:
1. ¿Qué resultado específico estás buscando lograr?
2. ¿Cuánto tiempo llevas con este problema?
3. ¿Cuál es tu presupuesto aproximado para resolverlo?
4. ¿Cuándo necesitás tener esto resuelto?

AL TERMINAR LA CONVERSACIÓN:
Respondé con un JSON:
{
  "score": 0-100,
  "calificado": true/false,
  "razon": "una frase explicando la puntuación",
  "siguiente_paso": "qué hacer con este lead"
}`

export default function CrmPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-geist-sans), sans-serif !important; background: #0C0A07 !important; color: #EDE8DC; min-height: 100vh; -webkit-font-smoothing: antialiased; }
        body::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); background-size: 180px 180px; pointer-events: none; z-index: 1000; opacity: 0.4; }
        :root { --copper: #C87533; --copper-dim: rgba(200,117,51,0.12); --copper-glow: rgba(200,117,51,0.28); --amber: #E8A84E; --cream: #EDE8DC; --cream-dim: #998E82; --bg: #0C0A07; --bg2: #141009; --bg3: #1C160C; --border: rgba(200,117,51,0.15); --border-mid: rgba(200,117,51,0.28); }

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

        .gc-piezas { display: flex; flex-direction: column; gap: 12px; margin: 20px 0; }
        .gc-pieza { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 22px; }
        .gc-pieza-top { display: flex; align-items: center; gap: 14px; margin-bottom: 10px; }
        .gc-pieza-n { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 700; color: var(--copper); line-height: 1; text-shadow: 0 0 16px var(--copper-glow); flex-shrink: 0; }
        .gc-pieza-name { font-size: 15px; font-weight: 600; color: var(--cream); line-height: 1.2; }
        .gc-pieza-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.7; margin-bottom: 14px; }
        .gc-pieza-opciones { display: flex; flex-direction: column; gap: 6px; }
        .gc-pieza-opcion { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: var(--cream-dim); line-height: 1.55; }
        .gc-pieza-opcion-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--copper); flex-shrink: 0; margin-top: 5px; }

        .gc-flujo { display: flex; flex-direction: column; gap: 0; margin: 16px 0; }
        .gc-flujo-step { display: flex; align-items: flex-start; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--border); }
        .gc-flujo-step:last-child { border-bottom: none; }
        .gc-flujo-n { font-family: 'DM Mono', monospace; font-size: 10px; color: #4A3D30; flex-shrink: 0; width: 22px; margin-top: 2px; }
        .gc-flujo-content {}
        .gc-flujo-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 3px; }
        .gc-flujo-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

        .gc-etapas { display: grid; gap: 8px; margin: 16px 0; }
        @media(min-width:560px) { .gc-etapas { grid-template-columns: 1fr 1fr; } }
        .gc-etapa { display: flex; align-items: flex-start; gap: 12px; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; }
        .gc-etapa-badge { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 3px; padding: 2px 8px; flex-shrink: 0; font-weight: 600; }
        .gc-etapa-desc { font-size: 12px; color: var(--cream-dim); line-height: 1.55; }

        .gc-costos { display: flex; flex-direction: column; gap: 0; margin: 16px 0; }
        .gc-costo { display: flex; align-items: baseline; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border); }
        .gc-costo:last-child { border-bottom: none; border-top: 1px solid var(--border-mid); padding-top: 16px; margin-top: 4px; }
        .gc-costo-item { font-size: 14px; color: var(--cream-dim); flex: 1; }
        .gc-costo-item strong { color: var(--cream); }
        .gc-costo-precio { font-family: 'DM Mono', monospace; font-size: 13px; color: var(--copper); flex-shrink: 0; margin: 0 16px; }
        .gc-costo-nota { font-size: 12px; color: #4A3D30; flex-shrink: 0; max-width: 200px; text-align: right; }

        .gc-code { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow-x: auto; margin: 20px 0; }
        .gc-code-header { display: flex; align-items: center; padding: 10px 18px; border-bottom: 1px solid var(--border); }
        .gc-code-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; }
        .gc-code pre { font-family: 'DM Mono', monospace; font-size: 12.5px; line-height: 1.8; color: var(--cream-dim); white-space: pre-wrap; word-break: break-word; padding: 18px 20px; }

        .gc-tip { background: var(--bg2); border: 1px solid var(--border); border-left: 2px solid var(--copper); border-radius: 10px; padding: 16px 20px; margin: 20px 0; }
        .gc-tip.warn { border-left-color: var(--amber); }
        .gc-tip-head { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--copper); margin-bottom: 7px; }
        .gc-tip.warn .gc-tip-head { color: var(--amber); }
        .gc-tip-body { font-size: 13.5px; color: var(--cream-dim); line-height: 1.7; }
        .gc-tip-body strong { color: var(--cream); }

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
          <div className="gc-kicker">Guía · Negocio</div>
          <div className="gc-pill">Un CRM con bot que califica leads solo</div>
          <h1 className="gc-h1">
            La guía básica para montar<br />
            tu CRM con bot<br />
            <em>calificador.</em>
          </h1>
          <p className="gc-intro">
            Qué es, las <strong>4 piezas</strong> que lleva, cómo se ve corriendo de verdad, y cuánto cuesta la IA por debajo (desde $8/mes). El mapa completo, sin equipo.
          </p>
          <div className="gc-meta-row">
            <span>— 4 piezas</span>
            <span>— sin equipo</span>
            <span>— desde $8/mes</span>
          </div>
        </div>

        <div className="gc-stats">
          <div className="gc-stat">
            <div className="gc-stat-num">4</div>
            <div className="gc-stat-label">piezas del sistema</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">$8</div>
            <div className="gc-stat-label">costo mínimo/mes</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">0</div>
            <div className="gc-stat-label">personas en el equipo</div>
          </div>
        </div>

        <div className="gc-toc">
          <div className="gc-toc-title">El recorrido ↓</div>
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
          <div className="gc-section-kicker">Qué es</div>
          <h2 className="gc-h2">Un CRM con bot<br /><em>calificador.</em></h2>
          <div className="gc-body">
            <p>
              Un CRM (Customer Relationship Manager) es donde guardás a tus leads: quiénes son, de dónde vinieron, en qué etapa del proceso están. El problema con los CRMs tradicionales es que alguien tiene que leer cada lead y decidir si vale la pena.
            </p>
            <p>
              Un <strong>bot calificador</strong> automatiza esa decisión. Cuando entra un lead, el bot hace las preguntas de calificación, analiza las respuestas, asigna una puntuación, y solo te interrumpe cuando el lead es bueno. Los leads malos desaparecen solos del pipeline principal.
            </p>
            <p>
              Resultado: vos solo hablás con leads que ya tienen presupuesto, urgencia y fit. Cero tiempo en leads que no van a ningún lado.
            </p>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Cuándo tiene sentido montarlo</div>
            <div className="gc-tip-body">
              Si recibís más de 5 consultas por semana y el 60%+ no son clientes potenciales reales, este sistema te ahorra horas. Si recibís menos, con un Notion simple alcanza.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="piezas">
          <div className="gc-section-kicker">Las 4 piezas</div>
          <h2 className="gc-h2">El mapa completo<br /><em>del sistema.</em></h2>
          <div className="gc-body">
            <p>4 piezas. Cada una tiene alternativas según tu presupuesto y tolerancia técnica. Podés empezar con las opciones gratuitas y escalar.</p>
          </div>
          <div className="gc-piezas">
            {piezas.map(p => (
              <div key={p.n} className="gc-pieza">
                <div className="gc-pieza-top">
                  <span className="gc-pieza-n">{p.n}</span>
                  <span className="gc-pieza-name">{p.name}</span>
                </div>
                <div className="gc-pieza-desc">{p.desc}</div>
                <div className="gc-pieza-opciones">
                  {p.opciones.map(o => (
                    <div key={o} className="gc-pieza-opcion">
                      <span className="gc-pieza-opcion-dot" />
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="flujo">
          <div className="gc-section-kicker">El flujo real</div>
          <h2 className="gc-h2">Cómo funciona<br /><em>de principio a fin.</em></h2>
          <div className="gc-flujo">
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">01</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">Lead llena el formulario</div>
                <div className="gc-flujo-desc">Typeform o Tally captura los datos básicos: nombre, email, empresa, descripción del problema.</div>
              </div>
            </div>
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">02</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">El trigger dispara la automatización</div>
                <div className="gc-flujo-desc">n8n o Make detecta el nuevo lead en el formulario y crea el registro en Notion/Airtable con estado "NUEVO".</div>
              </div>
            </div>
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">03</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">El bot manda el email de calificación</div>
                <div className="gc-flujo-desc">Claude genera un email personalizado con las preguntas de calificación. Le llega al lead en segundos.</div>
              </div>
            </div>
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">04</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">El lead responde</div>
                <div className="gc-flujo-desc">Las respuestas entran por email o formulario de seguimiento. La automatización las procesa.</div>
              </div>
            </div>
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">05</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">Claude califica y asigna puntuación</div>
                <div className="gc-flujo-desc">El prompt del bot analiza todas las respuestas y devuelve un JSON con score, calificado/no, y razon.</div>
              </div>
            </div>
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">06</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">Actualiza el CRM y (si califica) te avisa</div>
                <div className="gc-flujo-desc">El registro en Notion se actualiza con el score. Si score &gt;= threshold, te llega una alerta por Telegram o email.</div>
              </div>
            </div>
          </div>

          <div className="gc-body" style={{ marginTop: 20 }}>
            <p>Los estados del pipeline:</p>
          </div>
          <div className="gc-etapas">
            {etapas.map(e => (
              <div key={e.etapa} className="gc-etapa">
                <span className="gc-etapa-badge" style={{ background: e.color + '22', color: e.color, border: `1px solid ${e.color}44` }}>{e.etapa}</span>
                <span className="gc-etapa-desc">{e.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="costos">
          <div className="gc-section-kicker">Cuánto cuesta</div>
          <h2 className="gc-h2">Desde $0.<br />En serio, <em>desde $8/mes.</em></h2>
          <div className="gc-body">
            <p>El costo real de la IA es más bajo de lo que parece. Claude Haiku para calificación de leads cuesta fracciones de centavo por lead.</p>
          </div>
          <div className="gc-costos">
            {costos.map(c => (
              <div key={c.item} className="gc-costo">
                <span className="gc-costo-item">{c.item === 'Total mínimo' || c.item.startsWith('Total a escala') ? <strong>{c.item}</strong> : c.item}</span>
                <span className="gc-costo-precio">{c.mensual}</span>
                <span className="gc-costo-nota">{c.nota}</span>
              </div>
            ))}
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— El costo real de Claude Haiku</div>
            <div className="gc-tip-body">
              Haiku cuesta $0.25 por millón de tokens de input y $1.25 por millón de output. Una conversación de calificación de 4 preguntas + análisis usa ~2000 tokens. Eso es $0.0005 por lead. Con 1000 leads al mes = $0.50.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="prompt">
          <div className="gc-section-kicker">El prompt del bot</div>
          <h2 className="gc-h2">El system prompt<br /><em>del bot calificador.</em></h2>
          <div className="gc-body">
            <p>Copiá este template, reemplazá los corchetes con tu información, y pegalo en el nodo de Claude en n8n.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">system prompt · bot calificador</span>
            </div>
            <pre>{botPrompt}</pre>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— La parte más importante del prompt</div>
            <div className="gc-tip-body">
              Los criterios de calificación con pesos. Sin eso, Claude califica por intuición. Con pesos explícitos, cada lead recibe la misma evaluación, sin sesgos y sin cansancio.
            </div>
          </div>
        </div>

        <div className="gc-cta">
          <div className="gc-cta-tag">— seguí aprendiendo</div>
          <h3>Sistema montado.<br /><em>Leads calificados solos.</em></h3>
          <p>
            Todas las guías de Nico IA, en un solo lugar.<br />
            Tutoriales para dominar la IA en español, paso a paso.
          </p>
          <a href="/recursos" className="gc-btn-primary">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
