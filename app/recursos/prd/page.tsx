import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'El PRD que uso antes de buildear — Guía 04 · Nico IA',
  description: '1 prompt + 1 template + 3 reglas. Lo que uso antes de escribir el primer prompt de una app. El filtro que te ahorra construir mierda.',
}

const toc = [
  { id: 'que-es', label: 'Qué es un PRD y por qué lo necesitás' },
  { id: 'prompt', label: 'Pieza 01 · El prompt de entrevista' },
  { id: 'template', label: 'Pieza 02 · El template en blanco' },
  { id: 'reglas', label: 'Las 3 reglas que no podés romper' },
  { id: 'secciones', label: 'Las 8 secciones · en una línea cada una' },
]

const secciones = [
  { n: '01', title: 'Qué es la app', desc: 'Una frase. Si necesitás un párrafo, todavía no lo tenés claro.' },
  { n: '02', title: 'Para quién es', desc: 'Edad, qué hace todo el día, qué usa hoy, cuánto pagaría.' },
  { n: '03', title: 'Qué problema resuelve', desc: 'Dolor concreto, con número. No "es difícil organizarse".' },
  { n: '04', title: 'Cómo lo resuelve hoy sin tu app', desc: 'El workaround actual. Lo que tu app reemplaza.' },
  { n: '05', title: 'Qué hace tu app diferente', desc: 'Qué hace tu app que nadie más hace. UNA cosa, no una lista.' },
  { n: '06', title: 'Los 3 flujos principales', desc: 'Máximo 3. Happy path + 2 secundarios. Si tenés más, sobra.' },
  { n: '07', title: 'Qué NO hace la app', desc: 'Lo que la app no hace. Mínimo 3 cosas, escritas a propósito.' },
  { n: '08', title: 'Cómo medís el éxito', desc: '1-2 métricas concretas a 30 días. No "más usuarios".' },
]

const reglas = [
  {
    n: '01',
    title: 'Si tu PRD entero cabe en una pantalla, está bien',
    body: 'Si necesitás scroll, todavía no lo entendés. El PRD no es burocracia. Es el filtro que te ahorra construir mierda que nadie va a usar. Comprimí hasta que entre en una pantalla sin scroll.',
  },
  {
    n: '02',
    title: 'Cada vez que querés añadir una feature, preguntate: ¿entra en mi sección de los 3 flujos principales?',
    body: 'Si no entra, no va en v1. El PRD no es un documento de deseos. Es una restricción. Lo que no está en el PRD no existe hasta que el PRD se actualice deliberadamente.',
  },
  {
    n: '03',
    title: 'El PRD no es para nadie más. Es para vos.',
    body: 'No lo escribas para impresionar a un inversor ni para compartirlo en LinkedIn. Es el filtro que te ahorra construir mierda. Si lo escribís pensando en cómo suena, lo estás escribiendo mal.',
  },
]

const promptInterview = `Eres una PM senior con 10 años de experiencia lanzando productos digitales
que realmente usa la gente. Tengo una idea de app y necesito que me hagas las
preguntas correctas para convertirla en un PRD de una sola página.

Eres directa, te importan los detalles y no aceptas respuestas vagas.

REGLAS DE LA CONVERSACIÓN:
› Hazme UNA pregunta a la vez. No varias en el mismo mensaje.
› Si mi respuesta es vaga, repreguntas hasta que sea específica.
› Si ves que estoy tomando una decisión típica de founders que fracasan, me lo decís.
› Me retás.

TEMAS A CUBRIR (en este orden, uno por mensaje):
1. Qué es la app en una sola frase.
2. Para quién es exactamente. Un arquetipo, no varios.
3. Qué problema concreto resuelve.
4. Cómo lo resuelve hoy esa persona sin mi app (el workaround actual).
5. Qué hace mi app diferente. Una sola cosa, no diez features.
6. Los 3 flujos principales del usuario.
7. Qué NO va a hacer la app (lo que descarto a propósito).
8. Cómo sabré en 30 días que la app funciona. 1-2 métricas concretas.

Empezá con la pregunta 1.`

