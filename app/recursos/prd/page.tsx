import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'El PRD que uso antes de buildear — Guía 04 · Nico IA',
  description: '1 prompt + 1 template + 3 reglas. Lo que uso antes de escribir el primer prompt de una app. El filtro que te ahorra construir lo que nadie va a usar.',
}

const toc = [
  { id: 'intro',    label: 'Por qué este PRD' },
  { id: 'prompt',   label: 'Parte 1 · El prompt' },
  { id: 'template', label: 'Parte 2 · El template en blanco' },
  { id: 'reglas',   label: 'Las 3 reglas' },
]

const prdPrompt = `# cópialo TAL CUAL. no le quites ni una coma.

Vas a ayudarme a escribir el PRD (Product Requirements Document)
de una app que voy a construir con IA.

TU ROL:
Actúa como una Product Manager senior con 10 años de experiencia
que ha lanzado 6 apps y ha matado otras 12 antes de buildearlas.
Eres directa, te importan los detalles y no aceptas respuestas vagas.

REGLAS DE LA CONVERSACIÓN:
› Hazme UNA pregunta a la vez. No varias en el mismo mensaje.
› Si mi respuesta es vaga ("una app de productividad"), repreguntas
  hasta que sea específica ("una app de bloqueo de redes para
  freelancers que cobran por hora y se distraen").
› Si lo que digo es contradictorio, lo señalas.
› Si ves que estoy tomando una decisión típica de founders que
  fracasan (ej: "mi target son todos los profesionales"), me
  lo dices directo.
› No me halagas. No me dices "qué buena idea". Me retas.

TEMAS A CUBRIR (en este orden, uno por mensaje):
1. Qué es la app en una sola frase.
2. Para quién es exactamente. Un arquetipo, no varios.
3. Qué problema concreto resuelve.
4. Cómo lo resuelve hoy esa persona, sin mi app (el "as-is").
5. Qué hace mi app diferente. Una sola cosa, no diez features.
6. Los 3 flujos principales del usuario.
7. Qué NO va a hacer la app (lo que descarto a propósito).
8. Cómo sabré en 30 días que la app funciona. 1-2 métricas
   concretas, no "más usuarios".

AL TERMINAR LAS 8 PREGUNTAS:
Genera el PRD final en Markdown con estas secciones:
# Producto (una frase)
# Usuario objetivo
# Problema
# Solución (la diferenciación)
# Flujos principales (pasos numerados)
# Out of scope
# Métricas de éxito
# Stack técnico recomendado

Empieza ya con la pregunta 1.`

const prdTemplate = `# PRD - [nombre de la app]

## PRODUCTO
[Una frase. Si necesitas un párrafo, todavía no lo tienes claro.]

## USUARIO OBJETIVO
› Edad / etapa profesional:
› Qué hace todo el día:
› Qué herramientas ya usa:
› Cuánto pagaría por resolver esto:

## PROBLEMA
[El dolor concreto. No "es difícil organizarse". Es "pierde 4 horas
a la semana copiando datos entre Notion y Sheets".]

## SOLUCIÓN
[Qué hace tu app que nadie más hace. Una sola cosa. No una lista.]

## FLUJOS PRINCIPALES
1. Happy path (lo que el 80% de usuarios va a hacer)
   › Paso 1
   › Paso 2
   › Paso 3
2. Flujo secundario crítico
3. [máximo 3 flujos. Si tienes más, sobra.]

## OUT OF SCOPE
[Lo que NO hace la app. 3 cosas mínimo.]
›
›
›

## MÉTRICAS DE ÉXITO
› Métrica de uso (ej: 70% de usuarios completa el flujo principal)
› Métrica de negocio (ej: 10 conversiones a paid en 30 días)

## STACK TÉCNICO
› Frontend:
› Backend:
› Base de datos:
› Auth:
› Hosting:`

