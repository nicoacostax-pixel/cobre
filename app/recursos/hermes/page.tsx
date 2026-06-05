import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Tu propio agente de IA en tu Mac — Guía 05 · Nico IA',
  description: 'Instala Hermes, el agente open source de Nous Research. Memoria, navegador, terminal, WhatsApp. Todo en tu MacBook, en 10 minutos.',
}

const toc = [
  { id: 'que-es', label: '¿Qué es Hermes?' },
  { id: 'antes', label: 'Antes de empezar' },
  { id: 'paso-1', label: 'Paso 1 · Abrir la Terminal' },
  { id: 'paso-2', label: 'Paso 2 · Pegar el comando' },
  { id: 'paso-3', label: 'Paso 3 · Instalación automática' },
  { id: 'paso-4', label: 'Paso 4 · Browser interno' },
  { id: 'paso-5', label: 'Paso 5 · Elegir proveedor' },
  { id: 'paso-6', label: 'Paso 6 · Iniciar sesión' },
  { id: 'paso-7', label: 'Paso 7 · Elegir modelo' },
  { id: 'paso-8', label: 'Paso 8 · Tu agente está vivo' },
  { id: 'ideas', label: 'Qué hacer ahora con Hermes' },
  { id: 'troubleshoot', label: 'Si algo no funciona' },
]

const features = [
  { icon: '🌐', title: 'Navegador', desc: 'Busca en internet, lee páginas, extrae datos. Sin abrir tu Chrome.' },
  { icon: '💻', title: 'Terminal', desc: 'Ejecuta comandos en tu Mac. Te ayuda a programar o automatizar tareas.' },
  { icon: '🧠', title: 'Memoria', desc: 'Recuerda tus preferencias y conversaciones anteriores entre sesiones.' },
  { icon: '📱', title: 'WhatsApp', desc: 'Háblale por WhatsApp y mantén contexto entre conversaciones.' },
  { icon: '🎨', title: 'Imágenes', desc: 'Genera imágenes desde texto sin salir del agente.' },
  { icon: '⚒', title: 'Skills', desc: 'Crea habilidades personalizadas para tareas que repetís todo el tiempo.' },
]

const proveedores = [
  { name: 'Claude', note: 'Recomendado', desc: 'Mejor para razonamiento complejo y seguimiento de instrucciones largas.' },
  { name: 'GPT-4o', note: 'Alternativa', desc: 'Excelente para tareas multimodales y generación de código.' },
  { name: 'Gemini', note: 'Google', desc: 'Muy bueno con contextos largos y análisis de documentos.' },
  { name: 'DeepSeek', note: 'Open source', desc: 'Gratis o muy barato. Bueno para tareas de código y análisis.' },
  { name: 'Local (Ollama)', note: '100% privado', desc: 'Sin enviar datos a ningún servidor. Necesita más RAM.' },
]

const ideas = [
  { title: 'Investigación de mercado', desc: 'Pedile que navegue 5 perfiles de competidores y te resuma qué publican y cada cuánto.' },
  { title: 'Automatizar tareas de terminal', desc: 'Organizá tus carpetas de downloads, renombrá archivos en batch, borrá duplicados.' },
  { title: 'Conectarlo con WhatsApp', desc: 'Respondé consultas frecuentes desde tu Mac sin tocar el teléfono.' },
  { title: 'Creación de contenido asistida', desc: 'Lee tus últimos 10 posts de Instagram y generá variaciones en tu tono.' },
  { title: 'Análisis de PDFs', desc: 'Arrastrá un contrato o propuesta y pedile un resumen con los puntos clave y red flags.' },
]

const installCmd = `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash`

