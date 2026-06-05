import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Setup de Claude — Guía 01 · Nico IA',
  description: 'Los 5 pasos que separan un chatbot mediocre de un asistente que sabe quién eres. Plan, modelo, Project, Skills y connectors. Configurado en una tarde.',
}

const toc = [
  { id: 'por-que', label: 'Por qué Claude te da respuestas mediocres' },
  { id: 'paso-1', label: 'Paso 01 · Plan — qué plan usar' },
  { id: 'paso-2', label: 'Paso 02 · Modelo — el cerebro correcto' },
  { id: 'paso-3', label: 'Paso 03 · Project — la memoria que persiste' },
  { id: 'paso-4', label: 'Paso 04 · Skills — tu voz en código' },
  { id: 'paso-5', label: 'Paso 05 · Connectors — de chat a sistema' },
  { id: 'checklist', label: 'Tu turno — configúralo este finde' },
]

const pasos = [
  {
    n: '01', label: 'PLAN', id: 'paso-1',
    title: 'Elige el plan correcto',
    accent: 'La decisión que limita todo lo demás',
    body: [
      'Antes de tocar nada técnico, decide qué plan de Claude vas a usar. Esto no es trivial: el plan limita cuántos modelos top puedes correr al día, cuántos Projects puedes crear, y cuántos connectors vas a poder enchufar.',
      'Pro si nunca has configurado un setup como este. Te sobra para probar el flujo completo y ver si te merece la pena escalar.',
      'Max si Claude ya es tu herramienta diaria. Más uso, modelos top sin frenos, prioridad en horas pico.',
      'Si en una semana de uso real sientes que te quedas corto con Pro, sube a Max. Pagar Max sin haber configurado el setup es dinero tirado.',
    ],
    code: null,
  },
  {
    n: '02', label: 'MODELO', id: 'paso-2',
    title: 'El modelo correcto para cada tarea',
    accent: 'El error más caro y silencioso que existe',
    body: [
      'Cada modelo de Claude está optimizado para un tipo de tarea. Usar el equivocado es el error más caro y silencioso que existe: tu prompt funciona, pero la respuesta no es la que debería ser.',
      'Si usas Opus para una lista de la compra, gastas tokens y tiempo. Si usas Haiku para tu estrategia anual, recibes una respuesta plana.',
      'La regla es simple: cambia de modelo según la tarea.',
    ],
    models: [
      { name: 'Opus', role: 'Decide', desc: 'Estrategia, análisis complejo, criterio editorial. Cuando la tarea define algo importante.' },
      { name: 'Sonnet', role: 'Produce', desc: 'Volumen de contenido, escritura, traducción, formateo. Tu modelo por defecto.' },
      { name: 'Haiku', role: 'Resuelve', desc: 'Clasificar, extraer un dato, tareas rápidas y repetitivas. Velocidad máxima.' },
    ],
  },
  {
    n: '03', label: 'PROJECT', id: 'paso-3',
    title: 'Un Project en Claude es como una carpeta con memoria',
    accent: 'Empezás donde lo dejaste, siempre',
    body: [
      'Sin Project, cada chat empieza de cero. Le explicás todo otra vez. Cada vez. Con Project, Claude ya sabe quién sos, a quién le hablás y qué entregás. Empezás donde lo dejaste.',
      'Un Project necesita 4 archivos. No tienen que ser perfectos. Tienen que existir. Versión v1 ahora es mejor que versión v3 dentro de tres semanas.',
    ],
    files: [
      { name: 'tono-de-voz.md', desc: 'Cómo hablás. Palabras prohibidas. Frases tipo. 3 ejemplos de tu mejor copy.' },
      { name: 'cliente-ideal.md', desc: 'Quién te paga, qué problema le resolvés, cómo habla, qué le mueve.' },
      { name: 'servicios.md', desc: 'Qué vendés, precios, qué incluye, qué NO incluye.' },
      { name: 'ejemplos-entregas.md', desc: 'Los 3-5 posts, emails o piezas que mejor te han funcionado. Reales.' },
    ],
  },
  {
    n: '04', label: 'SKILLS', id: 'paso-4',
    title: 'Las skills son tu voz en código',
    accent: 'El Project sabe quién sos. La Skill garantiza el output.',
    body: [
      'El Project guarda el contexto. La Skill guarda cómo te comportás con ese contexto. Project = tu archivo. Skill = tu manual de instrucciones.',
      'La diferencia real: el Project sabe quién sos. La Skill garantiza que cada output suena exactamente como vos escribirías ese entregable, sin tener que recordárselo cada vez.',
      'Empezá con la skill más repetitiva. Si hacés carruseles cada semana, esa es la primera.',
    ],
  },
  {
    n: '05', label: 'CONNECT', id: 'paso-5',
    title: 'Conectá tus apps reales',
    accent: 'De chat a sistema que actúa',
    body: [
      'Sin connectors, Claude se queda en la conversación. Vos seguís copiando y pegando entre Claude y tus apps. Con connectors, Claude actúa: lee tu email, agenda en tu calendario, escribe en tu Notion.',
      'El 80% de tu trabajo diario pasa por Gmail, Drive y Calendar. Empezá por esas tres. Luego una más cada semana. Conectarlas todas el día 1 es la forma más rápida de no conectar ninguna.',
    ],
    apps: ['Gmail', 'Drive', 'Calendar', 'Notion', 'Slack', 'Figma', 'GitHub', 'Linear', 'Stripe'],
  },
]

