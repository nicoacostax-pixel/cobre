import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo hacer un CLAUDE.md — Guía 04 · Nico IA',
  description: 'El archivo que le enseña a Claude tu proyecto, tus reglas y cómo trabajas. Una vez que lo escribís, no volvés a empezar desde cero nunca más.',
}

export default function Guia04Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#050505;color:#e0e0e0;min-height:100vh;-webkit-font-smoothing:antialiased}
        body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,42,109,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,42,109,.03) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0}
        :root{--pink:#ff2a6d;--pink-dim:rgba(255,42,109,.15);--pink-glow:rgba(255,42,109,.35);--surface:#0f0f0f;--surface2:#161616;--border:rgba(255,255,255,.06);--border-pink:rgba(255,42,109,.25)}

        .g1-nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border);background:rgba(5,5,5,.92);backdrop-filter:blur(12px)}
        .g1-logo{font-family:'Poppins',sans-serif;font-weight:900;font-size:18px;color:#fff;text-decoration:none}
        .g1-logo span{color:var(--pink)}
        .g1-back{display:flex;align-items:center;gap:6px;font-size:13px;color:#666;text-decoration:none;font-weight:500;transition:color .2s}
        .g1-back:hover{color:var(--pink)}

        .g1-wrap{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 24px 100px}

        .g1-header{padding:48px 0 40px}
        .g1-breadcrumb{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#444;margin-bottom:16px}
        .g1-breadcrumb span{color:var(--pink)}
        .g1-meta-pill{display:inline-flex;align-items:center;gap:12px;background:var(--pink-dim);border:1px solid var(--border-pink);border-radius:999px;padding:7px 18px;font-size:11px;font-weight:700;color:var(--pink);letter-spacing:.06em;text-transform:uppercase;margin-bottom:24px}
        .g1-meta-dot{width:4px;height:4px;border-radius:50%;background:rgba(255,42,109,.4)}
        .g1-h1{font-family:'Poppins',sans-serif;font-size:2.6rem;font-weight:900;line-height:1.08;letter-spacing:-.02em;margin-bottom:20px;color:#fff}
        .g1-h1 em{font-style:normal;color:var(--pink)}
        .g1-intro{font-size:16px;color:#ccc;line-height:1.8;margin-bottom:28px}
        .g1-readtime{display:flex;gap:20px;font-size:13px;color:#aaa;font-weight:500}
        .g1-readtime span{display:flex;align-items:center;gap:5px}

        .g1-overview{background:var(--surface);border-radius:20px;border:1px solid var(--border);padding:28px;margin:32px 0}
        .g1-overview-title{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#444;margin-bottom:18px}
        .g1-steps-list{display:flex;flex-direction:column;gap:0}
        .g1-step-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border)}
        .g1-step-row:last-child{border-bottom:none}
        .g1-step-left{display:flex;align-items:center;gap:14px}
        .g1-step-num{font-family:'Poppins',sans-serif;font-size:11px;font-weight:900;color:var(--pink);letter-spacing:.05em;width:24px;text-shadow:0 0 10px var(--pink-glow)}
        .g1-step-name{font-size:14px;font-weight:700;color:#e0e0e0}
        .g1-step-tag{font-size:11px;font-weight:700;color:var(--pink);letter-spacing:.04em;text-transform:uppercase}

        .g1-toc{background:rgba(255,42,109,.05);border:1px solid var(--border-pink);border-radius:16px;padding:22px 24px;margin:0 0 48px}
        .g1-toc-title{font-size:13px;font-weight:800;color:#e0e0e0;margin-bottom:14px}
        .g1-toc-list{list-style:none;display:flex;flex-direction:column;gap:8px}
        .g1-toc-list a{font-size:13px;color:var(--pink);text-decoration:none;font-weight:600;display:flex;align-items:center;gap:8px;transition:opacity .2s}
        .g1-toc-list a:hover{opacity:.7}
        .g1-toc-list a::before{content:'→';font-size:11px;opacity:.6}

        .g1-section{margin-bottom:60px}
        .g1-section-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--pink);margin-bottom:10px;display:flex;align-items:center;gap:8px}
        .g1-section-label::before{content:'';display:block;width:20px;height:2px;background:var(--pink);border-radius:2px}
        .g1-section-h2{font-family:'Poppins',sans-serif;font-size:1.7rem;font-weight:900;line-height:1.15;letter-spacing:-.015em;color:#fff;margin-bottom:16px}
        .g1-section-h2 em{font-style:normal;color:var(--pink)}
        .g1-section-body{font-size:15px;color:#ccc;line-height:1.85}
        .g1-section-body p{margin-bottom:16px}
        .g1-section-body p:last-child{margin-bottom:0}
        .g1-section-body strong{color:#fff;font-weight:700}

        .g1-problem-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:24px 0}
        @media(max-width:580px){.g1-problem-grid{grid-template-columns:1fr}}
        .g1-problem-card{background:var(--surface);border-radius:16px;padding:20px;border:1px solid var(--border)}
        .g1-problem-card.bad{border-color:rgba(255,60,60,.2)}
        .g1-problem-card.good{border:2px solid var(--border-pink)}
        .g1-problem-label{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px}
        .g1-problem-card.bad .g1-problem-label{color:#ff5555}
        .g1-problem-card.good .g1-problem-label{color:var(--pink)}
        .g1-problem-text{font-size:13px;line-height:1.65;color:#bbb;font-style:italic}
        .g1-problem-card.good .g1-problem-text{color:#e0e0e0}
        .g1-problem-result{margin-top:10px;font-size:12px;font-weight:600;color:#888}
        .g1-problem-card.good .g1-problem-result{color:var(--pink)}

        .g1-code{background:#070707;border:1px solid var(--border);border-radius:16px;padding:24px;margin:24px 0;overflow-x:auto}
        .g1-code-label{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#444;margin-bottom:14px}
        .g1-code pre{font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.75;color:#bbb;white-space:pre-wrap;word-break:break-word}
        .g1-code .cm{color:#444}
        .g1-code .kw{color:#ff6b9d}
        .g1-code .st{color:#7fffd4}
        .g1-code .hl{background:rgba(255,42,109,.12);border-radius:4px;padding:0 2px}

        .g1-callout{background:var(--surface);border-radius:16px;padding:22px 24px;border:1px solid var(--border);border-left:3px solid var(--pink);margin:24px 0}
        .g1-callout.warn{border-left-color:#ffc500}
        .g1-callout-head{font-size:13px;font-weight:800;color:#e0e0e0;margin-bottom:8px;display:flex;align-items:center;gap:8px}
        .g1-callout.warn .g1-callout-head{color:#ffc500}
        .g1-callout-body{font-size:13px;color:#ccc;line-height:1.7}
        .g1-callout-body strong{color:#fff;font-weight:700}

        .g1-formula{background:var(--surface);border-radius:20px;border:2px solid var(--border-pink);padding:28px;margin:24px 0;text-align:center}
        .g1-formula-title{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--pink);margin-bottom:16px}
        .g1-formula-parts{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px}
        .g1-formula-part{background:rgba(255,42,109,.1);border-radius:10px;padding:10px 18px;font-size:14px;font-weight:700;color:var(--pink)}
        .g1-formula-op{font-size:18px;color:#333;font-weight:700}

        .g1-anatomy{display:flex;flex-direction:column;gap:10px;margin:24px 0}
        .g1-anatomy-block{border-radius:14px;padding:18px 20px;border:1px solid var(--border)}
        .g1-anatomy-tag{font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--pink);margin-bottom:6px}
        .g1-anatomy-text{font-size:14px;color:#bbb;line-height:1.6}
        .g1-anatomy-note{font-size:12px;color:#888;margin-top:4px}
        .g1-anatomy-block.highlighted{border-color:var(--border-pink);background:rgba(255,42,109,.04)}
        .g1-anatomy-block:not(.highlighted){background:var(--surface)}

        .g1-section-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,42,109,.08);border:1px solid var(--border-pink);border-radius:8px;padding:4px 12px;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--pink);font-weight:500;margin-bottom:16px}

        .g1-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(255,42,109,.2),transparent);margin:48px 0}

        .g1-checklist{background:#070707;border:1px solid var(--border);border-radius:16px;padding:24px;margin:24px 0}
        .g1-checklist-label{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#444;margin-bottom:14px}
        .g1-checklist-items{display:flex;flex-direction:column;gap:10px}
        .g1-check-item{display:flex;align-items:flex-start;gap:12px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.5;color:#ccc}
        .g1-check-box{width:18px;height:18px;border-radius:4px;background:var(--pink);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;box-shadow:0 0 8px rgba(255,42,109,.3)}
        .g1-check-box::after{content:'✓';font-size:11px;color:white;font-family:'Inter',sans-serif;font-weight:700}

        .g1-cta{background:linear-gradient(135deg,#1a0010,#2a0015);border:1px solid var(--border-pink);border-radius:24px;padding:40px;text-align:center;margin-top:60px;box-shadow:0 0 60px rgba(255,42,109,.08)}
        .g1-cta h3{font-family:'Poppins',sans-serif;font-size:1.5rem;font-weight:900;color:#fff;margin-bottom:10px}
        .g1-cta p{font-size:14px;color:#ccc;line-height:1.7;margin-bottom:24px}
        .g1-cta-btn{display:inline-flex;align-items:center;gap:8px;background:var(--pink);color:white;padding:14px 28px;border-radius:14px;font-size:14px;font-weight:800;font-family:'Inter',sans-serif;text-decoration:none;transition:transform .15s,box-shadow .15s,opacity .2s;box-shadow:0 0 24px var(--pink-glow)}
        .g1-cta-btn:hover{transform:translateY(-2px);box-shadow:0 0 36px var(--pink-glow);opacity:.9}

        @media(max-width:600px){
          .g1-h1{font-size:2rem}
          .g1-section-h2{font-size:1.35rem}
        }
      `}</style>

      <nav className="g1-nav">
        <a className="g1-logo" href="/">Nico <span>IA_</span></a>
        <a className="g1-back" href="/recursos">← Recursos</a>
      </nav>

      <div className="g1-wrap">

        {/* HEADER */}
        <div className="g1-header">
          <div className="g1-breadcrumb">GUÍA · <span>PROMPTS</span></div>
          <div className="g1-meta-pill">
            10 min<span className="g1-meta-dot" />con template incluido<span className="g1-meta-dot" />gratis
          </div>
          <h1 className="g1-h1">
            El archivo que le enseña<br />a Claude <em>tu proyecto.</em>
          </h1>
          <p className="g1-intro">
            CLAUDE.md es un archivo de texto que vivie en tu carpeta de proyecto. Cada vez que abrís Claude Code, él lo lee primero. Ahí ponés quién sos, cómo está estructurado el código, qué reglas no puede romper, y cómo trabajás vos. Una vez que lo escribís bien, no volvés a repetirte nunca más.
          </p>
          <div className="g1-readtime">
            <span>⏱ 10 min de lectura</span>
            <span>📄 template listo para copiar</span>
          </div>
        </div>

        {/* STEP OVERVIEW */}
        <div className="g1-overview">
          <div className="g1-overview-title">Lo que vas a aprender</div>
          <div className="g1-steps-list">
            <div className="g1-step-row">
              <div className="g1-step-left">
                <span className="g1-step-num">01</span>
                <span className="g1-step-name">Qué es CLAUDE.md y por qué importa</span>
              </div>
              <span className="g1-step-tag">El problema que resuelve</span>
            </div>
            <div className="g1-step-row">
              <div className="g1-step-left">
                <span className="g1-step-num">02</span>
                <span className="g1-step-name">Las 5 secciones esenciales</span>
              </div>
              <span className="g1-step-tag">La estructura que funciona</span>
            </div>
            <div className="g1-step-row">
              <div className="g1-step-left">
                <span className="g1-step-num">03</span>
                <span className="g1-step-name">Cómo escribir cada sección</span>
              </div>
              <span className="g1-step-tag">Ejemplos reales</span>
            </div>
            <div className="g1-step-row">
              <div className="g1-step-left">
                <span className="g1-step-num">04</span>
                <span className="g1-step-name">El template completo</span>
              </div>
              <span className="g1-step-tag">Copiá y adaptá</span>
            </div>
            <div className="g1-step-row">
              <div className="g1-step-left">
                <span className="g1-step-num">05</span>
                <span className="g1-step-name">Errores que arruinan el archivo</span>
              </div>
              <span className="g1-step-tag">Qué NO hacer</span>
            </div>
          </div>
        </div>

        {/* TOC */}
        <div className="g1-toc">
          <div className="g1-toc-title">El recorrido ↓</div>
          <ul className="g1-toc-list">
            <li><a href="#que-es">Qué es CLAUDE.md y por qué existe</a></li>
            <li><a href="#secciones">Las 5 secciones esenciales</a></li>
            <li><a href="#como-escribir">Cómo escribir cada sección bien</a></li>
            <li><a href="#template">El template completo</a></li>
            <li><a href="#errores">Errores que arruinan el archivo</a></li>
          </ul>
        </div>

        {/* SECTION 1 */}
        <div className="g1-section" id="que-es">
          <div className="g1-section-label">PASO 01</div>
          <h2 className="g1-section-h2">Qué es CLAUDE.md <em>y por qué existe</em></h2>
          <div className="g1-section-body">
            <p>
              Cuando abrís Claude Code en una carpeta de proyecto, lo primero que hace es buscar un archivo llamado <strong>CLAUDE.md</strong> en esa carpeta. Si lo encuentra, lo lee completo antes de hacer cualquier cosa. Es su briefing de incorporación.
            </p>
            <p>
              Sin ese archivo, Claude Code arranca sin contexto. No sabe si estás construyendo una tienda online o una app médica. No sabe si usás TypeScript o Python. No sabe si hay partes del código que no debe tocar. Tiene que adivinar, y cuando adivina, se equivoca.
            </p>
            <p>
              Con un buen CLAUDE.md, Claude arranca sabiendo exactamente dónde está parado. Menos correcciones, menos idas y vueltas, mejor código desde el primer intento.
            </p>
          </div>

          <div className="g1-problem-grid">
            <div className="g1-problem-card bad">
              <div className="g1-problem-label">✗ Sin CLAUDE.md</div>
              <p className="g1-problem-text">Claude hace suposiciones sobre tu stack, tu estilo y tus reglas. Tenés que corregirlo en cada sesión.</p>
              <p className="g1-problem-result">Tiempo perdido. Código inconsistente.</p>
            </div>
            <div className="g1-problem-card good">
              <div className="g1-problem-label">✓ Con CLAUDE.md</div>
              <p className="g1-problem-text">Claude sabe tu stack, tus convenciones, lo que no puede tocar y cómo tomás decisiones.</p>
              <p className="g1-problem-result">Contexto instantáneo. Cada sesión arranca bien.</p>
            </div>
          </div>

          <div className="g1-callout">
            <div className="g1-callout-head">💡 Pensalo como un manual de onboarding</div>
            <div className="g1-callout-body">
              Imaginá que contratas a un desarrollador nuevo. Lo primero que hacés es darle un documento que explica el proyecto: qué es, cómo está organizado, qué reglas hay. CLAUDE.md es exactamente eso, pero para tu asistente de IA.
            </div>
          </div>
        </div>

        <div className="g1-divider" />

        {/* SECTION 2 */}
        <div className="g1-section" id="secciones">
          <div className="g1-section-label">PASO 02</div>
          <h2 className="g1-section-h2">Las <em>5 secciones</em> esenciales</h2>
          <div className="g1-section-body">
            <p>
              Un CLAUDE.md que funciona tiene cinco bloques. Podés agregarle más, pero estos cinco son los que Claude realmente usa para tomar mejores decisiones.
            </p>
          </div>

          <div className="g1-anatomy">
            <div className="g1-anatomy-block highlighted">
              <div className="g1-anatomy-tag">1 · Qué es el proyecto</div>
              <div className="g1-anatomy-text">Una descripción corta: qué construís, para quién, cuál es el objetivo principal.</div>
              <div className="g1-anatomy-note">2-3 oraciones. Sin tecnicismos innecesarios.</div>
            </div>
            <div className="g1-anatomy-block highlighted">
              <div className="g1-anatomy-tag">2 · Stack técnico</div>
              <div className="g1-anatomy-text">Las tecnologías que usás: lenguaje, framework, base de datos, servicios externos.</div>
              <div className="g1-anatomy-note">Claude adapta el código a lo que ya tenés.</div>
            </div>
            <div className="g1-anatomy-block highlighted">
              <div className="g1-anatomy-tag">3 · Reglas que no puede romper</div>
              <div className="g1-anatomy-text">Las restricciones no negociables: archivos que no toca, patrones que no usa, decisiones que requieren tu aprobación.</div>
              <div className="g1-anatomy-note">Esta sección previene el 80% de los problemas.</div>
            </div>
            <div className="g1-anatomy-block highlighted">
              <div className="g1-anatomy-tag">4 · Estado actual del proyecto</div>
              <div className="g1-anatomy-text">Qué está listo, qué está en progreso, qué falta. Con emojis o bullets simples.</div>
              <div className="g1-anatomy-note">Claude no rompe lo que ya funciona.</div>
            </div>
            <div className="g1-anatomy-block highlighted">
              <div className="g1-anatomy-tag">5 · Cómo trabajás vos</div>
              <div className="g1-anatomy-text">Tu proceso de decisión, tu estilo preferido de respuesta, cuándo querés opciones antes de que implemente.</div>
              <div className="g1-anatomy-note">Lo más ignorado. El que más cambia la experiencia.</div>
            </div>
          </div>
        </div>

        <div className="g1-divider" />

        {/* SECTION 3 */}
        <div className="g1-section" id="como-escribir">
          <div className="g1-section-label">PASO 03</div>
          <h2 className="g1-section-h2">Cómo escribir <em>cada sección bien</em></h2>

          <div className="g1-section-badge">Sección 1 — Qué es el proyecto</div>
          <div className="g1-section-body">
            <p>
              No es un pitch de ventas ni un readme para GitHub. Es contexto para Claude. Explicá qué hace la app, quién la usa y cuál es el core que no puede fallar.
            </p>
          </div>
          <div className="g1-problem-grid">
            <div className="g1-problem-card bad">
              <div className="g1-problem-label">✗ Demasiado vago</div>
              <p className="g1-problem-text">"Una plataforma educativa con cursos online."</p>
              <p className="g1-problem-result">Claude no sabe nada útil</p>
            </div>
            <div className="g1-problem-card good">
              <div className="g1-problem-label">✓ Contexto real</div>
              <p className="g1-problem-text">"Academia de IA para emprendedoras hispanohablantes sin background técnico. El core es el área de alumnas: acceso a cursos, progreso y comunidad."</p>
              <p className="g1-problem-result">Claude entiende prioridades y audiencia</p>
            </div>
          </div>

          <div className="g1-section-badge" style={{marginTop: '32px'}}>Sección 2 — Stack técnico</div>
          <div className="g1-section-body">
            <p>
              Listá las tecnologías principales. No hace falta que sean todas — solo las que Claude puede necesitar para tomar decisiones: ¿Uso fetch o axios? ¿Guardo en localStorage o en la base de datos? ¿Hay un ORM o queries directas?
            </p>
          </div>
          <div className="g1-code">
            <div className="g1-code-label">Ejemplo de stack bien declarado</div>
            <pre>{`## Stack técnico
- Frontend: Next.js 14 (App Router) — NO Pages Router
- Base de datos: Supabase (Postgres + Auth + Storage)
- Deploy: Vercel (rama main = producción automática)
- Pagos: Stripe (webhooks ya configurados en /api/webhooks/stripe)
- Estilos: Tailwind CSS — sin CSS modules, sin styled-components
- ORM: ninguno — queries directas con el cliente de Supabase`}</pre>
          </div>
          <div className="g1-callout">
            <div className="g1-callout-head">💡 Lo que más ayuda aquí</div>
            <div className="g1-callout-body">
              Aclarar las alternativas que <strong>no usás</strong>. "Sin CSS modules" le dice a Claude que no cree archivos .module.css aunque le parezca una buena idea.
            </div>
          </div>

          <div className="g1-section-badge" style={{marginTop: '32px'}}>Sección 3 — Reglas que no puede romper</div>
          <div className="g1-section-body">
            <p>
              Esta es la sección más importante. Claude, por defecto, intenta ser útil y puede hacer cambios que no pediste si cree que mejoran el código. Las reglas son la forma de controlarlo.
            </p>
          </div>
          <div className="g1-code">
            <div className="g1-code-label">Tipos de reglas que funcionan</div>
            <pre>{`## Reglas que NO debes romper

// Archivos protegidos
- No toques /lib/auth.ts sin avisarme primero
- No modifiques /middleware.ts — está delicado

// Antes de actuar
- No cambies el esquema de la BD sin mostrarme
  el migration primero
- No instales dependencias sin preguntarme si
  ya existe una nativa

// Convenciones de código
- Siempre escribe comentarios en español
- Nunca uses \`any\` en TypeScript
- Componentes: PascalCase · funciones: camelCase

// Estilo de respuesta
- Si algo tiene más de una solución, dame opciones
  antes de implementar
- Si detectás un bug que no te pedí revisar,
  avisame pero no lo toques sin permiso`}</pre>
          </div>

          <div className="g1-section-badge" style={{marginTop: '32px'}}>Sección 4 — Estado actual</div>
          <div className="g1-section-body">
            <p>
              Claude no puede ver tu Notion ni tu cabeza. Esta sección le dice en qué punto está el proyecto para que no rompa lo que ya funciona, no intente implementar algo que ya existe, y enfoque su energía en lo que falta.
            </p>
          </div>
          <div className="g1-code">
            <div className="g1-code-label">Formato simple que funciona</div>
            <pre>{`## Estado actual del proyecto
✅ Autenticación con Supabase lista
✅ Landing page desplegada en Vercel
✅ Módulo 1 del curso subido y funcionando
🔄 En progreso: pasarela de pagos con Stripe
❌ Pendiente: área de miembros
❌ Pendiente: dashboard de progreso de alumnas`}</pre>
          </div>
          <div className="g1-callout warn">
            <div className="g1-callout-head">⚠ Actualizalo seguido</div>
            <div className="g1-callout-body">
              Un estado desactualizado confunde más que no tener uno. Cada vez que marcás algo como listo, actualizá el archivo. Tarda 20 segundos.
            </div>
          </div>

          <div className="g1-section-badge" style={{marginTop: '32px'}}>Sección 5 — Cómo trabajás vos</div>
          <div className="g1-section-body">
            <p>
              Esta sección define la dinámica de trabajo. Le decís a Claude cómo tomás decisiones, cuándo querés que proponga opciones en vez de implementar directamente, y cuánto detalle querés en las explicaciones.
            </p>
          </div>
          <div className="g1-code">
            <div className="g1-code-label">Ejemplo real</div>
            <pre>{`## Cómo trabajo yo
- Primero entiendo el problema, luego el código.
  No me des soluciones antes de asegurarte
  de que entendiste bien qué pido.
- Si algo tiene más de una forma de hacerse,
  dame las opciones con pros y contras antes
  de elegir una.
- Prefiero código legible sobre código "inteligente".
  Si algo se puede hacer de forma simple, hacelo simple.
- No expliques lo que hiciste línea por línea.
  Explicame el porqué cuando no sea obvio.
- Si ves algo que se podría mejorar pero no te
  lo pedí, mencionalo pero no lo toques.`}</pre>
          </div>
        </div>

        <div className="g1-divider" />

        {/* SECTION 4 — TEMPLATE */}
        <div className="g1-section" id="template">
          <div className="g1-section-label">PASO 04</div>
          <h2 className="g1-section-h2">El template <em>completo</em></h2>
          <div className="g1-section-body">
            <p>
              Copiá esto, pegalo en un archivo llamado <strong>CLAUDE.md</strong> en la raíz de tu proyecto, y reemplazá cada sección con tu información real. No tiene que ser perfecto desde el principio — un CLAUDE.md básico ya es mejor que ninguno.
            </p>
          </div>

          <div className="g1-code">
            <div className="g1-code-label">CLAUDE.md — Template completo</div>
            <pre>{`# CLAUDE.md — [Nombre de tu proyecto]

## ¿Qué es este proyecto?
[Una descripción de 2-3 oraciones: qué hace la app,
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
- [Cuándo querés opciones antes de que implemente]
- [Qué nivel de explicación preferís]
- [Qué hacer si encuentra un bug que no pediste]

## Contexto de negocio (opcional)
- [Precio del producto, si ayuda a priorizar]
- [El pain principal de tu usuario]
- [El tono de la plataforma]`}</pre>
          </div>

          <div className="g1-callout">
            <div className="g1-callout-head">✓ Dónde va el archivo</div>
            <div className="g1-callout-body">
              En la <strong>raíz de tu proyecto</strong>, al mismo nivel que package.json o README.md. Claude Code lo detecta automáticamente cuando abrís esa carpeta.
            </div>
          </div>
        </div>

        <div className="g1-divider" />

        {/* SECTION 5 — ERRORES */}
        <div className="g1-section" id="errores">
          <div className="g1-section-label">PASO 05</div>
          <h2 className="g1-section-h2">Errores que <em>arruinan el archivo</em></h2>

          <div className="g1-anatomy">
            <div className="g1-anatomy-block">
              <div className="g1-anatomy-tag" style={{color:'#ff5555'}}>✗ Hacerlo demasiado largo</div>
              <div className="g1-anatomy-text">Si CLAUDE.md tiene más de 200 líneas, Claude va a priorizar lo de arriba y olvidar lo de abajo. Sé selectivo. Ponés solo lo que realmente cambia su comportamiento.</div>
            </div>
            <div className="g1-anatomy-block">
              <div className="g1-anatomy-tag" style={{color:'#ff5555'}}>✗ Reglas vagas</div>
              <div className="g1-anatomy-text">"Escribí buen código" o "sé cuidadoso" no significan nada. Las reglas tienen que ser verificables: "no uses any en TypeScript", "no instales dependencias sin preguntar".</div>
            </div>
            <div className="g1-anatomy-block">
              <div className="g1-anatomy-tag" style={{color:'#ff5555'}}>✗ No actualizarlo</div>
              <div className="g1-anatomy-text">Si el estado dice que Stripe está pendiente pero ya lo implementaste, Claude puede tomar decisiones raras. Actualizalo cada vez que termines algo importante.</div>
            </div>
            <div className="g1-anatomy-block">
              <div className="g1-anatomy-tag" style={{color:'#ff5555'}}>✗ Copiar el de otro proyecto sin adaptar</div>
              <div className="g1-anatomy-text">Las reglas de otro proyecto pueden contradecir tu realidad. Por ejemplo, si copiás "no uses CSS modules" pero vos sí los usás, Claude va a ignorar los que ya tenés.</div>
            </div>
            <div className="g1-anatomy-block">
              <div className="g1-anatomy-tag" style={{color:'#ff5555'}}>✗ No incluir la sección de "cómo trabajo yo"</div>
              <div className="g1-anatomy-text">Es la más ignorada y la que más cambia la experiencia. Sin ella, Claude elige cómo comunicarse por defecto — y puede no coincidir con lo que necesitás.</div>
            </div>
          </div>
        </div>

        {/* CHECKLIST */}
        <div className="g1-checklist">
          <div className="g1-checklist-label">Checklist antes de guardar tu CLAUDE.md</div>
          <div className="g1-checklist-items">
            <div className="g1-check-item">
              <div className="g1-check-box" />
              <span>¿Expliqué qué hace el proyecto y para quién?</span>
            </div>
            <div className="g1-check-item">
              <div className="g1-check-box" />
              <span>¿Listé el stack con versiones y alternativas que NO uso?</span>
            </div>
            <div className="g1-check-item">
              <div className="g1-check-box" />
              <span>¿Las reglas son concretas y verificables?</span>
            </div>
            <div className="g1-check-item">
              <div className="g1-check-box" />
              <span>¿El estado refleja dónde está realmente el proyecto hoy?</span>
            </div>
            <div className="g1-check-item">
              <div className="g1-check-box" />
              <span>¿Expliqué cómo me gusta trabajar y tomar decisiones?</span>
            </div>
            <div className="g1-check-item">
              <div className="g1-check-box" />
              <span>¿El archivo tiene menos de 150 líneas?</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="g1-cta">
          <h3>Ahora creá el tuyo.</h3>
          <p>
            Abrí tu proyecto, creá un archivo CLAUDE.md en la raíz<br />
            y completá las 5 secciones. Tarda menos de 20 minutos.<br />
            Ese tiempo lo recuperás en la primera sesión.
          </p>
          <a className="g1-cta-btn" href="/recursos">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
