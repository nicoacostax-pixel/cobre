import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Construye tu app con IA — Guía 03 · Nico IA',
  description: 'De la idea al producto completo: Claude, Claude Code, Supabase, Vercel, Stripe y usuarios reales. El stack completo para lanzar en días.',
}

export default function Guia03Page() {
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
          background-size: 180px 180px;
          pointer-events: none; z-index: 1000; opacity: 0.4;
        }

        :root {
          --copper: #C87533; --copper-dim: rgba(200,117,51,0.12);
          --copper-glow: rgba(200,117,51,0.28);
          --amber: #E8A84E; --verdigris: #3D7A6E;
          --cream: #EDE8DC; --cream-dim: #998E82;
          --bg: #0C0A07; --bg2: #141009; --bg3: #1C160C;
          --border: rgba(200,117,51,0.15); --border-mid: rgba(200,117,51,0.28);
        }

        /* ── LAYOUT ── */
        .g3-wrap { max-width: 740px; margin: 0 auto; padding: 0 24px 120px; }

        /* ── HEADER ── */
        .g3-header { padding: 52px 0 44px; }
        .g3-breadcrumb {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #4A3D30; margin-bottom: 18px;
          display: flex; align-items: center; gap: 8px;
        }
        .g3-breadcrumb span { color: var(--copper); }
        .g3-meta-row {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--copper);
          background: var(--copper-dim);
          border: 1px solid var(--border-mid);
          border-radius: 4px; padding: 5px 14px;
          margin-bottom: 26px;
        }
        .g3-meta-sep { width: 1px; height: 10px; background: var(--copper); opacity: 0.3; }
        .g3-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 6vw, 4rem);
          font-weight: 700; line-height: 0.98;
          letter-spacing: -0.02em; color: var(--cream);
          margin-bottom: 22px;
        }
        .g3-h1 em { font-style: italic; color: var(--copper); }
        .g3-intro { font-size: 16px; color: var(--cream-dim); line-height: 1.85; margin-bottom: 28px; }
        .g3-readtime {
          display: flex; gap: 20px; flex-wrap: wrap;
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.06em; color: #4A3D30;
        }

        /* ── OVERVIEW BOX ── */
        .g3-overview {
          background: var(--bg2); border-radius: 14px;
          border: 1px solid var(--border); padding: 24px;
          margin: 36px 0;
        }
        .g3-overview-title {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #4A3D30; margin-bottom: 18px;
        }
        .g3-steps-list { display: flex; flex-direction: column; }
        .g3-step-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 0; border-bottom: 1px solid var(--border);
        }
        .g3-step-row:last-child { border-bottom: none; }
        .g3-step-left { display: flex; align-items: center; gap: 14px; }
        .g3-step-num {
          font-family: 'Cormorant Garamond', serif; font-size: 1.1rem;
          font-weight: 700; color: var(--copper); width: 28px; line-height: 1;
        }
        .g3-step-name { font-size: 14px; font-weight: 500; color: var(--cream); }
        .g3-step-tool {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--cream-dim); background: var(--bg3);
          border: 1px solid var(--border); border-radius: 3px; padding: 3px 9px;
        }

        /* ── TOC ── */
        .g3-toc {
          background: var(--copper-dim);
          border: 1px solid var(--border-mid);
          border-radius: 12px; padding: 22px 24px; margin: 0 0 52px;
        }
        .g3-toc-title {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 14px;
        }
        .g3-toc-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .g3-toc-list a {
          font-size: 14px; color: var(--cream-dim); text-decoration: none;
          font-weight: 400; display: flex; align-items: center; gap: 10px;
          transition: color 0.2s;
        }
        .g3-toc-list a:hover { color: var(--cream); }
        .g3-toc-list a::before {
          content: '→'; font-family: 'DM Mono', monospace;
          font-size: 10px; color: var(--copper); opacity: 0.7;
        }

        /* ── SECTION ── */
        .g3-section { margin-bottom: 64px; }
        .g3-section-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 10px;
          display: flex; align-items: center; gap: 10px;
        }
        .g3-section-label::before {
          content: ''; display: block;
          width: 20px; height: 1px; background: var(--copper); opacity: 0.7;
        }
        .g3-section-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 700; line-height: 1.1;
          letter-spacing: -0.015em; color: var(--cream); margin-bottom: 18px;
        }
        .g3-section-h2 em { font-style: italic; color: var(--copper); }
        .g3-body { font-size: 15px; color: var(--cream-dim); line-height: 1.85; }
        .g3-body p { margin-bottom: 16px; }
        .g3-body p:last-child { margin-bottom: 0; }
        .g3-body strong { color: var(--cream); font-weight: 600; }

        /* ── CODE ── */
        .g3-code {
          background: #09070A; border: 1px solid var(--border);
          border-radius: 12px; padding: 22px; margin: 24px 0; overflow-x: auto;
        }
        .g3-code-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #4A3D30; margin-bottom: 14px;
          display: flex; align-items: center; gap: 8px;
        }
        .g3-code-label::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: var(--copper); opacity: 0.5; flex-shrink: 0;
        }
        .g3-code pre {
          font-family: 'DM Mono', monospace; font-size: 13px;
          line-height: 1.75; color: #998E82;
          white-space: pre-wrap; word-break: break-word;
        }
        .g3-code .cm { color: #3A3228; }
        .g3-code .kw { color: var(--copper); }
        .g3-code .st { color: #4A9B8A; }
        .g3-code .hl { color: var(--amber); }

        /* ── CALLOUT ── */
        .g3-callout {
          background: var(--bg2); border-radius: 12px; padding: 20px 22px;
          border: 1px solid var(--border); border-left: 3px solid var(--copper);
          margin: 22px 0;
        }
        .g3-callout.teal { border-left-color: var(--verdigris); }
        .g3-callout.amber { border-left-color: var(--amber); }
        .g3-callout-head {
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 8px;
          display: flex; align-items: center; gap: 8px;
        }
        .g3-callout.teal .g3-callout-head { color: #4A9B8A; }
        .g3-callout.amber .g3-callout-head { color: var(--amber); }
        .g3-callout-body { font-size: 14px; color: var(--cream-dim); line-height: 1.75; }
        .g3-callout-body strong { color: var(--cream); font-weight: 600; }

        /* ── COMPARE GRID ── */
        .g3-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 24px 0; }
        @media(max-width: 560px) { .g3-compare { grid-template-columns: 1fr; } }
        .g3-compare-card {
          background: var(--bg2); border-radius: 12px; padding: 18px;
          border: 1px solid var(--border);
        }
        .g3-compare-card.bad { border-color: rgba(180,60,60,0.25); }
        .g3-compare-card.good { border-color: var(--border-mid); }
        .g3-compare-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 10px;
        }
        .g3-compare-card.bad .g3-compare-label { color: rgba(220,80,80,0.8); }
        .g3-compare-card.good .g3-compare-label { color: var(--copper); }
        .g3-compare-text { font-size: 13px; line-height: 1.65; color: var(--cream-dim); }
        .g3-compare-card.good .g3-compare-text { color: var(--cream); }

        /* ── STEPS VISUAL ── */
        .g3-phase {
          background: var(--bg2); border-radius: 12px; padding: 22px;
          border: 1px solid var(--border); margin: 20px 0;
          display: flex; gap: 18px; align-items: flex-start;
        }
        .g3-phase-num {
          font-family: 'Cormorant Garamond', serif; font-size: 2.2rem;
          font-weight: 700; color: var(--copper); line-height: 1;
          opacity: 0.5; flex-shrink: 0; width: 40px;
        }
        .g3-phase-content { flex: 1; }
        .g3-phase-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 6px; }
        .g3-phase-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.65; }
        .g3-phase-tool-tag {
          display: inline-block; margin-top: 10px;
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--copper); background: var(--copper-dim);
          border: 1px solid var(--border-mid); border-radius: 3px; padding: 3px 9px;
        }

        /* ── CHECKLIST ── */
        .g3-checklist {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; padding: 22px; margin: 24px 0;
        }
        .g3-checklist-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #4A3D30; margin-bottom: 14px;
        }
        .g3-checklist-items { display: flex; flex-direction: column; gap: 9px; }
        .g3-check-item {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 13px; line-height: 1.5; color: var(--cream-dim);
        }
        .g3-check-dot {
          width: 18px; height: 18px; border-radius: 4px;
          background: var(--copper-dim); border: 1px solid var(--border-mid);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
          font-family: 'DM Mono', monospace; font-size: 10px; color: var(--copper);
        }

        /* ── FORMULA ── */
        .g3-formula {
          background: var(--bg2); border-radius: 14px;
          border: 1px solid var(--border-mid); padding: 28px; margin: 24px 0;
          text-align: center;
        }
        .g3-formula-title {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 20px;
        }
        .g3-formula-steps {
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 8px;
        }
        .g3-fstep {
          background: var(--copper-dim); border: 1px solid var(--border-mid);
          border-radius: 8px; padding: 10px 16px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--copper);
        }
        .g3-farrow { font-size: 14px; color: #3A3228; font-weight: 700; }

        /* ── PLATFORM CARDS ── */
        .g3-platform-grid { display: grid; grid-template-columns: 1fr; gap: 10px; margin: 24px 0; }
        @media(min-width: 600px) { .g3-platform-grid { grid-template-columns: 1fr 1fr; } }
        .g3-platform-card {
          background: var(--bg2); border-radius: 12px; padding: 20px;
          border: 1px solid var(--border); position: relative; overflow: hidden;
        }
        .g3-platform-card::before {
          content: ''; position: absolute; inset: 0;
          background: var(--card-color, rgba(200,117,51,0.04));
          pointer-events: none;
        }
        .g3-platform-icon { font-size: 1.5rem; margin-bottom: 10px; position: relative; }
        .g3-platform-name {
          font-family: 'DM Mono', monospace; font-size: 12px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--cream); margin-bottom: 6px; position: relative;
        }
        .g3-platform-type {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--copper); opacity: 0.8;
          margin-bottom: 10px; position: relative;
        }
        .g3-platform-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.65; position: relative; }

        /* ── DIVIDER ── */
        .g3-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,117,51,0.2), transparent);
          margin: 56px 0;
        }

        /* ── CTA ── */
        .g3-cta {
          background: linear-gradient(135deg, #1C1008, #2A1A0C);
          border: 1px solid var(--border-mid); border-radius: 18px;
          padding: 40px; text-align: center; margin-top: 64px;
          box-shadow: 0 0 60px rgba(200,117,51,0.08);
        }
        .g3-cta h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem; font-weight: 700; color: var(--cream);
          margin-bottom: 10px;
        }
        .g3-cta h3 em { font-style: italic; color: var(--copper); }
        .g3-cta p { font-size: 14px; color: var(--cream-dim); line-height: 1.75; margin-bottom: 24px; }
        .g3-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, var(--copper), #A86025);
          color: var(--cream); padding: 14px 28px;
          border-radius: 10px; font-family: 'DM Mono', monospace;
          font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 0 20px var(--copper-glow);
        }
        .g3-cta-btn:hover { opacity: 0.88; transform: translateY(-2px); box-shadow: 0 0 32px var(--copper-glow); }

        @media(max-width: 600px) {
          .g3-h1 { font-size: 2.4rem; }
          .g3-section-h2 { font-size: 1.6rem; }
          .g3-cta { padding: 28px 20px; }
        }
      `}</style>

      <CopperNav activeHref="/recursos" />

      <div className="g3-wrap">

        {/* ── HEADER ── */}
        <div className="g3-header">
          <div className="g3-breadcrumb">
            GUÍA · <span>PRODUCTO</span>
          </div>
          <div className="g3-meta-row">
            Nº 03 <span className="g3-meta-sep" />
            20 min <span className="g3-meta-sep" />
            Stack completo
          </div>
          <h1 className="g3-h1">
            Construye tu app<br />con <em>IA</em> — de la idea<br />a tus primeros <em>usuarios.</em>
          </h1>
          <p className="g3-intro">
            Claude para validar la idea. Claude Code para construir. Supabase para los datos. Vercel para el deploy. Stripe para cobrar. Y redes sociales para que alguien lo use. El stack completo, paso a paso, sin rodeos.
          </p>
          <div className="g3-readtime">
            <span>⏱ 20 min de lectura</span>
            <span>⚡ lanzable esta semana</span>
            <span>💰 inversión: $0 para empezar</span>
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        <div className="g3-overview">
          <div className="g3-overview-title">El recorrido completo</div>
          <div className="g3-steps-list">
            {[
              ['01', 'La idea con Claude',      'Claude'],
              ['02', 'La interfaz con Claude Code', 'Claude Code'],
              ['03', 'El backend con Supabase', 'Supabase'],
              ['04', 'Deploy con Vercel',        'Vercel'],
              ['05', 'Pagos con Stripe',         'Stripe'],
              ['06', 'Primeros usuarios',        'TikTok · Instagram · Meta Ads'],
            ].map(([n, name, tool]) => (
              <div className="g3-step-row" key={n}>
                <div className="g3-step-left">
                  <span className="g3-step-num">{n}</span>
                  <span className="g3-step-name">{name}</span>
                </div>
                <span className="g3-step-tool">{tool}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOC ── */}
        <div className="g3-toc">
          <div className="g3-toc-title">Saltar a una sección</div>
          <ul className="g3-toc-list">
            <li><a href="#idea">Paso 1 — La idea con Claude</a></li>
            <li><a href="#interfaz">Paso 2 — Construir la interfaz con Claude Code</a></li>
            <li><a href="#backend">Paso 3 — Backend con Supabase</a></li>
            <li><a href="#deploy">Paso 4 — Deploy con Vercel</a></li>
            <li><a href="#stripe">Paso 5 — Pagos con Stripe</a></li>
            <li><a href="#usuarios">Paso 6 — Conseguir tus primeros usuarios</a></li>
          </ul>
        </div>

        {/* ════════════════════════════════════
            PASO 1 — LA IDEA
        ════════════════════════════════════ */}
        <div className="g3-section" id="idea">
          <div className="g3-section-label">PASO 01 · CLAUDE</div>
          <h2 className="g3-section-h2">La idea: que <em>resuelva</em> un problema real</h2>
          <div className="g3-body">
            <p>
              La mayoría de la gente se traba en "no sé qué construir". La realidad es que el mejor producto no viene de una idea brillante — viene de un <strong>problema que alguien ya tiene y nadie resuelve bien todavía</strong>.
            </p>
            <p>
              Claude es tu mejor aliado para esto. No para pedirle ideas de negocio genéricas, sino para hacer las preguntas difíciles: ¿hay demanda real? ¿la gente paga por algo parecido? ¿cuál es el dolor específico?
            </p>
          </div>

          <div className="g3-callout">
            <div className="g3-callout-head">💡 El criterio más importante</div>
            <div className="g3-callout-body">
              Tu app tiene que resolver un problema que alguien tiene <strong>hoy</strong>, no uno hipotético. La mejor señal: que la gente ya lo esté resolviendo con algo torpe (hojas de cálculo, WhatsApp, anotaciones en papel).
            </div>
          </div>

          <div className="g3-code">
            <div className="g3-code-label">Prompt para validar tu idea con Claude</div>
            <pre>{`Eres un product strategist especializado en productos digitales
