import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'El motor de guardados de Instagram — Guía · Nico IA',
  description: 'Los prompts exactos, el esquema de base de datos y el scheduler para construir un pipeline automático de guardados → ideas de contenido con Claude Code.',
}

const toc = [
  { id: 'que-es',       label: 'Qué estás construyendo' },
  { id: 'prereqs',      label: '01 · Requisitos e instalación' },
  { id: 'notion-dbs',   label: '02 · Las dos bases de datos en Notion' },
  { id: 'cookies',      label: '03 · Cookies de sesión de Instagram' },
  { id: 'sync',         label: '04 · Generar el sync daemon (sync.py)' },
  { id: 'primera-sync', label: '05 · Tu primera sincronización' },
  { id: 'scheduler',    label: '06 · Programar con launchd' },
  { id: 'slash',        label: '07 · El slash command /instagram-sync' },
  { id: 'ideation',     label: '08 · Tu primer ciclo de ideación' },
  { id: 'checklist',    label: 'Checklist completo' },
]

const setupChecklist = [
  'Dos bases de datos de Notion creadas con las propiedades correctas',
  'Integración de Notion conectada a ambas bases de datos',
  'Cookies de Instagram copiadas desde Chrome DevTools',
  'Claude Code generó sync.py, config.example.json, requirements.txt y .gitignore',
  'Python venv creado y dependencias instaladas',
  'config.json completado con cookies reales, token de Notion y database ID',
  'Primera sincronización manual exitosa (filas en Instagram Saves con Status = New)',
  'Plist de launchd instalado y cargado',
  'Slash command creado en .claude/commands/instagram-sync.md',
  'Database IDs y placeholders de nicho actualizados en el archivo del slash command',
]

const weeklyChecklist = [
  'Abrir Claude Code en la carpeta del proyecto',
  'Ejecutar /instagram-sync ideate',
  'Aprobar las ideas que encajan con tu semana',
  'Verificar la base de datos Content Ideas para nuevas entradas',
]

const fixChecklist = [
  'Ejecutar /instagram-sync refresh session',
  'Abrir Chrome, ir a instagram.com, abrir DevTools → Application → Cookies',
  'Copiar sessionid, csrftoken y ds_user_id frescos',
  'Actualizar config.json con los valores nuevos',
  'Ejecutar .venv/bin/python3 sync.py para confirmar el fix',
]

const nextSteps = [
  {
    title: 'Guardá con intención',
    desc: 'Creá colecciones de Instagram para tus pilares de contenido antes de empezar. Guardados organizados → ideas organizadas.',
  },
  {
    title: 'Procesá semanal, no diario',
    desc: 'El batching reduce la carga cognitiva y tus ideas serán más afiladas cuando revisás una semana entera de una vez.',
  },
  {
    title: 'Ajustá el mapeo de pilares',
    desc: 'La lógica colección→pilar del slash command es donde el motor aprende tu voz. Dedicá 10 minutos a personalizarla para tu nicho.',
  },
  {
    title: 'Expandí a otras plataformas',
    desc: 'El mismo patrón funciona para bookmarks de X, YouTube watch-later y guardados de TikTok. Mismo daemon, diferentes endpoints de API.',
  },
]

