import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'n8n desde Cursor + Claude Code — Guía 08 · Nico IA',
  description: 'Describís el workflow en lenguaje normal, Claude arma el JSON validado, y lo pegás en n8n con Cmd+V. Setup de 2 archivos en 10 minutos.',
}

const toc = [
  { id: 'intro',          label: 'Por qué este setup' },
  { id: 'stack',          label: 'El stack' },
  { id: 'paso-mcp',       label: 'Paso 01 · MCP' },
  { id: 'paso-rule',      label: 'Paso 02 · Rule' },
  { id: 'paso-activacion', label: 'Paso 03 · Activación' },
  { id: 'paso-flow',      label: 'Paso 04 · Primer workflow' },
  { id: 'errores',        label: 'Errores comunes' },
]

const mcpJson = `{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["-y", "n8n-mcp"],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true"
      }
    }
  }
}`

const rulesFrontmatter = `---
description: Agente experto en diseño de workflows n8n con n8n-MCP y las 7 skills oficiales.
globs:
  - "**/*.n8n.json"
  - "**/workflows/**"
alwaysApply: true
---`

const promptEjemplo = `> Necesito un workflow que cuando entre
> un email a Gmail con "factura" en el
> asunto, guarde el adjunto en Drive y
> me avise por Telegram con el nombre
> del proveedor.`

const mermaidOutput = `flowchart LR
  A[Gmail Trigger] --> B{Filter "factura"}
  B -->|match| C[Drive Upload]
  C --> D[Telegram Notify]
  B -->|no match| E[stop]`

const jsonOutput = `{
  "name": "Factura → Drive + Telegram",
  "nodes": [
    {
      "parameters": { "filters": {...} },
      "name": "Gmail Trigger",
      "type": "n8n-nodes-base.gmailTrigger",
      "position": [240, 300]
    },
    // ... 4 nodos más
  ],
  "connections": { ... },
  "active": true
}`

const errores = [
  { n: '01', title: 'El JSON falla al importar',              desc: 'Casi siempre es porque copiaste el bloque Mermaid en vez del bloque JSON. Asegurate de copiar el bloque que empieza con { y termina con }, no el de flowchart LR.' },
  { n: '02', title: 'Claude inventa un nodo que no existe',   desc: 'Pasa cuando el MCP no está activo. Volvé a Settings → MCP y revisá el punto verde. Si está apagado, recargá Cursor.' },
  { n: '03', title: 'El workflow corre, pero no hace nada',   desc: 'Revisá las credenciales en cada nodo marcado con ⚠️. n8n importa la estructura, pero no tus credenciales (eso lo tenés que hacer vos la primera vez).' },
]

const stack = [
  { n: '01', l: 'Mac',           d: 'cualquier modelo, nada raro' },
  { n: '02', l: 'Cursor',        d: 'editor con IA integrada' },
  { n: '03', l: 'Claude Code',   d: 'dentro de Cursor, plan Pro' },
  { n: '04', l: 'n8n Cloud',     d: 'plan trial funciona' },
]

