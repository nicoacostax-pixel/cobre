import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Cómo hacer un CLAUDE.md — Guía 04 · Nico IA',
  description: 'El archivo que le enseña a Claude tu proyecto, tus reglas y cómo trabajás. Una vez que lo escribís, no volvés a empezar desde cero nunca más.',
}

export default function Guia04Page() {
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
          --amber: #E8A84E; --verdigris: #3D7A6E; --verdigris-dim: rgba(61,122,110,0.14);
          --cream: #EDE8DC; --cream-dim: #998E82;
          --bg: #0C0A07; --bg2: #141009; --bg3: #1C160C;
          --border: rgba(200,117,51,0.15); --border-mid: rgba(200,117,51,0.28);
          --border-bright: rgba(200,117,51,0.45);
        }

        /* ── LAYOUT ── */
        .g4-wrap { max-width: 740px; margin: 0 auto; padding: 0 24px 120px; position: relative; z-index: 1; }

        /* ── HEADER ── */
        .g4-header { padding: 52px 0 44px; }
        .g4-breadcrumb {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #4A3D30; margin-bottom: 18px;
          display: flex; align-items: center; gap: 8px;
        }
        .g4-breadcrumb span { color: var(--copper); }
        .g4-meta-row {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--copper);
          background: var(--copper-dim);
          border: 1px solid var(--border-mid);
          border-radius: 4px; padding: 5px 14px;
          margin-bottom: 26px;
        }
        .g4-meta-sep { width: 1px; height: 10px; background: var(--copper); opacity: 0.3; }
        .g4-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 6vw, 4rem);
          font-weight: 700; line-height: 0.98;
          letter-spacing: -0.02em; color: var(--cream);
          margin-bottom: 22px;
        }
        .g4-h1 em { font-style: italic; color: var(--copper); }
        .g4-intro { font-size: 16px; color: var(--cream-dim); line-height: 1.85; margin-bottom: 28px; }
        .g4-readtime {
          display: flex; gap: 20px; flex-wrap: wrap;
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.06em; color: #4A3D30;
        }

        /* ── OVERVIEW BOX ── */
        .g4-overview {
          background: var(--bg2); border-radius: 14px;
          border: 1px solid var(--border); padding: 24px;
          margin: 36px 0;
        }
        .g4-overview-title {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #4A3D30; margin-bottom: 18px;
        }
        .g4-steps-list { display: flex; flex-direction: column; }
        .g4-step-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 0; border-bottom: 1px solid var(--border);
        }
        .g4-step-row:last-child { border-bottom: none; }
        .g4-step-left { display: flex; align-items: center; gap: 14px; }
        .g4-step-num {
          font-family: 'Cormorant Garamond', serif; font-size: 1.1rem;
          font-weight: 700; color: var(--copper); width: 28px; line-height: 1;
        }
        .g4-step-name { font-size: 14px; font-weight: 500; color: var(--cream); }
        .g4-step-tag {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--cream-dim); background: var(--bg3);
          border: 1px solid var(--border); border-radius: 3px; padding: 3px 9px;
        }

        /* ── TOC ── */
        .g4-toc {
          background: var(--copper-dim);
          border: 1px solid var(--border-mid);
          border-radius: 12px; padding: 22px 24px; margin: 0 0 52px;
        }
        .g4-toc-title {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 14px;
        }
        .g4-toc-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .g4-toc-list a {
          font-size: 14px; color: var(--cream-dim); text-decoration: none;
          font-weight: 400; display: flex; align-items: center; gap: 10px;
          transition: color 0.2s;
        }
        .g4-toc-list a:hover { color: var(--cream); }
        .g4-toc-list a::before {
          content: '—'; font-family: 'DM Mono', monospace;
          font-size: 10px; color: var(--copper); opacity: 0.6; flex-shrink: 0;
        }

        /* ── SECTION ── */
        .g4-section { margin-bottom: 72px; }
        .g4-section-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 14px;
          display: flex; align-items: center; gap: 10px;
        }
        .g4-section-label::before {
          content: ''; display: inline-block;
          width: 20px; height: 1px;
          background: var(--copper); opacity: 0.7;
        }
        .g4-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700; line-height: 1.05;
          letter-spacing: -0.02em; color: var(--cream);
          margin-bottom: 20px;
        }
        .g4-h2 em { font-style: italic; color: var(--copper); }
        .g4-body { font-size: 15px; color: var(--cream-dim); line-height: 1.85; }
        .g4-body p { margin-bottom: 16px; }
        .g4-body p:last-child { margin-bottom: 0; }
        .g4-body strong { color: var(--cream); font-weight: 600; }

        /* ── SUBSECTION BADGE ── */
        .g4-sub-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--cream-dim);
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 4px; padding: 4px 12px;
          margin: 32px 0 14px;
        }
        .g4-sub-badge.first { margin-top: 0; }

        /* ── COMPARISON GRID ── */
        .g4-compare {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; margin: 22px 0;
        }
        @media(max-width:580px){ .g4-compare { grid-template-columns: 1fr; } }
        .g4-compare-card {
          background: var(--bg2); border-radius: 12px;
          padding: 18px 20px; border: 1px solid var(--border);
        }
        .g4-compare-card.good { border-color: var(--border-mid); }
        .g4-compare-card.bad  { border-color: rgba(239,68,68,0.2); }
        .g4-compare-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 10px;
        }
        .g4-compare-card.good .g4-compare-label { color: var(--copper); }
        .g4-compare-card.bad  .g4-compare-label { color: rgba(239,68,68,0.8); }
        .g4-compare-text {
          font-size: 13px; color: var(--cream-dim);
          line-height: 1.7; font-style: italic;
        }
        .g4-compare-card.good .g4-compare-text { color: var(--cream); }
        .g4-compare-result {
          margin-top: 10px; font-size: 12px;
          font-family: 'DM Mono', monospace; letter-spacing: 0.04em;
          color: #4A3D30;
        }
        .g4-compare-card.good .g4-compare-result { color: var(--copper); }

        /* ── CODE BLOCK ── */
        .g4-code {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; padding: 22px 24px;
          margin: 22px 0; overflow-x: auto;
        }
        .g4-code-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #4A3D30; margin-bottom: 14px;
        }
        .g4-code pre {
          font-family: 'DM Mono', monospace; font-size: 13px;
          line-height: 1.75; color: var(--cream-dim);
          white-space: pre-wrap; word-break: break-word;
        }
        .g4-code pre .cm { color: #4A3D30; }
        .g4-code pre .hi { color: var(--copper); }

        /* ── CALLOUT ── */
        .g4-callout {
          background: var(--bg2); border-radius: 12px;
          border: 1px solid var(--border);
          border-left: 2px solid var(--copper);
          padding: 18px 22px; margin: 22px 0;
        }
        .g4-callout.warn { border-left-color: var(--amber); }
        .g4-callout-head {
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 8px;
        }
        .g4-callout.warn .g4-callout-head { color: var(--amber); }
        .g4-callout-body { font-size: 14px; color: var(--cream-dim); line-height: 1.75; }
        .g4-callout-body strong { color: var(--cream); font-weight: 600; }

        /* ── ANATOMY BLOCKS ── */
        .g4-anatomy { display: flex; flex-direction: column; gap: 8px; margin: 22px 0; }
        .g4-anatomy-block {
          background: var(--bg2); border-radius: 10px;
          border: 1px solid var(--border); padding: 16px 18px;
        }
        .g4-anatomy-block.hi { border-color: var(--border-mid); background: var(--bg3); }
        .g4-anatomy-tag {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 6px;
        }
        .g4-anatomy-tag.bad { color: rgba(239,68,68,0.8); }
        .g4-anatomy-text { font-size: 14px; color: var(--cream-dim); line-height: 1.65; }
        .g4-anatomy-block.hi .g4-anatomy-text { color: var(--cream); }
        .g4-anatomy-note {
          margin-top: 5px; font-size: 12px;
          font-family: 'DM Mono', monospace; color: #4A3D30;
        }

        /* ── FORMULA ── */
        .g4-formula {
          background: var(--bg2); border: 1px solid var(--border-mid);
          border-radius: 14px; padding: 28px; margin: 22px 0; text-align: center;
        }
        .g4-formula-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 18px;
        }
        .g4-formula-parts {
          display: flex; align-items: center;
          justify-content: center; flex-wrap: wrap; gap: 10px;
        }
        .g4-formula-part {
          background: var(--copper-dim); border: 1px solid var(--border-mid);
          border-radius: 8px; padding: 10px 18px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 700; color: var(--amber);
        }
        .g4-formula-op {
          font-family: 'DM Mono', monospace;
          font-size: 16px; color: #4A3D30;
        }

        /* ── CHECKLIST ── */
        .g4-checklist {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 14px; padding: 24px; margin: 48px 0 0;
        }
        .g4-checklist-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #4A3D30; margin-bottom: 18px;
        }
        .g4-checklist-items { display: flex; flex-direction: column; gap: 10px; }
        .g4-check-item {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 14px; color: var(--cream-dim); line-height: 1.55;
        }
        .g4-check-dot {
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--copper-dim); border: 1px solid var(--border-mid);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
          font-size: 9px; color: var(--copper); font-weight: 700;
          font-family: 'DM Mono', monospace;
        }

        /* ── DIVIDER ── */
        .g4-divider {
          height: 1px; margin: 60px 0;
          background: linear-gradient(90deg, transparent, var(--border-mid), transparent);
        }

        /* ── CTA ── */
        .g4-cta {
          background: var(--bg2); border: 1px solid var(--border-mid);
          border-radius: 16px; padding: 40px; text-align: center;
          margin-top: 72px; position: relative; overflow: hidden;
        }
        .g4-cta-tag {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 16px;
        }
        .g4-cta h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: var(--cream);
          line-height: 1.1; margin-bottom: 12px;
        }
        .g4-cta h3 em { font-style: italic; color: var(--copper); }
        .g4-cta p {
          font-size: 14px; color: var(--cream-dim);
          line-height: 1.75; margin-bottom: 28px;
        }
        .g4-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--copper); color: var(--cream);
          padding: 14px 28px; border-radius: 8px;
          font-family: 'DM Mono', monospace; font-size: 12px;
          font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none;
          transition: box-shadow 0.2s, opacity 0.2s;
        }
        .g4-cta-btn:hover {
          box-shadow: 0 0 32px var(--copper-glow); opacity: 0.9;
        }
      `}</style>

      <CopperNav activeHref="/recursos" />

      <div className="g4-wrap">

        {/* HEADER */}
        <div className="g4-header">
          <div className="g4-breadcrumb">
            GUÍA — <span>04 · PROMPTS</span>
          </div>
          <div className="g4-meta-row">
            10 min de lectura
            <span className="g4-meta-sep" />
            template incluido
            <span className="g4-meta-sep" />
            gratis
          </div>
          <h1 className="g4-h1">
            El archivo que le enseña<br />
            a Claude <em>tu proyecto.</em>
          </h1>
          <p className="g4-intro">
            CLAUDE.md es un archivo de texto que vive en tu carpeta de proyecto. Cada vez que abrís Claude Code, él lo lee primero. Ahí ponés quién sos, cómo está estructurado el código, qué reglas no puede romper, y cómo trabajás vos. Una vez que lo escribís bien, no volvés a repetirte nunca más.
          </p>
          <div className="g4-readtime">
            <span>— 10 min</span>
            <span>— template listo para copiar</span>
            <span>— accionable hoy</span>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="g4-overview">
          <div className="g4-overview-title">Lo que vas a aprender</div>
          <div className="g4-steps-list">
            {[
              ['01', 'Qué es CLAUDE.md y por qué existe', 'el problema que resuelve'],
              ['02', 'Las 5 secciones esenciales',         'la estructura que funciona'],
              ['03', 'Cómo escribir cada sección',         'ejemplos reales'],
              ['04', 'El template completo',               'copiá y adaptá'],
              ['05', 'Errores que arruinan el archivo',    'qué no hacer'],
            ].map(([n, name, tag]) => (
              <div key={n} className="g4-step-row">
                <div className="g4-step-left">
                  <span className="g4-step-num">{n}</span>
                  <span className="g4-step-name">{name}</span>
                </div>
                <span className="g4-step-tag">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TOC */}
        <div className="g4-toc">
          <div className="g4-toc-title">El recorrido ↓</div>
          <ul className="g4-toc-list">
            <li><a href="#que-es">Qué es CLAUDE.md y por qué existe</a></li>
            <li><a href="#secciones">Las 5 secciones esenciales</a></li>
            <li><a href="#como-escribir">Cómo escribir cada sección bien</a></li>
            <li><a href="#template">El template completo</a></li>
            <li><a href="#errores">Errores que arruinan el archivo</a></li>
          </ul>
        </div>

        {/* ── SECCIÓN 1 ── */}
        <div className="g4-section" id="que-es">
          <div className="g4-section-label">Paso 01</div>
          <h2 className="g4-h2">Qué es CLAUDE.md<br /><em>y por qué existe</em></h2>
          <div className="g4-body">
            <p>
              Cuando abrís Claude Code en una carpeta de proyecto, lo primero que hace es buscar un archivo llamado <strong>CLAUDE.md</strong> en esa carpeta. Si lo encuentra, lo lee completo antes de hacer cualquier cosa. Es su briefing de incorporación.
            </p>
            <p>
              Sin ese archivo, Claude arranca sin contexto. No sabe si estás construyendo una tienda online o una app médica. No sabe si usás TypeScript o Python. No sabe qué partes del código no debe tocar. Tiene que adivinar, y cuando adivina, se equivoca.
            </p>
            <p>
              Con un buen CLAUDE.md, Claude sabe exactamente dónde está parado desde el primer mensaje. Menos correcciones, menos idas y vueltas, mejor código desde el primer intento.
            </p>
          </div>

          <div className="g4-compare">
            <div className="g4-compare-card bad">
              <div className="g4-compare-label">✗ Sin CLAUDE.md</div>
              <p className="g4-compare-text">Claude hace suposiciones sobre tu stack, tu estilo y tus reglas. Tenés que corregirlo en cada sesión.</p>
              <p className="g4-compare-result">Tiempo perdido. Código inconsistente.</p>
            </div>
            <div className="g4-compare-card good">
              <div className="g4-compare-label">✓ Con CLAUDE.md</div>
              <p className="g4-compare-text">Claude sabe tu stack, tus convenciones, lo que no puede tocar y cómo tomás decisiones.</p>
              <p className="g4-compare-result">Contexto instantáneo. Cada sesión arranca bien.</p>
            </div>
          </div>

          <div className="g4-callout">
            <div className="g4-callout-head">— Pensalo como un manual de onboarding</div>
            <div className="g4-callout-body">
              Imaginá que contratás a un desarrollador nuevo. Lo primero que hacés es darle un documento que explica el proyecto: qué es, cómo está organizado, qué reglas hay. CLAUDE.md es exactamente eso, pero para tu asistente de IA.
            </div>
          </div>
        </div>

        <div className="g4-divider" />

        {/* ── SECCIÓN 2 ── */}
        <div className="g4-section" id="secciones">
          <div className="g4-section-label">Paso 02</div>
          <h2 className="g4-h2">Las <em>5 secciones</em><br />esenciales</h2>
          <div className="g4-body">
            <p>
              Un CLAUDE.md que funciona tiene cinco bloques. Podés agregarle más, pero estos cinco son los que Claude realmente usa para tomar mejores decisiones.
            </p>
          </div>

          <div className="g4-anatomy">
            {[
              ['1 · Qué es el proyecto',         'Una descripción corta: qué construís, para quién, cuál es el objetivo principal.',                       '2-3 oraciones. Sin tecnicismos innecesarios.'],
              ['2 · Stack técnico',               'Las tecnologías que usás: lenguaje, framework, base de datos, servicios externos.',                       'Claude adapta el código a lo que ya tenés.'],
              ['3 · Reglas que no puede romper',  'Las restricciones no negociables: archivos que no toca, patrones que no usa, decisiones que requieren tu aprobación.', 'Esta sección previene el 80% de los problemas.'],
              ['4 · Estado actual del proyecto',  'Qué está listo, qué está en progreso, qué falta. Con emojis o bullets simples.',                        'Claude no rompe lo que ya funciona.'],
              ['5 · Cómo trabajás vos',           'Tu proceso de decisión, tu estilo preferido de respuesta, cuándo querés opciones antes de que implemente.', 'Lo más ignorado. El que más cambia la experiencia.'],
            ].map(([tag, text, note]) => (
              <div key={tag} className="g4-anatomy-block hi">
                <div className="g4-anatomy-tag">{tag}</div>
                <div className="g4-anatomy-text">{text}</div>
                <div className="g4-anatomy-note">{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="g4-divider" />

        {/* ── SECCIÓN 3 ── */}
        <div className="g4-section" id="como-escribir">
          <div className="g4-section-label">Paso 03</div>
          <h2 className="g4-h2">Cómo escribir<br /><em>cada sección bien</em></h2>

          {/* 3.1 */}
          <div className="g4-sub-badge first">Sección 1 — Qué es el proyecto</div>
          <div className="g4-body">
            <p>No es un pitch de ventas ni un README para GitHub. Es contexto para Claude. Explicá qué hace la app, quién la usa y cuál es el core que no puede fallar.</p>
          </div>
          <div className="g4-compare">
            <div className="g4-compare-card bad">
              <div className="g4-compare-label">✗ Demasiado vago</div>
              <p className="g4-compare-text">"Una plataforma educativa con cursos online."</p>
              <p className="g4-compare-result">Claude no sabe nada útil</p>
            </div>
            <div className="g4-compare-card good">
              <div className="g4-compare-label">✓ Contexto real</div>
              <p className="g4-compare-text">"Academia de IA para emprendedoras sin background técnico. El core es el área de alumnas: acceso a cursos, progreso y comunidad."</p>
              <p className="g4-compare-result">Claude entiende prioridades y audiencia</p>
            </div>
          </div>

          {/* 3.2 */}
          <div className="g4-sub-badge">Sección 2 — Stack técnico</div>
          <div className="g4-body">
            <p>Listá las tecnologías principales. Solo las que Claude necesita para tomar decisiones: ¿Uso fetch o axios? ¿Guardo en localStorage o en la base de datos? ¿Hay un ORM o queries directas?</p>
          </div>
          <div className="g4-code">
            <div className="g4-code-label">Ejemplo de stack bien declarado</div>
            <pre>{`## Stack técnico
