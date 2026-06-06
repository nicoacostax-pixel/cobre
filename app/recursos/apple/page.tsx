import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Las 4 cosas para que Apple apruebe tu app — Guía 09 · Nico IA',
  description: 'Construí mi app con Claude en 2 horas y Apple me la rechazó en 10 minutos. El checklist de las 4 cosas para pasar la revisión a la primera.',
}

const toc = [
  { id: 'intro',          label: 'Por qué te rechazan' },
  { id: 'paso-privacidad', label: '01 · Política de privacidad' },
  { id: 'paso-iphone',    label: '02 · iPhone real' },
  { id: 'paso-signin',    label: '03 · Sign in with Apple' },
  { id: 'paso-pagos',     label: '04 · Pagos' },
  { id: 'checklist',      label: 'Checklist final' },
]

const rechazo = `✗ App rejected · 10 min
Guideline 5.1.1 — Data Collection

Your app collects user data but does not
include a link to your privacy policy in
App Store Connect.

→ Resolve and resubmit.`

const demoAccount = `Demo account
user: demo@tuapp.com
pass: Demo1234!

Nota: el login está en la primera
pantalla. Los pagos usan el sandbox
de Apple. App probada offline.`

const checklist = [
  { id: 'privacy',  label: 'Link de política de privacidad puesto y funcionando.' },
  { id: 'iphone',   label: 'App probada en iPhone real y en modo avión.' },
  { id: 'demo',     label: 'Cuenta de prueba dejada en las notas de revisión.' },
  { id: 'signin',   label: 'Sign in with Apple activado (si usás Google/Facebook).' },
  { id: 'pagos',    label: 'Pagos digitales por In-App Purchase + Small Business Program.' },
  { id: 'qa',       label: 'Cero pantallas en blanco, cero botones muertos, cero links rotos.' },
]

const productosData = {
  digital: {
    label: 'Digital · dentro de la app',
    accent: 'In-App Purchase obligatorio',
    desc: 'Suscripciones, contenido o features que se consumen dentro de la app. Tenés que cobrar con el sistema de Apple. Stripe directo aquí = rechazo.',
    cut: 'Apple se queda con 30% (15% con Small Business Program).',
    tone: 'amber',
  },
  fisico: {
    label: 'Físico · fuera de la app',
    accent: 'Stripe directo, Apple no toca nada',
    desc: 'Un producto físico, un servicio presencial, una entrada a un evento. Como se consume fuera de la app, usás Stripe directo y Apple no se mete.',
    cut: 'Apple se queda con 0%. Esto confunde a muchísima gente.',
    tone: 'verdigris',
  },
}

