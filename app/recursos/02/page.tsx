import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Automatiza tus DMs con Claude — Guía 02 · Nico IA',
  description: 'Cómo liberé 2 horas al día sin contratar a nadie: el sistema que uso para responder DMs de Instagram con Claude y ManyChat.',
}

export default function Guia02Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#FDFAE6;color:#1a1a1a;min-height:100vh;-webkit-font-smoothing:antialiased}

        .g2-nav{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid rgba(124,92,191,.1);background:#FDFAE6;position:sticky;top:0;z-index:100;backdrop-filter:blur(8px)}
        .g2-logo{font-family:'Poppins',sans-serif;font-weight:900;font-size:18px;color:#574088;text-decoration:none}
        .g2-back{display:flex;align-items:center;gap:6px;font-size:13px;color:#aaa;text-decoration:none;font-weight:500;transition:color .2s}
        .g2-back:hover{color:#7C5CBF}

        .g2-wrap{max-width:720px;margin:0 auto;padding:0 24px 100px}

        .g2-header{padding:48px 0 40px}
        .g2-breadcrumb{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#bbb;margin-bottom:16px}
        .g2-breadcrumb span{color:#7C5CBF}
        .g2-meta-pill{display:inline-flex;align-items:center;gap:12px;background:white;border:1.5px solid #e8e0f8;border-radius:999px;padding:7px 18px;font-size:11px;font-weight:700;color:#7C5CBF;letter-spacing:.06em;text-transform:uppercase;margin-bottom:24px}
        .g2-meta-dot{width:4px;height:4px;border-radius:50%;background:#d0c0f0}
        .g2-h1{font-family:'Poppins',sans-serif;font-size:2.6rem;font-weight:900;line-height:1.08;letter-spacing:-.02em;margin-bottom:20px;color:#1a1a1a}
        .g2-h1 em{font-style:normal;color:#7C5CBF}
        .g2-intro{font-size:16px;color:#555;line-height:1.8;margin-bottom:28px}
        .g2-readtime{display:flex;gap:20px;font-size:13px;color:#aaa;font-weight:500}

        .g2-hook{background:white;border-radius:20px;border-left:4px solid #7C5CBF;padding:28px;margin:32px 0;position:relative}
        .g2-hook-quote{font-family:'Poppins',sans-serif;font-size:1.25rem;font-weight:900;color:#574088;line-height:1.35;margin-bottom:8px}
        .g2-hook-sub{font-size:13px;color:#aaa;font-weight:500}

        .g2-overview{background:white;border-radius:20px;border:1px solid #f0ecff;padding:28px;margin:32px 0}
        .g2-overview-title{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#bbb;margin-bottom:18px}
        .g2-steps-list{display:flex;flex-direction:column}
        .g2-step-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #f5f0ff}
        .g2-step-row:last-child{border-bottom:none}
        .g2-step-left{display:flex;align-items:center;gap:14px}
        .g2-step-num{font-family:'Poppins',sans-serif;font-size:11px;font-weight:900;color:#ddd;width:24px}
        .g2-step-name{font-size:14px;font-weight:700;color:#1a1a1a}
        .g2-step-tag{font-size:11px;font-weight:700;color:#7C5CBF;letter-spacing:.04em;text-transform:uppercase}

        .g2-toc{background:#ede8f8;border-radius:16px;padding:22px 24px;margin:0 0 48px}
        .g2-toc-title{font-size:13px;font-weight:800;color:#574088;margin-bottom:14px}
        .g2-toc-list{list-style:none;display:flex;flex-direction:column;gap:8px}
        .g2-toc-list a{font-size:13px;color:#7C5CBF;text-decoration:none;font-weight:600;display:flex;align-items:center;gap:8px;transition:color .2s}
        .g2-toc-list a:hover{color:#574088}
        .g2-toc-list a::before{content:'→';font-size:11px;opacity:.6}

        .g2-section{margin-bottom:60px}
        .g2-section-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#7C5CBF;margin-bottom:10px;display:flex;align-items:center;gap:8px}
        .g2-section-label::before{content:'';display:block;width:20px;height:2px;background:#7C5CBF;border-radius:2px}
        .g2-section-h2{font-family:'Poppins',sans-serif;font-size:1.7rem;font-weight:900;line-height:1.15;letter-spacing:-.015em;color:#1a1a1a;margin-bottom:16px}
        .g2-section-h2 em{font-style:normal;color:#7C5CBF}
        .g2-section-body{font-size:15px;color:#555;line-height:1.85}
        .g2-section-body p{margin-bottom:16px}
        .g2-section-body p:last-child{margin-bottom:0}
        .g2-section-body strong{color:#1a1a1a;font-weight:700}

        .g2-stat-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:24px 0}
        @media(max-width:500px){.g2-stat-row{grid-template-columns:1fr}}
        .g2-stat{background:white;border-radius:16px;padding:20px;text-align:center;border:1px solid #f0ecff}
        .g2-stat-num{font-family:'Poppins',sans-serif;font-size:2rem;font-weight:900;color:#7C5CBF;line-height:1}
        .g2-stat-label{font-size:12px;color:#888;margin-top:6px;font-weight:500}

        .g2-code{background:#1a1525;border-radius:16px;padding:24px;margin:24px 0;overflow-x:auto}
        .g2-code-label{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8878aa;margin-bottom:14px}
        .g2-code pre{font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.75;color:#e2d8f8;white-space:pre-wrap;word-break:break-word}
        .g2-code .cm{color:#6b5a8e}
        .g2-code .kw{color:#c78df0}
        .g2-code .hl{background:rgba(124,92,191,.2);border-radius:4px;padding:0 3px}

        .g2-callout{background:white;border-radius:16px;padding:22px 24px;border:1px solid #f0ecff;border-left:4px solid #7C5CBF;margin:24px 0}
        .g2-callout.warn{border-left-color:#e0a020;background:#fffbf0}
        .g2-callout-head{font-size:13px;font-weight:800;color:#574088;margin-bottom:8px;display:flex;align-items:center;gap:8px}
        .g2-callout.warn .g2-callout-head{color:#9a6000}
        .g2-callout-body{font-size:13px;color:#666;line-height:1.7}
        .g2-callout-body strong{color:#1a1a1a;font-weight:700}

        .g2-cats{display:flex;flex-direction:column;gap:10px;margin:24px 0}
        .g2-cat-item{background:white;border-radius:14px;padding:16px 20px;border:1px solid #f0ecff;display:flex;align-items:flex-start;gap:14px}
        .g2-cat-num{font-family:'Poppins',sans-serif;font-size:1.3rem;font-weight:900;color:#ede8f8;line-height:1;flex-shrink:0;width:36px}
        .g2-cat-title{font-size:14px;font-weight:800;color:#574088;margin-bottom:3px}
        .g2-cat-desc{font-size:13px;color:#888;line-height:1.55}
        .g2-cat-pct{font-size:11px;font-weight:700;color:#7C5CBF;margin-top:4px}

        .g2-flow{display:flex;flex-direction:column;gap:0;margin:24px 0}
        .g2-flow-step{background:white;border-radius:0;padding:16px 20px;border:1px solid #f0ecff;border-bottom:none;display:flex;align-items:center;gap:14px}
        .g2-flow-step:first-child{border-radius:16px 16px 0 0}
        .g2-flow-step:last-child{border-radius:0 0 16px 16px;border-bottom:1px solid #f0ecff}
        .g2-flow-icon{width:36px;height:36px;border-radius:10px;background:#ede8f8;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
        .g2-flow-text{font-size:14px;font-weight:700;color:#1a1a1a}
        .g2-flow-sub{font-size:12px;color:#aaa;margin-top:2px}
        .g2-flow-arrow{display:flex;justify-content:center;padding:6px 0;color:#d0c0f0;font-size:16px}

        .g2-checklist{background:#1a1525;border-radius:16px;padding:24px;margin:24px 0}
        .g2-checklist-label{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8878aa;margin-bottom:14px}
        .g2-checklist-items{display:flex;flex-direction:column;gap:10px}
        .g2-check-item{display:flex;align-items:flex-start;gap:12px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.5;color:#e2d8f8}
        .g2-check-box{width:18px;height:18px;border-radius:4px;background:#7C5CBF;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
        .g2-check-box::after{content:'✓';font-size:11px;color:white;font-family:'Inter',sans-serif;font-weight:700}

        .g2-divider{height:1px;background:linear-gradient(90deg,transparent,#e8e0f8,transparent);margin:48px 0}

        .g2-cta{background:linear-gradient(135deg,#7C5CBF,#574088);border-radius:24px;padding:40px;text-align:center;margin-top:60px}
        .g2-cta h3{font-family:'Poppins',sans-serif;font-size:1.5rem;font-weight:900;color:white;margin-bottom:10px}
        .g2-cta p{font-size:14px;color:#ddd4f8;line-height:1.7;margin-bottom:24px}
        .g2-cta-btn{display:inline-flex;align-items:center;gap:8px;background:white;color:#574088;padding:14px 28px;border-radius:14px;font-size:14px;font-weight:800;font-family:'Inter',sans-serif;text-decoration:none;transition:transform .15s,box-shadow .15s;box-shadow:0 4px 16px rgba(0,0,0,.15)}
        .g2-cta-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.2)}

        @media(max-width:600px){
          .g2-h1{font-size:2rem}
          .g2-section-h2{font-size:1.35rem}
          .g2-hook-quote{font-size:1.05rem}
        }
      `}</style>

      <nav className="g2-nav">
        <a className="g2-logo" href="/">Nico IA_</a>
        <a className="g2-back" href="/recursos">← Recursos</a>
      </nav>

      <div className="g2-wrap">

        {/* HEADER */}
        <div className="g2-header">
          <div className="g2-breadcrumb">GUÍA · <span>NEGOCIO</span></div>
          <div className="g2-meta-pill">
            8 min<span className="g2-meta-dot" />caso real<span className="g2-meta-dot" />gratis
          </div>
          <h1 className="g2-h1">
            Dos horas libres<br />al día con <em>Claude.</em>
          </h1>
          <p className="g2-intro">
            Cómo dejé de contestar DMs manualmente sin contratar a nadie, sin agencias y sin pagar herramientas caras. Solo Claude, el contexto correcto y un sistema que construí en una tarde.
          </p>
          <div className="g2-readtime">
            <span>⏱ 8 min de lectura</span>
            <span>🛠 sistema replicable</span>
          </div>
        </div>

        {/* HOOK */}
        <div className="g2-hook">
          <div className="g2-hook-quote">"Llevo semanas sin contestar DMs manualmente. Y mis respuestas nunca fueron tan buenas."</div>
          <div className="g2-hook-sub">Lo que pasa cuando le das a Claude el contexto correcto.</div>
        </div>

        {/* STEP OVERVIEW */}
        <div className="g2-overview">
          <div className="g2-overview-title">El sistema en 5 pasos</div>
          <div className="g2-steps-list">
            <div className="g2-step-row">
              <div className="g2-step-left">
                <span className="g2-step-num">01</span>
                <span className="g2-step-name">El diagnóstico</span>
              </div>
              <span className="g2-step-tag">Analiza tus DMs con Claude</span>
            </div>
            <div className="g2-step-row">
              <div className="g2-step-left">
                <span className="g2-step-num">02</span>
                <span className="g2-step-name">Las 7 categorías</span>
              </div>
              <span className="g2-step-tag">Identifica los patrones</span>
            </div>
            <div className="g2-step-row">
              <div className="g2-step-left">
                <span className="g2-step-num">03</span>
                <span className="g2-step-name">El documento base</span>
              </div>
              <span className="g2-step-tag">Construye las respuestas</span>
            </div>
            <div className="g2-step-row">
              <div className="g2-step-left">
                <span className="g2-step-num">04</span>
                <span className="g2-step-name">La conexión</span>
              </div>
              <span className="g2-step-tag">ManyChat + Claude</span>
            </div>
            <div className="g2-step-row">
              <div className="g2-step-left">
                <span className="g2-step-num">05</span>
                <span className="g2-step-name">El mantenimiento</span>
              </div>
              <span className="g2-step-tag">Sistema que mejora solo</span>
            </div>
          </div>
        </div>

        {/* TOC */}
        <div className="g2-toc">
          <div className="g2-toc-title">El recorrido ↓</div>
          <ul className="g2-toc-list">
            <li><a href="#problema">El problema real (y los números)</a></li>
            <li><a href="#diagnostico">El diagnóstico con Claude</a></li>
            <li><a href="#categorias">Las 7 categorías que encontré</a></li>
            <li><a href="#documento">Construye el documento de respuestas</a></li>
            <li><a href="#conexion">Conecta ManyChat con Claude</a></li>
            <li><a href="#resultado">El resultado y cómo mantenerlo</a></li>
          </ul>
        </div>

        {/* SECTION 1 */}
        <div className="g2-section" id="problema">
          <div className="g2-section-label">PASO 01</div>
          <h2 className="g2-section-h2">El problema <em>real</em></h2>
          <div className="g2-section-body">
            <p>
              Hora y media. Dos horas. Todos los días. Eso era lo que pasaba respondiendo DMs de Instagram. Preguntas repetidas, links para mandar, gente pidiendo el temario del curso, consultas sobre precio, dudas sobre si el producto era para ellos.
            </p>
            <p>
              El problema no era el tiempo en sí. Era que ese tiempo no escalaba. Más seguidores = más DMs = más horas perdidas. Y si no respondías, perdías ventas.
            </p>
          </div>

          <div className="g2-stat-row">
            <div className="g2-stat">
              <div className="g2-stat-num">2h</div>
              <div className="g2-stat-label">al día en DMs</div>
            </div>
            <div className="g2-stat">
              <div className="g2-stat-num">80%</div>
              <div className="g2-stat-label">preguntas repetidas</div>
            </div>
            <div className="g2-stat">
              <div className="g2-stat-num">7</div>
              <div className="g2-stat-label">categorías únicas</div>
            </div>
          </div>

          <div className="g2-callout">
            <div className="g2-callout-head">💡 La clave del problema</div>
            <div className="g2-callout-body">
              No necesitaba contestar menos. Necesitaba <strong>sistematizar lo que ya contestaba bien</strong>. Y para eso primero tenía que saber qué contestaba.
            </div>
          </div>
        </div>

        <div className="g2-divider" />

        {/* SECTION 2 */}
        <div className="g2-section" id="diagnostico">
          <div className="g2-section-label">PASO 02</div>
          <h2 className="g2-section-h2">El <em>diagnóstico</em> con Claude</h2>
          <div className="g2-section-body">
            <p>
              El primer paso fue darle a Claude material real. Copié mis últimas 50 respuestas en DMs — directamente del inbox de Instagram — y las pegué en una conversación nueva.
            </p>
            <p>
              El prompt que usé fue simple:
            </p>
          </div>

          <div className="g2-code">
            <div className="g2-code-label">El prompt de diagnóstico</div>
            <pre>{`Analiza estas 50 conversaciones de DMs de Instagram.

<span className="hl">Identifica:</span>
1. Qué categorías de preguntas aparecen con más frecuencia
2. Qué porcentaje del total representa cada categoría
3. Qué elementos tiene cada respuesta que funcionó bien
   (tono, longitud, información clave incluida)
4. En qué casos la respuesta requería personalización real
   y en cuáles era básicamente siempre la misma

<span className="cm">// Pega aquí tus conversaciones</span>
[CONVERSACIONES]

Dame el resultado en una lista ordenada por frecuencia.`}</pre>
          </div>

          <div className="g2-callout warn">
            <div className="g2-callout-head">⚠ Importante</div>
            <div className="g2-callout-body">
              Antes de pegar, <strong>anonimiza los nombres y datos personales</strong> de quien te escribió. Claude no los necesita y es buena práctica no compartirlos.
            </div>
          </div>
        </div>

        <div className="g2-divider" />

        {/* SECTION 3 */}
        <div className="g2-section" id="categorias">
          <div className="g2-section-label">PASO 03</div>
          <h2 className="g2-section-h2">Las <em>7 categorías</em> que encontré</h2>
          <div className="g2-section-body">
            <p>
              Claude identificó siete categorías. Siete. Y el 80% de todos mis DMs caía en esas siete. Las tuyas serán distintas, pero el patrón es el mismo: la mayoría de preguntas son variaciones de lo mismo.
            </p>
          </div>

          <div className="g2-cats">
            {[
              { n:'01', t:'¿De qué va tu curso?', d:'Gente que quiere el temario o un resumen rápido antes de decidir.', p:'31% de los DMs' },
              { n:'02', t:'¿Cuánto cuesta?', d:'Precio, formas de pago, si hay becas o descuentos.', p:'22% de los DMs' },
              { n:'03', t:'¿Es para mí?', d:'Quieren saber si tienen el nivel o el perfil adecuado.', p:'14% de los DMs' },
              { n:'04', t:'Links y recursos', d:'Piden el link de la web, del grupo de WhatsApp, de la guía gratuita.', p:'11% de los DMs' },
              { n:'05', t:'Dudas técnicas', d:'Problemas con el acceso, pago que no procesó, email que no llegó.', p:'9% de los DMs' },
              { n:'06', t:'Colaboraciones', d:'Propuestas de afiliación, canjes, entrevistas.', p:'7% de los DMs' },
              { n:'07', t:'Resto personalizado', d:'DMs que sí requieren respuesta manual: casos únicos, situaciones específicas.', p:'6% de los DMs' },
            ].map(c => (
              <div key={c.n} className="g2-cat-item">
                <div className="g2-cat-num">{c.n}</div>
                <div>
                  <div className="g2-cat-title">{c.t}</div>
                  <div className="g2-cat-desc">{c.d}</div>
                  <div className="g2-cat-pct">{c.p}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="g2-callout">
            <div className="g2-callout-head">💡 Lo que esto significa</div>
            <div className="g2-callout-body">
              El 94% de tus DMs tiene respuesta automatizable. Solo el 6% necesita que estés tú. Eso es lo que cambia cuando lo ves escrito.
            </div>
          </div>
        </div>

        <div className="g2-divider" />

        {/* SECTION 4 */}
        <div className="g2-section" id="documento">
          <div className="g2-section-label">PASO 04</div>
          <h2 className="g2-section-h2">El <em>documento base</em> de respuestas</h2>
          <div className="g2-section-body">
            <p>
              Con las categorías claras, construí con Claude un documento de respuestas. Para cada categoría: una respuesta base, las variantes más comunes y las instrucciones de tono.
            </p>
          </div>

          <div className="g2-code">
            <div className="g2-code-label">Prompt para construir las respuestas</div>
            <pre>{`Para cada una de estas 7 categorías de DMs, escribe:

<span className="hl">1. Respuesta base</span> (la que funciona en el 80% de casos de esa categoría)
<span className="hl">2. Variante corta</span> (para cuando alguien pregunta muy directo)
<span className="hl">3. Variante con seguimiento</span> (cuando quieres invitar a continuar la conversación)

<span className="cm">// Contexto que tienes que darle a Claude:</span>
Mi tono es: [describe tu tono — cercano, directo, sin tecnicismos...]
Mi producto es: [describe brevemente qué vendes]
Lo que NO quiero sonar: [formal, agresivo en ventas, robótico...]
Links importantes: [web, WhatsApp, recursos gratuitos]

Cada respuesta debe sonar como yo. No como un bot.`}</pre>
          </div>

          <div className="g2-callout">
            <div className="g2-callout-head">✓ El truco del tono</div>
            <div className="g2-callout-body">
              Pega 3 o 4 respuestas tuyas que consideres buenas y dile a Claude: <strong>"analiza el tono de estas respuestas y úsalo como referencia para las que vas a escribir"</strong>. La diferencia es enorme.
            </div>
          </div>
        </div>

        <div className="g2-divider" />

        {/* SECTION 5 */}
        <div className="g2-section" id="conexion">
          <div className="g2-section-label">PASO 05</div>
          <h2 className="g2-section-h2">Conecta <em>ManyChat</em> con Claude</h2>
          <div className="g2-section-body">
            <p>
              ManyChat es la herramienta que se encarga de activar las respuestas automáticas en Instagram. Claude es quien las escribe. El flujo completo queda así:
            </p>
          </div>

          <div className="g2-flow">
            <div className="g2-flow-step">
              <div className="g2-flow-icon">📩</div>
              <div>
                <div className="g2-flow-text">Alguien te envía un DM</div>
                <div className="g2-flow-sub">Puede ser una palabra clave, una pregunta, cualquier mensaje</div>
              </div>
            </div>
            <div className="g2-flow-arrow">↓</div>
            <div className="g2-flow-step">
              <div className="g2-flow-icon">⚡</div>
              <div>
                <div className="g2-flow-text">ManyChat detecta la categoría</div>
                <div className="g2-flow-sub">Por palabras clave o intención del mensaje</div>
              </div>
            </div>
            <div className="g2-flow-arrow">↓</div>
            <div className="g2-flow-step">
              <div className="g2-flow-icon">🤖</div>
              <div>
                <div className="g2-flow-text">Lanza la respuesta del documento base</div>
                <div className="g2-flow-sub">La que Claude te ayudó a redactar para esa categoría</div>
              </div>
            </div>
            <div className="g2-flow-arrow">↓</div>
            <div className="g2-flow-step">
              <div className="g2-flow-icon">✅</div>
              <div>
                <div className="g2-flow-text">El DM queda respondido en segundos</div>
                <div className="g2-flow-sub">Tú solo revisas los que caen en el 6% personalizado</div>
              </div>
            </div>
          </div>

          <div className="g2-section-body" style={{marginTop: '24px'}}>
            <p>
              Para la conexión técnica en ManyChat, crea un flujo por cada categoría. En cada flujo, define las palabras clave o condiciones que lo activan y pega la respuesta base como mensaje de texto.
            </p>
            <p>
              Para los casos donde necesitas más personalización (categoría 07), ManyChat te puede notificar directamente para que respondas tú manualmente.
            </p>
          </div>

          <div className="g2-callout warn">
            <div className="g2-callout-head">⚠ Sin ManyChat</div>
            <div className="g2-callout-body">
              Si no quieres usar ManyChat todavía, empieza solo con el documento. Teniendo las respuestas escritas y organizadas, <strong>reduces el tiempo de respuesta manual a menos de 20 segundos por DM</strong>. Copia, adapta mínimamente, envía.
            </div>
          </div>
        </div>

        <div className="g2-divider" />

        {/* SECTION 6 */}
        <div className="g2-section" id="resultado">
          <div className="g2-section-label">PASO 06</div>
          <h2 className="g2-section-h2">El resultado y <em>cómo mantenerlo</em></h2>
          <div className="g2-section-body">
            <p>
              El resultado inmediato fue dos horas liberadas al día. Todos los días. Sin contratar a nadie, sin pagar una agencia, sin herramientas de pago adicionales más allá de ManyChat (que tiene plan gratuito).
            </p>
            <p>
              Pero la parte que no se ve: <strong>las respuestas mejoraron</strong>. Cuando las construyes con calma con Claude en lugar de escribirlas con prisa entre reuniones, salen mejor. Más claras, más directas, con mejor tono.
            </p>
            <p>
              Para mantener el sistema vivo, una vez al mes reviso los DMs que respondí manualmente y le pregunto a Claude si alguno merece crear una nueva categoría o actualizar una respuesta existente.
            </p>
          </div>

          <div className="g2-callout">
            <div className="g2-callout-head">✓ El prompt de mantenimiento mensual</div>
            <div className="g2-callout-body">
              <strong>"Analiza estos DMs de este mes que respondí manualmente. ¿Hay patrones nuevos que justifiquen una nueva categoría? ¿Alguna respuesta existente habría cubierto estos casos con un pequeño ajuste?"</strong>
            </div>
          </div>
        </div>

        {/* CHECKLIST */}
        <div className="g2-checklist">
          <div className="g2-checklist-label">Tu checklist para montarlo esta semana</div>
          <div className="g2-checklist-items">
            <div className="g2-check-item">
              <div className="g2-check-box" />
              <span>Copia tus últimas 50 respuestas en DMs</span>
            </div>
            <div className="g2-check-item">
              <div className="g2-check-box" />
              <span>Usa el prompt de diagnóstico con Claude</span>
            </div>
            <div className="g2-check-item">
              <div className="g2-check-box" />
              <span>Identifica tus categorías y su porcentaje</span>
            </div>
            <div className="g2-check-item">
              <div className="g2-check-box" />
              <span>Construye el documento base de respuestas con Claude</span>
            </div>
            <div className="g2-check-item">
              <div className="g2-check-box" />
              <span>Configura los flujos en ManyChat (o empieza con el doc manual)</span>
            </div>
            <div className="g2-check-item">
              <div className="g2-check-box" />
              <span>Programa la revisión mensual del sistema</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="g2-cta">
          <h3>El sistema está en la guía.</h3>
          <p>Ahora queda montarlo. En la biblioteca tienes el resto de guías para seguir construyendo.</p>
          <a className="g2-cta-btn" href="/recursos">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