const reglas = [
  { n: '01', title: 'Cabe en una pantalla.', desc: 'Si tu PRD entero cabe en una pantalla, está bien. Si necesitas scroll, todavía no lo entendés.' },
  { n: '02', title: '¿Entra en "solución"?', desc: 'Cada vez que quieras añadir una feature, preguntate: ¿entra en mi sección de "solución"? Si no, va a "out of scope". Sin excepción.' },
  { n: '03', title: 'Es para vos.', desc: 'El PRD no es para nadie más. Es para vos. Es el filtro que te ahorra construir algo que nadie va a usar.' },
]

const secciones = [
  { label: 'PRODUCTO',         desc: 'Una frase. Si necesitás un párrafo, todavía no lo tenés claro.' },
  { label: 'USUARIO OBJETIVO', desc: 'Edad, qué hace todo el día, qué usa hoy, cuánto pagaría.' },
  { label: 'PROBLEMA',         desc: 'Dolor concreto, con número. No "es difícil organizarse".' },
  { label: 'SOLUCIÓN',         desc: 'Qué hace tu app que nadie más hace. UNA cosa, no una lista.' },
  { label: 'FLUJOS',           desc: 'Máximo 3. Happy path + 2 secundarios. Si tenés más, sobra.' },
  { label: 'OUT OF SCOPE',     desc: 'Lo que NO hace la app. Mínimo 3 cosas, escritas a propósito.' },
  { label: 'MÉTRICAS',         desc: '1-2 métricas concretas a 30 días. No "más usuarios".' },
  { label: 'STACK TÉCNICO',    desc: 'Frontend, Backend, DB, Auth, Hosting. Una decisión por línea.' },
]