export default function ApplePage() {
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
        .gc-body em { font-style: italic; color: var(--amber); }

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

        .gc-ol { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-ol-item { display: flex; gap: 14px; align-items: baseline; }
        .gc-ol-n { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; color: var(--copper); flex-shrink: 0; }
        .gc-ol-text { font-size: 14px; color: var(--cream-dim); line-height: 1.6; }
        .gc-ol-text strong { color: var(--cream); }
        .gc-ol-text code { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--copper); }

        .gc-pagos-toggle { overflow: hidden; border: 1px solid var(--border); border-radius: 12px; margin: 20px 0; }
        .gc-pagos-tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; background: var(--bg3); padding: 8px; }
        .gc-pagos-tab { padding: 10px 14px; font-size: 13px; font-weight: 600; color: var(--cream-dim); background: transparent; border: none; cursor: pointer; border-radius: 8px; text-align: center; font-family: var(--font-geist-sans), sans-serif; transition: all 0.2s; }
        .gc-pagos-tab.active { background: var(--bg2); color: var(--cream); }
        .gc-pagos-content { padding: 20px; }
        .gc-pagos-accent { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-style: italic; font-weight: 700; color: var(--amber); margin-bottom: 10px; }
        .gc-pagos-accent.green { color: var(--verdigris); }
        .gc-pagos-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.6; margin-bottom: 10px; }
        .gc-pagos-cut { display: inline-flex; align-items: center; gap: 6px; font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; color: var(--amber); background: rgba(232,168,78,0.1); border-radius: 4px; padding: 4px 12px; }
        .gc-pagos-cut.green { color: var(--verdigris); background: rgba(61,122,110,0.1); }

        .gc-toggle-widget { background: var(--bg3); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin: 20px 0; }
        .gc-toggle-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .gc-toggle-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; }
        .gc-toggle-switch { position: relative; display: inline-block; width: 44px; height: 24px; }
        .gc-toggle-switch input { opacity: 0; width: 0; height: 0; }
        .gc-toggle-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: var(--border-mid); border-radius: 24px; transition: 0.3s; }
        .gc-toggle-slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.3s; }
        input:checked + .gc-toggle-slider { background: var(--verdigris); }
        input:checked + .gc-toggle-slider:before { transform: translateX(20px); }
        .gc-toggle-value { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-style: italic; font-weight: 700; color: var(--cream); }
        .gc-toggle-note { font-family: 'DM Mono', monospace; font-size: 11px; color: #4A3D30; margin-top: 8px; }

        .gc-checklist-box { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 28px; margin: 20px 0; }
        .gc-checklist-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .gc-checklist-meta { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; }
        .gc-checklist-ul { display: flex; flex-direction: column; gap: 10px; }
        .gc-checklist-item { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg3); }
        .gc-checklist-box-check { width: 20px; height: 20px; border: 1px solid var(--border-mid); border-radius: 5px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .gc-checklist-text { font-size: 13px; color: var(--cream-dim); }

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
          <div className="gc-kicker">Guía 09 · Lanzamiento · 2026</div>
          <div className="gc-pill">4 arreglos · antes de darle Submit</div>
          <h1 className="gc-h1">
            4 cosas que arreglar<br />
            antes de que Apple<br />
            te <em>rechace.</em>
          </h1>
          <p className="gc-intro">
            Construí mi primera app con Claude en 2 horas. <strong>Apple me la rechazó en 10 minutos.</strong> Estas son las 4 cosas que tenía mal.
          </p>
          <p className="gc-intro">
            Arreglalas antes de darle a Submit y te ahorras la ida y vuelta.
          </p>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">App Store Connect · Review</span>
            </div>
            <pre>{rechazo}</pre>
          </div>
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
          <h2 className="gc-h2">Por qué<br /><em>te rechazan.</em></h2>
          <div className="gc-body">
            <p>Construir la app es la parte fácil. El muro es la revisión de Apple: un humano abre tu app en un iPhone real y la usa. Si encuentra un hueco, te la devuelve con un código de guideline y a empezar otra vez.</p>
            <p>La buena noticia: el 90% de los rechazos de una primera app caen en <strong>las mismas 4 cosas</strong>. Si las dejás listas antes de darle a Submit, pasás a la primera. Vamos una por una.</p>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 01 — PRIVACIDAD */}
        <div className="gc-section" id="paso-privacidad">
          <div className="gc-paso-label">01 · Privacidad</div>
          <h2 className="gc-h2">Política de<br /><em>privacidad.</em></h2>
          <div className="gc-body">
            <p>Es la causa <strong>#1 de rechazo automático</strong>. Si tu app toca correo, nombre, ubicación o cualquier dato del usuario, Apple te exige un link a tu política de privacidad. Sin ese link, ni la miran.</p>
          </div>
          <h3 className="gc-h3">Cómo arreglarlo</h3>
          <div className="gc-ol">
            {[
              { n: '1.', text: <span>Generala gratis en <strong>Termly</strong> o <strong>iubenda</strong>. Son 5 minutos.</span> },
              { n: '2.', text: <span>Subí el link en App Store Connect → tu app → <em>Información de la app</em> → campo <code>Privacy Policy URL</code>. Es obligatorio, no es un extra.</span> },
              { n: '3.', text: <span>Asegurate de que el link <strong>abre de verdad</strong>. Un 404 también es rechazo.</span> },
            ].map(item => (
              <div key={item.n} className="gc-ol-item">
                <span className="gc-ol-n">{item.n}</span>
                <span className="gc-ol-text">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— El error tonto que cuesta una semana</div>
            <div className="gc-tip-body">
              Pegar el link y no probarlo. Apple hace click en él. Si tu hosting está caído o pusiste mal la URL, te rechazan por algo que arreglabas en 10 segundos. Abrilo en una ventana de incógnito antes de mandar.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 02 — iPHONE REAL */}
        <div className="gc-section" id="paso-iphone">
          <div className="gc-paso-label">02 · iPhone real</div>
          <h2 className="gc-h2">Probala en un iPhone…<br /><em>y sin wifi.</em></h2>
          <div className="gc-body">
            <p>Apple no revisa tu código: abre tu app en un <strong>dispositivo físico</strong> y la usa. Si se cae, si una pantalla queda en blanco o si un botón no hace nada, te rechazan por <em>app incompleta</em> (Guideline 2.1).</p>
          </div>
          <h3 className="gc-h3">Cómo arreglarlo</h3>
          <div className="gc-ol">
            {[
              { n: '1.', text: <span>Subila a <strong>TestFlight</strong> y probala vos primero en tu propio iPhone, <strong>no en el simulador</strong>.</span> },
              { n: '2.', text: <span>Probá en <strong>modo avión / sin wifi</strong>. Si la app se rompe offline en vez de mostrar un mensaje de error decente, es rechazo casi seguro.</span> },
              { n: '3.', text: <span>Si tu app tiene login, dejá una <strong>cuenta de prueba</strong> (usuario + contraseña) en las App Review Notes. Si el revisor no puede entrar, no aprueba nada.</span> },
            ].map(item => (
              <div key={item.n} className="gc-ol-item">
                <span className="gc-ol-n">{item.n}</span>
                <span className="gc-ol-text">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="gc-body" style={{ marginTop: 16 }}>
            <p>Así se ve una nota de revisión que sí funciona:</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">App Review Notes</span>
            </div>
            <pre>{demoAccount}</pre>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— El truco del modo avión</div>
            <div className="gc-tip-body">
              Antes de subir, poné tu iPhone en modo avión y abrí cada pantalla. Donde veas un spinner infinito o una pantalla blanca, ahí hay un rechazo esperando. Mejor que lo encuentres vos y no el revisor.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 03 — SIGN IN WITH APPLE */}
        <div className="gc-section" id="paso-signin">
          <div className="gc-paso-label">03 · Sign in with Apple</div>
          <h2 className="gc-h2">Sign in with<br /><em>Apple.</em></h2>
          <div className="gc-body">
            <p>Aplica <strong>solo si</strong> dejás entrar a la gente con Google o Facebook. En ese caso Apple te obliga a ofrecer también una opción de login equivalente que respete la privacidad, y la forma fácil de cumplir es activar <strong>Sign in with Apple</strong>.</p>
          </div>
          <div className="gc-tip info">
            <div className="gc-tip-head">— Login solo con correo y contraseña</div>
            <div className="gc-tip-body">
              Si tu app no usa Google ni Facebook y solo tiene login propio con correo y contraseña, este punto <strong>no aplica</strong>. Pasalo y seguí al paso 04.
            </div>
          </div>
          <h3 className="gc-h3">Cómo arreglarlo</h3>
          <div className="gc-ol">
            {[
              { n: '1.', text: <span>Si usás <strong>Clerk, Supabase, Auth0</strong> o similar: lo activás con un toggle. Literal un switch.</span> },
              { n: '2.', text: <span>Ponelo <strong>visible</strong> en la misma pantalla que los otros botones de login. No escondido abajo.</span> },
            ].map(item => (
              <div key={item.n} className="gc-ol-item">
                <span className="gc-ol-n">{item.n}</span>
                <span className="gc-ol-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* PASO 04 — PAGOS */}
        <div className="gc-section" id="paso-pagos">
          <div className="gc-paso-label">04 · Pagos</div>
          <h2 className="gc-h2">Aquí es donde<br /><em>casi todos caen.</em></h2>
          <div className="gc-body">
            <p>La regla por defecto (la que aplica en LatAm y casi todo el mundo): si vendés <strong>suscripciones o contenido digital</strong> que se consume dentro de la app, tenés que cobrar con el sistema de Apple <strong>(In-App Purchase)</strong>. Mandar a la gente a pagar por fuera con Stripe para ese tipo de producto = rechazo.</p>
            <p>Tocá el tipo de producto que vendés para ver qué te toca:</p>
          </div>

          {/* Pagos toggle - static version since no client state */}
          <div className="gc-pagos-toggle">
            <div style={{ padding: 20 }}>
              <div style={{ display: 'grid', gap: 12 }}>
                {Object.entries(productosData).map(([key, p]) => (
                  <div key={key} style={{
                    background: 'var(--bg3)',
                    border: `1px solid ${p.tone === 'amber' ? 'rgba(232,168,78,0.3)' : 'rgba(61,122,110,0.3)'}`,
                    borderRadius: 10,
                    padding: '16px 20px',
                  }}>
                    <div style={{ fontFamily: 'DM Mono', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4A3D30', marginBottom: 8 }}>{p.label}</div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontStyle: 'italic', fontWeight: 700, color: p.tone === 'amber' ? 'var(--amber)' : 'var(--verdigris)', marginBottom: 8 }}>{p.accent}</div>
                    <div style={{ fontSize: 13, color: 'var(--cream-dim)', lineHeight: 1.6, marginBottom: 8 }}>{p.desc}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'DM Mono', fontSize: 11, fontWeight: 700, color: p.tone === 'amber' ? 'var(--amber)' : 'var(--verdigris)', background: p.tone === 'amber' ? 'rgba(232,168,78,0.1)' : 'rgba(61,122,110,0.1)', borderRadius: 4, padding: '4px 10px' }}>{p.cut}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3 className="gc-h3">El truco real del 30%</h3>
          <div className="gc-body">
            <p>Sí, Apple se queda con el 30%. Pero si facturás <strong>menos de 1 millón de USD al año</strong>, inscribite en el <strong>App Store Small Business Program</strong> y pasás del 30% al 15%. Se solicita desde App Store Connect.</p>
          </div>

          {/* Toggle widget estático */}
          <div className="gc-toggle-widget">
            <div className="gc-toggle-row">
              <span className="gc-toggle-label">Comisión de Apple</span>
              <span style={{ fontFamily: 'DM Mono', fontSize: 11, color: 'var(--verdigris)' }}>← cambia con Small Business</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#4A3D30', marginBottom: 8 }}>ESTÁNDAR</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontStyle: 'italic', fontWeight: 700, color: 'var(--amber)' }}>30%</div>
              </div>
              <div style={{ background: 'rgba(61,122,110,0.08)', border: '1px solid rgba(61,122,110,0.25)', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'DM Mono', fontSize: 10, color: '#4A3D30', marginBottom: 8 }}>SMALL BUSINESS</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontStyle: 'italic', fontWeight: 700, color: 'var(--verdigris)' }}>15%</div>
              </div>
            </div>
          </div>

          <div className="gc-tip warn">
            <div className="gc-tip-head">— Nota honesta sobre pagos externos (2025-2026)</div>
            <div className="gc-tip-body">
              En EE.UU. y la UE ya se puede enlazar a pagos externos para productos digitales (cambió en 2025). Pero <strong>no es un 0% mágico</strong>: en la UE Apple sigue cobrando comisiones por esa vía. Para el resto del mundo, sigue siendo In-App Purchase. Por eso la regla base sigue siendo 30% / 15%.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* CHECKLIST */}
        <div className="gc-section" id="checklist">
          <div className="gc-section-kicker">Antes de Submit</div>
          <h2 className="gc-h2">El checklist<br /><em>final.</em></h2>
          <div className="gc-body">
            <p>Repasalo en este orden. Marcá cada cosa a medida que la dejás lista.</p>
          </div>
          <div className="gc-checklist-box">
            <div className="gc-checklist-header">
              <span className="gc-checklist-meta">0 / {checklist.length} listos</span>
              <span className="gc-checklist-meta">0%</span>
            </div>
            <div style={{ height: 4, background: 'var(--bg3)', borderRadius: 4, marginBottom: 20, overflow: 'hidden' }}>
              <div style={{ width: '0%', height: '100%', background: 'var(--copper)', borderRadius: 4 }} />
            </div>
            <div className="gc-checklist-ul">
              {checklist.map(item => (
                <div key={item.id} className="gc-checklist-item">
                  <div className="gc-checklist-box-check" />
                  <span className="gc-checklist-text">{item.label}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: '16px 18px', background: 'var(--bg3)', borderRadius: 10, borderLeft: '2px solid var(--copper)' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--cream)', marginBottom: 4 }}>Marcá todo antes de darle a Submit.</div>
              <div style={{ fontSize: 12, color: 'var(--cream-dim)' }}>Si falta uno solo, podés estar bloqueando el paso de la revisión.</div>
            </div>
          </div>
          <div className="gc-tip info">
            <div className="gc-tip-head">— Algo que la mayoría olvida</div>
            <div className="gc-tip-body">
              La revisión de Apple puede tardar entre 24 y 72 horas. Si te rechazan por algo de esta lista, perdés otros 24-72h de vuelta. Son en promedio 3-4 días perdidos por un error de 10 minutos. Vale la pena el checklist.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Tu app aprobada.<br /><em>Ahora a escalarla.</em></h3>
          <p>Dentro de la comunidad: builds reales en directo, soporte post-lanzamiento, y estrategias de crecimiento orgánico en el App Store. Casos de gente que ya tiene sus primeras descargas y primeros pagos.</p>
          <a href="/recursos" className="gc-btn-primary">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
