import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'CRM con bot calificador — Guía · Nico IA',
  description: 'Qué es, las 4 piezas que lleva, cómo se ve corriendo de verdad, y cuánto cuesta la IA por debajo (desde $8/mes). El mapa completo, sin equipo.',
}

const toc = [
  { id: 'intro',    label: 'Qué es (en simple)' },
  { id: 'piezas',  label: 'Las 4 piezas' },
  { id: 'canal',   label: '01 · El canal' },
  { id: 'cerebro', label: '02 · El cerebro' },
  { id: 'pipeline',label: '03 · Cómo ordena' },
  { id: 'automatiza', label: '04 · Corre solo' },
  { id: 'costos',  label: '¿Cuánto cuesta la IA?' },
  { id: 'elegir',  label: 'Cómo elegir el modelo' },
]

const piezas = [
  { n: '1', l: 'Canal',   d: 'de dónde entran los mensajes (WhatsApp / Instagram)' },
  { n: '2', l: 'Cerebro', d: 'una IA que lee y entiende cada mensaje' },
  { n: '3', l: 'Reglas',  d: 'puntúa el lead: caliente, tibio, frío' },
  { n: '4', l: 'CRM',     d: 'guarda, etiqueta y ordena en el embudo' },
]

const flujo = `mensaje del lead
      ↓
 la IA lo lee
      ↓
{ intención, presupuesto, urgencia }
      ↓
 le pone una etiqueta`

const prompt = `"Eres un calificador de leads. Analiza este
mensaje y devuelve SOLO un JSON:

{
  intencion: alta / media / baja,
  presupuesto: detectado o null,
  urgencia: 1-5,
  siguiente_accion: agendar / nutrir / descartar
}"`

const modelos = [
  { modelo: 'DeepSeek V3',   precio: '~$8/mes',   nota: 'más barato',              best: true  },
  { modelo: 'GPT-4o Nano',   precio: '~$8/mes',   nota: 'rápido y barato',         best: false },
  { modelo: 'Claude Haiku',  precio: '~$34/mes',  nota: 'buen punto medio',        best: false },
  { modelo: 'Claude Sonnet', precio: '~$101/mes', nota: 'el que mejor entiende',   best: false },
]

const reglaModelo = [
  { caso: 'Pocos leads, presupuesto cero',       pick: 'el más barato (DeepSeek / Nano)' },
  { caso: 'Necesitás que entienda matices',      pick: 'un modelo más potente (Sonnet)' },
  { caso: 'Mucho volumen fijo y constante',      pick: 'servidor propio (modelo open source)' },
]