export default function N8nPage() {
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
        .gc-intro em { font-style: italic; color: var(--amber); }
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
        .gc-body a { color: var(--copper); text-decoration: underline; text-underline-offset: 3px; }

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
        .gc-tip-body code { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--copper); }

        .gc-stack { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0; }
        .gc-stack-item { display: flex; align-items: baseline; gap: 16px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 18px; }
        .gc-stack-n { font-family: 'DM Mono', monospace; font-size: 10px; color: #4A3D30; flex-shrink: 0; }
        .gc-stack-l { font-size: 14px; font-weight: 600; color: var(--cream); }
        .gc-stack-d { font-size: 12px; color: var(--cream-dim); }

        .gc-ul { margin: 16px 0; display: flex; flex-direction: column; gap: 8px; }
        .gc-ul-item { display: flex; gap: 10px; font-size: 14px; color: var(--cream-dim); line-height: 1.6; }
        .gc-ul-item code { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--copper); background: var(--bg3); padding: 1px 5px; border-radius: 3px; }
        .gc-ul-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--copper); flex-shrink: 0; margin-top: 8px; }

        .gc-ol { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-ol-item { display: flex; gap: 14px; align-items: baseline; }
        .gc-ol-n { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; color: var(--copper); flex-shrink: 0; }
        .gc-ol-text { font-size: 14px; color: var(--cream-dim); line-height: 1.6; }
        .gc-ol-text strong { color: var(--cream); }
        .gc-ol-text code { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--copper); }

        .gc-output-label { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 600; color: var(--cream); margin: 20px 0 8px; }

        .gc-errores { display: grid; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-errores { grid-template-columns: repeat(3, 1fr); } }
        .gc-error-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 18px; }
        .gc-error-n { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; margin-bottom: 8px; }
        .gc-error-title { font-size: 13px; font-weight: 600; color: var(--cream); margin-bottom: 8px; line-height: 1.4; }
        .gc-error-desc { font-size: 12px; color: var(--cream-dim); line-height: 1.6; }

        .gc-conclusion { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 28px; margin: 40px 0; }
        .gc-conclusion p { font-size: 16px; color: var(--cream-dim); line-height: 1.85; margin-bottom: 14px; }
        .gc-conclusion p:last-child { margin-bottom: 0; }
        .gc-conclusion em { font-style: italic; color: var(--cream); }

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
          <div className="gc-kicker">Guía 08 · Automatización · 2026</div>
          <div className="gc-pill">2 archivos · 10 min · plan trial sirve</div>
          <h1 className="gc-h1">
            Construye <em>n8n</em><br />
            sin tocar la UI.
          </h1>
          <p className="gc-intro">
            Cursor + Claude Code + un MCP. Describís el workflow en lenguaje normal, Claude arma el JSON validado, y lo pegás en n8n con Cmd+V. <strong>Cero arrastrar nodos.</strong>
          </p>
          <p className="gc-intro">
            Setup en 10 minutos. <em>Y te dura el resto del año.</em>
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
          <div className="gc-section-kicker">Intro</div>
          <h2 className="gc-h2">Por qué<br /><em>este setup.</em></h2>
          <div className="gc-body">
            <p>n8n es buenísimo, pero abrir el canvas y arrastrar nodos uno por uno se vuelve lento. Cada workflow nuevo te toma 20-40 minutos entre ver tutoriales, encontrar el nodo correcto, configurar credenciales y probar.</p>
            <p>Con este setup, el flujo cambia: le describís a Claude lo que querés en una frase, él te entrega el JSON validado, y lo importás a n8n con un Cmd+V. <strong>El bottleneck deja de ser n8n y vuelve a ser tu idea.</strong></p>
            <p>Funciona porque dos archivos hablan entre sí:</p>
          </div>
          <div className="gc-ul">
            <div className="gc-ul-item">
              <div className="gc-ul-dot" />
              <span><code>.cursor/mcp.json</code> conecta Claude al paquete <code>n8n-mcp</code>, que conoce los 500+ nodos reales y sabe validarlos.</span>
            </div>
            <div className="gc-ul-item">
              <div className="gc-ul-dot" />
              <span><code>.cursor/rules/n8n-expert.mdc</code> es un rule de Cursor que define el rol, las 7 skills oficiales de n8n, y el formato exacto de la respuesta.</span>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* STACK */}
        <div className="gc-section" id="stack">
          <div className="gc-section-kicker">El stack</div>
          <h2 className="gc-h2">Lo que tenés<br /><em>que tener.</em></h2>
          <div className="gc-body">
            <p>Si no tenés ya Cursor + Claude Code corriendo, andá primero a la <a href="/recursos/setup">guía 01 (Setup)</a>. Esta guía asume que ya los tenés funcionando.</p>
          </div>
          <div className="gc-stack">
            {stack.map(s => (
              <div key={s.n} className="gc-stack-item">
                <span className="gc-stack-n">{s.n}</span>
                <div>
                  <div className="gc-stack-l">{s.l}</div>
                  <div className="gc-stack-d">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 01 — MCP */}
        <div className="gc-section" id="paso-mcp">
          <div className="gc-paso-label">Paso 01 · MCP</div>
          <h2 className="gc-h2">Creá el archivo<br /><em>mcp.json.</em></h2>
          <div className="gc-body">
            <p>En la raíz de tu proyecto, creá la carpeta <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>.cursor/</code> (con el punto adelante) y adentro un archivo <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>mcp.json</code> con este contenido exacto. No le cambies nada, ni siquiera un espacio.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">.cursor/mcp.json</span>
            </div>
            <pre>{mcpJson}</pre>
          </div>
          <h3 className="gc-h3">Qué hace cada parte</h3>
          <div className="gc-ul">
            {[
              { code: 'command + args', desc: 'hacen que Cursor arranque el paquete n8n-mcp con npx la primera vez (te lo descarga solo, no instalás nada a mano).' },
              { code: 'MCP_MODE: stdio', desc: 'dice que la comunicación va por la entrada/salida estándar (la forma normal de conectar un MCP local).' },
              { code: 'LOG_LEVEL + DISABLE_CONSOLE_OUTPUT', desc: 'silencian el ruido. Sin esto, Cursor llena la consola de logs cada vez que Claude consulta el MCP.' },
            ].map(item => (
              <div key={item.code} className="gc-ul-item">
                <div className="gc-ul-dot" />
                <span><code>{item.code}</code> {item.desc}</span>
              </div>
            ))}
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Para qué sirve el MCP</div>
            <div className="gc-tip-body">
              El MCP le da a Claude acceso a los 500+ nodos reales de n8n con sus parámetros, tipos y validaciones. Sin él, Claude inventa nombres de nodos que no existen y los workflows fallan al importar.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 02 — RULE */}
        <div className="gc-section" id="paso-rule">
          <div className="gc-paso-label">Paso 02 · Rule</div>
          <h2 className="gc-h2">Creá el rule<br /><em>del agente.</em></h2>
          <div className="gc-body">
            <p>Creá la carpeta <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>.cursor/rules/</code> y adentro el archivo <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>n8n-expert.mdc</code>. Este archivo convierte a Claude en un agente experto en n8n con un proceso fijo: revisar templates primero, validar nodos, entregar Mermaid + JSON listo para pegar.</p>
            <p>La cabecera (el frontmatter YAML entre los tres guiones) es esto:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">.cursor/rules/n8n-expert.mdc · frontmatter</span>
            </div>
            <pre>{rulesFrontmatter}</pre>
          </div>
          <h3 className="gc-h3">Qué significa cada línea</h3>
          <div className="gc-ul">
            {[
              { code: 'description', desc: 'lo que Cursor muestra cuando el rule se activa.' },
              { code: 'globs', desc: 'le decís a Cursor que cargue el rule cuando estés tocando archivos con esos patrones.' },
              { code: 'alwaysApply: true', desc: 'además, el rule está activo en todas tus sesiones del proyecto.' },
            ].map(item => (
              <div key={item.code} className="gc-ul-item">
                <div className="gc-ul-dot" />
                <span><code>{item.code}</code>: {item.desc}</span>
              </div>
            ))}
          </div>
          <div className="gc-body" style={{ marginTop: 16 }}>
            <p>El cuerpo del archivo (después del frontmatter) trae el rol del agente, las 7 skills oficiales de n8n (Expression Syntax, MCP Tools Expert, Workflow Patterns, Validation Expert, Node Configuration, Code JS, Code Python), los principios fundamentales, las 6 fases del proceso, y el formato de entrega obligatorio.</p>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Lo importante del rule</div>
            <div className="gc-tip-body">
              El rule obliga a Claude a entregar siempre en este orden: (1) Mermaid, (2) descripción, (3) JSON, (4) instrucciones para pegar. Esa estructura fija es lo que hace que cada output sea pegable directo en n8n sin tocar nada.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 03 — ACTIVACIÓN */}
        <div className="gc-section" id="paso-activacion">
          <div className="gc-paso-label">Paso 03 · Activación</div>
          <h2 className="gc-h2">Recargá Cursor y<br /><em>verificá el MCP.</em></h2>
          <div className="gc-body">
            <p>Los dos archivos ya están. Falta que Cursor los cargue.</p>
          </div>
          <div className="gc-ol">
            {[
              { n: '1.', text: <span><strong>Recargá Cursor:</strong> <code>Cmd + Shift + P</code> → escribí <em>Reload Window</em> → Enter.</span> },
              { n: '2.', text: <span><strong>Abrí Settings:</strong> <code>Cmd + ,</code> → pestaña <em>MCP</em>.</span> },
              { n: '3.', text: <span><strong>Confirmá el punto verde</strong> al lado de <code>n8n-mcp</code>. La primera vez puede tardar 20-30 segundos porque npx tiene que bajar el paquete.</span> },
              { n: '4.', text: <span><strong>Verificá el rule:</strong> abrí Cmd+Shift+P → escribí <em>Cursor Rules</em>. Tenés que ver <code>n8n-expert</code> con el indicador activo.</span> },
            ].map(item => (
              <div key={item.n} className="gc-ol-item">
                <span className="gc-ol-n">{item.n}</span>
                <span className="gc-ol-text">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Si el MCP sale en rojo</div>
            <div className="gc-tip-body">
              Abrí la terminal en Cursor y corré <code>npx -y n8n-mcp</code> manualmente. Si falla, te avisa qué le hace falta (normalmente es Node 18+ o permisos de npx). Cuando corra limpio, hacé Reload Window otra vez.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 04 — PRIMER WORKFLOW */}
        <div className="gc-section" id="paso-flow">
          <div className="gc-paso-label">Paso 04 · Uso</div>
          <h2 className="gc-h2">Pedile tu primer<br /><em>workflow.</em></h2>
          <div className="gc-body">
            <p>Abrí Claude Code dentro de Cursor (escribí <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>claude</code> en la terminal del proyecto). Como el rule está activo, Claude ya sabe que tiene que entregar en el formato fijo. Probalo con un ejemplo concreto:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal · claude</span>
            </div>
            <pre>{promptEjemplo}</pre>
          </div>
          <div className="gc-body">
            <p>Claude consulta el MCP, busca templates, valida los nodos, y te responde con 4 piezas en orden:</p>
          </div>
          <div className="gc-output-label">1. El diagrama Mermaid del flow</div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">output · mermaid</span>
            </div>
            <pre>{mermaidOutput}</pre>
          </div>
          <div className="gc-output-label">2. Descripción breve</div>
          <div className="gc-body">
            <p>Qué hace el workflow en 3-5 líneas, qué credenciales necesitás (Gmail, Google Drive, Telegram Bot Token), y qué decisión tomó cada nodo.</p>
          </div>
          <div className="gc-output-label">3. El JSON completo</div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">output · workflow.n8n.json</span>
            </div>
            <pre>{jsonOutput}</pre>
          </div>
          <div className="gc-output-label">4. Cómo pegarlo en n8n</div>
          <div className="gc-ol">
            {[
              { n: '1.', text: 'Abrís tu instancia de n8n Cloud.' },
              { n: '2.', text: <span>Click en <strong>+</strong> arriba a la izquierda para crear workflow nuevo.</span> },
              { n: '3.', text: 'Click en el canvas vacío.' },
              { n: '4.', text: 'Cmd+V y aparece el flow completo, con posiciones y conexiones ya armadas.' },
              { n: '5.', text: 'Solo configurá credenciales en los nodos marcados con ⚠️.' },
              { n: '6.', text: 'Cmd+S para guardar y activá el toggle de arriba a la derecha.' },
            ].map(item => (
              <div key={item.n} className="gc-ol-item">
                <span className="gc-ol-n">{item.n}</span>
                <span className="gc-ol-text">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Lo que ahorra tiempo</div>
            <div className="gc-tip-body">
              No tenés que arrastrar nodos, ni acordarte de los nombres exactos, ni configurar posiciones, ni revisar tipos de conexión. Todo viene listo en el JSON. Vos solo conectás credenciales.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* ERRORES */}
        <div className="gc-section" id="errores">
          <div className="gc-section-kicker">Errores comunes</div>
          <h2 className="gc-h2">Lo que te va a pasar<br /><em>la primera vez.</em></h2>
          <div className="gc-errores">
            {errores.map(e => (
              <div key={e.n} className="gc-error-card">
                <div className="gc-error-n">Error {e.n}</div>
                <div className="gc-error-title">{e.title}</div>
                <div className="gc-error-desc">{e.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CONCLUSIÓN */}
        <div className="gc-conclusion">
          <p>Una vez que el setup está, el costo de crear un workflow nuevo es <em>un prompt</em>. No abrís tutoriales, no buscás el nodo, no revisás la documentación. Le decís a Claude lo que querés y pegás el JSON.</p>
          <p>Esa es la diferencia entre tener IA <em>en</em> tu workflow y tener IA <em>como</em> tu workflow.</p>
        </div>

        {/* CTA */}
        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Tu segundo workflow va a tardar<br /><em>2 minutos.</em></h3>
          <p>Una vez que el setup está, cada workflow nuevo es un prompt. En la comunidad subo los prompts que uso, los flows que pego sin tocar, y los casos donde Claude se equivoca (sí, también pasa).</p>
          <a href="/recursos" className="gc-btn-primary">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