para pequeños negocios y emprendedores en LATAM y España.

Tengo esta idea para una app: [DESCRIBE TU IDEA EN 2 LÍNEAS].

Ayúdame a validarla con estas preguntas:
1. ¿Cuál es exactamente el dolor que resuelve?
2. ¿Quién paga por esto hoy (aunque sea de forma imperfecta)?
3. ¿Qué competidores directos o indirectos existen?
4. ¿Cuál sería el caso de uso más simple que podría validar
   esto con 10 usuarios en 7 días?
5. ¿Qué podría salir mal?

Dame respuestas directas, sin suavizar nada. Si la idea
tiene puntos débiles obvios, dímelos.`}</pre>
          </div>

          <div className="g3-body">
            <p>
              Una vez que Claude identifica el dolor central, el siguiente paso es reducirlo al <strong>mínimo viable</strong>. No construyas la versión completa. Construye la versión que resuelve una sola cosa, bien.
            </p>
          </div>

          <div className="g3-compare">
            <div className="g3-compare-card bad">
              <div className="g3-compare-label">✗ Demasiado grande</div>
              <p className="g3-compare-text">"Una plataforma para gestionar proyectos, con IA, calendario, facturación, CRM y chat interno para equipos remotos."</p>
            </div>
            <div className="g3-compare-card good">
              <div className="g3-compare-label">✓ MVP claro</div>
              <p className="g3-compare-text">"Un formulario donde el freelancer carga sus tareas y la app le genera la factura en PDF con un clic."</p>
            </div>
          </div>

          <div className="g3-code">
            <div className="g3-code-label">Prompt para definir el MVP</div>
            <pre>{`Eres un product manager con experiencia en MVPs.

