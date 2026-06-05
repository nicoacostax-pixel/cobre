import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Tracker de competencia en Instagram — Guía 07 · Nico IA',
  description: 'Un agente que vigila 5-10 competidores en Instagram y te avisa por Telegram cuando publican algo viral. 15 min de setup con Claude Code + Apify.',
}

const toc = [
  { id: 'por-que', label: 'Por qué vigilar a tu competencia' },
  { id: 'arquitectura', label: 'Cómo funciona el sistema' },
  { id: 'paso-1', label: 'Paso 01 · Crear el bot de Telegram' },
  { id: 'paso-2', label: 'Paso 02 · Configurar Apify' },
  { id: 'paso-3', label: 'Paso 03 · Escribir el script con Claude' },
  { id: 'paso-4', label: 'Paso 04 · Definir qué es "viral" para vos' },
  { id: 'paso-5', label: 'Paso 05 · Automatizar con cron' },
  { id: 'alertas', label: 'Ejemplo de alerta real' },
]

const pasos = [
  {
    id: 'paso-1', n: '01', label: 'TELEGRAM BOT',
    title: 'Crear el bot de Telegram',
    body: 'El bot es quien te manda las alertas. No hace falta código para crearlo.',
    steps: [
      'Abrí Telegram y buscá @BotFather',
      'Escribí /newbot — te pide nombre y username del bot',
      'Guardá el TOKEN que te da. Lo usás en el script.',
      'Creá un canal de Telegram donde recibirás las alertas.',
      'Sumá el bot al canal como administrador.',
      'Obtenés el CHAT_ID del canal con @userinfobot.',
    ],
    code: `# variables de entorno para guardar
TELEGRAM_TOKEN=1234567890:AAAA...tu_token_aquí
TELEGRAM_CHAT_ID=-100123456789`,
  },
  {
    id: 'paso-2', n: '02', label: 'APIFY',
    title: 'Configurar Apify para scrapear Instagram',
    body: 'Apify tiene un Actor oficial para Instagram que Cloudflare no bloquea. El plan gratuito da $5 USD de créditos al mes — suficiente para vigilar 10 cuentas diariamente.',
    steps: [
      'Creá cuenta en apify.com (plan gratuito)',
      'Buscá el Actor "Instagram Profile Scraper" en el Apify Store',
      'Guardá el Actor ID (lo ves en la URL del Actor)',
      'Creá un API Token en Configuración → Integraciones',
      'Guardá el token como variable de entorno',
    ],
    code: `APIFY_TOKEN=apify_api_tu_token_aquí`,
  },
  {
    id: 'paso-3', n: '03', label: 'SCRIPT',
    title: 'Escribir el script con Claude',
    body: 'Pedile esto a Claude Code en tu terminal. Genera el script completo en Python o Node.',
    prompt: `Escribe un script en Python que:
1. Use la API de Apify para scrapear los últimos 5 posts
   de una lista de usernames de Instagram
2. Compare con los posts almacenados en un archivo JSON local
3. Para cada post nuevo, calcule el engagement rate
   (likes + comments) / followers * 100
4. Si el engagement rate supera un THRESHOLD configurable,
   mande una alerta por Telegram con:
   - El username
   - El engagement rate
   - La URL del post
   - Una preview del caption (primeros 100 chars)
5. Actualice el JSON local con los posts procesados

Variables de entorno: APIFY_TOKEN, TELEGRAM_TOKEN, TELEGRAM_CHAT_ID, THRESHOLD`,
  },
  {
    id: 'paso-4', n: '04', label: 'THRESHOLD',
    title: 'Definí qué es "viral" para vos',
    body: 'El threshold varía mucho por nicho. Para cuentas pequeñas (10k-50k), un engagement del 5% ya es notable. Para cuentas grandes (500k+), el 1% ya es bueno.',
    thresholds: [
      { size: 'Cuentas pequeñas · 1k-10k', threshold: '8-15%', note: 'En cuentas chicas, cualquier cosa sobre 8% merece atención.' },
      { size: 'Cuentas medianas · 10k-100k', threshold: '3-8%', note: 'El promedio del nicho suele estar en 2-4%.' },
      { size: 'Cuentas grandes · 100k+', threshold: '1-3%', note: 'A esta escala, 1% ya representa decenas de miles de interacciones.' },
    ],
  },
  {
    id: 'paso-5', n: '05', label: 'CRON',
    title: 'Automatizarlo — corre solo',
    body: 'Una vez que el script funciona, configuralo para que corra automáticamente. Dos opciones:',
    options: [
      { name: 'Cron local (Mac)', desc: 'Corre en tu Mac mientras está prendida. Gratis.', code: '# crontab -e\n0 9,15,21 * * * cd /ruta/script && python tracker.py' },
      { name: 'GitHub Actions', desc: 'Corre en la nube, funciona aunque tu Mac esté apagada. Gratis hasta 2000 minutos al mes.', code: '# .github/workflows/tracker.yml\nschedule:\n  - cron: "0 9,15,21 * * *"' },
    ],
  },
]