const checklist = [
  '¿Elegí mi plan (Pro o Max) antes de tocar nada más?',
  '¿Sé cuándo usar Opus, Sonnet y Haiku?',
  '¿Creé un Project y subí los 4 archivos base?',
  '¿Instalé al menos una Skill para mi tarea más repetitiva?',
  '¿Conecté Gmail, Drive y Calendar como primer batch de connectors?',
]

export default function SetupPage() {
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
          background-size: 180px 180px; pointer-events: none; z-index: 1000; opacity: 0.4;
        }
        :root {
          --copper: #C87533; --copper-dim: rgba(200,117,51,0.12);
          --copper-glow: rgba(200,117,51,0.28);
          --amber: #E8A84E;
          --cream: #EDE8DC; --cream-dim: #998E82;
          --bg: #0C0A07; --bg2: #141009; --bg3: #1C160C;
          --border: rgba(200,117,51,0.15); --border-mid: rgba(200,117,51,0.28);
          --border-bright: rgba(200,117,51,0.45);
        }

        .gc-wrap { max-width: 740px; margin: 0 auto; padding: 0 24px 120px; position: relative; z-index: 1; }

        .gc-header { padding: 48px 0 44px; }
        .gc-kicker {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: #4A3D30; margin-bottom: 20px;
        }
        .gc-pill {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--copper); background: var(--copper-dim);
          border: 1px solid var(--border-mid);
          border-radius: 4px; padding: 5px 12px; margin-bottom: 24px;
        }
        .gc-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 7vw, 4.5rem);
          font-weight: 700; line-height: 0.97;
          letter-spacing: -0.02em; color: var(--cream);
          margin-bottom: 24px;
        }
        .gc-h1 em { font-style: italic; color: var(--copper); }
        .gc-intro { font-size: 16px; color: var(--cream-dim); line-height: 1.85; margin-bottom: 28px; }
        .gc-intro strong { color: var(--cream); font-weight: 600; }
        .gc-meta-row {
          display: flex; flex-wrap: wrap; gap: 20px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.06em; color: #4A3D30;
        }

        .gc-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin: 36px 0; }
        .gc-stat {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; padding: 18px 20px;
        }
        .gc-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem; font-weight: 700;
          color: var(--copper); line-height: 1;
          text-shadow: 0 0 24px var(--copper-glow);
        }
        .gc-stat-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #4A3D30; margin-top: 6px;
        }

        .gc-toc {
          background: var(--copper-dim); border: 1px solid var(--border-mid);
          border-radius: 12px; padding: 22px 24px; margin: 0 0 52px;
        }
        .gc-toc-title {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 14px;
        }
        .gc-toc-list { list-style: none; display: flex; flex-direction: column; }
        .gc-toc-list li { border-bottom: 1px dashed var(--border); }
        .gc-toc-list li:last-child { border-bottom: none; }
        .gc-toc-list a {
          display: flex; align-items: baseline; gap: 14px;
          padding: 10px 0; font-size: 14px; color: var(--cream-dim);
          text-decoration: none; transition: color 0.2s;
        }
        .gc-toc-list a:hover { color: var(--cream); }
        .gc-toc-num {
          font-family: 'DM Mono', monospace; font-size: 10px;
          color: #4A3D30; flex-shrink: 0; width: 20px;
        }

        .gc-section { margin-bottom: 72px; }
        .gc-section-kicker {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 10px;
          display: flex; align-items: center; gap: 10px;
        }
        .gc-section-kicker::before {
          content: ''; display: inline-block;
          width: 20px; height: 1px; background: var(--copper); opacity: 0.7;
        }
        .gc-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700; line-height: 1.05;
          letter-spacing: -0.02em; color: var(--cream);
          margin-bottom: 20px;
        }
        .gc-h2 em { font-style: italic; color: var(--copper); }
        .gc-body { font-size: 15px; color: var(--cream-dim); line-height: 1.85; }
        .gc-body p { margin-bottom: 14px; }
        .gc-body p:last-child { margin-bottom: 0; }
        .gc-body strong { color: var(--cream); font-weight: 600; }

        .gc-paso {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 16px; padding: 28px; margin-bottom: 16px;
        }
        .gc-paso-top { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
        .gc-paso-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: var(--copper);
          line-height: 1; text-shadow: 0 0 20px var(--copper-glow);
          flex-shrink: 0;
        }
        .gc-paso-meta {}
        .gc-paso-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 3px;
        }
        .gc-paso-title { font-size: 16px; font-weight: 600; color: var(--cream); line-height: 1.3; }
        .gc-paso-accent {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: #4A3D30; margin-bottom: 16px; padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }
        .gc-paso-body { font-size: 14px; color: var(--cream-dim); line-height: 1.8; }
        .gc-paso-body p { margin-bottom: 12px; }
        .gc-paso-body p:last-child { margin-bottom: 0; }

        .gc-models { display: grid; gap: 8px; margin: 16px 0; }
        @media(min-width:560px) { .gc-models { grid-template-columns: repeat(3,1fr); } }
        .gc-model {
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 10px; padding: 14px 16px;
        }
        .gc-model-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 700; color: var(--amber);
          margin-bottom: 2px;
        }
        .gc-model-role {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 8px;
        }
        .gc-model-desc { font-size: 12px; color: var(--cream-dim); line-height: 1.6; }

        .gc-files { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-file-row {
          display: flex; align-items: flex-start; gap: 14px;
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 8px; padding: 12px 14px;
        }
        .gc-file-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--copper); flex-shrink: 0; margin-top: 5px; }
        .gc-file-name {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: var(--copper); margin-bottom: 3px;
        }
        .gc-file-desc { font-size: 12px; color: var(--cream-dim); line-height: 1.55; }

        .gc-apps {
          display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0;
        }
        .gc-app-tag {
          font-family: 'DM Mono', monospace; font-size: 11px;
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 6px; padding: 5px 12px;
          color: var(--cream-dim); letter-spacing: 0.04em;
        }
        .gc-app-tag.primary { border-color: var(--border-mid); color: var(--cream); }

        .gc-tip {
          background: var(--bg2); border: 1px solid var(--border);
          border-left: 2px solid var(--copper);
          border-radius: 10px; padding: 16px 20px; margin: 20px 0;
        }
        .gc-tip.warn { border-left-color: var(--amber); }
        .gc-tip-head {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 7px;
        }
        .gc-tip.warn .gc-tip-head { color: var(--amber); }
        .gc-tip-body { font-size: 13.5px; color: var(--cream-dim); line-height: 1.7; }
        .gc-tip-body strong { color: var(--cream); }

        .gc-code {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; overflow-x: auto; margin: 16px 0;
        }
        .gc-code-header {
          display: flex; align-items: center;
          padding: 10px 18px; border-bottom: 1px solid var(--border);
        }
        .gc-code-title {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30;
        }
        .gc-code pre {
          font-family: 'DM Mono', monospace; font-size: 12.5px;
          line-height: 1.8; color: var(--cream-dim);
          white-space: pre-wrap; word-break: break-word; padding: 18px 20px;
        }

        .gc-checklist {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 14px; padding: 24px; margin: 48px 0 0;
        }
        .gc-checklist-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #4A3D30; margin-bottom: 18px;
        }
        .gc-checklist-items { display: flex; flex-direction: column; gap: 10px; }
        .gc-check-item {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 14px; color: var(--cream-dim); line-height: 1.55;
        }
        .gc-check-dot {
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--copper-dim); border: 1px solid var(--border-mid);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
          font-size: 9px; color: var(--copper); font-weight: 700;
          font-family: 'DM Mono', monospace;
        }

        .gc-divider {
          height: 1px; margin: 60px 0;
          background: linear-gradient(90deg, transparent, var(--border-mid), transparent);
        }

        .gc-cta {
          background: var(--bg2); border: 1px solid var(--border-mid);
          border-radius: 16px; padding: 40px; text-align: center; margin-top: 72px;
        }
        .gc-cta-tag {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 16px;
        }
        .gc-cta h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: var(--cream);
          line-height: 1.1; margin-bottom: 12px;
        }
        .gc-cta h3 em { font-style: italic; color: var(--copper); }
        .gc-cta p { font-size: 14px; color: var(--cream-dim); line-height: 1.75; margin-bottom: 28px; }
        .gc-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--copper); color: var(--cream);
          padding: 13px 24px; border-radius: 8px;
          font-family: 'DM Mono', monospace; font-size: 12px;
          font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none; transition: box-shadow 0.2s, opacity 0.2s;
        }
        .gc-btn-primary:hover { box-shadow: 0 0 32px var(--copper-glow); opacity: 0.9; }
      `}</style>

      <CopperNav activeHref="/recursos" />

      <div className="gc-wrap">

        <div className="gc-header">
          <div className="gc-kicker">Guía · Setup completo de Claude</div>
          <div className="gc-pill">6 min · 45 min de acción · Gratis</div>
          <h1 className="gc-h1">
            Los 5 pasos que separan<br />
            un chatbot mediocre de un asistente<br />
            que sabe <em>quién eres.</em>
          </h1>
          <p className="gc-intro">
            <strong>Plan, modelo, Project, Skills y connectors.</strong> Configurado en una tarde. Te dura el resto del año.
            Cada paso desbloquea el siguiente. Si te saltas uno, rompes la cadena.
          </p>
          <div className="gc-meta-row">
            <span>— 6 min de lectura</span>
            <span>— 45 min de acción</span>
            <span>— configurable hoy</span>
          </div>
        </div>

        <div className="gc-stats">
          <div className="gc-stat">
            <div className="gc-stat-num">5</div>
            <div className="gc-stat-label">pasos en orden</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">45m</div>
            <div className="gc-stat-label">setup total</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">∞</div>
            <div className="gc-stat-label">ROI semanal</div>
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

        <div className="gc-section" id="por-que">
          <div className="gc-section-kicker">Diagnóstico</div>
          <h2 className="gc-h2">¿Por qué Claude te da<br /><em>respuestas mediocres?</em></h2>
          <div className="gc-body">
            <p>
              La mayoría de la gente usa Claude como un Google más sofisticado. Abren un chat, escriben su pregunta, reciben una respuesta genérica, y concluyen que la IA es una mierda.
            </p>
            <p>
              No es que la IA sea mala. Es que arranca sin contexto. Sin saber quién sos, a quién le hablás, cómo escribís, qué entregás, qué no puede tocar. La configuración es lo que transforma un chat en un sistema que trabaja por vos.
            </p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">tiempo real de setup</span>
            </div>
            <pre>{`# tiempo total
