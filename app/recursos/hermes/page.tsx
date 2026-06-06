import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Tu propio agente de IA en tu Mac — Guía 05 · Nico IA',
  description: 'Instalá Hermes, el agente open source de Nous Research, en tu MacBook. Memoria propia, navegador, terminal, WhatsApp. 10 minutos de instalación.',
}

const toc = [
  { id: 'que-es',    label: '¿Qué es Hermes?' },
  { id: 'antes',     label: 'Antes de empezar' },
  { id: 'paso-1',    label: 'Paso 1 · Abrir la Terminal' },
  { id: 'paso-2',    label: 'Paso 2 · Pegar el comando' },
  { id: 'paso-3',    label: 'Paso 3 · Instalación automática' },
  { id: 'paso-4',    label: 'Paso 4 · Browser interno' },
  { id: 'paso-5',    label: 'Paso 5 · Elegir proveedor' },
  { id: 'paso-6',    label: 'Paso 6 · Iniciar sesión' },
  { id: 'paso-7',    label: 'Paso 7 · Elegir modelo' },
  { id: 'paso-8',    label: 'Paso 8 · Tu agente está vivo' },
  { id: 'comandos',  label: 'Comandos útiles' },
  { id: 'troubleshoot', label: 'Si algo no funciona' },
  { id: 'faq',       label: 'Preguntas frecuentes' },
]

const capacidades = [
  { n: '01', title: 'Navegador',  desc: 'Busca en internet, lee páginas, extrae datos. Sin abrir tu Chrome.' },
  { n: '02', title: 'Terminal',   desc: 'Ejecuta comandos en tu Mac. Te ayuda a programar o automatizar tareas.' },
  { n: '03', title: 'Memoria',    desc: 'Recuerda tus preferencias y conversaciones anteriores entre sesiones.' },
  { n: '04', title: 'WhatsApp',   desc: 'Háblale por WhatsApp y mantén contexto entre conversaciones.' },
  { n: '05', title: 'Imágenes',   desc: 'Genera imágenes desde texto sin salir del agente.' },
  { n: '06', title: 'Skills',     desc: 'Creá habilidades personalizadas para tareas que repetís todo el tiempo.' },
]

const installCommand = `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash`

const installerOutput = `  ┌─────────────────────────────────────┐
  │   ÷ Hermes Agent Installer          │
  │   An open source AI agent by Nous.  │
  └─────────────────────────────────────┘

✓ Detected: macos (macos)
→ Checking for uv package manager...
→ Installing uv (fast Python package manager)...
installing to /Users/juana/.local/bin
  uv
  uvx
everything's installed!

✓ uv installed (uv 0.11.7)
→ Checking Python 3.11...
→ Python 3.11 not found, installing via uv...
Installed Python 3.11.15 in 1.30s
+ cpython-3.11.15-macos-arm64-none`

const browserOutput = `Downloading FFmpeg (playwright ffmpeg v1011)
FFmpeg downloaded to ~/Library/Caches/ms-playwright
Downloading Chrome Headless Shell 147.0.7727.15
Chrome Headless Shell downloaded successfully
✓ Browser engine setup complete
→ Installing TUI dependencies...`

const proveedorOutput = `Select provider:
 ↑↓ navigate    ENTER/SPACE select    ESC cancel

   (●) Nous Portal (Nous Research subscription)
   (○) OpenRouter (100+ models, pay-per-use)
   (○) Vercel AI Gateway (200+ models, $5 free)
   (○) Anthropic (Claude models — API key)
   (○) OpenAI Codex
   (○) Google Gemini via OAuth + Code Assist (free)
   (○) DeepSeek (DeepSeek-V3, R1, coder)
   (○) xAI (Grok models — direct API)
   (○) Custom endpoint (enter URL manually)
   ... y muchos más`

const loginOutput = `◆ Inference Provider
  Choose how to connect to your main chat model.

Current model:    anthropic/claude-opus-4-7
Active provider:  none

Not logged into Anthropic. Starting login...

To continue, follow these steps:

  1. Open this URL in your browser:
     https://auth.anthropic.com/device

  2. Enter this code:
     0D9N-GQ3JU

Waiting for sign-in... (press Ctrl+C to cancel)`