const ejemploAlerta = `🔔 VIRAL DETECTADO

@competencia_x · 3,847 likes · 89 comments
Engagement: 7.2% (tu threshold: 5%)

"Llevamos 2 años usando esta estrategia sin
contársela a nadie. Hoy la compartimos..."

🔗 Ver post → instagram.com/p/abc123`

export default function TrackerCompetenciaPage() {
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

        .gc-paso { background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; padding: 24px; margin-bottom: 16px; }
        .gc-paso-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--copper); margin-bottom: 8px; }
        .gc-paso-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 700; color: var(--cream); margin-bottom: 12px; line-height: 1.2; }
        .gc-paso-body { font-size: 14px; color: var(--cream-dim); line-height: 1.75; margin-bottom: 14px; }

        .gc-steps { display: flex; flex-direction: column; gap: 0; margin: 12px 0; }
        .gc-step { display: flex; align-items: baseline; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--cream-dim); line-height: 1.55; }
        .gc-step:last-child { border-bottom: none; }
        .gc-step-n { font-family: 'DM Mono', monospace; font-size: 10px; color: #4A3D30; flex-shrink: 0; width: 22px; }

        .gc-code { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow-x: auto; margin: 12px 0; }
        .gc-code-header { display: flex; align-items: center; padding: 10px 18px; border-bottom: 1px solid var(--border); }
        .gc-code-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; }
        .gc-code pre { font-family: 'DM Mono', monospace; font-size: 12.5px; line-height: 1.8; color: var(--cream-dim); white-space: pre-wrap; word-break: break-word; padding: 16px 18px; }

        .gc-tip { background: var(--bg2); border: 1px solid var(--border); border-left: 2px solid var(--copper); border-radius: 10px; padding: 16px 20px; margin: 16px 0; }
        .gc-tip.warn { border-left-color: var(--amber); }
        .gc-tip-head { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--copper); margin-bottom: 7px; }
        .gc-tip.warn .gc-tip-head { color: var(--amber); }
        .gc-tip-body { font-size: 13.5px; color: var(--cream-dim); line-height: 1.7; }

        .gc-thresholds { display: flex; flex-direction: column; gap: 8px; margin: 14px 0; }
        .gc-threshold { background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; }
        .gc-threshold-size { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--copper); margin-bottom: 4px; }
        .gc-threshold-val { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 700; color: var(--amber); margin-bottom: 4px; }
        .gc-threshold-note { font-size: 12px; color: var(--cream-dim); line-height: 1.55; }

        .gc-options { display: grid; gap: 10px; margin: 14px 0; }
        @media(min-width:560px) { .gc-options { grid-template-columns: 1fr 1fr; } }
        .gc-option { background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
        .gc-option-name { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 5px; }
        .gc-option-desc { font-size: 12px; color: var(--cream-dim); margin-bottom: 10px; line-height: 1.55; }
        .gc-option-code { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--amber); background: var(--bg2); border: 1px solid var(--border); border-radius: 5px; padding: 8px 10px; white-space: pre; }

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
          <div className="gc-kicker">Guía · Negocio</div>
          <div className="gc-pill">Saber qué publica tu competencia antes que ella</div>
          <h1 className="gc-h1">
            Tracker de competencia<br />
            en <em>Instagram.</em>
          </h1>
          <p className="gc-intro">
            Un agente que vigila <strong>5-10 competidores</strong> en Instagram y te avisa por Telegram cuando publican algo viral. 15 min de setup con Claude Code + Apify. <strong>0 USD extra</strong> sobre lo que ya pagás.
          </p>
          <div className="gc-meta-row">
            <span>— 5 pasos</span>
            <span>— 15 min de setup</span>
            <span>— 0 USD extra</span>
          </div>
        </div>

        <div className="gc-stats">
          <div className="gc-stat">
            <div className="gc-stat-num">10</div>
            <div className="gc-stat-label">cuentas a vigilar</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">3x</div>
            <div className="gc-stat-label">alertas por día</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">$0</div>
            <div className="gc-stat-label">costo extra/mes</div>
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
          <div className="gc-section-kicker">Por qué</div>
          <h2 className="gc-h2">Lo que publican tus competidores<br /><em>te dice qué funciona.</em></h2>
          <div className="gc-body">
            <p>
              Si sabés qué post de tu competencia tuvo 5x más engagement que el promedio, sabés dos cosas: qué tema resuena en tu nicho ahora mismo, y qué formato está funcionando en este momento.
            </p>
            <p>
              El problema es que revisarlo manualmente lleva 30 minutos al día. Este sistema lo hace por vos 3 veces al día y solo te avisa cuando algo merece atención.
            </p>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Lo que no es este sistema</div>
            <div className="gc-tip-body">
              No es para copiar contenido. Es para entender qué temas y formatos funcionan en tu nicho ahora, antes de que la tendencia se enfríe.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        <div className="gc-section" id="arquitectura">
          <div className="gc-section-kicker">Arquitectura</div>
          <h2 className="gc-h2">Cómo funciona<br /><em>el sistema.</em></h2>
          <div className="gc-body">
            <p>3 piezas, todas gratuitas en los planes básicos:</p>
          </div>
          <div className="gc-steps" style={{ marginTop: 0 }}>
            <div className="gc-step"><span className="gc-step-n">01</span><span><strong style={{color:'var(--cream)'}}>Apify</strong> — scrapeá los últimos posts de las cuentas que elegís, 3 veces por día.</span></div>
            <div className="gc-step"><span className="gc-step-n">02</span><span><strong style={{color:'var(--cream)'}}>Script Python/Node</strong> — compara los posts nuevos con un JSON local y calcula el engagement rate.</span></div>
            <div className="gc-step"><span className="gc-step-n">03</span><span><strong style={{color:'var(--cream)'}}>Bot de Telegram</strong> — si el engagement supera tu threshold, te manda una alerta con el link directo al post.</span></div>
          </div>
        </div>

        <div className="gc-divider" />

        {pasos.map(paso => (
          <div key={paso.id} className="gc-section" id={paso.id}>
            <div className="gc-section-kicker">{paso.label}</div>
            <h2 className="gc-h2"><em>{paso.title}</em></h2>

            <div className="gc-paso">
              <div className="gc-paso-label">{paso.label}</div>
              <div className="gc-paso-title">{paso.title}</div>
              <div className="gc-paso-body">{paso.body}</div>

              {paso.steps && (
                <div className="gc-steps" style={{ marginTop: 0 }}>
                  {paso.steps.map((s, i) => (
                    <div key={i} className="gc-step">
                      <span className="gc-step-n">{String(i + 1).padStart(2, '0')}</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {paso.code && (
                <div className="gc-code" style={{ marginTop: 14 }}>
                  <div className="gc-code-header">
                    <span className="gc-code-title">.env</span>
                  </div>
                  <pre>{paso.code}</pre>
                </div>
              )}

              {paso.prompt && (
                <div className="gc-code" style={{ marginTop: 14 }}>
                  <div className="gc-code-header">
                    <span className="gc-code-title">prompt para Claude Code</span>
                  </div>
                  <pre>{paso.prompt}</pre>
                </div>
              )}

              {paso.thresholds && (
                <div className="gc-thresholds">
                  {paso.thresholds.map(t => (
                    <div key={t.size} className="gc-threshold">
                      <div className="gc-threshold-size">{t.size}</div>
                      <div className="gc-threshold-val">{t.threshold}</div>
                      <div className="gc-threshold-note">{t.note}</div>
                    </div>
                  ))}
                </div>
              )}

              {paso.options && (
                <div className="gc-options">
                  {paso.options.map(o => (
                    <div key={o.name} className="gc-option">
                      <div className="gc-option-name">{o.name}</div>
                      <div className="gc-option-desc">{o.desc}</div>
                      <div className="gc-option-code">{o.code}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="gc-divider" />

        <div className="gc-section" id="alertas">
          <div className="gc-section-kicker">Ejemplo real</div>
          <h2 className="gc-h2">Así se ve<br /><em>la alerta en Telegram.</em></h2>
          <div className="gc-body">
            <p>Cuando el script detecta un post viral, te llega esto al canal de Telegram:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">alerta de ejemplo · Telegram</span>
            </div>
            <pre>{ejemploAlerta}</pre>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Qué hacer con la alerta</div>
            <div className="gc-tip-body">
              Entrá al post, fijate en el formato y el ángulo del tema. No en el texto exacto — en la estructura. Eso es lo que podés adaptar a tu voz.
            </div>
          </div>
        </div>

        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Sabés qué publican.<br /><em>Ahora automatizá.</em></h3>
          <p>
            La siguiente guía: construye workflows en n8n desde Cursor + Claude Code.<br />
            Le describís el flow, te entrega el JSON validado, lo pegás con Cmd+V.
          </p>
          <a href="/recursos/n8n" className="gc-btn-primary">Guía 08 · n8n sin tocar la UI →</a>
        </div>

      </div>
    </>
  )
}