$ setup --completo
→ 45 minutos un sábado por la tarde
→ ROI: cada semana del resto del año`}</pre>
          </div>
        </div>

        <div className="gc-divider" />

        {pasos.map((paso) => (
          <div key={paso.n} className="gc-section" id={paso.id}>
            <div className="gc-section-kicker">Paso {paso.n}</div>
            <h2 className="gc-h2"><em>{paso.label}</em></h2>

            <div className="gc-paso">
              <div className="gc-paso-top">
                <span className="gc-paso-num">{paso.n}</span>
                <div className="gc-paso-meta">
                  <div className="gc-paso-label">{paso.label}</div>
                  <div className="gc-paso-title">{paso.title}</div>
                </div>
              </div>
              <div className="gc-paso-accent">{paso.accent}</div>
              <div className="gc-paso-body">
                {paso.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {paso.models && (
                <div className="gc-models" style={{ marginTop: 16 }}>
                  {paso.models.map(m => (
                    <div key={m.name} className="gc-model">
                      <div className="gc-model-name">{m.name}</div>
                      <div className="gc-model-role">{m.role}</div>
                      <div className="gc-model-desc">{m.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {paso.files && (
                <div className="gc-files" style={{ marginTop: 16 }}>
                  {paso.files.map(f => (
                    <div key={f.name} className="gc-file-row">
                      <span className="gc-file-dot" />
                      <div>
                        <div className="gc-file-name">{f.name}</div>
                        <div className="gc-file-desc">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {paso.apps && (
                <div className="gc-apps" style={{ marginTop: 16 }}>
                  {paso.apps.map((a, i) => (
                    <span key={a} className={`gc-app-tag${i < 3 ? ' primary' : ''}`}>{a}</span>
                  ))}
                </div>
              )}
            </div>

            {paso.n === '03' && (
              <div className="gc-tip">
                <div className="gc-tip-head">— La regla de los archivos</div>
                <div className="gc-tip-body">
                  Los archivos no tienen que ser perfectos. Tienen que existir. Versión v1 ahora es mejor que versión v3 dentro de tres semanas. Escribí lo primero que se te ocurra y mejoralo con el tiempo.
                </div>
              </div>
            )}
            {paso.n === '05' && (
              <div className="gc-tip warn">
                <div className="gc-tip-head">— El orden importa</div>
                <div className="gc-tip-body">
                  Primero Gmail. Luego Drive. Luego Calendar. Después una más cada semana. Conectarlas todas el día 1 es la forma más rápida de no conectar ninguna.
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="gc-divider" />

        <div className="gc-section" id="checklist">
          <div className="gc-section-kicker">Tu turno</div>
          <h2 className="gc-h2">Ahora Claude trabaja<br /><em>por vos.</em></h2>
          <div className="gc-body">
            <p>
              Si has llegado hasta aquí leyendo, lo difícil ya pasó. Lo que falta es bloquear una tarde y ejecutarlo. Una vez. Para todo el año.
              Bloquea la tarde, cierra Instagram, y ejecuta los 5 pasos en orden. Cuando termines, Claude trabaja con vos igual el lunes que el domingo.
            </p>
          </div>
        </div>

        <div className="gc-checklist">
          <div className="gc-checklist-label">Checklist antes de cerrar esta guía</div>
          <div className="gc-checklist-items">
            {checklist.map(item => (
              <div key={item} className="gc-check-item">
                <span className="gc-check-dot">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Setup listo.<br /><em>Ahora el agente.</em></h3>
          <p>
            Esta guía deja Claude configurado. La siguiente te enseña<br />
            a montar un agente que entrega trabajo a clientes mientras dormís.
          </p>
          <a href="/recursos/agente" className="gc-btn-primary">Guía 02 · Tu primer agente →</a>
        </div>

      </div>
    </>
  )
}