export default function CrmPage() {
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
        .gc-intro-note { font-size: 16px; color: var(--cream-dim); line-height: 1.85; margin-bottom: 28px; }
        .gc-intro-note em { font-style: italic; color: var(--cream); }
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
        .gc-body { font-size: 15px; color: var(--cream-dim); line-height: 1.85; }
        .gc-body p { margin-bottom: 14px; }
        .gc-body p:last-child { margin-bottom: 0; }
        .gc-body strong { color: var(--cream); font-weight: 600; }

        .gc-paso-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--copper); margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
        .gc-paso-label::before { content: ''; display: inline-block; width: 20px; height: 1px; background: var(--copper); opacity: 0.7; }

        .gc-piezas-grid { display: grid; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-piezas-grid { grid-template-columns: 1fr 1fr; } }
        .gc-pieza { display: flex; align-items: baseline; gap: 14px; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; }
        .gc-pieza-n { font-family: 'DM Mono', monospace; font-size: 10px; color: #4A3D30; flex-shrink: 0; }
        .gc-pieza-l { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 3px; }
        .gc-pieza-d { font-size: 12px; color: var(--cream-dim); line-height: 1.5; }

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
        .gc-tip-body em { font-style: italic; color: var(--amber); }

        .gc-inbox-mock { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; margin: 20px 0; }
        .gc-inbox-bar { background: var(--bg3); border-bottom: 1px solid var(--border); padding: 10px 16px; display: flex; align-items: center; gap: 8px; }
        .gc-inbox-bar-dot { width: 9px; height: 9px; border-radius: 50%; }
        .gc-inbox-bar-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #4A3D30; }
        .gc-inbox-body { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
        .gc-inbox-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: var(--bg3); border-radius: 8px; border: 1px solid var(--border); }
        .gc-inbox-av { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 13px; font-weight: 700; color: var(--copper); background: var(--copper-dim); flex-shrink: 0; }
        .gc-inbox-info { flex: 1; min-width: 0; }
        .gc-inbox-name { font-size: 12px; font-weight: 600; color: var(--cream); margin-bottom: 2px; }
        .gc-inbox-msg { font-size: 11px; color: var(--cream-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .gc-inbox-badge { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 3px; padding: 2px 7px; flex-shrink: 0; }
        .gc-inbox-count { font-size: 11px; color: #4A3D30; font-family: 'DM Mono', monospace; text-align: center; padding: 8px; }

        .gc-embudo { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 20px 0; }
        @media(max-width:500px){ .gc-embudo { grid-template-columns: 1fr 1fr; } }
        .gc-embudo-col { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 12px; }
        .gc-embudo-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); margin-bottom: 8px; }
        .gc-embudo-cards { display: flex; flex-direction: column; gap: 5px; }
        .gc-embudo-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 5px; padding: 6px 8px; font-size: 11px; color: var(--cream-dim); }

        .gc-auto { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
        .gc-auto-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; }
        .gc-auto-left { flex: 1; }
        .gc-auto-trigger { font-size: 13px; font-weight: 600; color: var(--cream); margin-bottom: 3px; }
        .gc-auto-action { font-size: 12px; color: var(--cream-dim); }
        .gc-auto-badge { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; color: var(--copper); flex-shrink: 0; background: var(--copper-dim); border: 1px solid var(--border-mid); border-radius: 4px; padding: 3px 8px; }

        .gc-modelos { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin: 20px 0; }
        .gc-modelo-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 18px; border-bottom: 1px solid var(--border); }
        .gc-modelo-row:last-child { border-bottom: none; }
        .gc-modelo-row.best { background: rgba(200,117,51,0.06); }
        .gc-modelo-name { font-size: 14px; font-weight: 600; color: var(--cream); display: flex; align-items: center; gap: 8px; }
        .gc-modelo-tag { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--copper); background: var(--copper-dim); border: 1px solid var(--border-mid); border-radius: 3px; padding: 2px 6px; }
        .gc-modelo-right { display: flex; align-items: baseline; gap: 12px; }
        .gc-modelo-nota { font-size: 12px; color: #4A3D30; display: none; }
        @media(min-width:480px){ .gc-modelo-nota { display: block; } }
        .gc-modelo-precio { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 700; color: var(--copper); }

        .gc-reglas-modelo { display: grid; gap: 8px; margin: 20px 0; }
        .gc-regla-modelo { display: flex; flex-direction: column; gap: 4px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; }
        @media(min-width:560px){ .gc-regla-modelo { flex-direction: row; align-items: center; justify-content: space-between; gap: 16px; } }
        .gc-regla-caso { font-size: 14px; color: var(--cream-dim); }
        .gc-regla-pick { font-size: 13px; font-weight: 600; color: var(--copper); white-space: nowrap; }

        .gc-divider { height: 1px; margin: 60px 0; background: linear-gradient(90deg, transparent, var(--border-mid), transparent); }

        .gc-summary { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 28px; margin-top: 60px; }
        .gc-summary p { font-size: 15px; color: var(--cream-dim); line-height: 1.85; margin-bottom: 14px; }
        .gc-summary p:last-child { margin-bottom: 0; }
        .gc-summary em { font-style: italic; color: var(--cream); }

        .gc-cta { background: var(--bg2); border: 1px solid var(--border-mid); border-radius: 16px; padding: 40px; text-align: center; margin-top: 24px; }
        .gc-cta-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); margin-bottom: 16px; }
        .gc-cta h3 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: var(--cream); line-height: 1.1; margin-bottom: 12px; }
        .gc-cta h3 em { font-style: italic; color: var(--copper); }
        .gc-cta p { font-size: 14px; color: var(--cream-dim); line-height: 1.75; margin-bottom: 10px; }
        .gc-cta p strong { color: var(--cream); }
        .gc-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: var(--copper); color: var(--cream); padding: 13px 24px; border-radius: 8px; font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; transition: box-shadow 0.2s, opacity 0.2s; margin-top: 24px; display: inline-flex; }
        .gc-btn-primary:hover { box-shadow: 0 0 32px var(--copper-glow); opacity: 0.9; }
      `}</style>

      <CopperNav activeHref="/recursos" />

      <div className="gc-wrap">

        {/* HEADER */}
        <div className="gc-header">
          <div className="gc-kicker">Guía · Automatización · 2026</div>
          <div className="gc-pill">4 piezas · sin equipo · desde $8/mes</div>
          <h1 className="gc-h1">
            Montá tu CRM con un <em>bot</em><br />
            que califica leads.
          </h1>
          <p className="gc-intro">
            La guía básica: qué es, qué piezas lleva, y cuánto cuesta la IA por debajo. Un sistema donde los mensajes entran a un solo lugar y un bot decide, solo, cuáles valen tu tiempo. <strong>Sin equipo y sin perseguir a nadie.</strong>
          </p>
          <p className="gc-intro-note">
            Esto es el mapa. <em>El montaje paso a paso es otra historia.</em>
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

        {/* QUÉ ES */}
        <div className="gc-section" id="intro">
          <div className="gc-section-kicker">Qué es</div>
          <h2 className="gc-h2">En simple,<br /><em>sin tecnicismos.</em></h2>
          <div className="gc-body">
            <p>Un <strong>CRM</strong> es donde viven tus clientes y leads, ordenados. Nombre, de dónde llegaron, qué quieren, en qué punto van. Nada de hojas de cálculo sueltas ni chats perdidos.</p>
            <p>El <strong>bot calificador</strong> es quien decide, solo, cuáles de esos leads valen tu tiempo. Lee cada mensaje, entiende la intención, y le pone una etiqueta sin que vos leas nada.</p>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Juntos hacen una cosa</div>
            <div className="gc-tip-body">
              Dejás de perseguir leads. Ellos llegan ordenados, etiquetados y listos para que solo hables con los que importan.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PIEZAS */}
        <div className="gc-section" id="piezas">
          <div className="gc-section-kicker">Las piezas</div>
          <h2 className="gc-h2">Solo son 4.<br /><em>Ni una más.</em></h2>
          <div className="gc-piezas-grid">
            {piezas.map(p => (
              <div key={p.n} className="gc-pieza">
                <span className="gc-pieza-n">0{p.n}</span>
                <div>
                  <div className="gc-pieza-l">{p.l}</div>
                  <div className="gc-pieza-d">{p.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="gc-body">
            <p>El mensaje entra por el <strong>canal</strong>, el <strong>cerebro</strong> lo lee, las <strong>reglas</strong> lo puntúan, y el <strong>CRM</strong> lo guarda en su columna. Veamos cada una con el sistema real corriendo.</p>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 01 — CANAL */}
        <div className="gc-section" id="canal">
          <div className="gc-paso-label">Paso 01 · El canal</div>
          <h2 className="gc-h2">Todo entra a<br /><em>un solo lugar.</em></h2>
          <div className="gc-body">
            <p>El canal es por donde llegan los mensajes. WhatsApp, Instagram, lo que sea: todos caen en un mismo buzón. No saltás entre apps ni se te pierde ninguno.</p>
          </div>

          {/* Inbox mock */}
          <div className="gc-inbox-mock">
            <div className="gc-inbox-bar">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-inbox-bar-title">crm · bandeja de entrada</span>
            </div>
            <div className="gc-inbox-body">
              {[
                { av: 'M', name: 'María G.', msg: 'Hola, quería preguntar por el precio del...', tag: 'caliente', tagColor: '#C87533' },
                { av: 'J', name: 'Juan P.', msg: 'Buen día, vi tu post y me interesa saber...', tag: 'tibio', tagColor: '#E8A84E' },
                { av: 'A', name: 'Ana R.', msg: '¿Tienen planes para equipos pequeños?', tag: 'nuevo', tagColor: '#4A3D30' },
                { av: 'C', name: 'Carlos M.', msg: 'Necesito esto para esta semana, ¿es posible?', tag: 'caliente', tagColor: '#C87533' },
              ].map(row => (
                <div key={row.name} className="gc-inbox-row">
                  <div className="gc-inbox-av">{row.av}</div>
                  <div className="gc-inbox-info">
                    <div className="gc-inbox-name">{row.name}</div>
                    <div className="gc-inbox-msg">{row.msg}</div>
                  </div>
                  <span className="gc-inbox-badge" style={{ background: row.tagColor + '22', color: row.tagColor, border: `1px solid ${row.tagColor}44` }}>{row.tag}</span>
                </div>
              ))}
              <div className="gc-inbox-count">1.647 chats · todos los canales en un mismo lugar</div>
            </div>
          </div>

          <div className="gc-body">
            <p>Esto es el <strong>canal</strong>. Cada mensaje nuevo aparece aquí ordenado por fecha, con el nombre y el último mensaje. Nada se pierde y nada se queda sin responder.</p>
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Usá la API oficial</div>
            <div className="gc-tip-body">
              Conectá WhatsApp con la <strong>Cloud API de Meta</strong>, no con un número personal pegado con cinta. La API oficial es número verificado y sin riesgo de que te tumben la cuenta por automatizar.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 02 — CEREBRO */}
        <div className="gc-section" id="cerebro">
          <div className="gc-paso-label">Paso 02 · El cerebro</div>
          <h2 className="gc-h2">Cómo piensa<br /><em>el bot.</em></h2>
          <div className="gc-body">
            <p>Cuando entra un mensaje, la IA lo lee y devuelve una estructura: qué tan interesado está, si menciona presupuesto, y qué tan urgente es. Con eso le pone una etiqueta.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">cerebro.md · el flujo</span>
            </div>
            <pre>{flujo}</pre>
          </div>
          <div className="gc-body">
            <p>Por dentro, la IA recibe una instrucción fija que la obliga a responder siempre en el mismo formato (un JSON), para que el resto del sistema lo pueda usar sin adivinar:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">calificador.md · el prompt</span>
            </div>
            <pre>{prompt}</pre>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Lee como vos, decide en 1 segundo</div>
            <div className="gc-tip-body">
              La IA entiende el mensaje como lo entenderías vos: capta matices, intención y tono. La diferencia es que lo hace en un segundo y a cualquier hora.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 03 — PIPELINE */}
        <div className="gc-section" id="pipeline">
          <div className="gc-paso-label">Paso 03 · Cómo ordena</div>
          <h2 className="gc-h2">El embudo<br /><em>se llena solo.</em></h2>
          <div className="gc-body">
            <p>Cada lead calificado se mueve a una columna del embudo según su etapa. Vos ves el panorama completo de un vistazo; el bot es quien va moviendo cada tarjeta a su lugar.</p>
          </div>

          {/* Embudo mock */}
          <div className="gc-embudo">
            {[
              { label: 'Entrantes', cards: ['María G.', 'Ana R.', '+12 más'] },
              { label: 'Decisión',  cards: ['Juan P.', 'Roberto L.'] },
              { label: 'Negociación', cards: ['Carlos M.'] },
              { label: 'Cierre',   cards: ['Sofia T.', '+3 más'] },
            ].map(col => (
              <div key={col.label} className="gc-embudo-col">
                <div className="gc-embudo-label">{col.label}</div>
                <div className="gc-embudo-cards">
                  {col.cards.map(c => (
                    <div key={c} className="gc-embudo-card">{c}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="gc-body">
            <p>Leads entrantes, toma de decisiones, negociación y cierre. Cuatro columnas. <strong>Vos ves el embudo, el bot lo llena.</strong></p>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 04 — AUTOMATIZACIONES */}
        <div className="gc-section" id="automatiza">
          <div className="gc-paso-label">Paso 04 · Corre solo</div>
          <h2 className="gc-h2">Y esto ya<br /><em>corre solo.</em></h2>
          <div className="gc-body">
            <p>Las reglas que arman todo esto no son teoría: son automatizaciones que están activas ahora mismo, con su tasa de respuesta real.</p>
          </div>

          <div className="gc-auto">
            <div className="gc-auto-item">
              <div className="gc-auto-left">
                <div className="gc-auto-trigger">"Comenta info"</div>
                <div className="gc-auto-action">→ manda el temario y califica el lead</div>
              </div>
              <span className="gc-auto-badge">CTR 63.5%</span>
            </div>
            <div className="gc-auto-item">
              <div className="gc-auto-left">
                <div className="gc-auto-trigger">"Pide beca"</div>
                <div className="gc-auto-action">→ manda requisitos y agenda recordatorio</div>
              </div>
              <span className="gc-auto-badge">CTR 54.8%</span>
            </div>
          </div>

          <div className="gc-body">
            <p>No es teoría. Estas están <strong>activas</strong> y respondiendo solas mientras leés esto.</p>
          </div>
        </div>

        <div className="gc-divider" />

        {/* COSTOS */}
        <div className="gc-section" id="costos">
          <div className="gc-section-kicker">¿Cuánto cuesta la IA?</div>
          <h2 className="gc-h2">La pregunta<br /><em>que todos hacen.</em></h2>
          <div className="gc-body">
            <p>Respuesta honesta: <strong>depende del volumen y del modelo</strong> que uses para leer cada mensaje. Para que tengas un número real, este es un escenario medio de <strong>1.500 leads al mes</strong>:</p>
          </div>
          <div className="gc-modelos">
            {modelos.map((m, i) => (
              <div key={m.modelo} className={`gc-modelo-row${m.best ? ' best' : ''}`}>
                <div className="gc-modelo-name">
                  {m.modelo}
                  {m.best && <span className="gc-modelo-tag">★ más barato</span>}
                </div>
                <div className="gc-modelo-right">
                  <span className="gc-modelo-nota">{m.nota}</span>
                  <span className="gc-modelo-precio">{m.precio}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="gc-body">
            <p>Por <strong>unos pocos dólares al mes</strong> tenés un bot que no duerme, no se cansa y responde en un segundo. Es de las cosas más baratas que vas a conectar a tu negocio.</p>
          </div>
          <div className="gc-tip info">
            <div className="gc-tip-head">— Lo que mueve el precio</div>
            <div className="gc-tip-body">
              Dos cosas: cuántos mensajes lee al mes (volumen) y qué tan potente es el modelo que elegís. Un modelo barato lee miles de mensajes por el precio de un café; uno premium entiende mejor los matices, pero cuesta más.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* CÓMO ELEGIR */}
        <div className="gc-section" id="elegir">
          <div className="gc-section-kicker">Cómo elegir</div>
          <h2 className="gc-h2">No existe "el mejor".<br /><em>Existe el correcto.</em></h2>
          <div className="gc-body">
            <p>El modelo correcto depende de tu caso, no de un ranking. Esta es la regla rápida para decidir:</p>
          </div>
          <div className="gc-reglas-modelo">
            {reglaModelo.map(r => (
              <div key={r.caso} className="gc-regla-modelo">
                <span className="gc-regla-caso">{r.caso}</span>
                <span className="gc-regla-pick">→ {r.pick}</span>
              </div>
            ))}
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— La regla de oro</div>
            <div className="gc-tip-body">
              Empezá barato. Subí de modelo solo si de verdad lo necesitás. La mayoría de negocios nunca pasa del escenario de unos dólares al mes.
            </div>
          </div>
        </div>

        {/* RESUMEN */}
        <div className="gc-summary">
          <p>Esto es el <em>mapa</em>: las 4 piezas, cómo se conectan, y cuánto cuesta la IA por debajo. Con esto ya entendés qué es un CRM con bot calificador y por qué casi cualquier negocio puede tener uno.</p>
          <p>El montaje paso a paso, conectar la API y escribir las reglas, es <em>otra historia</em>. Pero ya sabés hacia dónde vas.</p>
        </div>

        {/* CTA */}
        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Empezá por las bases<br /><em>en la comunidad.</em></h3>
          <p>La comunidad es para aprender <strong>IA desde cero</strong> y montar tus primeras automatizaciones, paso a paso y en español. Ahí construís la base que necesitás antes de un sistema como este.</p>
          <p>¿Querés montar el CRM completo? El <strong>curso de montaje</strong> está disponible para miembros.</p>
          <a href="/recursos" className="gc-btn-primary">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
