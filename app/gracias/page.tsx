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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Poppins:wght@700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#FDFAE6;color:#1a1a1a;min-height:100vh;-webkit-font-smoothing:antialiased}

        /* nav */
        .gr-nav{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid rgba(124,92,191,.1);background:#FDFAE6}
        .gr-logo{font-family:'Poppins',sans-serif;font-style:normal;font-weight:900;font-size:18px;color:#574088;text-decoration:none}
        .gr-nav-back{display:flex;align-items:center;gap:6px;font-size:13px;color:#aaa;text-decoration:none;font-weight:500;transition:color .2s}
        .gr-nav-back:hover{color:#7C5CBF}

        /* banner */
        .gr-banner{background:white;border:1px solid #e8e0f8;margin:20px 24px;border-radius:14px;padding:14px 20px;display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#555;line-height:1.5}
        .gr-banner-check{color:#7C5CBF;font-weight:900;font-size:15px;flex-shrink:0;margin-top:1px}
        .gr-banner strong{color:#1a1a1a;font-weight:700}

        /* main */
        .gr-wrap{max-width:580px;margin:0 auto;padding:48px 24px 64px}
        .gr-pill{display:inline-flex;align-items:center;gap:6px;background:white;border:1.5px solid #e8e0f8;border-radius:999px;padding:6px 16px;font-size:11px;font-weight:700;color:#7C5CBF;letter-spacing:.06em;text-transform:uppercase;margin-bottom:16px}
        .gr-dot{width:7px;height:7px;border-radius:50%;background:#7C5CBF;flex-shrink:0}
        .gr-h1{font-size:2.8rem;font-weight:900;line-height:1.05;letter-spacing:-.025em;margin-bottom:10px}
        .gr-sp{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;color:#7C5CBF}
        .gr-sub{font-size:15px;color:#777;line-height:1.75;margin-bottom:40px}

        /* steps */
        .gr-steps{display:flex;flex-direction:column;gap:12px;margin-bottom:40px}
        .gr-step{background:white;border-radius:20px;padding:24px 22px;border:1px solid #f0ecff;display:flex;gap:20px;align-items:flex-start;transition:box-shadow .2s}
        .gr-step:hover{box-shadow:0 6px 24px rgba(124,92,191,.1)}
        .gr-num{font-family:'Playfair Display',serif;font-style:italic;font-size:2.2rem;font-weight:900;color:#ede8f8;line-height:1;flex-shrink:0;width:44px}
        .gr-step-inner{flex:1}
        .gr-step-head{display:flex;align-items:center;gap:10px;margin-bottom:6px}
        .gr-icon{font-size:1.4rem;line-height:1}
        .gr-step-inner h3{font-size:15px;font-weight:800;color:#1a1a1a;line-height:1.3}
        .gr-step-inner p{font-size:13px;color:#888;line-height:1.65;margin-top:4px}
        .gr-btn{display:inline-flex;align-items:center;gap:8px;margin-top:14px;background:linear-gradient(135deg,#7C5CBF,#574088);color:white;padding:12px 22px;border-radius:12px;font-size:13px;font-weight:700;font-family:'Inter',sans-serif;text-decoration:none;transition:opacity .2s,transform .15s;box-shadow:0 4px 16px rgba(124,92,191,.3)}
        .gr-btn:hover{opacity:.9;transform:translateY(-1px)}
        .gr-btn-outline{display:inline-flex;align-items:center;gap:8px;margin-top:14px;background:transparent;color:#7C5CBF;padding:11px 22px;border-radius:12px;font-size:13px;font-weight:700;font-family:'Inter',sans-serif;text-decoration:none;border:1.5px solid #7C5CBF;transition:background .2s,color .2s}
        .gr-btn-outline:hover{background:#7C5CBF;color:white}

        @media(min-width:600px){.gr-h1{font-size:3.4rem}}
      `}</style>

      {/* NAV */}
      <nav className="gr-nav">
        <a className="gr-logo" href="/">Nico IA_</a>
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