export default function HermesPage() {
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

        .gc-features { display: grid; gap: 10px; margin: 20px 0; }
        @media(min-width:560px) { .gc-features { grid-template-columns: 1fr 1fr; } }
        .gc-feature { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; }
        .gc-feature-top { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .gc-feature-icon { font-size: 18px; }
        .gc-feature-title { font-size: 14px; font-weight: 600; color: var(--cream); }
        .gc-feature-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

        .gc-steps { display: flex; flex-direction: column; gap: 0; margin: 16px 0; }
        .gc-step { display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--cream-dim); line-height: 1.6; }
        .gc-step:last-child { border-bottom: none; }
        .gc-step-n { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 700; color: var(--copper); flex-shrink: 0; width: 28px; }

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

        .gc-proveedores { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-proveedor { display: flex; align-items: flex-start; gap: 14px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; }
        .gc-proveedor-name { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 700; color: var(--amber); min-width: 80px; flex-shrink: 0; }
        .gc-proveedor-note { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--copper); display: block; margin-top: 2px; }
        .gc-proveedor-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

        .gc-ideas { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-idea { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 16px 18px; }
        .gc-idea-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 5px; }
        .gc-idea-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

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
          <div className="gc-kicker">Guía · Hermes Agent</div>
          <div className="gc-pill">Open source · Gratis · 100% privado</div>
          <h1 className="gc-h1">
            Tu propio agente de IA<br />
            <em>viviendo</em> dentro de tu Mac.
          </h1>
          <p className="gc-intro">
            La guía definitiva para instalar <strong>Hermes</strong>, el agente open source de Nous Research, en tu MacBook. Memoria propia, navegador, terminal, conexión con WhatsApp, y vos decidís qué cerebro usa por dentro.
          </p>
          <div className="gc-meta-row">
            <span>— 10 minutos de instalación</span>
            <span>— Apple Silicon compatible</span>
            <span>— 100% gratis</span>
          </div>
        </div>

        <div className="gc-stats">
          <div className="gc-stat">
            <div className="gc-stat-num">29</div>
            <div className="gc-stat-label">herramientas integradas</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">25+</div>
            <div className="gc-stat-label">proveedores de IA</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">∞</div>
            <div className="gc-stat-label">memoria persistente</div>
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
          <div className="gc-section-kicker">Contexto</div>
          <h2 className="gc-h2">¿Qué es <em>Hermes,</em><br />exactamente?</h2>
          <div className="gc-body">
            <p>
              Hermes es un <strong>agente de IA open source</strong> creado por Nous Research. Imaginá tu propio ChatGPT, pero viviendo dentro de tu computadora, con memoria propia, capacidad de navegar la web, ejecutar comandos en tu terminal, gestionar archivos, generar imágenes y hasta conectarse con tu WhatsApp.
            </p>
            <p>
              La diferencia clave con cualquier ChatGPT, Claude o Gemini que uses ahora: vos decidís qué modelo usa por dentro. Podés enchufarle GPT-4o, Claude, Gemini, DeepSeek, Grok, Qwen, lo que quieras. Y todo se queda en tu Mac. Sin suscripciones obligatorias. Sin enviar tus datos a terceros raros.
            </p>
          </div>

          <div className="gc-features">
            {features.map(f => (
              <div key={f.title} className="gc-feature">
                <div className="gc-feature-top">
                  <span className="gc-feature-icon">{f.icon}</span>
                  <span className="gc-feature-title">{f.title}</span>
                </div>
                <div className="gc-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="antes">
          <div className="gc-section-kicker">Antes de empezar</div>
          <h2 className="gc-h2">Qué necesitás<br /><em>tener listo</em></h2>
          <div className="gc-body">
            <p>Requisitos mínimos antes de abrir la Terminal:</p>
          </div>
          <div className="gc-steps">
            <div className="gc-step"><span className="gc-step-n">01</span><span>MacBook con Apple Silicon (M1, M2, M3 o M4) o Intel. Funciona en ambos.</span></div>
            <div className="gc-step"><span className="gc-step-n">02</span><span>macOS 12 Monterey o superior. Si tenés Ventura o Sonoma, perfecto.</span></div>
            <div className="gc-step"><span className="gc-step-n">03</span><span>Al menos 8 GB de RAM. Con 16 GB funciona mejor si usás modelos locales.</span></div>
            <div className="gc-step"><span className="gc-step-n">04</span><span>Conexión a internet para la instalación inicial y para los proveedores en la nube.</span></div>
            <div className="gc-step"><span className="gc-step-n">05</span><span>Una API key de tu proveedor preferido (Claude, OpenAI, etc.) o configuración de modelo local.</span></div>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Si no tenés API key todavía</div>
            <div className="gc-tip-body">
              Podés instalar Hermes igual y configurar el proveedor después. El paso 5 de la guía explica cómo elegir y conectar el proveedor una vez que Hermes está corriendo.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="paso-1">
          <div className="gc-section-kicker">Paso 01</div>
          <h2 className="gc-h2">Abrí la <em>Terminal</em></h2>
          <div className="gc-body">
            <p>Presioná <strong>Cmd + Espacio</strong>, escribí "Terminal" y presioná Enter. También podés ir a Aplicaciones → Utilidades → Terminal.</p>
            <p>Si usás iTerm2, Warp, o cualquier terminal alternativa, funciona igual.</p>
          </div>
        </div>

        <div className="gc-section" id="paso-2">
          <div className="gc-section-kicker">Paso 02</div>
          <h2 className="gc-h2">Pegá el <em>comando</em></h2>
          <div className="gc-body">
            <p>Copiá este comando y pegalo entero en la Terminal. Presioná Enter. Eso es todo.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">terminal · comando de instalación</span>
            </div>
            <pre>{installCmd}</pre>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— El sistema puede pedirte la contraseña</div>
            <div className="gc-tip-body">
              Es normal. macOS pide confirmación para instalar software nuevo. Escribí tu contraseña de usuario (la del sistema, no la del correo) y presioná Enter. No va a mostrarse nada mientras escribís — es por seguridad.
            </div>
          </div>
        </div>

        <div className="gc-section" id="paso-3">
          <div className="gc-section-kicker">Paso 03</div>
          <h2 className="gc-h2"><em>Instalación</em> automática</h2>
          <div className="gc-body">
            <p>El script instala todo lo necesario: las dependencias del sistema, el runtime de Hermes, y abre el browser interno automáticamente cuando termina.</p>
            <p>El proceso tarda entre 3 y 8 minutos según tu velocidad de internet. No lo cerrés a la mitad.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">output esperado en la terminal</span>
            </div>
            <pre>{`→ Verificando dependencias...
→ Instalando Hermes Agent...
→ Configurando entorno...
→ Hermes instalado correctamente.
→ Abriendo en localhost:3000...`}</pre>
          </div>
        </div>

        <div className="gc-section" id="paso-5">
          <div className="gc-section-kicker">Paso 05</div>
          <h2 className="gc-h2">Elegí tu <em>proveedor</em></h2>
          <div className="gc-body">
            <p>Hermes te pregunta qué modelo quiere usar por dentro. Podés cambiarlo cuando quieras. Para empezar, Claude Sonnet es la mejor opción.</p>
          </div>
          <div className="gc-proveedores">
            {proveedores.map(p => (
              <div key={p.name} className="gc-proveedor">
                <div>
                  <div className="gc-proveedor-name">{p.name}</div>
                  <span className="gc-proveedor-note">{p.note}</span>
                </div>
                <div className="gc-proveedor-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-section" id="paso-8">
          <div className="gc-section-kicker">Paso 08</div>
          <h2 className="gc-h2">Tu agente<br /><em>está vivo.</em></h2>
          <div className="gc-body">
            <p>
              Cuando el browser interno carga con el chat listo, tu agente está corriendo. Probalo con algo simple primero: "¿Qué hora es?" o "Abrí el Finder y muéstrame los archivos de Descargas".
            </p>
            <p>
              La primera vez que le pedís navegar una web o ejecutar un comando de terminal, te va a pedir confirmación. Después de confirmar una vez, lo hace solo.
            </p>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— El primer prompt que vale la pena probar</div>
            <div className="gc-tip-body">
              Pedile: "Navega mis últimos 5 posts de Instagram y dame un resumen de qué temas cubro, qué tono uso y cuánto engagement promedio tienen." Esto tarda 2-3 minutos y ya ves qué puede hacer.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="ideas">
          <div className="gc-section-kicker">Qué hacer ahora</div>
          <h2 className="gc-h2">5 cosas que podés hacer<br />con Hermes <em>hoy mismo.</em></h2>
          <div className="gc-ideas">
            {ideas.map(idea => (
              <div key={idea.title} className="gc-idea">
                <div className="gc-idea-title">{idea.title}</div>
                <div className="gc-idea-desc">{idea.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="troubleshoot">
          <div className="gc-section-kicker">Si algo no funciona</div>
          <h2 className="gc-h2">Los problemas más<br /><em>comunes.</em></h2>
          <div className="gc-steps">
            <div className="gc-step"><span className="gc-step-n">01</span><span><strong style={{color:'var(--cream)'}}>El script falla con "permission denied":</strong> Escribí <code style={{fontFamily:'DM Mono,monospace',fontSize:12,background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:3,padding:'1px 6px',color:'var(--copper)'}}>sudo</code> antes del comando y volvé a intentarlo.</span></div>
            <div className="gc-step"><span className="gc-step-n">02</span><span><strong style={{color:'var(--cream)'}}>El browser no abre solo:</strong> Abrí manualmente <code style={{fontFamily:'DM Mono,monospace',fontSize:12,background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:3,padding:'1px 6px',color:'var(--copper)'}}>http://localhost:3000</code> en tu browser.</span></div>
            <div className="gc-step"><span className="gc-step-n">03</span><span><strong style={{color:'var(--cream)'}}>Hermes no responde:</strong> Cerrá la Terminal, abrí una nueva y escribí <code style={{fontFamily:'DM Mono,monospace',fontSize:12,background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:3,padding:'1px 6px',color:'var(--copper)'}}>hermes start</code>.</span></div>
            <div className="gc-step"><span className="gc-step-n">04</span><span><strong style={{color:'var(--cream)'}}>Error de API key inválida:</strong> Copiá de nuevo la key desde el dashboard de tu proveedor — sin espacios antes ni después.</span></div>
          </div>
        </div>

        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Hermes vive<br />en tu <em>Mac.</em></h3>
          <p>
            La siguiente guía: cómo hacer un video desde cero<br />
            con Claude Code y Remotion. Le hablás, sale un MP4.
          </p>
          <a href="/recursos/video" className="gc-btn-primary">Guía 06 · Video con Remotion →</a>
        </div>

      </div>
    </>
  )
}