export default function SavesEnginePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-geist-sans), sans-serif !important; background: #0C0A07 !important; color: #EDE8DC; min-height: 100vh; -webkit-font-smoothing: antialiased; }
        body::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); background-size: 180px 180px; pointer-events: none; z-index: 1000; opacity: 0.4; }
        :root {
          --copper: #C87533; --copper-dim: rgba(200,117,51,0.12); --copper-glow: rgba(200,117,51,0.28);
          --amber: #E8A84E; --verdigris: #3D7A6E; --verdigris-dim: rgba(61,122,110,0.14);
          --cream: #EDE8DC; --cream-dim: #998E82;
          --bg: #0C0A07; --bg2: #141009; --bg3: #1C160C;
          --border: rgba(200,117,51,0.15); --border-mid: rgba(200,117,51,0.28);
        }

        .gc-wrap { max-width: 740px; margin: 0 auto; padding: 0 24px 120px; position: relative; z-index: 1; }

        /* HEADER */
        .gc-header { padding: 48px 0 40px; }
        .gc-kicker { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: #4A3D30; margin-bottom: 20px; }
        .gc-pill { display: inline-flex; align-items: center; gap: 8px; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); background: var(--copper-dim); border: 1px solid var(--border-mid); border-radius: 4px; padding: 5px 12px; margin-bottom: 24px; }
        .gc-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.6rem, 6vw, 4rem); font-weight: 700; line-height: 0.97; letter-spacing: -0.02em; color: var(--cream); margin-bottom: 22px; }
        .gc-h1 em { font-style: italic; color: var(--copper); }
        .gc-intro { font-size: 16px; color: var(--cream-dim); line-height: 1.85; margin-bottom: 10px; }
        .gc-intro strong { color: var(--cream); font-weight: 600; }
        .gc-problem { font-size: 15px; color: var(--cream-dim); line-height: 1.8; font-style: italic; border-left: 2px solid var(--border-mid); padding: 12px 18px; margin: 24px 0; }
        .gc-meta-row { display: flex; flex-wrap: wrap; gap: 20px; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.06em; color: #4A3D30; margin-bottom: 32px; }

        /* TOC */
        .gc-toc { background: var(--copper-dim); border: 1px solid var(--border-mid); border-radius: 12px; padding: 22px 24px; margin: 0 0 52px; }
        .gc-toc-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); margin-bottom: 14px; }
        .gc-toc-list { list-style: none; display: flex; flex-direction: column; }
        .gc-toc-list li { border-bottom: 1px dashed var(--border); }
        .gc-toc-list li:last-child { border-bottom: none; }
        .gc-toc-list a { display: flex; align-items: baseline; gap: 14px; padding: 9px 0; font-size: 13.5px; color: var(--cream-dim); text-decoration: none; transition: color 0.2s; }
        .gc-toc-list a:hover { color: var(--cream); }

        /* SECTION */
        .gc-section { margin-bottom: 68px; scroll-margin-top: 80px; }
        .gc-section-kicker { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--copper); margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
        .gc-section-kicker::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--copper); opacity: 0.7; }
        .gc-h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.9rem, 4vw, 2.7rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; color: var(--cream); margin-bottom: 18px; }
        .gc-h2 em { font-style: italic; color: var(--copper); }
        .gc-h3 { font-size: 16px; font-weight: 600; color: var(--cream); margin: 24px 0 10px; }
        .gc-body { font-size: 15px; color: var(--cream-dim); line-height: 1.85; }
        .gc-body p { margin-bottom: 14px; }
        .gc-body p:last-child { margin-bottom: 0; }
        .gc-body strong { color: var(--cream); font-weight: 600; }

        /* CODE */
        .gc-code { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow-x: auto; margin: 18px 0; }
        .gc-code-header { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-bottom: 1px solid var(--border); }
        .gc-code-dots { display: flex; gap: 5px; }
        .gc-code-dot { width: 9px; height: 9px; border-radius: 50%; }
        .gc-code-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; }
        .gc-code pre { font-family: 'DM Mono', monospace; font-size: 13px; line-height: 1.75; color: var(--cream-dim); white-space: pre-wrap; word-break: break-word; padding: 16px 18px; }
        .gc-code pre .hi { color: var(--copper); }
        .gc-code pre .cm { color: #4A3D30; }

        /* PROMPT BLOCK */
        .gc-prompt { background: rgba(200,117,51,0.06); border: 1px solid var(--border-mid); border-radius: 12px; padding: 20px 22px; margin: 18px 0; }
        .gc-prompt-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .gc-prompt-label::before { content: '>_'; font-size: 11px; }
        .gc-prompt-text { font-size: 14px; color: var(--cream); line-height: 1.7; font-style: italic; }

        /* TIPS */
        .gc-tip { background: var(--bg2); border: 1px solid var(--border); border-left: 2px solid var(--copper); border-radius: 10px; padding: 15px 18px; margin: 18px 0; }
        .gc-tip.warn { border-left-color: var(--amber); }
        .gc-tip.info { border-left-color: var(--verdigris); }
        .gc-tip-head { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--copper); margin-bottom: 6px; }
        .gc-tip.warn .gc-tip-head { color: var(--amber); }
        .gc-tip.info .gc-tip-head { color: var(--verdigris); }
        .gc-tip-body { font-size: 13.5px; color: var(--cream-dim); line-height: 1.7; }
        .gc-tip-body strong { color: var(--cream); font-weight: 600; }
        .gc-tip-body code { font-family: 'DM Mono', monospace; font-size: 11.5px; background: var(--bg3); border: 1px solid var(--border); border-radius: 3px; padding: 1px 6px; color: var(--copper); }

        /* STEPS */
        .gc-steps { display: flex; flex-direction: column; gap: 0; margin: 16px 0; }
        .gc-step { display: flex; align-items: flex-start; gap: 16px; padding: 13px 0; border-bottom: 1px solid var(--border); }
        .gc-step:last-child { border-bottom: none; }
        .gc-step-n { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 700; color: var(--copper); flex-shrink: 0; width: 26px; line-height: 1.3; }
        .gc-step-content { font-size: 14px; color: var(--cream-dim); line-height: 1.65; }
        .gc-step-content strong { color: var(--cream); font-weight: 600; }
        .gc-step-content code { font-family: 'DM Mono', monospace; font-size: 11.5px; background: var(--bg3); border: 1px solid var(--border); border-radius: 3px; padding: 1px 6px; color: var(--copper); }

        /* OUTPUT MOCK */
        .gc-output { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 16px 18px; margin: 16px 0; font-family: 'DM Mono', monospace; font-size: 12.5px; line-height: 1.75; color: #6B8A6B; }
        .gc-output .ok { color: #4ade80; }
        .gc-output .info { color: var(--copper); }
        .gc-output .dim { color: #4A3D30; }

        /* CHECKLIST */
        .gc-checklist-block { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 24px; margin: 20px 0; }
        .gc-checklist-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #4A3D30; margin-bottom: 16px; }
        .gc-checklist-items { display: flex; flex-direction: column; gap: 10px; }
        .gc-check-item { display: flex; align-items: flex-start; gap: 12px; font-size: 13.5px; color: var(--cream-dim); line-height: 1.55; }
        .gc-check-dot { width: 18px; height: 18px; border-radius: 50%; background: var(--copper-dim); border: 1px solid var(--border-mid); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; font-size: 9px; color: var(--copper); font-weight: 700; font-family: 'DM Mono', monospace; }

        /* NEXT STEPS */
        .gc-next { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
        .gc-next-item { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 16px 18px; }
        .gc-next-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 5px; }
        .gc-next-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.65; }

        /* NOTION SCHEMA MOCK */
        .gc-schema { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin: 18px 0; }
        .gc-schema-header { background: var(--bg3); border-bottom: 1px solid var(--border); padding: 10px 16px; display: flex; align-items: center; gap: 10px; }
        .gc-schema-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; }
        .gc-schema-body { padding: 0; }
        .gc-schema-row { display: flex; align-items: center; gap: 0; border-bottom: 1px solid var(--border); }
        .gc-schema-row:last-child { border-bottom: none; }
        .gc-schema-field { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--cream-dim); padding: 10px 16px; flex: 1; border-right: 1px solid var(--border); }
        .gc-schema-type { font-family: 'DM Mono', monospace; font-size: 10px; color: #4A3D30; padding: 10px 16px; width: 120px; letter-spacing: 0.06em; }

        /* DIVIDER */
        .gc-divider { height: 1px; margin: 60px 0; background: linear-gradient(90deg, transparent, var(--border-mid), transparent); }

        /* CTA */
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

        {/* HEADER */}
        <div className="gc-header">
          <div className="gc-kicker">Guía · Automatización · Claude Code</div>
          <div className="gc-pill">Sin experiencia en Python · Solo Claude Code</div>
          <h1 className="gc-h1">
            El motor de<br /><em>guardados</em> de Instagram.
          </h1>
          <p className="gc-intro">
            Los prompts exactos, el esquema de base de datos y el scheduler para construir un pipeline automático que convierte tus guardados de Instagram en ideas de contenido listas para publicar — con Claude Code, desde cero.
          </p>
          <blockquote className="gc-problem">
            Guardás posts de Instagram para inspirarte. Después te olvidás de que existen. Cada "vuelvo a esto después" se convierte en peso muerto en el momento en que deslizás al siguiente reel. Esta guía convierte ese peso muerto en un motor de contenido que corre solo.
          </blockquote>
          <div className="gc-meta-row">
            <span>— Claude Code</span>
            <span>— Notion</span>
            <span>— launchd (Mac)</span>
            <span>— Sin código manual</span>
          </div>
        </div>

        {/* TOC */}
        <div className="gc-toc">
          <div className="gc-toc-title">El recorrido ↓</div>
          <ol className="gc-toc-list">
            {toc.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#4A3D30', width: 20, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* QUÉ ESTÁS CONSTRUYENDO */}
        <div className="gc-section" id="que-es">
          <div className="gc-section-kicker">Qué estás construyendo</div>
          <h2 className="gc-h2">Un pipeline que<br /><em>corre solo.</em></h2>
          <div className="gc-body">
            <p>El sistema tiene tres capas que trabajan juntas:</p>
          </div>
          <div className="gc-steps">
            <div className="gc-step">
              <span className="gc-step-n">1</span>
              <div className="gc-step-content"><strong>sync.py</strong> — el daemon que corre en segundo plano dos veces al día, autentica con Instagram usando tus cookies de sesión, y guarda cada post nuevo en Notion con Status = New.</div>
            </div>
            <div className="gc-step">
              <span className="gc-step-n">2</span>
              <div className="gc-step-content"><strong>launchd</strong> — el scheduler nativo de Mac que lanza sync.py a las 9 AM y 9 PM, incluso después de reiniciar el equipo, sin que vos hagas nada.</div>
            </div>
            <div className="gc-step">
              <span className="gc-step-n">3</span>
              <div className="gc-step-content"><strong>/instagram-sync</strong> — el slash command de Claude Code que lee los guardados nuevos, los reencuadra para tu audiencia, y escribe las ideas aprobadas en tu base de datos de Content Ideas.</div>
            </div>
          </div>
          <div className="gc-tip info">
            <div className="gc-tip-head">— Por qué dos bases de datos en Notion</div>
            <div className="gc-tip-body">
              <strong>Saves</strong> es tu feed de investigación bruta. <strong>Content Ideas</strong> es donde vive el contenido reencuadrado y listo para publicar. Mantenerlos separados significa que podés procesar guardados en lotes sin ensuciar tu calendario de contenido real.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 01 — PREREQS */}
        <div className="gc-section" id="prereqs">
          <div className="gc-section-kicker">Paso 01</div>
          <h2 className="gc-h2">Requisitos<br /><em>e instalación.</em></h2>

          <div className="gc-h3">Lo que necesitás</div>
          <div className="gc-steps">
            <div className="gc-step">
              <span className="gc-step-n">—</span>
              <div className="gc-step-content">Claude Code instalado (<code>claude.ai/claude-code</code>)</div>
            </div>
            <div className="gc-step">
              <span className="gc-step-n">—</span>
              <div className="gc-step-content">Mac (la sección del scheduler es específica para Mac; usuarios de Linux pueden adaptar con cron)</div>
            </div>
            <div className="gc-step">
              <span className="gc-step-n">—</span>
              <div className="gc-step-content">Python 3.9 o más nuevo</div>
            </div>
            <div className="gc-step">
              <span className="gc-step-n">—</span>
              <div className="gc-step-content">Una cuenta de Notion con un token de integración interno</div>
            </div>
            <div className="gc-step">
              <span className="gc-step-n">—</span>
              <div className="gc-step-content">Una cuenta de Instagram con al menos algunos posts guardados</div>
            </div>
          </div>

          <div className="gc-h3">Verificá tu versión de Python</div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal</span>
            </div>
            <pre>{`python3 --version`}</pre>
          </div>
          <div className="gc-body"><p>Si devuelve 3.9 o mayor, estás listo. Si no:</p></div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal</span>
            </div>
            <pre>{`brew install python3`}</pre>
          </div>

          <div className="gc-h3">Creá la integración de Notion</div>
          <div className="gc-steps">
            <div className="gc-step"><span className="gc-step-n">01</span><div className="gc-step-content">Andá a <code>notion.so/profile/integrations</code></div></div>
            <div className="gc-step"><span className="gc-step-n">02</span><div className="gc-step-content">Hacé clic en <strong>New integration</strong></div></div>
            <div className="gc-step"><span className="gc-step-n">03</span><div className="gc-step-content">Ponele un nombre como "Instagram Saves Sync"</div></div>
            <div className="gc-step"><span className="gc-step-n">04</span><div className="gc-step-content">En Capabilities, marcá <strong>Read content</strong>, <strong>Insert content</strong> y <strong>Update content</strong></div></div>
            <div className="gc-step"><span className="gc-step-n">05</span><div className="gc-step-content">Hacé clic en Save. Copiá el token que empieza con <code>ntn_</code>. Lo vas a necesitar en el Paso 4.</div></div>
          </div>

          <div className="gc-h3">Creá la carpeta del proyecto</div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal</span>
            </div>
            <pre>{`mkdir instagram-saves-engine
cd instagram-saves-engine`}</pre>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 02 — NOTION DBS */}
        <div className="gc-section" id="notion-dbs">
          <div className="gc-section-kicker">Paso 02</div>
          <h2 className="gc-h2">Las dos bases de<br /><em>datos en Notion.</em></h2>
          <div className="gc-body">
            <p>Necesitás dos bases de datos. La primera captura los guardados brutos. La segunda almacena ideas de contenido pulidas. Mantenerlas separadas significa que tu calendario de contenido se mantiene limpio mientras tu historial de guardados se acumula en el fondo.</p>
          </div>

          <div className="gc-h3">Base de datos 1 · Instagram Saves</div>
          <div className="gc-schema">
            <div className="gc-schema-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-schema-title">notion · instagram saves</span>
            </div>
            <div className="gc-schema-body">
              {[
                ['Name', 'Title'],
                ['URL', 'URL'],
                ['Caption', 'Text'],
                ['Author', 'Text'],
                ['Media Type', 'Select · Reel / Image / Carousel'],
                ['Collection', 'Select'],
                ['Saved At', 'Date'],
                ['Status', 'Select · New / Used / Reviewed / Skipped'],
                ['Likes', 'Number'],
                ['Post ID', 'Text'],
              ].map(([field, type]) => (
                <div key={field} className="gc-schema-row">
                  <span className="gc-schema-field">{field}</span>
                  <span className="gc-schema-type">{type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="gc-h3">Base de datos 2 · Content Ideas</div>
          <div className="gc-schema">
            <div className="gc-schema-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-schema-title">notion · content ideas</span>
            </div>
            <div className="gc-schema-body">
              {[
                ['Idea Title', 'Title'],
                ['Hook', 'Text'],
                ['Angle', 'Text'],
                ['Platform', 'Multi-select · IG / TikTok / LinkedIn'],
                ['Format', 'Select · Reel / Carrusel / Post'],
                ['Pillar', 'Select'],
                ['Status', 'Select · Draft / Approved / Scheduled / Posted'],
                ['Source Save', 'Relation → Instagram Saves'],
                ['Created', 'Date'],
              ].map(([field, type]) => (
                <div key={field} className="gc-schema-row">
                  <span className="gc-schema-field">{field}</span>
                  <span className="gc-schema-type">{type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="gc-prompt">
            <div className="gc-prompt-label">Pegá este prompt en Claude Code</div>
            <div className="gc-prompt-text">
              Creame dos bases de datos en Notion usando mi integración. La primera se llama "Instagram Saves" y tiene estas propiedades: [pegá el schema de arriba]. La segunda se llama "Content Ideas" y tiene estas propiedades: [pegá el segundo schema]. Conectá la integración [nombre] a ambas y devolveme los database IDs de cada una.
            </div>
          </div>

          <div className="gc-h3">Cómo encontrar el Database ID de Notion</div>
          <div className="gc-body"><p>Abrí tu base de datos en Notion y mirá la URL:</p></div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots"><div className="gc-code-dot" style={{ background: '#ff5f57' }} /><div className="gc-code-dot" style={{ background: '#ffbd2e' }} /><div className="gc-code-dot" style={{ background: '#28c941' }} /></div>
              <span className="gc-code-title">url</span>
            </div>
            <pre>{`https://www.notion.so/tuworkspace/TU-DATABASE-ID?v=...`}</pre>
          </div>
          <div className="gc-body"><p>La cadena de 32 caracteres antes del <code>?v=</code> es el database ID. Copiá los dos IDs — los vas a necesitar en los pasos 4 y 7.</p></div>

          <div className="gc-tip warn">
            <div className="gc-tip-head">— Conectá la integración a cada base de datos</div>
            <div className="gc-tip-body">
              Abrí cada base de datos → Menú de tres puntos (arriba a la derecha) → <strong>Connect to</strong> → elegí tu integración. Repetí para la segunda base de datos.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 03 — COOKIES */}
        <div className="gc-section" id="cookies">
          <div className="gc-section-kicker">Paso 03</div>
          <h2 className="gc-h2">Cookies de sesión<br /><em>de Instagram.</em></h2>
          <div className="gc-body">
            <p>Instagram no tiene API pública para posts guardados. Nos autenticamos usando las mismas cookies de sesión que tu navegador ya envía con cada request.</p>
          </div>
          <div className="gc-steps">
            <div className="gc-step"><span className="gc-step-n">01</span><div className="gc-step-content">Abrí Chrome e iniciá sesión en <code>instagram.com</code></div></div>
            <div className="gc-step"><span className="gc-step-n">02</span><div className="gc-step-content">Presioná <strong>Cmd+Option+I</strong> para abrir DevTools</div></div>
            <div className="gc-step"><span className="gc-step-n">03</span><div className="gc-step-content">Hacé clic en la pestaña <strong>Application</strong></div></div>
            <div className="gc-step"><span className="gc-step-n">04</span><div className="gc-step-content">En la barra lateral izquierda, expandí <strong>Cookies</strong> y hacé clic en <code>https://www.instagram.com</code></div></div>
            <div className="gc-step"><span className="gc-step-n">05</span><div className="gc-step-content">Encontrá <strong>sessionid</strong> → copiá el Value completo</div></div>
            <div className="gc-step"><span className="gc-step-n">06</span><div className="gc-step-content">Encontrá <strong>csrftoken</strong> → copiá el Value completo</div></div>
            <div className="gc-step"><span className="gc-step-n">07</span><div className="gc-step-content">Encontrá <strong>ds_user_id</strong> → copiá el Value completo (es tu user ID de Instagram como número)</div></div>
          </div>

          <div className="gc-tip warn">
            <div className="gc-tip-head">— Tratá estas cookies como una contraseña</div>
            <div className="gc-tip-body">
              Cualquiera con tu <code>sessionid</code> puede acceder a tu cuenta de Instagram. Nunca las commités a git. Las guardamos en un <code>config.json</code> local que se queda solo en tu máquina.
            </div>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Las cookies expiran</div>
            <div className="gc-tip-body">
              Instagram rota las cookies de sesión cada pocas semanas. Cuando tu sync empiece a fallar, volvé a este paso y tomá valores frescos. El slash command <code>/instagram-sync</code> tiene una acción "Refresh session" para guiarte.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 04 — SYNC.PY */}
        <div className="gc-section" id="sync">
          <div className="gc-section-kicker">Paso 04</div>
          <h2 className="gc-h2">Generar el<br /><em>sync daemon.</em></h2>
          <div className="gc-body">
            <p>Le pedís a Claude Code que genere el archivo Python completo. No necesitás escribir ni una línea de Python vos mismo.</p>
          </div>

          <div className="gc-prompt">
            <div className="gc-prompt-label">Pegá este prompt en Claude Code</div>
            <div className="gc-prompt-text">
              Construime un daemon de sincronización de Python llamado sync.py para este proyecto. Tiene que: autenticarse en Instagram usando cookies de sesión web (sessionid, csrftoken, ds_user_id) — NO uses instagrapi; usá la web API directamente para imitar lo que hace el navegador. Obtener posts guardados de colecciones específicas configurables en config.json. Deduplicar contra un archivo state.json local para evitar entradas duplicadas en Notion. Escribir nuevos posts en una base de datos de Notion con propiedades: Name (título), URL, Caption, Author, Media Type, Collection, Saved At, Status="New", Likes, Post ID. Crear también: config.example.json con todos los campos requeridos, requirements.txt con las dependencias, y .gitignore que excluya config.json y state.json.
            </div>
          </div>

          <div className="gc-tip info">
            <div className="gc-tip-head">— Por qué no instagrapi</div>
            <div className="gc-tip-body">
              La popular librería instagrapi apunta a la API móvil de Instagram y se detecta más fácil. La web API que usamos acá imita exactamente lo que envía tu navegador, lo que es menor riesgo para un script personal corriendo en tu propia cuenta.
            </div>
          </div>

          <div className="gc-h3">Una vez que Claude genere los archivos</div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots"><div className="gc-code-dot" style={{ background: '#ff5f57' }} /><div className="gc-code-dot" style={{ background: '#ffbd2e' }} /><div className="gc-code-dot" style={{ background: '#28c941' }} /></div>
              <span className="gc-code-title">terminal</span>
            </div>
            <pre>{`python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt`}</pre>
          </div>

          <div className="gc-h3">Completá tu config.json</div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots"><div className="gc-code-dot" style={{ background: '#ff5f57' }} /><div className="gc-code-dot" style={{ background: '#ffbd2e' }} /><div className="gc-code-dot" style={{ background: '#28c941' }} /></div>
              <span className="gc-code-title">terminal</span>
            </div>
            <pre>{`cp config.example.json config.json`}</pre>
          </div>
          <div className="gc-body"><p>Abrí <code>config.json</code> y reemplazá cada placeholder:</p></div>
          <div className="gc-steps">
            <div className="gc-step"><span className="gc-step-n">—</span><div className="gc-step-content"><code>ig_session_id</code>, <code>ig_csrftoken</code>, <code>ig_user_id</code>: los valores de cookies del Paso 3</div></div>
            <div className="gc-step"><span className="gc-step-n">—</span><div className="gc-step-content"><code>notion_token</code>: tu token <code>ntn_...</code> del Paso 1</div></div>
            <div className="gc-step"><span className="gc-step-n">—</span><div className="gc-step-content"><code>notion_database_id</code>: el ID de la base de datos Instagram Saves del Paso 2</div></div>
            <div className="gc-step"><span className="gc-step-n">—</span><div className="gc-step-content"><code>collections_filter</code>: un JSON array de nombres de colecciones, o remové la key para traer todos los guardados</div></div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 05 — PRIMERA SYNC */}
        <div className="gc-section" id="primera-sync">
          <div className="gc-section-kicker">Paso 05</div>
          <h2 className="gc-h2">Tu primera<br /><em>sincronización.</em></h2>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots"><div className="gc-code-dot" style={{ background: '#ff5f57' }} /><div className="gc-code-dot" style={{ background: '#ffbd2e' }} /><div className="gc-code-dot" style={{ background: '#28c941' }} /></div>
              <span className="gc-code-title">terminal</span>
            </div>
            <pre>{`.venv/bin/python3 sync.py`}</pre>
          </div>
          <div className="gc-body"><p>Un run exitoso se ve así:</p></div>
          <div className="gc-output">
            <div className="ok">Instagram session valid for @tuusuario</div>
            <div className="info">Fetching saved posts...</div>
            <div className="info">Found X collections</div>
            <div className="ok">Sync complete: 47 new | 0 skipped | 47 total | 0 errors</div>
          </div>
          <div className="gc-body"><p>Abrí tu base de datos Instagram Saves en Notion. Deberías ver filas con <strong>Status = New</strong> y los campos de cada guardado completados.</p></div>

          <div className="gc-tip">
            <div className="gc-tip-head">— Si el primer run trae demasiados guardados</div>
            <div className="gc-tip-body">
              Agregá <code>collections_filter</code> al config.json listando solo las colecciones que realmente querés. Mi setup solo trae de dos: "Content Ideas" y "Claude Code". Todo lo demás se queda afuera.
            </div>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— state.json es crítico</div>
            <div className="gc-tip-body">
              Tu <code>state.json</code> es lo único que previene páginas duplicadas en Notion. Hacé backup ocasionalmente. Si se borra, el próximo sync va a recrear cada guardado anterior como una fila nueva.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 06 — SCHEDULER */}
        <div className="gc-section" id="scheduler">
          <div className="gc-section-kicker">Paso 06</div>
          <h2 className="gc-h2">Programar<br /><em>con launchd.</em></h2>
          <div className="gc-body">
            <p>launchd es el scheduler nativo de Mac. Este job va a correr sync.py dos veces al día, todos los días, incluso cuando no estés en tu escritorio.</p>
          </div>

          <div className="gc-prompt">
            <div className="gc-prompt-label">Pegá este prompt en Claude Code</div>
            <div className="gc-prompt-text">
              Creame un plist de launchd que corra .venv/bin/python3 sync.py desde mi carpeta de proyecto dos veces al día: a las 9 AM y las 9 PM. Guardalo en ~/Library/LaunchAgents/com.miusuario.instagram-saves-sync.plist. Después dame los dos comandos para instalarlo y cargarlo con launchctl, y el comando para verificar que está corriendo.
            </div>
          </div>

          <div className="gc-body"><p>Ejecutá los dos comandos que te da Claude. Luego verificá:</p></div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots"><div className="gc-code-dot" style={{ background: '#ff5f57' }} /><div className="gc-code-dot" style={{ background: '#ffbd2e' }} /><div className="gc-code-dot" style={{ background: '#28c941' }} /></div>
              <span className="gc-code-title">terminal</span>
            </div>
            <pre>{`launchctl list | grep instagram-saves`}</pre>
          </div>
          <div className="gc-body"><p>Si ves una entrada, el scheduler está corriendo. Va a dispararse a las 9 AM y 9 PM incluso después de reiniciar tu Mac.</p></div>

          <div className="gc-tip info">
            <div className="gc-tip-head">— Por qué launchd y no cron</div>
            <div className="gc-tip-body">
              launchd es el scheduler oficial de Mac. Arranca en el boot automáticamente, loggea limpio, y es como Apple quiere que corran los procesos en segundo plano.
            </div>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Si el scheduler deja de funcionar después de una actualización de macOS</div>
            <div className="gc-tip-body">
              Recargalo con: <code>launchctl load ~/Library/LaunchAgents/com.miusuario.instagram-saves-sync.plist</code>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 07 — SLASH COMMAND */}
        <div className="gc-section" id="slash">
          <div className="gc-section-kicker">Paso 07</div>
          <h2 className="gc-h2">El slash command<br /><em>/instagram-sync.</em></h2>
          <div className="gc-body">
            <p>El slash command es la capa creativa. Lee tus guardados sin procesar, reencuadra cada uno para tu audiencia, y genera ideas de contenido listas para cada plataforma. <strong>Personalizá los placeholders antes de pegarlo.</strong></p>
          </div>

          <div className="gc-prompt">
            <div className="gc-prompt-label">Pegá este prompt en Claude Code</div>
            <div className="gc-prompt-text">
              Creame un slash command en .claude/commands/instagram-sync.md con estas acciones: ideate (lee filas con Status=New de mi base de datos Notion ID=[TU_SAVES_DB_ID], reencuadra cada guardado para mi audiencia de [TU_NICHO], presenta las ideas con opciones de hook y breakdown por plataforma, escribe las aprobadas en mi base de datos Content Ideas ID=[TU_IDEAS_DB_ID], y cambia el status de cada guardado procesado a Used o Reviewed) y refresh session (guíame a través del proceso de actualizar mis cookies de sesión de Instagram en config.json y verificar que el sync funciona). Usá el notion_token de config.json para todas las queries. El mapeo de colecciones a pilares de contenido es: [COLECCIÓN_1]=[PILAR_1], [COLECCIÓN_2]=[PILAR_2].
            </div>
          </div>

          <div className="gc-tip info">
            <div className="gc-tip-head">— Por qué es separado de sync.py</div>
            <div className="gc-tip-body">
              sync.py es la capa tonta — busca, deduplica y escribe. El slash command es la capa inteligente — lee, reencuadra y adapta. El sync corre desatendido en un schedule. La ideación corre on-demand, cuando estás listo para pensar en contenido.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 08 — IDEATION */}
        <div className="gc-section" id="ideation">
          <div className="gc-section-kicker">Paso 08</div>
          <h2 className="gc-h2">Tu primer ciclo<br /><em>de ideación.</em></h2>
          <div className="gc-body">
            <p>Abrí Claude Code en la carpeta de tu proyecto y escribí:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots"><div className="gc-code-dot" style={{ background: '#ff5f57' }} /><div className="gc-code-dot" style={{ background: '#ffbd2e' }} /><div className="gc-code-dot" style={{ background: '#28c941' }} /></div>
              <span className="gc-code-title">claude code</span>
            </div>
            <pre>{`/instagram-sync ideate`}</pre>
          </div>
          <div className="gc-body"><p>Claude va a:</p></div>
          <div className="gc-steps">
            <div className="gc-step"><span className="gc-step-n">1</span><div className="gc-step-content">Consultar tu base de datos Saves para filas con Status = New</div></div>
            <div className="gc-step"><span className="gc-step-n">2</span><div className="gc-step-content">Reencuadrar cada guardado para tu audiencia específica</div></div>
            <div className="gc-step"><span className="gc-step-n">3</span><div className="gc-step-content">Presentar las ideas con opciones de hook y breakdowns por plataforma</div></div>
            <div className="gc-step"><span className="gc-step-n">4</span><div className="gc-step-content">Escribir las aprobadas en tu base de datos Content Ideas</div></div>
            <div className="gc-step"><span className="gc-step-n">5</span><div className="gc-step-content">Cambiar cada guardado procesado a <strong>Used</strong> o <strong>Reviewed</strong></div></div>
          </div>
          <div className="gc-body">
            <p>Abrí tu base de datos Content Ideas en Notion. Cada idea aprobada está ahí, con su ángulo, esquema y breakdown por plataforma, lista para que la filmes.</p>
          </div>
          <div className="gc-output">
            <div className="ok">✓ Cada guardado se convierte en una idea de contenido, con tu voz, con breakdowns por plataforma. Tus guardados ya no son peso muerto.</div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* CHECKLIST */}
        <div className="gc-section" id="checklist">
          <div className="gc-section-kicker">Checklist</div>
          <h2 className="gc-h2">El resumen<br /><em>completo.</em></h2>

          <div className="gc-checklist-block">
            <div className="gc-checklist-label">Setup inicial (una sola vez)</div>
            <div className="gc-checklist-items">
              {setupChecklist.map(item => (
                <div key={item} className="gc-check-item">
                  <span className="gc-check-dot">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="gc-checklist-block">
            <div className="gc-checklist-label">Cada semana</div>
            <div className="gc-checklist-items">
              {weeklyChecklist.map(item => (
                <div key={item} className="gc-check-item">
                  <span className="gc-check-dot">→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="gc-checklist-block">
            <div className="gc-checklist-label">Cuando el sync empiece a fallar</div>
            <div className="gc-checklist-items">
              {fixChecklist.map(item => (
                <div key={item} className="gc-check-item">
                  <span className="gc-check-dot" style={{ color: 'var(--amber)', borderColor: 'rgba(232,168,78,0.3)' }}>!</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* NEXT STEPS */}
        <div className="gc-section">
          <div className="gc-section-kicker">Qué hacer ahora</div>
          <h2 className="gc-h2">Cuatro formas de<br /><em>sacarle más.</em></h2>
          <div className="gc-next">
            {nextSteps.map(step => (
              <div key={step.title} className="gc-next-item">
                <div className="gc-next-title">{step.title}</div>
                <div className="gc-next-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="gc-cta">
          <div className="gc-cta-tag">— seguí aprendiendo</div>
          <h3>Pipeline montado.<br /><em>Guardados convertidos.</em></h3>
          <p>Más guías de automatización con Claude Code, en español, en la biblioteca de Nico IA.</p>
          <a href="/recursos" className="gc-btn-primary">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