- Frontend: Next.js 14 (App Router) — NO Pages Router
- Base de datos: Supabase (Postgres + Auth + Storage)
- Deploy: Vercel (rama main = producción automática)
- Pagos: Stripe (webhooks en /api/webhooks/stripe)
- Estilos: Tailwind CSS — sin CSS modules
- ORM: ninguno — queries directas con Supabase`}</pre>
          </div>
          <div className="g4-callout">
            <div className="g4-callout-head">— Lo que más ayuda aquí</div>
            <div className="g4-callout-body">
              Aclarar las alternativas que <strong>no usás</strong>. "Sin CSS modules" le dice a Claude que no cree archivos .module.css aunque le parezca buena idea.
            </div>
          </div>

          {/* 3.3 */}
          <div className="g4-sub-badge">Sección 3 — Reglas que no puede romper</div>
          <div className="g4-body">
            <p>La más importante. Claude, por defecto, puede hacer cambios que no pediste si cree que mejoran el código. Las reglas son la forma de controlarlo.</p>
          </div>
          <div className="g4-code">
            <div className="g4-code-label">Tipos de reglas que funcionan</div>
            <pre>{`## Reglas que NO debes romper

// Archivos protegidos
- No toques /lib/auth.ts sin avisarme primero
- No modifiques /middleware.ts

