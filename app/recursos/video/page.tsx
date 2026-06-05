import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Video con Claude Code y Remotion — Guía 06 · Nico IA',
  description: 'Sin After Effects, sin timeline, sin keyframes. Setup en 1 comando, video en React, render a MP4 desde la terminal. 1 plantilla = 100 reels.',
}

const toc = [
  { id: 'que-es', label: 'Qué es Remotion + qué hace la skill' },
  { id: 'setup', label: 'Setup en 1 comando' },
  { id: 'estructura', label: 'Cómo funciona un video en Remotion' },
  { id: 'skill', label: 'La skill de video para Claude' },
  { id: 'ejemplo', label: 'Ejemplo completo — 3 escenas, 1 reel' },
  { id: 'animaciones', label: 'Las 2 funciones que usás siempre' },
  { id: 'render', label: 'Cómo renderizar el MP4' },
  { id: 'errores', label: 'Lo que se rompe la primera vez' },
]

const animaciones = [
  {
    fn: 'useCurrentFrame()',
    rol: 'Hook base',
    desc: 'Devuelve qué frame se renderiza ahora. Toda animación parte de aquí. Sin esto no hay movimiento.',
    code: 'const frame = useCurrentFrame()',
  },
  {
    fn: 'interpolate',
    rol: 'Movimiento lineal',
    desc: 'Mapea un rango de frames a un rango de valores. Bueno para posiciones y opacidades simples.',
    code: 'const opacity = interpolate(frame, [0, 30], [0, 1])',
  },
  {
    fn: 'spring()',
    rol: 'Movimiento físico',
    desc: 'Movimiento con rebote y aceleración natural. Los humanos percibimos el movimiento lineal como robótico. Usá spring para cualquier aparición o transición.',
    code: 'const scale = spring({ frame, fps, from: 0, to: 1 })',
  },
]

const errores = [
  {
    error: 'Claude no usa la skill, da código mediocre',
    fix: 'Empezá el prompt con: "Usando las reglas de remotion-best-practices, crea..." — eso activa la skill explícitamente.',
  },
  {
    error: 'El render falla con error raro de Chrome',
    fix: 'Actualizá Remotion a la última versión: npm install @remotion/cli@latest remotion@latest',
  },
  {
    error: 'La animación se ve rígida y robótica',
    fix: 'Casi siempre Claude usó interpolate donde debía usar spring. interpolate es lineal y los humanos vemos lineal como rígido. spring imita física natural.',
  },
  {
    error: 'Quiero música pero no sé dónde meterla',
    fix: 'Pedile a Claude: "añade audio.mp3 al video con fade in de 30 frames y fade out de 30 frames al final, usando <Audio> y volumen interpolado"',
  },
]

const ejemplo = `/* Escena 1 · 0-180 frames (6 seg)
   Fondo: #0C0A07
   Texto: "La IA no te va a reemplazar."
   Aparece con spring desde y=20 a y=0
   Tipografía: Cormorant, weight 700, color #C87533 */

/* Escena 2 · 180-420 frames (8 seg)
   Mismo fondo
   Texto: "Te va a reemplazar alguien
           que sabe usarla."
   Aparece línea a línea con stagger de 15 frames */

/* Escena 3 · 420-600 frames (6 seg · CTA)
   Texto: "Guía completa → nicoIA.com"
   Aparece con spring + fade in simultáneos */`

