'use client'

import { useEffect } from 'react'
import FbLead from '@/app/components/FbLead'

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

export default function GraciasPage() {
  useEffect(() => {
    const fire = () => window.fbq?.('track', 'Lead')
    if (window.fbq) {
      fire()
    } else {
      const t = setInterval(() => { if (window.fbq) { fire(); clearInterval(t) } }, 50)
      return () => clearInterval(t)
    }
  }, [])

  return (
    <>
      <FbLead />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#050505;color:#e0e0e0;min-height:100vh;-webkit-font-smoothing:antialiased}
        body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,42,109,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,42,109,.03) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0}
        :root{--pink:#ff2a6d;--pink-dim:rgba(255,42,109,.15);--pink-glow:rgba(255,42,109,.35);--surface:#0f0f0f;--surface2:#161616;--border:rgba(255,255,255,.06);--border-pink:rgba(255,42,109,.25)}

        /* nav */
        .gr-nav{position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border);background:rgba(5,5,5,.92);backdrop-filter:blur(12px)}
        .gr-logo{font-family:'Poppins',sans-serif;font-style:normal;font-weight:900;font-size:18px;color:#fff;text-decoration:none}
        .gr-logo span{color:var(--pink)}
        .gr-nav-back{display:flex;align-items:center;gap:6px;font-size:13px;color:#666;text-decoration:none;font-weight:500;transition:color .2s}
        .gr-nav-back:hover{color:var(--pink)}

        /* banner */
        .gr-banner{position:relative;z-index:1;background:var(--surface);border:1px solid var(--border-pink);margin:20px 24px;border-radius:14px;padding:14px 20px;display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#888;line-height:1.5}
        .gr-banner-check{color:var(--pink);font-weight:900;font-size:15px;flex-shrink:0;margin-top:1px}
        .gr-banner strong{color:#fff;font-weight:700}

        /* main */
        .gr-wrap{position:relative;z-index:1;max-width:580px;margin:0 auto;padding:48px 24px 64px}
        .gr-pill{display:inline-flex;align-items:center;gap:6px;background:var(--pink-dim);border:1px solid var(--border-pink);border-radius:999px;padding:6px 16px;font-size:11px;font-weight:700;color:var(--pink);letter-spacing:.06em;text-transform:uppercase;margin-bottom:16px}
        .gr-dot{width:7px;height:7px;border-radius:50%;background:var(--pink);flex-shrink:0}
        .gr-h1{font-family:'Poppins',sans-serif;font-size:2.8rem;font-weight:900;line-height:1.05;letter-spacing:-.025em;margin-bottom:10px;color:#fff}
        .gr-sp{color:var(--pink)}
        .gr-sub{font-size:15px;color:#ccc;line-height:1.75;margin-bottom:40px}

        /* steps */
        .gr-steps{display:flex;flex-direction:column;gap:12px;margin-bottom:40px}
        .gr-step{background:var(--surface);border-radius:20px;padding:24px 22px;border:1px solid var(--border);display:flex;gap:20px;align-items:flex-start;transition:border-color .2s,box-shadow .2s}
        .gr-step:hover{border-color:var(--border-pink);box-shadow:0 0 24px rgba(255,42,109,.06)}
        .gr-num{font-family:'Poppins',sans-serif;font-size:2.2rem;font-weight:900;color:var(--pink);text-shadow:0 0 20px var(--pink-glow);line-height:1;flex-shrink:0;width:44px}
        .gr-step-inner{flex:1}
        .gr-step-head{display:flex;align-items:center;gap:10px;margin-bottom:6px}
        .gr-icon{font-size:1.4rem;line-height:1}
        .gr-step-inner h3{font-size:15px;font-weight:800;color:#fff;line-height:1.3}
        .gr-step-inner p{font-size:13px;color:#ccc;line-height:1.65;margin-top:4px}
        .gr-btn{display:inline-flex;align-items:center;gap:8px;margin-top:14px;background:var(--pink);color:white;padding:12px 22px;border-radius:12px;font-size:13px;font-weight:700;font-family:'Inter',sans-serif;text-decoration:none;transition:opacity .2s,transform .15s,box-shadow .2s;box-shadow:0 0 20px var(--pink-glow)}
        .gr-btn:hover{opacity:.9;transform:translateY(-1px);box-shadow:0 0 32px var(--pink-glow)}
        .gr-btn-outline{display:inline-flex;align-items:center;gap:8px;margin-top:14px;background:transparent;color:var(--pink);padding:11px 22px;border-radius:12px;font-size:13px;font-weight:700;font-family:'Inter',sans-serif;text-decoration:none;border:1.5px solid var(--border-pink);transition:background .2s,color .2s}
        .gr-btn-outline:hover{background:var(--pink);color:white}

        @media(min-width:600px){.gr-h1{font-size:3.4rem}}
      `}</style>

      {/* NAV */}
      <nav className="gr-nav">
        <a className="gr-logo" href="/">Nico <span>IA_</span></a>
        <a className="gr-nav-back" href="/recursos">Recursos →</a>
      </nav>

      {/* BANNER */}
      <div className="gr-banner">
        <span className="gr-banner-check">✓</span>
        <span><strong>Estás dentro.</strong> Te acabamos de mandar un correo con todo. Mientras llega, las guías están aquí.</span>
      </div>

      {/* MAIN */}
      <div className="gr-wrap">
        <span className="gr-pill"><span className="gr-dot" />bienvenido</span>
        <h1 className="gr-h1">
          Hola, esto es<br /><span className="gr-sp">Nico IA.</span>
        </h1>
        <p className="gr-sub">
          Tres pasos para aprovechar todo al máximo desde el primer día.
        </p>

        <div className="gr-steps">
          {/* Step 1 */}
          <div className="gr-step">
            <span className="gr-num">01</span>
            <div className="gr-step-inner">
              <div className="gr-step-head">
                <span className="gr-icon">📬</span>
                <h3>Revisa tu correo</h3>
              </div>
              <p>Te acabamos de mandar la primera guía. Si no la ves, revisa la carpeta de spam y márcanos como remitente seguro.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="gr-step">
            <span className="gr-num">02</span>
            <div className="gr-step-inner">
              <div className="gr-step-head">
                <span className="gr-icon">💬</span>
                <h3>Únete al grupo de WhatsApp</h3>
              </div>
              <p>Ahí compartimos recursos, novedades y respondemos dudas en tiempo real. Es gratis y puedes salir cuando quieras.</p>
              <a className="gr-btn" href="https://chat.whatsapp.com/F55Or9hAnPoF2FfjrcYNnE?mode=gi_t" target="_blank" rel="noopener noreferrer">
                Unirme al grupo →
              </a>
            </div>
          </div>

          {/* Step 3 */}
          <div className="gr-step">
            <span className="gr-num">03</span>
            <div className="gr-step-inner">
              <div className="gr-step-head">
                <span className="gr-icon">📚</span>
                <h3>Accede a las guías</h3>
              </div>
              <p>Tienes acceso inmediato a todas las guías gratuitas. Empieza por la primera y avanza a tu ritmo.</p>
              <a className="gr-btn" href="/recursos">
                Ver las guías →
              </a>
            </div>
          </div>
        </div>

        <a className="gr-nav-back" href="/">← Volver al inicio</a>
      </div>
    </>
  )
}
