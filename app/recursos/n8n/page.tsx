import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'n8n desde Cursor + Claude Code — Guía 08 · Nico IA',
  description: 'Construye workflows en n8n desde Cursor + Claude Code. Le describes el flow, te entrega el JSON validado, lo pegas con Cmd+V. Setup de 2 archivos en 10 min.',
}

const toc = [
  { id: 'que-es', label: 'n8n sin tocar la UI — qué significa' },
  { id: 'setup', label: 'Setup · los 2 archivos que necesitás' },
  { id: 'flujo', label: 'El flujo completo · de prompt a workflow' },
  { id: 'ejemplo', label: 'Ejemplo real · lead de Typeform → Notion + email' },
  { id: 'nodos', label: 'Los nodos que Claude conoce mejor' },
  { id: 'errores', label: 'Errores comunes al importar JSON' },
  { id: 'tips', label: 'Tips para prompts mejores' },
]

const nodos = [
  { name: 'Webhook', cat: 'Trigger', desc: 'Recibe datos de cualquier servicio. La base de la mayoría de workflows.' },
  { name: 'HTTP Request', cat: 'Core', desc: 'Llama a cualquier API. Si un servicio no tiene node propio, usás este.' },
  { name: 'Set', cat: 'Core', desc: 'Define o transforma datos entre nodos. Para limpiar y reformatear inputs.' },
  { name: 'IF / Switch', cat: 'Lógica', desc: 'Condicionales. Ruteás el flujo según el valor de un campo.' },
  { name: 'Notion', cat: 'Integración', desc: 'Crear, actualizar y leer registros en Notion databases.' },
  { name: 'Gmail / Email', cat: 'Integración', desc: 'Mandar emails con templates dinámicos.' },
  { name: 'Airtable', cat: 'Integración', desc: 'Crear y actualizar registros en Airtable.' },
  { name: 'Slack', cat: 'Integración', desc: 'Mandar mensajes y alertas a canales de Slack.' },
  { name: 'OpenAI / Claude', cat: 'IA', desc: 'Llamadas a modelos de IA dentro del workflow.' },
  { name: 'Code (JS/Python)', cat: 'Core', desc: 'Código personalizado cuando los nodos no alcanzan.' },
]

const errores = [
  {
    error: 'Error al importar: "Invalid JSON"',
    causa: 'Claude a veces cierra el JSON con un comentario fuera de la estructura',
    fix: 'Pedile: "dame solo el JSON puro, sin texto antes ni después, sin comentarios"',
  },
  {
    error: 'Los nodos no tienen credenciales configuradas',
    causa: 'El JSON exportado no incluye credenciales por seguridad',
    fix: 'Normal. Después de importar, click en cada nodo que requiera credenciales y conectá tu cuenta.',
  },
  {
    error: 'El webhook no recibe datos',
    causa: 'El workflow está desactivado o la URL del webhook cambió',
    fix: 'Activá el workflow (toggle arriba a la derecha) y copiá la URL del webhook desde el nodo Webhook.',
  },
  {
    error: 'Un nodo falla con error de campo no encontrado',
    causa: 'El JSON asume nombres de campos que no matchean con los datos reales',
    fix: 'Ejecutá el workflow con datos reales primero, mirá el output de cada nodo y ajustá los field names.',
  },
]

const promptEjemplo = `Creá un workflow de n8n en formato JSON que:

1. Empiece con un webhook que recibe un POST de Typeform
   con campos: name, email, company, budget (número), message

2. Si budget >= 5000:
   - Crea un registro en Notion database ID: {{NOTION_DB_ID}}
     con campos: Name, Email, Company, Budget, Message, Status="Lead caliente"
   - Manda email desde Gmail a sales@miempresa.com con:
     Subject: "Lead caliente: {name} · \${budget}"
     Body: resumen de todos los campos

3. Si budget < 5000:
   - Crea el registro en Notion con Status="Lead frío"
   - Manda email de confirmación al lead (a su email)
     con mensaje: "Gracias, te contactamos en 48h"

Formato: JSON válido de n8n listo para importar con Cmd+V.
No incluyas texto antes ni después del JSON.`

const jsonEjemplo = `{
  "name": "Lead Router · Typeform → Notion + Email",
  "nodes": [
    {
      "id": "webhook-1",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [100, 300],
      "parameters": {
        "httpMethod": "POST",
        "path": "lead-qualifier",
        "responseMode": "lastNode"
      }
    },
    {
      "id": "if-budget",
      "name": "Budget >= 5000?",
      "type": "n8n-nodes-base.if",
      "position": [350, 300],
      "parameters": {
        "conditions": {
          "number": [{ "value1": "={{$json.budget}}", "operation": "largerEqual", "value2": 5000 }]
        }
      }
    }
    // ... resto del workflow
  ],
  "connections": { /* ... */ }
}`