// Antes de actuar
- No cambies el esquema de la BD sin mostrarme
  el migration primero
- No instales dependencias sin preguntarme

// Convenciones de código
- Siempre escribe comentarios en español
- Nunca uses \`any\` en TypeScript

// Estilo de respuesta
- Si hay más de una solución, dame opciones
  antes de implementar
- Si detectás un bug que no pedí, avisame
  pero no lo toques sin permiso`}</pre>
          </div>

          {/* 3.4 */}
          <div className="g4-sub-badge">Sección 4 — Estado actual</div>
          <div className="g4-body">
            <p>Claude no puede ver tu Notion. Esta sección le dice en qué punto está el proyecto para que no rompa lo que ya funciona ni intente implementar algo que ya existe.</p>
          </div>
          <div className="g4-code">
            <div className="g4-code-label">Formato simple que funciona</div>
            <pre>{`## Estado actual del proyecto
✅ Autenticación con Supabase lista
✅ Landing page desplegada en Vercel
✅ Módulo 1 del curso subido y funcionando
🔄 En progreso: pasarela de pagos con Stripe
❌ Pendiente: área de miembros
❌ Pendiente: dashboard de progreso de alumnas`}</pre>
          </div>
          <div className="g4-callout warn">
            <div className="g4-callout-head">— Actualizalo seguido</div>
            <div className="g4-callout-body">
              Un estado desactualizado confunde más que no tener uno. Cada vez que marcás algo como listo, actualizá el archivo. Tarda 20 segundos.
            </div>
          </div>

          {/* 3.5 */}
          <div className="g4-sub-badge">Sección 5 — Cómo trabajás vos</div>
          <div className="g4-body">
            <p>La más ignorada y la que más diferencia hace. Definís la dinámica: cuándo querés opciones, cuánto detalle en las explicaciones, qué hacer si encuentra un bug que no pediste.</p>
          </div>
          <div className="g4-code">
            <div className="g4-code-label">Ejemplo real</div>
            <pre>{`## Cómo trabajo yo
- Primero entendé el problema, luego el código.
  No me des soluciones antes de confirmar
  que entendiste bien qué pido.
- Si algo tiene más de una forma de hacerse,
  dame opciones con pros y contras antes
  de elegir una.
- Prefiero código legible sobre código
  "inteligente". Simple siempre gana.
- No expliques lo que hiciste línea por línea.
  Explicame el porqué cuando no sea obvio.
- Si ves algo que se podría mejorar pero no
  te lo pedí, mencionalo pero no lo toques.`}</pre>
          </div>
        </div>

        <div className="g4-divider" />

        {/* ── SECCIÓN 4 — TEMPLATE ── */}
        <div className="g4-section" id="template">
          <div className="g4-section-label">Paso 04</div>
          <h2 className="g4-h2">El template <em>completo</em></h2>
          <div className="g4-body">
            <p>
              Copiá esto, pegalo en un archivo llamado <strong>CLAUDE.md</strong> en la raíz de tu proyecto, y reemplazá cada sección con tu información real. Un CLAUDE.md básico ya es mejor que ninguno.
            </p>
          </div>

          <div className="g4-code">
            <div className="g4-code-label">CLAUDE.md — Template completo</div>
            <pre>{`# CLAUDE.md — [Nombre de tu proyecto]

## ¿Qué es este proyecto?
[Descripción de 2-3 oraciones: qué hace la app,
para quién es y cuál es la función más importante.]

## Stack técnico
- Frontend: [framework y versión]
- Base de datos: [servicio]
- Deploy: [plataforma]
- Pagos: [servicio, si aplica]
- Estilos: [framework de CSS]
- [Cualquier otro servicio clave]

## Reglas que NO debes romper
- No toques [archivo crítico] sin avisarme
- No cambies el esquema de la BD sin mostrarme
  la migration primero
- No instales dependencias sin preguntarme
- [Tus convenciones de código]
- [Tus preferencias de estilo]

## Estado actual del proyecto
✅ [Qué ya funciona]
✅ [Qué ya funciona]
🔄 En progreso: [qué estás construyendo ahora]
❌ Pendiente: [qué falta]
❌ Pendiente: [qué falta]

## Cómo trabajo yo
- [Tu proceso de decisión]
- [Cuándo querés opciones antes de implementar]
- [Qué nivel de explicación preferís]
- [Qué hacer si encuentra un bug que no pediste]

## Contexto de negocio (opcional)
- [Precio del producto, si ayuda a priorizar]
- [El pain principal de tu usuario]
- [El tono de la plataforma]`}</pre>
          </div>

          <div className="g4-callout">
            <div className="g4-callout-head">— Dónde va el archivo</div>
            <div className="g4-callout-body">
              En la <strong>raíz de tu proyecto</strong>, al mismo nivel que package.json o README.md. Claude Code lo detecta automáticamente cuando abrís esa carpeta.
            </div>
          </div>
        </div>

        <div className="g4-divider" />

        {/* ── SECCIÓN 5 — ERRORES ── */}
        <div className="g4-section" id="errores">
          <div className="g4-section-label">Paso 05</div>
          <h2 className="g4-h2">Errores que<br /><em>arruinan el archivo</em></h2>

          <div className="g4-anatomy">
            {[
              ['✗ Hacerlo demasiado largo',          'Si CLAUDE.md tiene más de 200 líneas, Claude va a priorizar lo de arriba y olvidar lo de abajo. Sé selectivo. Ponés solo lo que realmente cambia su comportamiento.'],
              ['✗ Reglas vagas',                     '"Escribí buen código" o "sé cuidadoso" no significan nada. Las reglas tienen que ser verificables: "no uses any en TypeScript", "no instales dependencias sin preguntar".'],
              ['✗ No actualizarlo',                  'Si el estado dice que Stripe está pendiente pero ya lo implementaste, Claude puede tomar decisiones raras. Actualizalo cada vez que terminás algo importante.'],
              ['✗ Copiar el de otro proyecto sin adaptar', 'Las reglas de otro proyecto pueden contradecir tu realidad. Si copiás "no uses CSS modules" pero vos sí los usás, Claude va a ignorar los que ya tenés.'],
              ['✗ No incluir "cómo trabajo yo"',     'La más ignorada. Sin ella, Claude elige cómo comunicarse por defecto — y puede no coincidir con lo que necesitás.'],
            ].map(([tag, text]) => (
              <div key={tag} className="g4-anatomy-block">
                <div className="g4-anatomy-tag bad">{tag}</div>
                <div className="g4-anatomy-text">{text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CHECKLIST */}
        <div className="g4-checklist">
          <div className="g4-checklist-label">Checklist antes de guardar tu CLAUDE.md</div>
          <div className="g4-checklist-items">
            {[
              '¿Expliqué qué hace el proyecto y para quién?',
              '¿Listé el stack con las alternativas que no uso?',
              '¿Las reglas son concretas y verificables?',
              '¿El estado refleja dónde está el proyecto hoy?',
              '¿Expliqué cómo me gusta trabajar y tomar decisiones?',
              '¿El archivo tiene menos de 150 líneas?',
            ].map(item => (
              <div key={item} className="g4-check-item">
                <span className="g4-check-dot">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="g4-cta">
          <div className="g4-cta-tag">— accionable ahora</div>
          <h3>Ahora creá <em>el tuyo.</em></h3>
          <p>
            Abrí tu proyecto, creá un archivo CLAUDE.md en la raíz<br />
            y completá las 5 secciones. Tarda menos de 20 minutos.<br />
            Ese tiempo lo recuperás en la primera sesión.
          </p>
          <a className="g4-cta-btn" href="/recursos">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