Mi idea es: [TU IDEA].
El dolor principal que resuelve es: [EL DOLOR].

Diseñame el MVP más pequeño posible que valide si la gente
pagaría por esto. Debe:
- Resolverse con máximo 3 pantallas
- Poderse construir en menos de una semana
- Tener una métrica de éxito clara

Dime también: ¿qué NO incluir en esta primera versión?`}</pre>
          </div>

          <div className="g3-checklist">
            <div className="g3-checklist-label">Checklist antes de construir</div>
            <div className="g3-checklist-items">
              {[
                '¿Sabés exactamente qué dolor resuelve?',
                '¿Hay al menos 3 personas que confirmarían que ese problema existe?',
                '¿El MVP cabe en 3 pantallas o menos?',
                '¿Sabés cuánto cobrarías y por qué alguien pagaría ese precio?',
                '¿Claude te ayudó a identificar el riesgo más grande?',
              ].map(item => (
                <div className="g3-check-item" key={item}>
                  <div className="g3-check-dot">✓</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="g3-divider" />

        {/* ════════════════════════════════════
            PASO 2 — INTERFAZ
        ════════════════════════════════════ */}
        <div className="g3-section" id="interfaz">
          <div className="g3-section-label">PASO 02 · CLAUDE CODE</div>
          <h2 className="g3-section-h2">La interfaz con <em>Claude Code</em></h2>
          <div className="g3-body">
            <p>
              Claude Code es el CLI oficial de Anthropic que convierte tu terminal en un asistente de desarrollo completo. No es un chat — <strong>escribe código, crea archivos, ejecuta comandos y refactoriza tu proyecto</strong> de forma autónoma mientras vos supervisás.
            </p>
            <p>
              Para una app nueva, el flujo más rápido es: crear un proyecto Next.js, abrir Claude Code en esa carpeta, y describirle exactamente qué construir.
            </p>
          </div>

          <div className="g3-callout teal">
            <div className="g3-callout-head">⚡ Por qué Next.js + Claude Code</div>
            <div className="g3-callout-body">
              Next.js tiene una estructura que Claude Code ya conoce muy bien. Con App Router, podés tener rutas, API routes y componentes React listos en minutos. Claude Code se mueve solo dentro del proyecto.
            </div>
          </div>

          <div className="g3-code">
            <div className="g3-code-label">Instalar Claude Code y crear el proyecto</div>
            <pre>{`<span class="cm"># 1. Instalá Claude Code (una sola vez)</span>