const comandos = [
  { cmd: 'hermes',                     desc: 'Arranca el agente (interfaz TUI en la terminal).' },
  { cmd: 'hermes model',               desc: 'Cambia el modelo activo.' },
  { cmd: 'hermes config',              desc: 'Abre la configuración interactiva.' },
  { cmd: 'hermes memory list',         desc: 'Muestra lo que el agente recuerda de vos.' },
  { cmd: 'hermes memory clear',        desc: 'Borra toda la memoria.' },
  { cmd: 'hermes skills',              desc: 'Lista tus skills instalados.' },
  { cmd: 'hermes whatsapp connect',    desc: 'Conecta WhatsApp (escaneas QR).' },
  { cmd: 'rm -rf ~/.hermes ~/.local/bin/hermes', desc: 'Desinstalación completa.' },
]

const faq = [
  { q: '¿Es seguro? ¿Mis datos van a alguna parte rara?', a: 'El código de Hermes es open source y podés revisarlo. Tus conversaciones van al proveedor de IA que elegiste (Anthropic, OpenAI, etc.) bajo sus términos. La memoria, la configuración y las skills se quedan en tu Mac, en la carpeta ~/.hermes.' },
  { q: '¿Cuesta dinero?', a: 'Hermes en sí es gratis. Lo que cuesta es el modelo que elijas: si usás tu cuenta de Claude Pro o ChatGPT Plus, no pagás extra. Si usás APIs pay-per-use como OpenRouter, pagás por consumo (suele ser centavos). Si querés totalmente gratis, Google Gemini tiene capa gratuita decente.' },
  { q: '¿Puedo usarlo en Windows o Linux?', a: 'Sí, pero esta guía es específica para Mac. La instalación en Linux es muy parecida. En Windows necesitás WSL (Windows Subsystem for Linux) o Git Bash.' },
  { q: '¿Puedo cambiar de modelo después?', a: 'Sí, cuando quieras. Solo escribí hermes model en la terminal y elegís otro. Podés tener varios proveedores configurados a la vez.' },
  { q: '¿Funciona offline?', a: 'El agente sí, pero el modelo no (a menos que uses uno local con Ollama). La mayoría lo usa online porque los modelos buenos son los de la nube. Si te importa la privacidad total, configurá Hermes con Ollama y un modelo local como Llama o Qwen.' },
  { q: '¿Va a ralentizar mi Mac?', a: 'No. Hermes solo consume recursos cuando lo estás usando, y muy poco. La carga real está en el servidor del proveedor de IA, no en tu máquina. Excepción: si usás un modelo local con Ollama, ahí sí consume CPU/GPU/RAM.' },
]

const troubleshooting = [
  { title: 'La instalación se cuelga sin hacer nada', fix: 'Casi siempre es solo lentitud de conexión. Esperá 2-3 minutos antes de cancelar. Si se te acaba la paciencia, dale Ctrl+C, esperá unos segundos y volvé a lanzar el comando de instalación. Lo que ya descargó no lo vuelve a bajar.' },
  { title: 'Error de autenticación', fix: 'El código de 9 caracteres caduca rápido (unos 3-5 minutos). Si tardás mucho en pegarlo te toca repetir el paso de login. No pasa nada, no rompe nada.' },
  { title: '"Permission denied" al instalar', fix: 'Macs nuevos a veces piden permisos extra. Si sale ese error, probá ejecutar: sudo [el mismo comando]. Te va a pedir tu contraseña de Mac. La escribís (no se ve, es normal) y le das Enter.' },
  { title: 'Hermes responde raro o muy corto', fix: 'Probablemente tenés un modelo haiku o mini activo. Cambiá a uno más potente con hermes model y elegí claude-opus-4-7 o claude-sonnet-4-6.' },
  { title: 'Quiero desinstalarlo', fix: 'Borrá estas carpetas: rm -rf ~/.hermes ~/.local/bin/hermes — y queda como nuevo.' },
]