export default function N8nPage() {
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

        .gc-flujo { display: flex; flex-direction: column; gap: 0; margin: 16px 0; }
        .gc-flujo-step { display: flex; align-items: flex-start; gap: 18px; padding: 16px 0; border-bottom: 1px solid var(--border); }
        .gc-flujo-step:last-child { border-bottom: none; }
        .gc-flujo-n { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 700; color: var(--copper); flex-shrink: 0; line-height: 1.1; width: 28px; text-shadow: 0 0 16px var(--copper-glow); }
        .gc-flujo-content {}
        .gc-flujo-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 4px; }
        .gc-flujo-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

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

        .gc-nodos { display: grid; gap: 8px; margin: 20px 0; }
        @media(min-width:560px) { .gc-nodos { grid-template-columns: 1fr 1fr; } }
        .gc-nodo { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; }
        .gc-nodo-top { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .gc-nodo-name { font-size: 13px; font-weight: 600; color: var(--cream); }
        .gc-nodo-cat { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--copper); }
        .gc-nodo-desc { font-size: 12px; color: var(--cream-dim); line-height: 1.55; }

        .gc-errores { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
        .gc-error { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; }
        .gc-error-prob { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 5px; }
        .gc-error-causa { font-family: 'DM Mono', monospace; font-size: 10px; color: #4A3D30; margin-bottom: 8px; }
        .gc-error-fix-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); margin-bottom: 4px; }
        .gc-error-fix { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

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
          <div className="gc-kicker">Guía · Automatización</div>
          <div className="gc-pill">n8n sin tocar la UI</div>
          <h1 className="gc-h1">
            Construye workflows en<br />
            <em>n8n</em> desde Cursor<br />
            + Claude Code.
          </h1>
          <p className="gc-intro">
            Le describís el flow a Claude, te entrega el <strong>JSON validado</strong>, lo pegás en n8n con <strong>Cmd+V</strong>. Setup de 2 archivos en 10 minutos. Plan trial sirve.
          </p>
          <div className="gc-meta-row">
            <span>— 2 archivos de setup</span>
            <span>— 10 min</span>
            <span>— plan trial sirve</span>
          </div>
        </div>

        <div className="gc-stats">
          <div className="gc-stat">
            <div className="gc-stat-num">2</div>
            <div className="gc-stat-label">archivos de setup</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">10m</div>
            <div className="gc-stat-label">primer workflow</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">0</div>
            <div className="gc-stat-label">clics en la UI</div>
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
          <h2 className="gc-h2">n8n sin tocar<br /><em>la UI.</em></h2>
          <div className="gc-body">
            <p>
              n8n es una herramienta de automatización visual (como Zapier o Make) que podés hostear gratis. La diferencia es que n8n acepta workflows en formato JSON. Eso significa que Claude puede generarlos desde texto.
            </p>
            <p>
              El resultado: describís el flow en lenguaje natural → Claude genera el JSON → lo importás con Cmd+V en n8n → funciona. Sin arrastrar nodos. Sin buscar en el catálogo de integraciones.
            </p>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Por qué n8n y no Make o Zapier</div>
            <div className="gc-tip-body">
              n8n tiene un formato JSON de workflows que Claude conoce bien. Zapier y Make no tienen importación de workflows en texto. n8n también tiene plan self-hosted gratis si no querés pagar cloud.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="setup">
          <div className="gc-section-kicker">Setup</div>
          <h2 className="gc-h2">Los 2 archivos<br /><em>que necesitás.</em></h2>
          <div className="gc-body">
            <p>Dos archivos en tu proyecto de Cursor. Nada más.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">estructura del proyecto</span>
            </div>
            <pre>{`n8n-workflows/
├── n8n-schema.md      ← contexto de n8n para Claude
└── workflows/
    └── lead-router.json    ← tus workflows exportados`}</pre>
          </div>
          <div className="gc-body" style={{ marginTop: 16 }}>
            <p><strong>n8n-schema.md</strong> es el archivo que le dice a Claude cómo funciona n8n: estructura de nodos, cómo se conectan, qué propiedades necesita cada tipo. Se lo subís al Project de Claude una vez.</p>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Cómo crear n8n-schema.md</div>
            <div className="gc-tip-body">
              Pedile a Claude: "Crea un archivo n8n-schema.md que documente la estructura JSON de workflows de n8n: tipos de nodos, cómo se definen connections, parámetros de los 10 nodos más usados, y ejemplos de triggers comunes". Guardá el output como n8n-schema.md.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="flujo">
          <div className="gc-section-kicker">El flujo</div>
          <h2 className="gc-h2">De prompt<br /><em>a workflow.</em></h2>
          <div className="gc-flujo">
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">01</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">Describís el workflow en lenguaje natural</div>
                <div className="gc-flujo-desc">Qué trigger dispara el flow, qué hace con los datos, qué integraciones usa, qué condiciones tiene.</div>
              </div>
            </div>
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">02</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">Claude genera el JSON validado</div>
                <div className="gc-flujo-desc">Usando el n8n-schema.md como referencia, genera el JSON completo del workflow con todos los nodos y conexiones.</div>
              </div>
            </div>
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">03</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">Copiás el JSON y abrís n8n</div>
                <div className="gc-flujo-desc">En n8n.cloud o tu instancia local, abrís el editor de workflows.</div>
              </div>
            </div>
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">04</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">Cmd+V — el workflow aparece</div>
                <div className="gc-flujo-desc">n8n detecta que estás pegando JSON de workflow y lo importa automáticamente con todos sus nodos.</div>
              </div>
            </div>
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">05</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">Conectás credenciales y activás</div>
                <div className="gc-flujo-desc">Los nodos que necesitan credenciales (Gmail, Notion, etc.) te van a pedir autenticación. Uno por uno. Después activás el workflow.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="ejemplo">
          <div className="gc-section-kicker">Ejemplo real</div>
          <h2 className="gc-h2">Lead de Typeform<br /><em>→ Notion + email.</em></h2>
          <div className="gc-body">
            <p>Este es el prompt exacto que usás. Claude genera el JSON completo.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">prompt para Claude</span>
            </div>
            <pre>{promptEjemplo}</pre>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— El detalle que más importa en el prompt</div>
            <div className="gc-tip-body">
              Especificá el nombre exacto de los campos del trigger (name, email, budget) y las condiciones exactas (budget &gt;= 5000). Cuanto más preciso, menos correcciones después.
            </div>
          </div>
          <div className="gc-body" style={{ marginTop: 20 }}>
            <p>El JSON que Claude genera tiene esta estructura:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">output · JSON de n8n (fragmento)</span>
            </div>
            <pre>{jsonEjemplo}</pre>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="nodos">
          <div className="gc-section-kicker">Los nodos</div>
          <h2 className="gc-h2">Los nodos que Claude<br /><em>conoce mejor.</em></h2>
          <div className="gc-body">
            <p>Claude puede generar cualquier nodo de n8n, pero estos son los que genera con más precisión:</p>
          </div>
          <div className="gc-nodos">
            {nodos.map(n => (
              <div key={n.name} className="gc-nodo">
                <div className="gc-nodo-top">
                  <span className="gc-nodo-name">{n.name}</span>
                  <span className="gc-nodo-cat">{n.cat}</span>
                </div>
                <div className="gc-nodo-desc">{n.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="errores">
          <div className="gc-section-kicker">Troubleshooting</div>
          <h2 className="gc-h2">Errores comunes<br /><em>al importar JSON.</em></h2>
          <div className="gc-errores">
            {errores.map(e => (
              <div key={e.error} className="gc-error">
                <div className="gc-error-prob">{e.error}</div>
                <div className="gc-error-causa">Causa: {e.causa}</div>
                <div className="gc-error-fix-label">Solución</div>
                <div className="gc-error-fix">{e.fix}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="tips">
          <div className="gc-section-kicker">Tips</div>
          <h2 className="gc-h2">Prompts que<br /><em>funcionan mejor.</em></h2>
          <div className="gc-body">
            <p>Patrones que dan mejores resultados al describir workflows:</p>
          </div>
          <div className="gc-flujo">
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">01</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">Empezá con el trigger</div>
                <div className="gc-flujo-desc">"Empieza con un webhook que recibe..." o "Trigger: cada día a las 9am..." — el punto de entrada define todo lo demás.</div>
              </div>
            </div>
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">02</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">Especificá los field names exactos</div>
                <div className="gc-flujo-desc">Si sabés el nombre del campo en el servicio de origen, usalo. "campo budget (número)" es mejor que "el presupuesto".</div>
              </div>
            </div>
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">03</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">Describí las condiciones con operadores concretos</div>
                <div className="gc-flujo-desc">"Si budget &gt;= 5000" es mejor que "si el presupuesto es alto". Los operadores exactos generan código exacto.</div>
              </div>
            </div>
            <div className="gc-flujo-step">
              <span className="gc-flujo-n">04</span>
              <div className="gc-flujo-content">
                <div className="gc-flujo-title">Terminá siempre con "JSON puro, sin texto"</div>
                <div className="gc-flujo-desc">Evita que Claude agregue explicaciones dentro o alrededor del JSON que rompen el import.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Workflow en producción.<br /><em>Con Cmd+V.</em></h3>
          <p>
            La siguiente guía: las 4 cosas que tenés que arreglar<br />
            antes de mandar tu app a Apple. Checklist interactivo.
          </p>
          <a href="/recursos/apple" className="gc-btn-primary">Guía 09 · App Store →</a>
        </div>

      </div>
    </>
  )
}