export default function PrdPage() {
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

        .gc-reglas { display: flex; flex-direction: column; gap: 12px; margin: 20px 0; }
        .gc-regla { display: flex; gap: 20px; background: var(--bg2); border: 1px solid var(--border); border-left: 2px solid var(--copper); border-radius: 10px; padding: 18px 20px; }
        .gc-regla-n { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-style: italic; font-weight: 700; color: var(--copper); line-height: 1; flex-shrink: 0; }
        .gc-regla-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 4px; }
        .gc-regla-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

        .gc-secciones { display: flex; flex-direction: column; gap: 8px; margin: 20px 0; }
        .gc-seccion { display: flex; flex-direction: column; gap: 4px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 12px 18px; }
        @media(min-width:560px){ .gc-seccion { flex-direction: row; align-items: baseline; gap: 16px; } }
        .gc-seccion-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); flex-shrink: 0; min-width: 140px; }
        .gc-seccion-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.5; }

        .gc-ol { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-ol-item { display: flex; gap: 14px; align-items: baseline; }
        .gc-ol-n { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; color: var(--copper); flex-shrink: 0; }
        .gc-ol-text { font-size: 14px; color: var(--cream-dim); line-height: 1.6; }
        .gc-ol-text strong { color: var(--cream); }

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
          <div className="gc-kicker">Guía 04 · Build log · 2026</div>
          <div className="gc-pill">1 prompt · 1 template · 3 reglas</div>
          <h1 className="gc-h1">
            El <em>PRD</em> que uso antes<br />
            de buildear cualquier <em>app.</em>
          </h1>
          <p className="gc-intro">
            Esto es lo que uso <strong>antes de escribir el primer prompt</strong> de una app. Son 2 piezas: un prompt para que Claude te entreviste como una PM senior y te saque el PRD él mismo, y un template en blanco por si preferís llenarlo a mano.
          </p>
          <p className="gc-intro">
            Empezá por el prompt. <em>Casi siempre alcanza.</em>
          </p>
          <div className="gc-divider-h" />
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

        {/* INTRO */}
        <div className="gc-section" id="intro">
          <div className="gc-section-kicker">Por qué este PRD</div>
          <h2 className="gc-h2">El filtro que te ahorra<br /><em>construir de más.</em></h2>
          <div className="gc-body">
            <p>Esta guía no es un curso. Son <strong>2 piezas</strong>, en este orden:</p>
          </div>
          <div className="gc-ol">
            <div className="gc-ol-item">
              <span className="gc-ol-n">01</span>
              <span className="gc-ol-text">Un prompt para que Claude te entreviste como una PM senior y te saque el PRD él mismo.</span>
            </div>
            <div className="gc-ol-item">
              <span className="gc-ol-n">02</span>
              <span className="gc-ol-text">Un template en blanco por si preferís llenarlo a mano.</span>
            </div>
          </div>
          <div className="gc-body" style={{ marginTop: 16 }}>
            <p>Empezá por el prompt. <em>Casi siempre alcanza.</em> Si te trabás, abrís el template y completás a mano.</p>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— El criterio</div>
            <div className="gc-tip-body">
              Si tu PRD entero <strong>cabe en una pantalla</strong>, está bien. Si necesitás scroll, todavía no lo entendés. El PRD no es burocracia. Es el filtro que te ahorra construir algo que nadie va a usar.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PARTE 1 — EL PROMPT */}
        <div className="gc-section" id="prompt">
          <div className="gc-paso-label">Parte 01 · El prompt · Copialo y pegalo en Claude</div>
          <h2 className="gc-h2">El prompt<br /><em>completo.</em></h2>
          <div className="gc-body">
            <p>Copialo tal cual. <strong>No le quites ni una coma.</strong> Las reglas de conversación y el orden de las preguntas son lo que hace que Claude te trate como una PM y no como un cliente.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">~ prd-prompt.md</span>
            </div>
            <pre>{prdPrompt}</pre>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Cómo usarlo</div>
            <div className="gc-tip-body">
              Pegalo entero en un chat nuevo de Claude (idealmente dentro de un Project con tu contexto). Claude empezará a hacerte la pregunta 1. Respondé con honestidad. Si te suelta una repregunta brusca, está funcionando.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PARTE 2 — EL TEMPLATE */}
        <div className="gc-section" id="template">
          <div className="gc-paso-label">Parte 02 · El template · Si preferís llenarlo a mano</div>
          <h2 className="gc-h2">El esqueleto<br /><em>en blanco.</em></h2>
          <div className="gc-body">
            <p>Si tenés claro lo que querés construir y preferís saltarte la entrevista, abrí este template y completalo. 8 secciones, una pantalla.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">~ prd-template.md</span>
            </div>
            <pre>{prdTemplate}</pre>
          </div>
          <h3 className="gc-h3">Las 8 secciones, en una línea cada una</h3>
          <div className="gc-secciones">
            {secciones.map(s => (
              <div key={s.label} className="gc-seccion">
                <span className="gc-seccion-label">{s.label}</span>
                <span className="gc-seccion-desc">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* LAS 3 REGLAS */}
        <div className="gc-section" id="reglas">
          <div className="gc-section-kicker">Las 3 reglas</div>
          <h2 className="gc-h2">Sin esto, el PRD<br /><em>no sirve para nada.</em></h2>
          <div className="gc-body">
            <p>Aunque uses el prompt y completes el template, si rompés alguna de estas tres reglas el PRD se convierte en otra cosa: una wishlist, un deck, un brainstorm. Pero ya no un filtro.</p>
          </div>
          <div className="gc-reglas">
            {reglas.map(r => (
              <div key={r.n} className="gc-regla">
                <span className="gc-regla-n">{r.n}</span>
                <div>
                  <div className="gc-regla-title">{r.title}</div>
                  <div className="gc-regla-desc">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="gc-tip info">
            <div className="gc-tip-head">— Y ahora</div>
            <div className="gc-tip-body">
              Si esto te sirve, después del primer build <strong>contame</strong>. Si te trabaste en algún paso, también. Las mejores iteraciones de esta guía vienen de gente que lo usó de verdad.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Tenés el PRD.<br /><em>Ahora a buildear con apoyo.</em></h3>
          <p>Dentro de la comunidad: builds reales en directo, soporte cuando se rompe el primer deploy, y plantillas para cada fase (PRD, MVP, landing, lanzamiento). Casos de gente que ya facturó con la primera versión.</p>
          <a href="/recursos" className="gc-btn-primary">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