export default function HermesPage() {
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

        .gc-caps-grid { display: grid; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-caps-grid { grid-template-columns: 1fr 1fr; } }
        .gc-cap { display: flex; align-items: baseline; gap: 14px; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; }
        .gc-cap-n { font-family: 'DM Mono', monospace; font-size: 10px; color: #4A3D30; flex-shrink: 0; }
        .gc-cap-l { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 3px; }
        .gc-cap-d { font-size: 12px; color: var(--cream-dim); line-height: 1.5; }

        .gc-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 24px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin: 24px 0; }
        .gc-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-style: italic; font-weight: 700; color: var(--copper); line-height: 1; }
        .gc-stat-label { font-size: 11px; color: var(--cream-dim); margin-top: 4px; }

        .gc-ol { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-ol-item { display: flex; gap: 14px; align-items: baseline; }
        .gc-ol-n { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; color: var(--copper); flex-shrink: 0; }
        .gc-ol-text { font-size: 14px; color: var(--cream-dim); line-height: 1.6; }
        .gc-ol-text strong { color: var(--cream); }

        .gc-ul { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-ul-item { display: flex; gap: 10px; align-items: baseline; font-size: 14px; color: var(--cream-dim); line-height: 1.6; }
        .gc-ul-item strong { color: var(--cream); font-weight: 600; }
        .gc-ul-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--copper); flex-shrink: 0; margin-top: 8px; }

        .gc-proveedor-rec { display: flex; flex-direction: column; gap: 8px; margin: 20px 0; }
        .gc-prov { display: flex; flex-direction: column; gap: 4px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 18px; }
        @media(min-width:560px){ .gc-prov { flex-direction: row; align-items: baseline; gap: 16px; } }
        .gc-prov-cond { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; color: #4A3D30; flex-shrink: 0; min-width: 180px; }
        .gc-prov-rec { font-size: 14px; font-weight: 600; color: var(--cream); }
        .gc-prov-sub { font-size: 12px; color: var(--cream-dim); }

        .gc-comandos { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin: 20px 0; }
        .gc-cmd-row { display: flex; flex-direction: column; gap: 3px; padding: 12px 18px; border-bottom: 1px solid var(--border); }
        .gc-cmd-row:last-child { border-bottom: none; }
        @media(min-width:560px){ .gc-cmd-row { flex-direction: row; align-items: baseline; gap: 16px; } }
        .gc-cmd { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--copper); flex-shrink: 0; }
        .gc-cmd-desc { font-size: 13px; color: var(--cream-dim); }

        .gc-troubleshoot { display: flex; flex-direction: column; gap: 12px; margin: 20px 0; }
        .gc-ts { background: var(--bg2); border: 1px solid var(--border); border-left: 2px solid var(--amber); border-radius: 10px; padding: 16px 20px; }
        .gc-ts-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 6px; }
        .gc-ts-fix { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

        .gc-faq { display: flex; flex-direction: column; gap: 1px; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin: 20px 0; }
        .gc-faq-item { background: var(--bg2); padding: 18px 20px; border-bottom: 1px solid var(--border); }
        .gc-faq-item:last-child { border-bottom: none; }
        .gc-faq-q { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 8px; }
        .gc-faq-a { font-size: 13px; color: var(--cream-dim); line-height: 1.7; }

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
          <div className="gc-kicker">Guía 05 · Hermes Agent · 2026</div>
          <div className="gc-pill">Open source · Gratis · 100% privado</div>
          <h1 className="gc-h1">
            Tu propio agente de IA<br />
            <em>viviendo</em> dentro de tu Mac.
          </h1>
          <p className="gc-intro">
            La guía definitiva para instalar <strong>Hermes</strong>, el agente open source de Nous Research, en tu MacBook. Memoria propia, navegador, terminal, conexión con WhatsApp, y vos decidís qué cerebro usa por dentro.
          </p>
          <p className="gc-intro">
            <strong>10 minutos</strong> de instalación. Cualquier Mac (Intel o Apple Silicon). Costo: cero.
          </p>
          <div className="gc-divider-h" />
        </div>

        {/* TOC */}
        <div className="gc-toc">
          <div className="gc-toc-title">Lo que vas a encontrar aquí</div>
          <div className="gc-toc-links">
            {toc.map(item => (
              <a key={item.id} href={`#${item.id}`}>{item.label}</a>
            ))}
          </div>
        </div>

        {/* QUÉ ES HERMES */}
        <div className="gc-section" id="que-es">
          <div className="gc-section-kicker">Contexto</div>
          <h2 className="gc-h2">¿Qué es<br /><em>Hermes, exactamente?</em></h2>
          <div className="gc-body">
            <p>Hermes es un <strong>agente de IA open source</strong> creado por Nous Research. Imaginá tu propio ChatGPT, pero viviendo dentro de tu computadora, con memoria propia, capacidad de navegar la web, ejecutar comandos en tu terminal, gestionar archivos, generar imágenes y hasta conectarse con tu WhatsApp.</p>
            <p>La diferencia clave con cualquier ChatGPT, Claude o Gemini que usés ahora: <em>vos decidís qué modelo usa por dentro.</em> Podés enchufale GPT, Claude, Gemini, DeepSeek, Grok, Qwen, lo que quieras. Y todo se queda en tu Mac. Sin suscripciones obligatorias.</p>
          </div>
          <div className="gc-stats">
            <div>
              <div className="gc-stat-num">29</div>
              <div className="gc-stat-label">Herramientas integradas</div>
            </div>
            <div>
              <div className="gc-stat-num">25+</div>
              <div className="gc-stat-label">Proveedores de IA disponibles</div>
            </div>
            <div>
              <div className="gc-stat-num">∞</div>
              <div className="gc-stat-label">Memoria persistente</div>
            </div>
          </div>
          <h3 className="gc-h3">Lo que viene de fábrica</h3>
          <div className="gc-caps-grid">
            {capacidades.map(c => (
              <div key={c.n} className="gc-cap">
                <span className="gc-cap-n">{c.n}</span>
                <div>
                  <div className="gc-cap-l">{c.title}</div>
                  <div className="gc-cap-d">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* ANTES DE EMPEZAR */}
        <div className="gc-section" id="antes">
          <div className="gc-section-kicker">Antes de empezar</div>
          <h2 className="gc-h2">Qué necesitás<br /><em>tener listo.</em></h2>
          <div className="gc-body">
            <p>No te asustes, no hace falta saber programar ni nada raro. Esto es lo único que necesitás:</p>
          </div>
          <div className="gc-ul">
            {[
              { strong: 'Un Mac.', text: 'Da igual si es Intel o Apple Silicon (M1, M2, M3, M4). Funciona en cualquiera con macOS razonablemente actualizado.' },
              { strong: 'Conexión a internet decente.', text: 'La instalación descarga unos 200-300 MB de cosas.' },
              { strong: 'Una cuenta del proveedor de IA', text: 'que vayas a usar. Si tenés ChatGPT Plus o Claude Pro, ya está. Si no, casi todos tienen capa gratuita.' },
              { strong: '10 minutos de tu tiempo', text: 'y nada más. Lo demás se instala solo.' },
            ].map((item, i) => (
              <div key={i} className="gc-ul-item">
                <div className="gc-ul-dot" />
                <span><strong>{item.strong}</strong> {item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 1 */}
        <div className="gc-section" id="paso-1">
          <div className="gc-paso-label">Paso 01 · Abrir la Terminal</div>
          <h2 className="gc-h2">Primero, <em>abrí</em><br />la Terminal.</h2>
          <div className="gc-tip info">
            <div className="gc-tip-head">— Tranqui</div>
            <div className="gc-tip-body">
              Si nunca abriste la Terminal de tu Mac, no pasa nada. La Terminal solo es una ventana donde escribís comandos, no rompe nada.
            </div>
          </div>
          <div className="gc-body">
            <p>Para abrirla:</p>
          </div>
          <div className="gc-ol">
            <div className="gc-ol-item">
              <span className="gc-ol-n">1.</span>
              <span className="gc-ol-text">Presioná <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)', background: 'var(--bg3)', padding: '2px 6px', borderRadius: '4px' }}>Cmd + Espacio</code> para abrir Spotlight.</span>
            </div>
            <div className="gc-ol-item">
              <span className="gc-ol-n">2.</span>
              <span className="gc-ol-text">Escribí <strong>Terminal</strong> y dale Enter.</span>
            </div>
            <div className="gc-ol-item">
              <span className="gc-ol-n">3.</span>
              <span className="gc-ol-text">Se va a abrir una ventana negra con texto. Esa es.</span>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 2 */}
        <div className="gc-section" id="paso-2">
          <div className="gc-paso-label">Paso 02 · Pegar el comando</div>
          <h2 className="gc-h2">Pegá <em>este comando</em><br />y dale Enter.</h2>
          <div className="gc-body">
            <p>Este es el comando mágico. Copialo entero, pegalo en la Terminal y presioná Enter:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal</span>
            </div>
            <pre>{`$ ${installCommand}`}</pre>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Importante</div>
            <div className="gc-tip-body">
              El comando curl descarga un script y | bash lo ejecuta. Es seguro porque viene del repositorio oficial de Nous Research, pero como regla general: no ejecutés comandos así de webs random.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 3 */}
        <div className="gc-section" id="paso-3">
          <div className="gc-paso-label">Paso 03 · Instalación automática</div>
          <h2 className="gc-h2">Hermes <em>se instala solo.</em></h2>
          <div className="gc-body">
            <p>Lo primero que ves es el banner del instalador. Hermes empieza a montar todo lo que necesita. Detecta tu sistema, instala <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>uv</code> (un gestor de paquetes de Python rapidísimo) y prepara el terreno. Vas a ver muchísimo texto pasando por la pantalla, <strong>es totalmente normal</strong>, no toques nada.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal · output del instalador</span>
            </div>
            <pre>{installerOutput}</pre>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Truco</div>
            <div className="gc-tip-body">
              Aprovechá estos minutos para ir por un café. Tarda entre 2 y 5 minutos según tu internet. Si parece que se queda colgado, casi siempre es solo que está descargando algo grande.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 4 */}
        <div className="gc-section" id="paso-4">
          <div className="gc-paso-label">Paso 04 · Browser interno</div>
          <h2 className="gc-h2">Le instala <em>su propio Chrome</em><br />sin que abras nada.</h2>
          <div className="gc-body">
            <p>Esta parte siempre sorprende. Hermes se descarga su propio navegador <strong>headless</strong> (sin ventana visible) para poder navegar la web por vos cuando se lo pidas. No interfiere con tu Chrome ni con tu Safari, vive aparte.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal · descarga del browser</span>
            </div>
            <pre>{browserOutput}</pre>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 5 */}
        <div className="gc-section" id="paso-5">
          <div className="gc-paso-label">Paso 05 · Elegir proveedor</div>
          <h2 className="gc-h2">Elegí qué <em>cerebro</em><br />va a tener tu agente.</h2>
          <div className="gc-body">
            <p>Cuando termina la instalación, Hermes te muestra la lista de proveedores de IA. Decidís qué modelo va a estar pensando por dentro de tu agente. Te movés con las flechas ↑↓ y seleccionás con Enter.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal · selección de proveedor</span>
            </div>
            <pre>{proveedorOutput}</pre>
          </div>
          <h3 className="gc-h3">¿Cuál elegir? Mi recomendación rápida</h3>
          <div className="gc-proveedor-rec">
            {[
              { cond: 'Ya pagás Claude Pro',       rec: 'Anthropic',              sub: 'Es lo que recomiendo. Metés tu API key.' },
              { cond: 'Ya pagás ChatGPT Plus',     rec: 'OpenAI Codex',           sub: 'Reusás tu cuenta, no pagás nada extra.' },
              { cond: 'Querés gratis sin tarjeta', rec: 'Google Gemini via OAuth', sub: 'Tiene capa gratuita generosa.' },
              { cond: 'Querés flexibilidad total', rec: 'OpenRouter',              sub: '100+ modelos, pagás por uso. Suele ser centavos.' },
              { cond: 'Te importa la privacidad',  rec: 'Nous Portal',             sub: 'Del propio equipo que hace Hermes.' },
            ].map(p => (
              <div key={p.cond} className="gc-prov">
                <span className="gc-prov-cond">{p.cond}</span>
                <div>
                  <div className="gc-prov-rec">→ {p.rec}</div>
                  <div className="gc-prov-sub">{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 6 */}
        <div className="gc-section" id="paso-6">
          <div className="gc-paso-label">Paso 06 · Iniciar sesión</div>
          <h2 className="gc-h2">Vinculá tu cuenta con<br /><em>un código de 9 caracteres.</em></h2>
          <div className="gc-body">
            <p>Una vez elegís el proveedor, Hermes te genera un enlace y un código corto. Es un sistema de login muy seguro que no requiere copiar API keys ni nada.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal · login</span>
            </div>
            <pre>{loginOutput}</pre>
          </div>
          <div className="gc-ol">
            <div className="gc-ol-item">
              <span className="gc-ol-n">1.</span>
              <span className="gc-ol-text">Abrís el enlace en tu navegador.</span>
            </div>
            <div className="gc-ol-item">
              <span className="gc-ol-n">2.</span>
              <span className="gc-ol-text">Pegás el código exacto que ves en la terminal.</span>
            </div>
            <div className="gc-ol-item">
              <span className="gc-ol-n">3.</span>
              <span className="gc-ol-text">Autorizás la conexión. Volvés a la terminal.</span>
            </div>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— El código caduca rápido</div>
            <div className="gc-tip-body">
              El código de 9 caracteres caduca en unos 3-5 minutos. Si tardás mucho en pegarlo te toca repetir el paso de login. No pasa nada, no rompe nada.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 7 */}
        <div className="gc-section" id="paso-7">
          <div className="gc-paso-label">Paso 07 · Elegir modelo</div>
          <h2 className="gc-h2">Elegí el modelo<br /><em>correcto para tu uso.</em></h2>
          <div className="gc-body">
            <p>Después del login, Hermes te muestra los modelos disponibles del proveedor que elegiste. Para uso general:</p>
          </div>
          <div className="gc-proveedor-rec">
            {[
              { cond: 'Uso general y razonamiento',  rec: 'claude-opus-4-7',    sub: 'El más potente de Anthropic.' },
              { cond: 'Producción y escritura',       rec: 'claude-sonnet-4-6',  sub: 'Buen equilibrio velocidad/calidad.' },
              { cond: 'Tareas rápidas y repetitivas', rec: 'claude-haiku-4-5',   sub: 'El más rápido y barato.' },
            ].map(p => (
              <div key={p.cond} className="gc-prov">
                <span className="gc-prov-cond">{p.cond}</span>
                <div>
                  <div className="gc-prov-rec"><code style={{ fontFamily: 'DM Mono', fontSize: '12px', color: 'var(--copper)' }}>{p.rec}</code></div>
                  <div className="gc-prov-sub">{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 8 */}
        <div className="gc-section" id="paso-8">
          <div className="gc-paso-label">Paso 08 · Tu agente está vivo</div>
          <h2 className="gc-h2">Tu agente<br /><em>está vivo.</em></h2>
          <div className="gc-body">
            <p>Si llegaste hasta acá y la pantalla tiene el prompt de Hermes activo, <strong>ya está</strong>. Tu agente está vivo. Probalo con algo concreto:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">hermes · primeras pruebas</span>
            </div>
            <pre>{`> hermes
Hermes Agent v0.8.2 · claude-opus-4-7

¿En qué trabajamos hoy?

> busca en internet qué tiempo hace mañana en Buenos Aires

> abre el archivo README.md de este directorio y resumilo

> crea un archivo llamado notas.md con las ideas que discutimos

> recuerda que mi nombre es Nico y que trabajo con React`}</pre>
          </div>
        </div>

        <div className="gc-divider" />

        {/* COMANDOS */}
        <div className="gc-section" id="comandos">
          <div className="gc-section-kicker">Comandos útiles</div>
          <h2 className="gc-h2">Los comandos<br /><em>que vas a usar más.</em></h2>
          <div className="gc-comandos">
            {comandos.map(c => (
              <div key={c.cmd} className="gc-cmd-row">
                <span className="gc-cmd">{c.cmd}</span>
                <span className="gc-cmd-desc">{c.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* TROUBLESHOOTING */}
        <div className="gc-section" id="troubleshoot">
          <div className="gc-section-kicker">Troubleshooting</div>
          <h2 className="gc-h2">Si algo<br /><em>no funciona.</em></h2>
          <div className="gc-troubleshoot">
            {troubleshooting.map(t => (
              <div key={t.title} className="gc-ts">
                <div className="gc-ts-title">{t.title}</div>
                <div className="gc-ts-fix">{t.fix}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* FAQ */}
        <div className="gc-section" id="faq">
          <div className="gc-section-kicker">FAQ</div>
          <h2 className="gc-h2">Lo que me<br /><em>preguntan siempre.</em></h2>
          <div className="gc-faq">
            {faq.map(item => (
              <div key={item.q} className="gc-faq-item">
                <div className="gc-faq-q">{item.q}</div>
                <div className="gc-faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Ya tenés el agente.<br /><em>Ahora aprendé a sacarle dinero.</em></h3>
          <p>Esta guía te lo deja instalado. La comunidad te enseña a usarlo de verdad: skills personalizadas, automatizaciones reales, casos de clientes y soporte directo cuando te atascarás.</p>
          <a href="/recursos" className="gc-btn-primary">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