const templatePRD = `# PRD · [Nombre de la app]
Versión: 1.0 · Fecha: [fecha]

## Qué es
[Una frase. Si necesitás más de una frase, todavía no lo tenés claro.]

## Para quién
[Arquetipo: rol + dolor + cuánto pagaría. Ej: "Freelance de diseño que
pierde 4 horas a la semana copiando datos entre Notion y Sheets."]

## Problema que resuelve
[Dolor concreto con número. No "es difícil organizarse".]

## Cómo lo resuelven hoy (sin tu app)
[El workaround actual. Lo que tu app reemplaza.]

## Qué hace diferente (UNA sola cosa)
[Una frase. No una lista de features.]

## Los 3 flujos principales
1. [Happy path — el 80% de los usuarios]
2. [Flujo secundario 1]
3. [Flujo secundario 2]

## Qué NO hace la app
- [Feature excluida a propósito]
- [Feature excluida a propósito]
- [Feature excluida a propósito]

## Éxito a 30 días
- [Métrica 1 concreta]
- [Métrica 2 concreta]

## Stack técnico
- Frontend: [framework]
- Backend: [servicio]
- DB: [base de datos]
- Auth: [proveedor]
- Hosting: [plataforma]`

export default function PrdPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-geist-sans), sans-serif !important; background: #0C0A07 !important; color: #EDE8DC; min-height: 100vh; -webkit-font-smoothing: antialiased; }
        body::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); background-size: 180px 180px; pointer-events: none; z-index: 1000; opacity: 0.4; }
        :root { --copper: #C87533; --copper-dim: rgba(200,117,51,0.12); --copper-glow: rgba(200,117,51,0.28); --amber: #E8A84E; --cream: #EDE8DC; --cream-dim: #998E82; --bg: #0C0A07; --bg2: #141009; --bg3: #1C160C; --border: rgba(200,117,51,0.15); --border-mid: rgba(200,117,51,0.28); --border-bright: rgba(200,117,51,0.45); }

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

        .gc-reglas { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
        .gc-regla { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
        .gc-regla-n { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); margin-bottom: 8px; }
        .gc-regla-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 8px; line-height: 1.4; }
        .gc-regla-body { font-size: 13px; color: var(--cream-dim); line-height: 1.7; }

        .gc-secciones { display: flex; flex-direction: column; gap: 0; margin: 16px 0; }
        .gc-seccion { display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--border); }
        .gc-seccion:last-child { border-bottom: none; }
        .gc-seccion-n { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 700; color: var(--copper); flex-shrink: 0; width: 28px; }
        .gc-seccion-content {}
        .gc-seccion-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 3px; }
        .gc-seccion-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.55; }

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
          <div className="gc-kicker">Guía · Producto</div>
          <div className="gc-pill">El PRD que uso antes de buildear</div>
          <h1 className="gc-h1">
            El PRD que uso antes<br />
            de buildear <em>cualquier app.</em>
          </h1>
          <p className="gc-intro">
            Esta guía no es un curso. Son <strong>2 piezas</strong>: un prompt para que Claude te entreviste como una PM senior y te saque el PRD él mismo, y un template en blanco por si preferís llenarlo a mano.
          </p>
          <div className="gc-meta-row">
            <span>— 1 prompt de entrevista</span>
            <span>— 1 template completo</span>
            <span>— 3 reglas que no podés romper</span>
          </div>
        </div>

        <div className="gc-stats">
          <div className="gc-stat">
            <div className="gc-stat-num">1</div>
            <div className="gc-stat-label">prompt de entrevista</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">8</div>
            <div className="gc-stat-label">secciones en el template</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">1p</div>
            <div className="gc-stat-label">si cabe en más, falta claridad</div>
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
          <div className="gc-section-kicker">Por qué existe</div>
          <h2 className="gc-h2">El filtro que te ahorra<br /><em>buildear mierda.</em></h2>
          <div className="gc-body">
            <p>
              Un PRD (Product Requirements Document) es un documento de una sola página que define qué construís, para quién, qué problema resuelve y qué no va a hacer. Si tu PRD entero cabe en una pantalla, está bien. Si necesitás scroll, todavía no lo entendés.
            </p>
            <p>
              El PRD no es burocracia. Es el filtro que te ahorra construir mierda que nadie va a usar. Lo uso antes de escribir el primer prompt de cualquier app.
            </p>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Cómo funciona esta guía</div>
            <div className="gc-tip-body">
              Pegá el prompt de entrevista en un chat nuevo de Claude. Claude empezará a hacerte preguntas una por una. Respondé con honestidad. Si te suelta una repregunta brusca, está funcionando. Al terminar, pedile que lo arme en el template.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="prompt">
          <div className="gc-section-kicker">Pieza 01 · El prompt</div>
          <h2 className="gc-h2">El prompt de<br /><em>entrevista PM senior</em></h2>
          <div className="gc-body">
            <p>
              Pegalo entero en un chat nuevo de Claude (idealmente dentro de un Project con tu contexto). Claude empezará a hacerte la pregunta 1. Respondé con honestidad. Si te suelta una repregunta brusca, está funcionando.
            </p>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Las reglas de conversación y el orden de las preguntas</div>
            <div className="gc-tip-body">
              Son lo que hace que Claude te trate como una PM senior y no como un cliente. No las modifiques. Si las cambiás, Claude se vuelve amable en lugar de útil.
            </div>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">prompt · entrevista PRD</span>
            </div>
            <pre>{promptInterview}</pre>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="template">
          <div className="gc-section-kicker">Pieza 02 · El template</div>
          <h2 className="gc-h2">Si preferís llenarlo<br /><em>a mano.</em></h2>
          <div className="gc-body">
            <p>
              Si tenés claro lo que querés construir y preferís saltarte la entrevista, abrí este template y llenalo. 8 secciones, una pantalla.
            </p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">template · PRD-v1.md</span>
            </div>
            <pre>{templatePRD}</pre>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="secciones">
          <div className="gc-section-kicker">Las 8 secciones</div>
          <h2 className="gc-h2">En una línea<br /><em>cada una.</em></h2>
          <div className="gc-body">
            <p>Una por una. Si no podés responder alguna en una línea, esa sección todavía no está clara.</p>
          </div>
          <div className="gc-secciones">
            {secciones.map(s => (
              <div key={s.n} className="gc-seccion">
                <span className="gc-seccion-n">{s.n}</span>
                <div className="gc-seccion-content">
                  <div className="gc-seccion-title">{s.title}</div>
                  <div className="gc-seccion-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="reglas">
          <div className="gc-section-kicker">Las 3 reglas</div>
          <h2 className="gc-h2">Aunque usés el prompt y el template,<br />si rompés alguna de estas <em>3 reglas</em>…</h2>
          <div className="gc-body">
            <p>
              El PRD se convierte en otra cosa: una wishlist, un deck, un brainstorm. Pero ya no un filtro.
            </p>
          </div>
          <div className="gc-reglas">
            {reglas.map(r => (
              <div key={r.n} className="gc-regla">
                <div className="gc-regla-n">Regla {r.n}</div>
                <div className="gc-regla-title">{r.title}</div>
                <div className="gc-regla-body">{r.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>PRD listo.<br /><em>A buildear.</em></h3>
          <p>
            El PRD define qué construís. El siguiente paso es montar<br />
            tu propio agente de IA que vive dentro de tu Mac.
          </p>
          <a href="/recursos/hermes" className="gc-btn-primary">Guía 05 · Hermes →</a>
        </div>

      </div>
    </>
  )
}
