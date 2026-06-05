import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Las 4 cosas para que Apple apruebe tu app — Guía 09 · Nico IA',
  description: 'Construí mi app con Claude en 2 horas y Apple me la rechazó en 10 minutos. El checklist de las 4 cosas (privacidad, iPhone real, Sign in with Apple, pagos) para pasar la revisión.',
}

const toc = [
  { id: 'historia', label: 'Cómo Apple me rechazó en 10 minutos' },
  { id: 'arreglo-1', label: 'Arreglo 01 · Privacy Manifest' },
  { id: 'arreglo-2', label: 'Arreglo 02 · Probar en iPhone real' },
  { id: 'arreglo-3', label: 'Arreglo 03 · Sign in with Apple' },
  { id: 'arreglo-4', label: 'Arreglo 04 · Pagos con StoreKit' },
  { id: 'checklist', label: 'El checklist completo antes de enviar' },
]

const arreglos = [
  {
    id: 'arreglo-1', n: '01', label: 'PRIVACIDAD',
    title: 'Privacy Manifest — el archivo que Apple exige desde 2024',
    severity: 'Rechazo automático',
    desc: 'Desde primavera 2024, Apple exige un archivo PrivacyInfo.xcprivacy en todas las apps. Sin él, el review automático te rechaza antes de que ningún humano vea tu app. Claude Code puede generarlo.',
    prompt: `Genera el archivo PrivacyInfo.xcprivacy para una app de [describe tu app].
La app usa: [lista las APIs que usás: UserDefaults, NSFileManager, etc.]
La app NO recopila datos de usuario para publicidad.
Formato: XML válido de Apple Privacy Manifest.`,
    code: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "...">
<plist version="1.0">
<dict>
  <key>NSPrivacyTracking</key>
  <false/>
  <key>NSPrivacyCollectedDataTypes</key>
  <array/>
  <key>NSPrivacyAccessedAPITypes</key>
  <array>
    <dict>
      <key>NSPrivacyAccessedAPIType</key>
      <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array>
        <string>CA92.1</string>
      </array>
    </dict>
  </array>
</dict>
</plist>`,
    tip: 'Dónde va el archivo: en la raíz de tu target de Xcode (mismo nivel que Info.plist). Si usás frameworks de terceros como Firebase o Amplitude, también necesitan sus propios Privacy Manifests.',
  },
  {
    id: 'arreglo-2', n: '02', label: 'DISPOSITIVO REAL',
    title: 'Probá en iPhone real, no solo en simulador',
    severity: 'Rechazo por crashes',
    desc: 'El simulador miente. Performance, cámara, Face ID, notificaciones push, compras in-app — nada de eso se comporta igual en el simulador. Apple prueba en dispositivos reales y si crashea, te rechazan.',
    checklist: [
      'Corrés la app en un iPhone físico (no simulador) y no crashea al abrirla',
      'La pantalla de onboarding o login carga sin freezes',
      'Si usás Face ID o Touch ID, funciona en el dispositivo real',
      'Las notificaciones push llegan (requiere dispositivo físico)',
      'Las compras in-app se procesan en modo Sandbox',
      'Si la app requiere conexión, el error de "sin internet" aparece bien',
      'El rendimiento es aceptable en un iPhone de 3 años de antigüedad',
    ],
    tip: 'Si no tenés un iPhone propio para probar, TestFlight permite probar en dispositivos de terceros. Pedile a alguien que instale la beta y probá todo el flujo crítico.',
  },
  {
    id: 'arreglo-3', n: '03', label: 'SIGN IN WITH APPLE',
    title: 'Sign in with Apple — obligatorio si ofrecés otro login social',
    severity: 'Rechazo garantizado',
    desc: 'Si tu app ofrece "Sign in with Google", "Sign in with Facebook" o cualquier otro login de terceros, Apple exige que también ofrezcas "Sign in with Apple" como opción. Sin excepciones.',
    code: `import AuthenticationServices

struct SignInWithAppleButton: UIViewRepresentable {
  func makeUIView(context: Context) -> ASAuthorizationAppleIDButton {
    let button = ASAuthorizationAppleIDButton(
      authorizationButtonType: .signIn,
      authorizationButtonStyle: .black
    )
    button.addTarget(
      context.coordinator,
      action: #selector(Coordinator.handleSignIn),
      for: .touchUpInside
    )
    return button
  }
}`,
    tip: 'El botón de Sign in with Apple tiene que ser visible en la primera pantalla donde aparecen los otros métodos de login. No puede estar enterrado en un menú secundario.',
    exceptions: [
      'Apps de negocio o educativas donde se requiere login corporativo específico',
      'Apps que solo usan el sistema de login propio de Apple (no combinado con otros)',
      'Apps que no ofrecen ningún login social de terceros',
    ],
  },
  {
    id: 'arreglo-4', n: '04', label: 'PAGOS',
    title: 'Pagos in-app con StoreKit — no con Stripe directamente',
    severity: 'Rechazo + posible expulsión',
    desc: 'Si tu app vende suscripciones o contenido digital dentro de la app usando un sistema externo (Stripe, PayPal, etc.), Apple lo rechaza y puede expulsarte del programa de desarrolladores. Los pagos físicos y servicios externos son la excepción.',
    checklist: [
      'Suscripciones premium → StoreKit (no Stripe)',
      'Contenido descargable → StoreKit',
      'Moneda virtual, tokens → StoreKit',
      'Servicios físicos (taxi, delivery, reservas) → cualquier pasarela',
      'Cursos/servicios que se consumen fuera de la app → consultar guidelines',
    ],
    code: `import StoreKit

// Consultar productos disponibles
func loadProducts() async {
  do {
    let products = try await Product.products(
      for: ["com.miapp.premium.monthly"]
    )
    // mostrar en la UI
  } catch {
    print("Error cargando productos: \\(error)")
  }
}

// Iniciar compra
func purchase(_ product: Product) async {
  do {
    let result = try await product.purchase()
    switch result {
    case .success(let verification):
      // verificar y desbloquear contenido
    case .userCancelled, .pending:
      break
    }
  } catch { }
}`,
    tip: 'Claude Code puede generar el sistema completo de StoreKit incluyendo verificación de recibos, restauración de compras y manejo de estados. Pedile el boilerplate completo antes de integrar.',
  },
]

const checklistFinal = [
  { category: 'Privacidad', items: ['PrivacyInfo.xcprivacy creado y en el target correcto', 'Todos los frameworks de terceros tienen su Privacy Manifest'] },
  { category: 'Dispositivo real', items: ['App probada en iPhone físico sin crashes', 'Face ID / Touch ID funciona si la app lo usa', 'Notificaciones push probadas en dispositivo real', 'Compras Sandbox funcionan'] },
  { category: 'Login', items: ['Si hay login de Google/Facebook → Sign in with Apple agregado', 'Botón de Apple visible en la pantalla de login principal'] },
  { category: 'Pagos', items: ['Contenido digital usa StoreKit, no Stripe', 'Suscripciones configuradas en App Store Connect', 'Restauración de compras implementada'] },
  { category: 'General', items: ['Metadata de App Store completa (screenshots, descripción)', 'App funciona sin internet (o muestra error claro)', 'Sin APIs privadas ni métodos deprecated'] },
]

export default function ApplePage() {
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

        .gc-arreglo { background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; padding: 26px; margin-bottom: 20px; }
        .gc-arreglo-top { display: flex; align-items: center; gap: 14px; margin-bottom: 8px; }
        .gc-arreglo-n { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: var(--copper); line-height: 1; text-shadow: 0 0 20px var(--copper-glow); flex-shrink: 0; }
        .gc-arreglo-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); margin-bottom: 3px; }
        .gc-arreglo-severity { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(239,68,68,0.8); background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); border-radius: 3px; padding: 2px 8px; display: inline-block; }
        .gc-arreglo-title { font-size: 16px; font-weight: 600; color: var(--cream); line-height: 1.3; margin: 10px 0 14px; }
        .gc-arreglo-desc { font-size: 14px; color: var(--cream-dim); line-height: 1.75; margin-bottom: 16px; }

        .gc-checklist-items { display: flex; flex-direction: column; gap: 8px; margin: 12px 0; }
        .gc-check-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--cream-dim); line-height: 1.55; }
        .gc-check-dot { width: 16px; height: 16px; border-radius: 50%; background: var(--copper-dim); border: 1px solid var(--border-mid); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; font-size: 8px; color: var(--copper); font-weight: 700; font-family: 'DM Mono', monospace; }

        .gc-exceptions { margin: 12px 0; }
        .gc-exception-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #4A3D30; margin-bottom: 8px; }
        .gc-exception { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--cream-dim); line-height: 1.55; padding: 6px 0; border-bottom: 1px solid var(--border); }
        .gc-exception:last-child { border-bottom: none; }
        .gc-exception-dot { font-family: 'DM Mono', monospace; font-size: 10px; color: #4A3D30; flex-shrink: 0; margin-top: 2px; }

        .gc-code { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow-x: auto; margin: 14px 0; }
        .gc-code-header { display: flex; align-items: center; padding: 10px 18px; border-bottom: 1px solid var(--border); }
        .gc-code-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30; }
        .gc-code pre { font-family: 'DM Mono', monospace; font-size: 12.5px; line-height: 1.8; color: var(--cream-dim); white-space: pre-wrap; word-break: break-word; padding: 16px 18px; }

        .gc-tip { background: var(--bg2); border: 1px solid var(--border); border-left: 2px solid var(--copper); border-radius: 10px; padding: 14px 18px; margin: 14px 0; }
        .gc-tip.warn { border-left-color: var(--amber); }
        .gc-tip-head { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--copper); margin-bottom: 7px; }
        .gc-tip.warn .gc-tip-head { color: var(--amber); }
        .gc-tip-body { font-size: 13.5px; color: var(--cream-dim); line-height: 1.7; }

        .gc-checklist-final { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 24px; margin: 36px 0 0; }
        .gc-checklist-final-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #4A3D30; margin-bottom: 20px; }
        .gc-category { margin-bottom: 20px; }
        .gc-category:last-child { margin-bottom: 0; }
        .gc-category-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); margin-bottom: 8px; }

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
          <div className="gc-kicker">Guía · Lanzamiento</div>
          <div className="gc-pill">Tu app aprobada a la primera</div>
          <h1 className="gc-h1">
            Las 4 cosas que tenés que arreglar<br />
            antes de mandar<br />
            tu app a <em>Apple.</em>
          </h1>
          <p className="gc-intro">
            Construí mi app con Claude en 2 horas y Apple me la rechazó en 10 minutos. El checklist de las <strong>4 cosas</strong> (privacidad, iPhone real, Sign in with Apple, pagos) para pasar la revisión a la primera.
          </p>
          <div className="gc-meta-row">
            <span>— 4 arreglos</span>
            <span>— checklist interactivo</span>
            <span>— evitá el rechazo</span>
          </div>
        </div>

        <div className="gc-stats">
          <div className="gc-stat">
            <div className="gc-stat-num">4</div>
            <div className="gc-stat-label">arreglos críticos</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">10m</div>
            <div className="gc-stat-label">tiempo de revisión de Apple</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">1x</div>
            <div className="gc-stat-label">rechazo que querés evitar</div>
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

        <div className="gc-section" id="historia">
          <div className="gc-section-kicker">La historia</div>
          <h2 className="gc-h2">Cómo Apple me rechazó<br /><em>en 10 minutos.</em></h2>
          <div className="gc-body">
            <p>
              Tardé 2 horas en buildear la app con Claude. La subí al App Store Connect con toda la metadata, screenshots, descripción. Envié a revisión. 10 minutos después: rechazada.
            </p>
            <p>
              No es que Claude haga apps malas. Es que la App Store tiene reglas técnicas que Claude no conoce a menos que se las enseñes, y que cambiaron varias veces en los últimos años.
            </p>
            <p>
              Estas 4 cosas son las que agarran la mayoría de apps hechas con IA antes de que un humano las revise.
            </p>
          </div>
        </div>

        <div className="gc-divider" />

        {arreglos.map(a => (
          <div key={a.id} className="gc-section" id={a.id}>
            <div className="gc-section-kicker">{a.label}</div>
            <h2 className="gc-h2"><em>Arreglo {a.n}</em></h2>

            <div className="gc-arreglo">
              <div className="gc-arreglo-top">
                <span className="gc-arreglo-n">{a.n}</span>
                <div>
                  <div className="gc-arreglo-label">{a.label}</div>
                  <span className="gc-arreglo-severity">{a.severity}</span>
                </div>
              </div>
              <div className="gc-arreglo-title">{a.title}</div>
              <div className="gc-arreglo-desc">{a.desc}</div>

              {a.prompt && (
                <div className="gc-code">
                  <div className="gc-code-header">
                    <span className="gc-code-title">prompt para Claude Code</span>
                  </div>
                  <pre>{a.prompt}</pre>
                </div>
              )}

              {a.code && (
                <div className="gc-code">
                  <div className="gc-code-header">
                    <span className="gc-code-title">{a.n === '01' ? 'PrivacyInfo.xcprivacy' : a.n === '03' ? 'Swift · Sign in with Apple' : 'Swift · StoreKit 2'}</span>
                  </div>
                  <pre>{a.code}</pre>
                </div>
              )}

              {a.checklist && (
                <div className="gc-checklist-items">
                  {a.checklist.map(item => (
                    <div key={item} className="gc-check-item">
                      <span className="gc-check-dot">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {a.exceptions && (
                <div className="gc-exceptions" style={{ marginTop: 14 }}>
                  <div className="gc-exception-label">Excepciones · cuándo no es obligatorio</div>
                  {a.exceptions.map(e => (
                    <div key={e} className="gc-exception">
                      <span className="gc-exception-dot">—</span>
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
              )}

              {a.tip && (
                <div className="gc-tip" style={{ marginTop: 14 }}>
                  <div className="gc-tip-head">— Nota importante</div>
                  <div className="gc-tip-body">{a.tip}</div>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="gc-divider" />

        <div className="gc-section" id="checklist">
          <div className="gc-section-kicker">Checklist final</div>
          <h2 className="gc-h2">Antes de enviar<br /><em>a revisión.</em></h2>
          <div className="gc-body">
            <p>Todos los ítems marcados antes de hacer click en "Submit for Review".</p>
          </div>
          <div className="gc-checklist-final">
            <div className="gc-checklist-final-label">Checklist completo antes de enviar a Apple</div>
            {checklistFinal.map(cat => (
              <div key={cat.category} className="gc-category">
                <div className="gc-category-label">{cat.category}</div>
                <div className="gc-checklist-items">
                  {cat.items.map(item => (
                    <div key={item} className="gc-check-item">
                      <span className="gc-check-dot">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>App aprobada.<br /><em>Ahora el CRM.</em></h3>
          <p>
            La siguiente guía: cómo montar tu CRM con bot calificador.<br />
            Las 4 piezas, sin equipo, desde $8 al mes.
          </p>
          <a href="/recursos/crm" className="gc-btn-primary">Guía 10 · CRM con bot →</a>
        </div>

      </div>
    </>
  )
}