export default function VideoPage() {
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

        .gc-animaciones { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
        .gc-animacion { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
        .gc-animacion-fn { font-family: 'DM Mono', monospace; font-size: 13px; color: var(--copper); margin-bottom: 4px; }
        .gc-animacion-rol { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; margin-bottom: 10px; }
        .gc-animacion-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.65; margin-bottom: 12px; }
        .gc-animacion-code { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--amber); background: var(--bg3); border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; }

        .gc-errores { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
        .gc-error { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; }
        .gc-error-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(239,68,68,0.7); margin-bottom: 6px; }
        .gc-error-prob { font-size: 13px; font-weight: 600; color: var(--cream); margin-bottom: 8px; }
        .gc-error-fix-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); margin-bottom: 4px; }
        .gc-error-fix { font-size: 13px; color: var(--cream-dim); line-height: 1.65; }

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
          <div className="gc-kicker">Guía · Contenido</div>
          <div className="gc-pill">Le hablo, sale un MP4</div>
          <h1 className="gc-h1">
            Cómo hago un video<br />
            desde cero con<br />
            <em>Claude Code y Remotion.</em>
          </h1>
          <p className="gc-intro">
            Sin After Effects, sin timeline, sin keyframes. <strong>Setup en 1 comando</strong>, video en React, render a MP4 desde la terminal. Le hablo, él escribe el código.
          </p>
          <div className="gc-meta-row">
            <span>— ~2 min setup</span>
            <span>— 0€ por video</span>
            <span>— 1 plantilla = 100 reels</span>
          </div>
        </div>

        <div className="gc-stats">
          <div className="gc-stat">
            <div className="gc-stat-num">1</div>
            <div className="gc-stat-label">comando para empezar</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">30</div>
            <div className="gc-stat-label">fps por defecto</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">0€</div>
            <div className="gc-stat-label">por render</div>
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
          <h2 className="gc-h2">Remotion: video<br /><em>en React.</em></h2>
          <div className="gc-body">
            <p>
              Remotion es una librería de React que convierte componentes JSX en frames de video. En lugar de arrastrar keyframes en un timeline, escribís código. Claude Code escribe ese código por vos.
            </p>
            <p>
              El flujo completo: describís el video en lenguaje natural → Claude genera el componente React → renderizás con un comando de terminal → sale el MP4. Sin abrir ninguna app de edición.
            </p>
            <p>
              <strong>1 plantilla = 100 reels.</strong> Una vez que tenés la estructura básica, cambiar el texto y los colores lleva segundos. El mismo sistema genera el reel de lunes que el de viernes.
            </p>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Por qué React y no otro formato</div>
            <div className="gc-tip-body">
              Claude Code entiende React mejor que cualquier lenguaje de scripting de After Effects. El código que genera es limpio, reutilizable y versionable con git. Podés llevarlo a cualquier proyecto.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="setup">
          <div className="gc-section-kicker">Setup</div>
          <h2 className="gc-h2">Setup en<br /><em>1 comando.</em></h2>
          <div className="gc-body">
            <p>Abrí la Terminal y pegá este comando. Crea el proyecto de Remotion con todo configurado.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">terminal · crear proyecto</span>
            </div>
            <pre>{`npx create-video@latest my-video --template blank
cd my-video
npm install`}</pre>
          </div>
          <div className="gc-body" style={{ marginTop: 16 }}>
            <p>Después abrí la carpeta en Cursor o tu editor con Claude Code integrado. Todo lo que sigue lo hacés desde ahí.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">terminal · previsualización en vivo</span>
            </div>
            <pre>{`npm run dev
# abre localhost:3000 — preview en tiempo real`}</pre>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="estructura">
          <div className="gc-section-kicker">Estructura</div>
          <h2 className="gc-h2">Cómo funciona un video<br /><em>en Remotion.</em></h2>
          <div className="gc-body">
            <p>
              Un video en Remotion es una <strong>Composition</strong>: le decís cuántos frames tiene, a cuántos fps corre, y qué componente renderiza cada frame. Nada más.
            </p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">Root.tsx · estructura básica</span>
            </div>
            <pre>{`import { Composition } from 'remotion'
import { MyVideo } from './MyVideo'

export const RemotionRoot = () => (
  <Composition
    id="MyVideo"
    component={MyVideo}
    durationInFrames={600}   // 20 segundos a 30fps
    fps={30}
    width={1080}
    height={1920}            // formato reel: 9:16
  />
)`}</pre>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Formato reel vs cuadrado</div>
            <div className="gc-tip-body">
              Para Instagram Reels: 1080x1920 (9:16). Para feed cuadrado: 1080x1080. Para stories: mismo que reels. Cambiás width y height y Remotion se adapta solo.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="animaciones">
          <div className="gc-section-kicker">Las 2 funciones base</div>
          <h2 className="gc-h2">Las 2 funciones<br /><em>que usás siempre.</em></h2>
          <div className="gc-body">
            <p>Remotion tiene muchas utilidades, pero el 90% de los videos que hacés van a usar solo estas dos. Claude las conoce bien.</p>
          </div>
          <div className="gc-animaciones">
            {animaciones.map(a => (
              <div key={a.fn} className="gc-animacion">
                <div className="gc-animacion-fn">{a.fn}</div>
                <div className="gc-animacion-rol">{a.rol}</div>
                <div className="gc-animacion-desc">{a.desc}</div>
                <div className="gc-animacion-code">{a.code}</div>
              </div>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— La regla de spring vs interpolate</div>
            <div className="gc-tip-body">
              <strong>interpolate</strong> es lineal — ideal para opacidades y transiciones de color. <strong>spring</strong> imita física natural — usalo para mover elementos, escalarlos o hacerlos aparecer. Si algo se ve robótico, cambiá interpolate por spring.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="ejemplo">
          <div className="gc-section-kicker">Ejemplo completo</div>
          <h2 className="gc-h2">3 escenas,<br /><em>1 reel.</em></h2>
          <div className="gc-body">
            <p>Copiá esta descripción y pegala en Claude Code. Él genera el componente completo.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">prompt para Claude Code · video 3 escenas</span>
            </div>
            <pre>{ejemplo}</pre>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Cuánto detalle poner en el prompt</div>
            <div className="gc-tip-body">
              Cuanto más específico seas (frame exacto de entrada, tipografía, colores en hex), menos iteraciones necesitás. Claude puede adivinar, pero adivina mejor cuando le das restricciones claras.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="render">
          <div className="gc-section-kicker">Render</div>
          <h2 className="gc-h2">Cómo renderizar<br /><em>el MP4.</em></h2>
          <div className="gc-body">
            <p>Cuando el preview se ve bien, un comando en terminal y tenés el archivo listo para subir.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">terminal · renderizar el video</span>
            </div>
            <pre>{`npx remotion render MyVideo out/reel.mp4

# para render más rápido (usa todos los cores):
npx remotion render MyVideo out/reel.mp4 --concurrency=4`}</pre>
          </div>
          <div className="gc-body" style={{ marginTop: 16 }}>
            <p>El archivo queda en <code style={{fontFamily:'DM Mono,monospace',fontSize:12,background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:3,padding:'1px 6px',color:'var(--copper)'}}>out/reel.mp4</code>. Listo para subir directamente a Instagram, TikTok o donde quieras.</p>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="errores">
          <div className="gc-section-kicker">Troubleshooting</div>
          <h2 className="gc-h2">Lo que se rompe<br /><em>la primera vez.</em></h2>
          <div className="gc-errores">
            {errores.map(e => (
              <div key={e.error} className="gc-error">
                <div className="gc-error-label">Problema</div>
                <div className="gc-error-prob">{e.error}</div>
                <div className="gc-error-fix-label">Solución</div>
                <div className="gc-error-fix">{e.fix}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Le hablaste.<br /><em>Salió el MP4.</em></h3>
          <p>
            La siguiente guía: cómo vigilar a tu competencia en Instagram<br />
            y recibir alertas por Telegram cuando publican algo viral.
          </p>
          <a href="/recursos/tracker-competencia-ig" className="gc-btn-primary">Guía 07 · Tracker de competencia →</a>
        </div>

      </div>
    </>
  )
}