npm install -g @anthropic-ai/claude-code

<span class="cm"># 2. Creá el proyecto Next.js</span>
npx create-next-app@latest mi-app
cd mi-app

<span class="cm"># 3. Abrí Claude Code en esa carpeta</span>
claude

<span class="cm"># 4. Ahora describile lo que querés construir</span>`}</pre>
          </div>

          <div className="g3-code">
            <div className="g3-code-label">Prompt inicial para Claude Code</div>
            <pre>{`Quiero construir una app con Next.js 14 (App Router) y
Tailwind CSS. El producto es: [TU MVP EN 2 LÍNEAS].

Las pantallas que necesito son:
1. [Pantalla 1]: [qué hace]
2. [Pantalla 2]: [qué hace]
3. [Pantalla 3]: [qué hace]

Por ahora usá datos hardcodeados (sin base de datos real).
El objetivo es tener la interfaz funcionando.

Empezá por la estructura de carpetas y la pantalla principal.`}</pre>
          </div>

          <div className="g3-body">
            <p>
              Claude Code va a crear los archivos, escribir los componentes y decirte si algo falta. Tu trabajo en esta etapa es <strong>revisar cada pantalla en el navegador</strong> y darle feedback directo.
            </p>
          </div>

          <div className="g3-callout amber">
            <div className="g3-callout-head">⚠ Tip clave para trabajar con Claude Code</div>
            <div className="g3-callout-body">
              Sé específico con los cambios. En vez de decir "mejorar el diseño", decí: <strong>"el botón de enviar tiene que estar abajo a la derecha, con fondo copper (#C87533) y texto blanco"</strong>. Cuanto más concreto, mejor.
            </div>
          </div>

          <div className="g3-phase">
            <div className="g3-phase-num">1</div>
            <div className="g3-phase-content">
              <div className="g3-phase-title">Estructura base</div>
              <div className="g3-phase-desc">Pedile que cree la carpeta `app/`, el layout principal, la navegación y las rutas básicas. Un componente a la vez.</div>
              <span className="g3-phase-tool-tag">30 min</span>
            </div>
          </div>
          <div className="g3-phase">
            <div className="g3-phase-num">2</div>
            <div className="g3-phase-content">
              <div className="g3-phase-title">Pantallas con datos de prueba</div>
              <div className="g3-phase-desc">Construí cada pantalla con datos hardcodeados. Validá que la lógica visual sea correcta antes de conectar la base de datos.</div>
              <span className="g3-phase-tool-tag">1-2 horas</span>
            </div>
          </div>
          <div className="g3-phase">
            <div className="g3-phase-num">3</div>
            <div className="g3-phase-content">
              <div className="g3-phase-title">Revisión y ajustes</div>
              <div className="g3-phase-desc">Recorré cada flujo como si fueras el usuario. Anotá los problemas y dáselos a Claude Code uno por uno.</div>
              <span className="g3-phase-tool-tag">30 min</span>
            </div>
          </div>
        </div>

        <div className="g3-divider" />

        {/* ════════════════════════════════════
            PASO 3 — SUPABASE
        ════════════════════════════════════ */}
        <div className="g3-section" id="backend">
          <div className="g3-section-label">PASO 03 · SUPABASE</div>
          <h2 className="g3-section-h2">El backend con <em>Supabase</em></h2>
          <div className="g3-body">
            <p>
              Supabase es una base de datos PostgreSQL con autenticación, storage y API REST generados automáticamente. Para un MVP, es el backend completo sin tener que escribir ni un servidor.
            </p>
            <p>
              En el plan gratuito tenés suficiente para lanzar y validar. Solo empezás a pagar cuando tenés usuarios reales.
            </p>
          </div>

          <div className="g3-code">
            <div className="g3-code-label">Setup en 3 pasos</div>
            <pre>{`<span class="cm"># 1. Creá cuenta en supabase.com → New Project</span>

<span class="cm"># 2. Instalá el cliente en tu proyecto</span>
npm install @supabase/supabase-js

<span class="cm"># 3. Creá lib/supabase.ts</span>
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)`}</pre>
          </div>

          <div className="g3-code">
            <div className="g3-code-label">Pedile a Claude Code que conecte Supabase</div>
            <pre>{`Ya tengo Supabase configurado en lib/supabase.ts.

Necesito que la pantalla [X] guarde y lea datos reales.
La tabla se llama "[nombre]" y tiene estas columnas:
- id: uuid (generado automáticamente)
- [campo 1]: [tipo]
- [campo 2]: [tipo]
- created_at: timestamp

Reemplazá los datos hardcodeados por llamadas reales
a Supabase. Usá el cliente de lib/supabase.ts.`}</pre>
          </div>

          <div className="g3-callout teal">
            <div className="g3-callout-head">🔒 Auth en 10 minutos</div>
            <div className="g3-callout-body">
              Supabase tiene auth integrado con email/password, Google y GitHub. Pedile a Claude Code: <strong>"Agregá autenticación con Supabase Auth. Login con email. Protegé las rutas /dashboard y /perfil."</strong> Listo.
            </div>
          </div>

          <div className="g3-checklist">
            <div className="g3-checklist-label">Qué configurar en Supabase</div>
            <div className="g3-checklist-items">
              {[
                'Crear el proyecto y copiar URL + anon key al .env.local',
                'Crear las tablas en el SQL Editor (Claude puede escribir el SQL)',
                'Configurar Row Level Security (RLS) para que cada usuario solo vea sus datos',
                'Probar que la lectura y escritura funcionan desde la app',
                'Activar autenticación si tu app necesita usuarios registrados',
              ].map(item => (
                <div className="g3-check-item" key={item}>
                  <div className="g3-check-dot">✓</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="g3-divider" />

        {/* ════════════════════════════════════
            PASO 4 — VERCEL
        ════════════════════════════════════ */}
        <div className="g3-section" id="deploy">
          <div className="g3-section-label">PASO 04 · VERCEL</div>
          <h2 className="g3-section-h2">Deploy con <em>Vercel</em> — en 5 minutos</h2>
          <div className="g3-body">
            <p>
              Vercel es el hogar natural de Next.js. Con el plan gratuito tenés hosting ilimitado para proyectos personales, dominio propio, HTTPS automático y deploys instantáneos cada vez que hacés push a GitHub.
            </p>
          </div>

          <div className="g3-code">
            <div className="g3-code-label">Deploy desde terminal (opción A)</div>
            <pre>{`<span class="cm"># Instalá el CLI de Vercel</span>
npm install -g vercel

<span class="cm"># Desde la carpeta del proyecto</span>
vercel

<span class="cm"># Seguí las instrucciones. En el primer deploy:</span>
<span class="cm"># - ¿Vincular a cuenta? → Y</span>
<span class="cm"># - ¿Crear nuevo proyecto? → Y</span>
<span class="cm"># - Nombre del proyecto → [tu-app]</span>
<span class="cm"># En 60 segundos tenés URL pública.</span>`}</pre>
          </div>

          <div className="g3-code">
            <div className="g3-code-label">Deploy desde GitHub (opción B — recomendada)</div>
            <pre>{`<span class="cm"># 1. Subí tu código a GitHub</span>
git init && git add . && git commit -m "initial"
git remote add origin https://github.com/[user]/[repo].git
git push -u origin main

<span class="cm"># 2. En vercel.com → New Project → Importá el repo</span>
<span class="cm"># 3. Configurá las variables de entorno:</span>
<span class="hl">NEXT_PUBLIC_SUPABASE_URL</span>     = [tu URL de Supabase]
<span class="hl">NEXT_PUBLIC_SUPABASE_ANON_KEY</span> = [tu anon key]

<span class="cm"># 4. Deploy</span>
<span class="cm"># A partir de acá, cada push a main hace deploy automático.</span>`}</pre>
          </div>

          <div className="g3-callout">
            <div className="g3-callout-head">🌐 Dominio propio</div>
            <div className="g3-callout-body">
              En Settings → Domains dentro de Vercel podés agregar tu dominio (.com, .net, .io). Compralo en Namecheap o GoDaddy, apuntá los nameservers a Vercel, y en 24 horas estás online con HTTPS.
            </div>
          </div>
        </div>

        <div className="g3-divider" />

        {/* ════════════════════════════════════
            PASO 5 — STRIPE
        ════════════════════════════════════ */}
        <div className="g3-section" id="stripe">
          <div className="g3-section-label">PASO 05 · STRIPE</div>
          <h2 className="g3-section-h2">Pagos con <em>Stripe</em></h2>
          <div className="g3-body">
            <p>
              Stripe es el estándar para aceptar pagos en la web. Funciona en casi todos los países de LATAM y España, acepta tarjetas de crédito/débito, y el setup básico se hace en una tarde.
            </p>
            <p>
              Para un MVP, el modelo más simple es <strong>un pago único</strong> (Stripe Checkout) o <strong>suscripción mensual</strong> (Stripe Billing). Los dos se integran igual.
            </p>
          </div>

          <div className="g3-code">
            <div className="g3-code-label">Instalación y variables de entorno</div>
            <pre>{`<span class="cm"># Instalá Stripe</span>
npm install stripe @stripe/stripe-js

<span class="cm"># Variables en .env.local</span>
<span class="hl">STRIPE_SECRET_KEY</span>=sk_live_...   <span class="cm"># En Stripe Dashboard → Developers → API Keys</span>
<span class="hl">STRIPE_WEBHOOK_SECRET</span>=whsec_...
<span class="hl">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</span>=pk_live_...`}</pre>
          </div>

          <div className="g3-code">
            <div className="g3-code-label">Pedile a Claude Code que integre Stripe Checkout</div>
            <pre>{`Necesito integrar Stripe Checkout en mi app Next.js.

El flujo es:
1. El usuario hace clic en "Comprar" en /precios
2. Se crea una sesión de Stripe Checkout (server-side)
3. El usuario paga en la página de Stripe
4. Stripe redirige a /gracias?session_id=[id]
5. En /gracias verificamos el pago y activamos el acceso

El precio es $[X] USD (o suscripción de $[X]/mes).
Usá el producto que ya creé en el dashboard de Stripe
con este price ID: price_[ID].

Creá:
- app/api/checkout/route.ts (crear la sesión)
- app/api/webhook/route.ts (confirmar el pago)
- app/gracias/page.tsx (página de confirmación)`}</pre>
          </div>

          <div className="g3-callout amber">
            <div className="g3-callout-head">⚠ Siempre verificá en el webhook</div>
            <div className="g3-callout-body">
              No actives el acceso del usuario basándote en la redirección de Stripe. <strong>Siempre usá el webhook</strong> para confirmar que el pago realmente se procesó. Claude Code puede escribir el handler completo.
            </div>
          </div>

          <div className="g3-checklist">
            <div className="g3-checklist-label">Checklist de Stripe</div>
            <div className="g3-checklist-items">
              {[
                'Cuenta de Stripe creada y verificada',
                'Producto y precio creados en el Dashboard',
                'Variables STRIPE_SECRET_KEY y WEBHOOK_SECRET en Vercel',
                'Webhook apuntando a tu-dominio.com/api/webhook',
                'Probar el flujo completo con tarjeta de prueba 4242 4242 4242 4242',
              ].map(item => (
                <div className="g3-check-item" key={item}>
                  <div className="g3-check-dot">✓</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="g3-divider" />

        {/* ════════════════════════════════════
            PASO 6 — USUARIOS
        ════════════════════════════════════ */}
        <div className="g3-section" id="usuarios">
          <div className="g3-section-label">PASO 06 · DISTRIBUCIÓN</div>
          <h2 className="g3-section-h2">Conseguir tus <em>primeros usuarios</em></h2>
          <div className="g3-body">
            <p>
              El peor error al lanzar: esperar a tener la app perfecta para empezar a mostrarla. La distribución arranca <strong>antes</strong> del lanzamiento. Creás contenido sobre el problema que resolvés, construís audiencia, y cuando lanzás ya tenés gente esperando.
            </p>
            <p>
              Las tres plataformas con mejor retorno para apps en español son TikTok, Instagram y Facebook. Cada una tiene una mecánica distinta.
            </p>
          </div>

          <div className="g3-platform-grid">
            <div className="g3-platform-card" style={{ ['--card-color' as string]: 'rgba(61,122,110,0.05)' }}>
              <div className="g3-platform-icon">🎵</div>
              <div className="g3-platform-name">TikTok</div>
              <div className="g3-platform-type">Orgánico · Alcance masivo</div>
              <p className="g3-platform-desc">El algoritmo distribuye a desconocidos. Un video sobre el problema que resolvés puede llegar a 50K personas sin un solo seguidor. El formato ganador: "Tenía este problema → encontré esto → así funciona".</p>
            </div>
            <div className="g3-platform-card" style={{ ['--card-color' as string]: 'rgba(200,117,51,0.04)' }}>
              <div className="g3-platform-icon">📸</div>
              <div className="g3-platform-name">Instagram</div>
              <div className="g3-platform-type">Orgánico + Reels · Comunidad</div>
              <p className="g3-platform-desc">Los Reels tienen el mejor alcance orgánico. Las historias convierten. Mostrá el before/after: cómo era la vida del usuario antes y después de usar tu app. Testimonios reales funcionan mejor que cualquier copy.</p>
            </div>
            <div className="g3-platform-card" style={{ ['--card-color' as string]: 'rgba(61,122,110,0.04)' }}>
              <div className="g3-platform-icon">📘</div>
              <div className="g3-platform-name">Facebook Ads</div>
              <div className="g3-platform-type">Pagado · Segmentación precisa</div>
              <p className="g3-platform-desc">La mejor herramienta para escalar cuando ya validaste. Con $5-10/día podés probar audiencias muy específicas. Empieza con una audiencia parecida a tus primeros usuarios (Lookalike) o por intereses directos del problema que resolvés.</p>
            </div>
            <div className="g3-platform-card" style={{ ['--card-color' as string]: 'rgba(200,117,51,0.05)' }}>
              <div className="g3-platform-icon">🎯</div>
              <div className="g3-platform-name">TikTok Ads</div>
              <div className="g3-platform-type">Pagado · Costo bajo por clic</div>
              <p className="g3-platform-desc">En LATAM y España el CPM de TikTok es significativamente más bajo que Meta. Si tu producto apela a menores de 35 años, el ROI puede ser sorprendente con presupuestos de $10-20/día al inicio.</p>
            </div>
          </div>

          <div className="g3-callout">
            <div className="g3-callout-head">📱 El contenido que más convierte</div>
            <div className="g3-callout-body">
              Para cualquier plataforma, el formato que mejor funciona para apps es <strong>"screen recording + narración"</strong>: grabás la pantalla de tu app resolviendo el problema, explicás en voz lo que está pasando. 30-60 segundos. Sin edición sofisticada.
            </div>
          </div>

          <div className="g3-code">
            <div className="g3-code-label">Prompt para crear contenido de distribución con Claude</div>
            <pre>{`Eres un especialista en marketing de contenidos para
productos digitales en español.

Mi app es: [TU APP].
El problema que resuelve: [EL DOLOR].
Mi usuario ideal: [QUIÉN ES, EDAD, SITUACIÓN].

Creame 5 ideas de videos cortos (30-60 seg) para TikTok
e Instagram Reels. Para cada idea dame:
- El hook (primeros 3 segundos)
- La estructura del video
- El CTA final

Orientados a [orgánico / conversión directa].
Tono: directo, sin jerga técnica, que hable al dolor real.`}</pre>
          </div>

          <div className="g3-checklist">
            <div className="g3-checklist-label">Plan de lanzamiento mínimo</div>
            <div className="g3-checklist-items">
              {[
                'Antes de lanzar: 3-5 posts sobre el problema (sin mencionar la app)',
                'Día del lanzamiento: video mostrando la solución en acción',
                'Primera semana: responder TODOS los comentarios y mensajes',
                'Primeros 10 usuarios: pedirles feedback directo por DM',
                'Con feedback validado: empezar a escalar con ads',
              ].map(item => (
                <div className="g3-check-item" key={item}>
                  <div className="g3-check-dot">✓</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="g3-callout teal">
            <div className="g3-callout-head">🚀 El loop de validación</div>
            <div className="g3-callout-body">
              Los primeros 10 usuarios no son para ganar dinero — son para aprender. Hablá con cada uno. Preguntales qué entienden, qué les cuesta, qué cambiarían. Esa información vale más que cualquier métrica de analytics en esta etapa.
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════
            RESUMEN FINAL
        ════════════════════════════════════ */}
        <div className="g3-formula">
          <div className="g3-formula-title">El stack completo</div>
          <div className="g3-formula-steps">
            <div className="g3-fstep">Claude<br/>Idea</div>
            <div className="g3-farrow">→</div>
            <div className="g3-fstep">Claude Code<br/>Interfaz</div>
            <div className="g3-farrow">→</div>
            <div className="g3-fstep">Supabase<br/>Backend</div>
            <div className="g3-farrow">→</div>
            <div className="g3-fstep">Vercel<br/>Deploy</div>
            <div className="g3-farrow">→</div>
            <div className="g3-fstep">Stripe<br/>Pagos</div>
            <div className="g3-farrow">→</div>
            <div className="g3-fstep">Redes<br/>Usuarios</div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="g3-cta">
          <h3>Empezá hoy, no <em>mañana.</em></h3>
          <p>
            Tenés el stack completo. El próximo paso es abrir Claude y validar tu idea con el primer prompt de esta guía.<br />
            El mejor momento para lanzar era hace seis meses. El segundo mejor momento es hoy.
          </p>
          <a className="g3-cta-btn" href="/#registro">
            ACCEDER A LAS GUÍAS →
          </a>
        </div>

      </div>
    </>
  )
}
