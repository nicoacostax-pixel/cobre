'use client'

import { useEffect } from 'react'
import FbLead from '@/app/components/FbLead'

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

const steps = [
  {
    num: '01',
    emoji: '📬',
    title: 'Revisa tu correo',
    desc: 'Te acabamos de mandar la primera guía. Si no la ves, revisa la carpeta de spam y márcanos como remitente seguro.',
    action: null,
  },
  {
    num: '02',
    emoji: '💬',
    title: 'Únete al grupo de WhatsApp',
    desc: 'Ahí compartimos recursos, novedades y respondemos dudas en tiempo real. Es gratis y puedes salir cuando quieras.',
    action: { label: 'Unirme al grupo →', href: 'https://chat.whatsapp.com/F55Or9hAnPoF2FfjrcYNnE?mode=gi_t' },
  },
  {
    num: '03',
    emoji: '❤️',
    title: 'Reacciona a los últimos 3 posts de Nico IA',
    desc: 'Ayúdanos a llegar a más personas. Entra a nuestro perfil, dale like a los últimos 3 posts y activa las notificaciones.',
    action: null,
  },
]

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#FDFAE6;color:#1a1a1a;min-height:100vh}
        .gr-wrap{max-width:540px;margin:0 auto;padding:60px 20px}
        .gr-badge{display:inline-block;background:#ede8f8;color:#7C5CBF;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:5px 14px;border-radius:999px;margin-bottom:20px}
        .gr-h1{font-size:2.6rem;font-weight:900;line-height:1.05;letter-spacing:-.02em;margin-bottom:14px}
        .gr-sp{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;color:#7C5CBF}
        .gr-sub{font-size:16px;color:#666;line-height:1.7;margin-bottom:40px}
        .gr-steps{display:flex;flex-direction:column;gap:14px;margin-bottom:40px}
        .gr-step{background:white;border-radius:20px;padding:24px;box-shadow:0 2px 16px rgba(0,0,0,0.05);display:flex;gap:18px;align-items:flex-start}
        .gr-num{font-family:'Playfair Display',serif;font-style:italic;font-size:2rem;font-weight:900;color:#ede8f8;line-height:1;flex-shrink:0;width:40px}
        .gr-icon{font-size:1.6rem;flex-shrink:0;line-height:1;margin-top:2px}
        .gr-step-body h3{font-size:15px;font-weight:800;margin-bottom:6px}
        .gr-step-body p{font-size:13px;color:#777;line-height:1.6}
        .gr-btn{display:inline-flex;align-items:center;gap:8px;margin-top:12px;background:linear-gradient(135deg,#7C5CBF,#574088);color:white;padding:10px 20px;border-radius:10px;font-size:13px;font-weight:700;font-family:'Inter',sans-serif;text-decoration:none;transition:opacity .2s}
        .gr-btn:hover{opacity:.85}
        .gr-back{display:inline-flex;align-items:center;gap:6px;color:#aaa;font-size:13px;text-decoration:none;transition:color .2s}
        .gr-back:hover{color:#7C5CBF}
        @media(min-width:600px){.gr-h1{font-size:3.2rem}}
      `}</style>

      <div className="gr-wrap">
        <span className="gr-badge">¡Ya estás dentro!</span>

        <h1 className="gr-h1">
          Bienvenido a<br /><span className="gr-sp">Nico IA.</span>
        </h1>

        <p className="gr-sub">
          Completa estos 3 pasos para aprovechar todo al máximo desde el primer día.
        </p>

        <div className="gr-steps">
          {steps.map((s) => (
            <div key={s.num} className="gr-step">
              <span className="gr-num">{s.num}</span>
              <div>
                <span className="gr-icon">{s.emoji}</span>
                <div className="gr-step-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  {s.action && (
                    <a className="gr-btn" href={s.action.href} target="_blank" rel="noopener noreferrer">
                      {s.action.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <a className="gr-back" href="/">← Volver al inicio</a>
      </div>
    </>
  )
}
