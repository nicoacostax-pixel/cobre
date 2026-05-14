import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tu primer prompt con Claude — Guía 01 · Nico IA',
  description: 'Modelo, instrucciones, tono y formato. El setup que hace que Claude entienda exactamente lo que necesitas desde el primer mensaje.',
}

export default function Guia01Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#FDFAE6;color:#1a1a1a;min-height:100vh;-webkit-font-smoothing:antialiased}

        /* nav */
        .g1-nav{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid rgba(124,92,191,.1);background:#FDFAE6;position:sticky;top:0;z-index:100;backdrop-filter:blur(8px)}
        .g1-logo{font-family:'Poppins',sans-serif;font-weight:900;font-size:18px;color:#574088;text-decoration:none}
        .g1-back{display:flex;align-items:center;gap:6px;font-size:13px;color:#aaa;text-decoration:none;font-weight:500;transition:color .2s}
        .g1-back:hover{color:#7C5CBF}

        /* layout */
        .g1-wrap{max-width:720px;margin:0 auto;padding:0 24px 100px}

        /* header */
        .g1-header{padding:48px 0 40px}
        .g1-breadcrumb{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#bbb;margin-bottom:16px}
        .g1-breadcrumb span{color:#7C5CBF}
        .g1-meta-pill{display:inline-flex;align-items:center;gap:12px;background:white;border:1.5px solid #e8e0f8;border-radius:999px;padding:7px 18px;font-size:11px;font-weight:700;color:#7C5CBF;letter-spacing:.06em;text-transform:uppercase;margin-bottom:24px}
        .g1-meta-dot{width:4px;height:4px;border-radius:50%;background:#d0c0f0}
        .g1-h1{font-family:'Poppins',sans-serif;font-size:2.6rem;font-weight:900;line-height:1.08;letter-spacing:-.02em;margin-bottom:20px;color:#1a1a1a}
        .g1-h1 em{font-style:normal;color:#7C5CBF}
        .g1-intro{font-size:16px;color:#555;line-height:1.8;margin-bottom:28px}
        .g1-readtime{display:flex;gap:20px;font-size:13px;color:#aaa;font-weight:500}
        .g1-readtime span{display:flex;align-items:center;gap:5px}

        /* step overview */
        .g1-overview{background:white;border-radius:20px;border:1px solid #f0ecff;padding:28px;margin:32px 0}
        .g1-overview-title{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#bbb;margin-bottom:18px}
        .g1-steps-list{display:flex;flex-direction:column;gap:0}
        .g1-step-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #f5f0ff}
        .g1-step-row:last-child{border-bottom:none}
        .g1-step-left{display:flex;align-items:center;gap:14px}
        .g1-step-num{font-family:'Poppins',sans-serif;font-size:11px;font-weight:900;color:#ddd;letter-spacing:.05em;width:24px}
        .g1-step-name{font-size:14px;font-weight:700;color:#1a1a1a}
        .g1-step-tag{font-size:11px;font-weight:700;color:#7C5CBF;letter-spacing:.04em;text-transform:uppercase}

        /* toc */
        .g1-toc{background:#ede8f8;border-radius:16px;padding:22px 24px;margin:0 0 48px}
        .g1-toc-title{font-size:13px;font-weight:800;color:#574088;margin-bottom:14px}
        .g1-toc-list{list-style:none;display:flex;flex-direction:column;gap:8px}
        .g1-toc-list a{font-size:13px;color:#7C5CBF;text-decoration:none;font-weight:600;display:flex;align-items:center;gap:8px;transition:color .2s}
        .g1-toc-list a:hover{color:#574088}
        .g1-toc-list a::before{content:'→';font-size:11px;opacity:.6}

        /* section */
        .g1-section{margin-bottom:60px}
        .g1-section-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#7C5CBF;margin-bottom:10px;display:flex;align-items:center;gap:8px}
        .g1-section-label::before{content:'';display:block;width:20px;height:2px;background:#7C5CBF;border-radius:2px}
        .g1-section-h2{font-family:'Poppins',sans-serif;font-size:1.7rem;font-weight:900;line-height:1.15;letter-spacing:-.015em;color:#1a1a1a;margin-bottom:16px}
        .g1-section-h2 em{font-style:normal;color:#7C5CBF}
        .g1-section-body{font-size:15px;color:#555;line-height:1.85}
        .g1-section-body p{margin-bottom:16px}
        .g1-section-body p:last-child{margin-bottom:0}
        .g1-section-body strong{color:#1a1a1a;font-weight:700}

        /* problem cards */
        .g1-problem-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:24px 0}
        @media(max-width:580px){.g1-problem-grid{grid-template-columns:1fr}}
        .g1-problem-card{background:white;border-radius:16px;padding:20px;border:1px solid #f0ecff}
        .g1-problem-card.bad{border-color:#fce8ef}
        .g1-problem-card.good{border-color:#e8f0ff;border-width:2px;border-color:#7C5CBF}
        .g1-problem-label{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px}
        .g1-problem-card.bad .g1-problem-label{color:#c0394a}
        .g1-problem-card.good .g1-problem-label{color:#7C5CBF}
        .g1-problem-text{font-size:13px;line-height:1.65;color:#666;font-style:italic}
        .g1-problem-card.good .g1-problem-text{color:#1a1a1a}
        .g1-problem-result{margin-top:10px;font-size:12px;font-weight:600;color:#888}
        .g1-problem-card.good .g1-problem-result{color:#7C5CBF}

        /* code block */
        .g1-code{background:#1a1525;border-radius:16px;padding:24px;margin:24px 0;overflow-x:auto}
        .g1-code-label{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8878aa;margin-bottom:14px}
        .g1-code pre{font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.75;color:#e2d8f8;white-space:pre-wrap;word-break:break-word}
        .g1-code .cm{color:#6b5a8e}
        .g1-code .kw{color:#c78df0}
        .g1-code .st{color:#b8d9a0}
        .g1-code .hl{background:rgba(124,92,191,.2);border-radius:4px;padding:0 2px}

        /* callout */
        .g1-callout{background:white;border-radius:16px;padding:22px 24px;border:1px solid #f0ecff;border-left:4px solid #7C5CBF;margin:24px 0}
        .g1-callout.warn{border-left-color:#e0a020;background:#fffbf0}
        .g1-callout-head{font-size:13px;font-weight:800;color:#574088;margin-bottom:8px;display:flex;align-items:center;gap:8px}
        .g1-callout.warn .g1-callout-head{color:#9a6000}
        .g1-callout-body{font-size:13px;color:#666;line-height:1.7}
        .g1-callout-body strong{color:#1a1a1a;font-weight:700}

        /* formula */
        .g1-formula{background:white;border-radius:20px;border:2px solid #7C5CBF;padding:28px;margin:24px 0;text-align:center}
        .g1-formula-title{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#7C5CBF;margin-bottom:16px}
        .g1-formula-parts{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px}
        .g1-formula-part{background:#ede8f8;border-radius:10px;padding:10px 18px;font-size:14px;font-weight:700;color:#574088}
        .g1-formula-op{font-size:18px;color:#ccc;font-weight:700}

        /* checklist */
        .g1-checklist{background:#1a1525;border-radius:16px;padding:24px;margin:24px 0}
        .g1-checklist-label{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8878aa;margin-bottom:14px}
        .g1-checklist-items{display:flex;flex-direction:column;gap:10px}
        .g1-check-item{display:flex;align-items:flex-start;gap:12px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.5;color:#e2d8f8}
        .g1-check-box{width:18px;height:18px;border-radius:4px;background:#7C5CBF;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
        .g1-check-box::after{content:'✓';font-size:11px;color:white;font-family:'Inter',sans-serif;font-weight:700}

        /* anatomy card */
        .g1-anatomy{display:flex;flex-direction:column;gap:10px;margin:24px 0}
        .g1-anatomy-block{border-radius:14px;padding:18px 20px;border:1px solid #f0ecff}
        .g1-anatomy-tag{font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#7C5CBF;margin-bottom:6px}
        .g1-anatomy-text{font-size:14px;color:#444;line-height:1.6;font-style:italic}
        .g1-anatomy-note{font-size:12px;color:#bbb;margin-top:4px}
        .g1-anatomy-block.highlighted{border-color:#7C5CBF;background:white}
        .g1-anatomy-block:not(.highlighted){background:#FDFAE6}

        /* divider */
        .g1-divider{height:1px;background:linear-gradient(90deg,transparent,#e8e0f8,transparent);margin:48px 0}

        /* cta bottom */
        .g1-cta{background:linear-gradient(135deg,#7C5CBF,#574088);border-radius:24px;padding:40px;text-align:center;margin-top:60px}
        .g1-cta h3{font-family:'Poppins',sans-serif;font-size:1.5rem;font-weight:900;color:white;margin-bottom:10px}
        .g1-cta p{font-size:14px;color:#ddd4f8;line-height:1.7;margin-bottom:24px}
        .g1-cta-btn{display:inline-flex;align-items:center;gap:8px;background:white;color:#574088;padding:14px 28px;border-radius:14px;font-size:14px;font-weight:800;font-family:'Inter',sans-serif;text-decoration:none;transition:transform .15s,box-shadow .15s;box-shadow:0 4px 16px rgba(0,0,0,.15)}
        .g1-cta-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.2)}

        @media(max-width:600px){
          .g1-h1{font-size:2rem}
          .g1-section-h2{font-size:1.35rem}
        }
      `}</style>

      {/* NAV */}
      <nav className="g1-nav">
        <a className="g1-logo" href="/">Nico IA_</a>
        <a className="g1-back" href="/recursos">← Recursos</a>
      </nav>

      <div className="g1-wrap">

        {/* HEADER */}
        <div className="g1-header">
          <div className="g1-breadcrumb">GUÍA · <span>FUNDAMENTOS</span></div>
          <div className="g1-meta-pill">
            6 min<span className="g1-meta-dot" />ideal para empezar<span className="g1-meta-dot" />gratis
          </div>
          <h1 className="g1-h1">
            Tu primer<br /><em>prompt</em> con Claude.
          </h1>
          <p className="g1-intro">
            Modelo, instrucciones, tono y formato. El setup que hace que Claude entienda exactamente lo que necesitas — desde el primer mensaje, sin repetirte, sin improvisar.
          </p>
          <div className="g1-readtime">
            <span>⏱ 6 min de lectura</span>
            <span>⚡ accionable hoy</span>
          </div>
        </div>

        {/* STEP OVERVIEW */}
        <div className="g1-overview">
          <div className="g1-overview-title">Lo que vas a aprender</div>
          <div className="g1-steps-list">
            <div className="g1-step-row">
              <div className="g1-step-left">
                <span className="g1-step-num">01</span>
                <span className="g1-step-name">El problema real</span>
              </div>
              <span className="g1-step-tag">Por qué fallan la mayoría</span>
            </div>
            <div className="g1-step-row">
              <div className="g1-step-left">
                <span className="g1-step-num">02</span>
                <span className="g1-step-name">El rol</span>
              </div>
              <span className="g1-step-tag">Dale identidad a Claude</span>
            </div>
            <div className="g1-step-row">
              <div className="g1-step-left">
                <span className="g1-step-num">03</span>
                <span className="g1-step-name">La instrucción</span>
              </div>
              <span className="g1-step-tag">Cómo pedir bien</span>
            </div>
            <div className="g1-step-row">
              <div className="g1-step-left">
                <span className="g1-step-num">04</span>
                <span className="g1-step-name">El contexto</span>
              </div>
              <span className="g1-step-tag">Lo que cambia el resultado</span>
            </div>
            <div className="g1-step-row">
              <div className="g1-step-left">
                <span className="g1-step-num">05</span>
                <span className="g1-step-name">El formato</span>
              </div>
              <span className="g1-step-tag">Controla el output</span>
            </div>
            <div className="g1-step-row">
              <div className="g1-step-left">
                <span className="g1-step-num">06</span>
                <span className="g1-step-name">Tu prompt completo</span>
              </div>
              <span className="g1-step-tag">La fórmula final</span>
            </div>
          </div>
        </div>

        {/* TOC */}
        <div className="g1-toc">
          <div className="g1-toc-title">El recorrido ↓</div>
          <ul className="g1-toc-list">
            <li><a href="#problema">Por qué los prompts genéricos no funcionan</a></li>
            <li><a href="#rol">Dale a Claude un rol</a></li>
            <li><a href="#instruccion">Estructura la instrucción</a></li>
            <li><a href="#contexto">Agrega el contexto correcto</a></li>
            <li><a href="#formato">Controla el formato de salida</a></li>
            <li><a href="#formula">La fórmula completa</a></li>
          </ul>
        </div>

        {/* SECTION 1 */}
        <div className="g1-section" id="problema">
          <div className="g1-section-label">PASO 01</div>
          <h2 className="g1-section-h2">Por qué los prompts <em>genéricos</em> no funcionan</h2>
          <div className="g1-section-body">
            <p>
              La mayoría de las personas abre Claude y escribe algo como "ayúdame a escribir un correo" o "dame ideas de contenido". Claude responde, pero la respuesta es vaga, genérica, o simplemente no es lo que necesitaban.
            </p>
            <p>
              El problema no es Claude. El problema es que no se le dio suficiente información para responder bien. Claude es extremadamente capaz — pero necesita instrucciones claras, igual que cualquier persona en tu equipo.
            </p>
          </div>

          <div className="g1-problem-grid">
            <div className="g1-problem-card bad">
              <div className="g1-problem-label">✗ Prompt genérico</div>
              <p className="g1-problem-text">"Ayúdame a escribir un correo para un cliente"</p>
              <p className="g1-problem-result">Resultado: correo aburrido, tono formal, sin contexto</p>
            </div>
            <div className="g1-problem-card good">
              <div className="g1-problem-label">✓ Prompt bien construido</div>
              <p className="g1-problem-text">"Eres asistente de ventas B2B. Escribe un correo de seguimiento para un cliente que vio nuestra demo hace 3 días y no ha respondido. Tono: directo, sin presionar. Máx 4 líneas."</p>
              <p className="g1-problem-result">Resultado: exactamente lo que necesitas</p>
            </div>
          </div>

          <div className="g1-callout">
            <div className="g1-callout-head">💡 La diferencia clave</div>
            <div className="g1-callout-body">
              Un buen prompt le dice a Claude <strong>quién es</strong>, <strong>qué tiene que hacer</strong>, <strong>para quién</strong> y <strong>cómo tiene que sonar el resultado</strong>. Esos cuatro elementos cambian todo.
            </div>
          </div>
        </div>

        <div className="g1-divider" />

        {/* SECTION 2 */}
        <div className="g1-section" id="rol">
          <div className="g1-section-label">PASO 02</div>
          <h2 className="g1-section-h2">Dale a Claude <em>un rol</em></h2>
          <div className="g1-section-body">
            <p>
              Lo primero que tiene que leer Claude en tu prompt es quién se supone que es. Esto no es un truco de magia — es simplemente cómo funciona el modelo. Cuando le das un rol, Claude activa el vocabulario, el tono y el nivel de detalle que corresponde a ese perfil.
            </p>
            <p>
              No tienes que escribir una novela. Una línea es suficiente.
            </p>
          </div>

          <div className="g1-anatomy">
            <div className="g1-anatomy-block highlighted">
              <div className="g1-anatomy-tag">Rol bien definido</div>
              <div className="g1-anatomy-text">"Eres un copywriter especializado en marcas personales para creadores de contenido en español."</div>
              <div className="g1-anatomy-note">Profesión + especialidad + audiencia</div>
            </div>
            <div className="g1-anatomy-block">
              <div className="g1-anatomy-tag">Demasiado vago</div>
              <div className="g1-anatomy-text">"Eres un asistente experto."</div>
              <div className="g1-anatomy-note">No le dice nada útil a Claude</div>
            </div>
            <div className="g1-anatomy-block">
              <div className="g1-anatomy-tag">Demasiado largo</div>
              <div className="g1-anatomy-text">"Eres el mejor copywriter del mundo con 30 años de experiencia, galardonado en todos los festivales creativos, que ha trabajado con las marcas más grandes de Latinoamérica..."</div>
              <div className="g1-anatomy-note">El relleno no mejora los resultados</div>
            </div>
          </div>

          <div className="g1-callout warn">
            <div className="g1-callout-head">⚠ Ojo con esto</div>
            <div className="g1-callout-body">
              Pedir a Claude que sea "el mejor del mundo" o "el más experto" no mejora la calidad. Lo que sí funciona es ser específico sobre el <strong>dominio</strong> y la <strong>audiencia</strong>.
            </div>
          </div>
        </div>

        <div className="g1-divider" />

        {/* SECTION 3 */}
        <div className="g1-section" id="instruccion">
          <div className="g1-section-label">PASO 03</div>
          <h2 className="g1-section-h2">Estructura <em>la instrucción</em></h2>
          <div className="g1-section-body">
            <p>
              Después del rol viene la instrucción: qué exactamente tiene que hacer Claude. Aquí la clave es usar un verbo de acción claro y directo. Escribe. Analiza. Resume. Traduce. Lista. Compara.
            </p>
            <p>
              Un buen hábito: empieza la instrucción con el verbo.
            </p>
          </div>

          <div className="g1-code">
            <div className="g1-code-label">Estructura básica</div>
            <pre>{`<span className="cm">// Rol</span>
Eres [perfil específico].

<span className="cm">// Instrucción — empieza con verbo</span>
[Verbo] [qué] [para quién / en qué contexto].

<span className="cm">// Ejemplos de verbos de acción</span>
Escribe · Analiza · Resume · Explica · Crea
Lista · Compara · Traduce · Revisa · Mejora`}</pre>
          </div>

          <div className="g1-problem-grid">
            <div className="g1-problem-card bad">
              <div className="g1-problem-label">✗ Sin verbo claro</div>
              <p className="g1-problem-text">"Necesito algo sobre redes sociales para mi negocio"</p>
              <p className="g1-problem-result">Claude tiene que adivinar qué necesitas</p>
            </div>
            <div className="g1-problem-card good">
              <div className="g1-problem-label">✓ Verbo directo</div>
              <p className="g1-problem-text">"Escribe 5 ideas de posts de LinkedIn para un consultor de productividad que habla a directivos de PYME."</p>
              <p className="g1-problem-result">Claude sabe exactamente qué producir</p>
            </div>
          </div>
        </div>

        <div className="g1-divider" />

        {/* SECTION 4 */}
        <div className="g1-section" id="contexto">
          <div className="g1-section-label">PASO 04</div>
          <h2 className="g1-section-h2">Agrega <em>el contexto correcto</em></h2>
          <div className="g1-section-body">
            <p>
              El contexto es la información de fondo que le permite a Claude adaptar la respuesta a tu situación real. No tienes que contar toda tu vida — solo lo que cambia el resultado.
            </p>
            <p>
              Tres preguntas que siempre vale la pena responder en el prompt:
            </p>
          </div>

          <div className="g1-anatomy">
            <div className="g1-anatomy-block highlighted">
              <div className="g1-anatomy-tag">¿Para quién?</div>
              <div className="g1-anatomy-text">Describe a tu audiencia: edad, nivel técnico, problema principal.</div>
              <div className="g1-anatomy-note">Ejemplo: "para emprendedores sin conocimientos técnicos"</div>
            </div>
            <div className="g1-anatomy-block highlighted">
              <div className="g1-anatomy-tag">¿En qué situación?</div>
              <div className="g1-anatomy-text">El canal, el momento, las restricciones del caso.</div>
              <div className="g1-anatomy-note">Ejemplo: "correo de seguimiento 3 días después de una demo"</div>
            </div>
            <div className="g1-anatomy-block highlighted">
              <div className="g1-anatomy-tag">¿Qué tono?</div>
              <div className="g1-anatomy-text">Cómo tiene que sonar: formal, cercano, directo, inspirador.</div>
              <div className="g1-anatomy-note">Ejemplo: "directo y amigable, sin sonar a ventas"</div>
            </div>
          </div>

          <div className="g1-callout">
            <div className="g1-callout-head">💡 Truco rápido</div>
            <div className="g1-callout-body">
              Si no sabes qué contexto incluir, pregúntate: <strong>¿Qué necesitaría saber un colaborador nuevo para hacer bien este trabajo?</strong> Eso mismo es lo que necesita Claude.
            </div>
          </div>
        </div>

        <div className="g1-divider" />

        {/* SECTION 5 */}
        <div className="g1-section" id="formato">
          <div className="g1-section-label">PASO 05</div>
          <h2 className="g1-section-h2">Controla <em>el formato</em> de salida</h2>
          <div className="g1-section-body">
            <p>
              Por defecto, Claude devuelve texto continuo. Pero puedes controlar exactamente cómo estructura la respuesta. Este es uno de los pasos que más se omite — y que más diferencia hace.
            </p>
          </div>

          <div className="g1-code">
            <div className="g1-code-label">Instrucciones de formato más útiles</div>
            <pre>{`<span className="cm">// Limitar extensión</span>
Máximo 3 párrafos.
En menos de 100 palabras.
Solo 5 puntos clave.

<span className="cm">// Pedir estructura</span>
Usa viñetas.
Formato: Título / Cuerpo / CTA.
Divide en secciones con subtítulos.

<span className="cm">// Controlar el tono</span>
Sin tecnicismos.
Tono conversacional, como si hablaras con un amigo.
Sin emojis. Sin asteriscos. Solo texto limpio.

<span className="cm">// Pedir variantes</span>
Dame 3 versiones distintas.
Una opción conservadora y una más atrevida.`}</pre>
          </div>

          <div className="g1-callout warn">
            <div className="g1-callout-head">⚠ Error muy común</div>
            <div className="g1-callout-body">
              Pedir formato al final del prompt cuando ya has dado 10 líneas de instrucciones. Claude puede perder el rastro. Si el formato importa, ponlo <strong>justo después del rol</strong> o al final bien destacado.
            </div>
          </div>
        </div>

        <div className="g1-divider" />

        {/* SECTION 6 — FORMULA */}
        <div className="g1-section" id="formula">
          <div className="g1-section-label">PASO 06</div>
          <h2 className="g1-section-h2">La fórmula <em>completa</em></h2>
          <div className="g1-section-body">
            <p>
              Juntando los cinco pasos, tu prompt tiene siempre la misma estructura. Una vez que la interiorices, escribirla tarda menos de dos minutos.
            </p>
          </div>

          <div className="g1-formula">
            <div className="g1-formula-title">La fórmula de Nico IA</div>
            <div className="g1-formula-parts">
              <div className="g1-formula-part">Rol</div>
              <div className="g1-formula-op">+</div>
              <div className="g1-formula-part">Instrucción</div>
              <div className="g1-formula-op">+</div>
              <div className="g1-formula-part">Contexto</div>
              <div className="g1-formula-op">+</div>
              <div className="g1-formula-part">Formato</div>
            </div>
          </div>

          <div className="g1-code">
            <div className="g1-code-label">Ejemplo real — post de LinkedIn</div>
            <pre>{`<span className="hl">Eres un copywriter especializado en marcas personales</span>
<span className="hl">para emprendedores en España.</span>

<span className="hl">Escribe un post de LinkedIn</span> para anunciar el lanzamiento
de mi newsletter de productividad.

<span className="cm">// Contexto</span>
Mi audiencia son directivos de PYME entre 35-50 años.
El tono de mi marca es directo, sin florituras,
orientado a resultados concretos.

<span className="cm">// Formato</span>
Máximo 150 palabras. Empieza con un hook que genere
curiosidad. Termina con una pregunta al lector.
Sin emojis. Sin hashtags.`}</pre>
          </div>

          <div className="g1-callout">
            <div className="g1-callout-head">✓ Por qué funciona</div>
            <div className="g1-callout-body">
              Claude tiene todo lo que necesita para hacer bien el trabajo: sabe quién es, qué tiene que producir, para quién, y cómo tiene que entregarlo. <strong>No hay ambigüedad, no hay espacio para respuestas genéricas.</strong>
            </div>
          </div>
        </div>

        {/* CHECKLIST */}
        <div className="g1-checklist">
          <div className="g1-checklist-label">Checklist antes de enviar tu prompt</div>
          <div className="g1-checklist-items">
            <div className="g1-check-item">
              <div className="g1-check-box" />
              <span>¿Le di un rol específico a Claude?</span>
            </div>
            <div className="g1-check-item">
              <div className="g1-check-box" />
              <span>¿La instrucción empieza con un verbo de acción claro?</span>
            </div>
            <div className="g1-check-item">
              <div className="g1-check-box" />
              <span>¿Describí para quién es el contenido?</span>
            </div>
            <div className="g1-check-item">
              <div className="g1-check-box" />
              <span>¿Especifiqué el tono que necesito?</span>
            </div>
            <div className="g1-check-item">
              <div className="g1-check-box" />
              <span>¿Indiqué el formato y extensión del output?</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="g1-cta">
          <h3>Pon esto en práctica ahora.</h3>
          <p>Tienes acceso a todas las guías de la biblioteca.<br />La siguiente: automatiza tus respuestas en 7 días.</p>
          <a className="g1-cta-btn" href="/recursos">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
