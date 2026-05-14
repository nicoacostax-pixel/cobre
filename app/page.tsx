'use client'

import { useState, useEffect, useRef } from 'react'

function ParallaxBlobs() {
  const b1 = useRef<HTMLDivElement>(null)
  const b2 = useRef<HTMLDivElement>(null)
  const b3 = useRef<HTMLDivElement>(null)
  const b4 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (b1.current) b1.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`
        if (b2.current) b2.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`
        if (b3.current) b3.current.style.transform = `translate3d(0, ${y * 0.25}px, 0)`
        if (b4.current) b4.current.style.transform = `translate3d(0, ${y * -0.08}px, 0)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const blob: React.CSSProperties = {
    position: 'fixed', borderRadius: '50%', pointerEvents: 'none',
    filter: 'blur(80px)', willChange: 'transform', zIndex: 0,
  }

  return (
    <>
      <div ref={b1} style={{ ...blob, width: 600, height: 600, top: -100, right: -150, background: 'radial-gradient(circle, rgba(124,92,191,0.13) 0%, transparent 70%)' }} />
      <div ref={b2} style={{ ...blob, width: 500, height: 500, top: 400, left: -150, background: 'radial-gradient(circle, rgba(124,92,191,0.09) 0%, transparent 70%)' }} />
      <div ref={b3} style={{ ...blob, width: 400, height: 400, top: 900, right: -80, background: 'radial-gradient(circle, rgba(200,180,255,0.12) 0%, transparent 70%)' }} />
      <div ref={b4} style={{ ...blob, width: 450, height: 450, top: 1500, left: -100, background: 'radial-gradient(circle, rgba(124,92,191,0.08) 0%, transparent 70%)' }} />
    </>
  )
}

const faqs = [
  { q: '¿Qué son las guías gratis?', a: 'Tutoriales paso a paso para usar IA en tu día a día y en tu negocio. Te llegan por correo, son 100% gratis y están en español. Subimos guías nuevas cada mes.' },
  { q: '¿Y la comunidad? ¿Qué incluye?', a: 'La comunidad es donde te llevamos más allá de las guías: tutoriales nuevos cada semana, plantillas listas para copiar, skills personalizadas, automatizaciones reales (clientes, ventas, contenido), y soporte directo.' },
  { q: '¿Necesito experiencia previa con IA o tecnología?', a: 'No. Todo está pensado para empezar desde cero. Si sabes usar WhatsApp, puedes hacer esto.' },
  { q: '¿Es solo para principiantes?', a: 'No. Cubrimos desde lo básico (Claude, ChatGPT, prompts) hasta cosas avanzadas como agentes de IA, automatizaciones de negocio e integraciones por API. Avanzas a tu ritmo.' },
  { q: '¿Está todo en español?', a: 'Sí. Tutoriales, llamadas y comunidad. Todo 100% en español, sin traducciones automáticas raras.' },
  { q: '¿Qué incluye la comunidad?', a: 'Acceso a tutoriales semanales, plantillas de prompts, retos prácticos, y una comunidad activa donde puedes preguntar y recibir feedback.' },
  { q: '¿Para quién es esto?', a: 'Para cualquier persona que quiera usar IA en su día a día: emprendedores, creadores, profesionales o simplemente curiosos.' },
  { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. Cancelas en un clic, sin preguntas.' },
]

const features = [
  { icon: '🧠', bg: 'linear-gradient(135deg,#fce8ef,#fdd6e6)', pro: false, title: 'Domina Claude, ChatGPT y todo el ecosistema', desc: 'No te quedas con un solo modelo. Aprendes a elegir y combinar las mejores herramientas para cada caso.' },
  { icon: '🪄', bg: 'linear-gradient(135deg,#fff8e1,#ffefc0)', pro: false, title: 'Prompts profesionales con sistema de instrucciones', desc: 'Deja los prompts de TikTok. Aprendes a escribir instrucciones que producen resultados de calidad real.' },
  { icon: '🎬', bg: 'linear-gradient(135deg,#e8f0fe,#d0e2ff)', pro: false, title: 'Crea contenido 10× más rápido', desc: 'Ideas, guiones, posts, miniaturas, voces. Plantillas reales para creadores y emprendedores.' },
  { icon: '🤖', bg: 'linear-gradient(135deg,#ede8f8,#ddd4f8)', pro: true,  title: 'Automatiza tu negocio con agentes de IA', desc: 'Agentes que responden correos, califican leads, agendan reuniones y hacen el trabajo por ti. Sin código.' },
  { icon: '🏢', bg: 'linear-gradient(135deg,#e8edf8,#d4ddf8)', pro: true,  title: 'Construye tu "IA empleada" para tu equipo', desc: 'Un asistente entrenado con tus documentos, tu marca y tus procesos. Tu propia IA, dentro de tu negocio.' },
  { icon: '💸', bg: 'linear-gradient(135deg,#e8f8ef,#c8f0da)', pro: false, title: 'Vende servicios y productos con IA', desc: 'Modelos de negocio que están funcionando hoy en LATAM y España. Pasa de aprender a facturar.' },
]

const testimonials = [
  { color: '#fce8ef', text: 'Llevaba meses queriendo entender la IA y nada me hacía clic. Con Nico en una semana ya estaba automatizando mi correo y ahorrándome horas.', name: 'Vanessa R.', role: 'Coach · Barcelona', initial: 'V' },
  { color: '#ede8f8', text: 'Pasé de cero a tener mis propios prompts y plantillas para mi negocio. Lo mejor: todo en español y sin rollo técnico.', name: 'Gonzalo M.', role: 'Emprendedor · Monterrey', initial: 'G' },
  { color: '#fde8d8', text: 'La comunidad es oro. Aprendes con gente real, con casos reales, no con teoría. Vale cada centavo.', name: 'Pamela P.', role: 'Freelancer · Medellín', initial: 'P' },
]

const guideCards = [
  { num: '01', level: 'Fundamentos', title: 'Tu primer\nprompt',     bg: 'linear-gradient(145deg,#a898d8,#7a68c0)', light: true  },
  { num: '02', level: 'Intermedio',  title: 'Agentes en\nespañol',   bg: 'linear-gradient(145deg,#cfc0f0,#b0a0e0)', light: false },
  { num: '03', level: 'Avanzado',    title: 'Automatiza\ntu negocio', bg: 'linear-gradient(145deg,#f5f0e0,#e8e0c8)', light: false },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

function LeadForm({ dark = false }: { dark?: boolean }) {
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr]     = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    setLoading(true)
    const res = await fetch('/api/ai-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone: '', answers: [] }),
    })
    if (res.ok) {
      window.location.href = '/gracias'
    } else {
      setLoading(false)
      setErr('Hubo un error. Intenta de nuevo.')
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    border: '1.5px solid #e5e5e5', borderRadius: 12,
    fontSize: 15, fontFamily: 'Inter,sans-serif',
    outline: 'none', background: dark ? '#f7f5ff' : '#fafafa', color: '#1a1a1a',
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="lp-form-row">
        <input style={inp} type="text"  placeholder="Tu nombre"    value={name}  onChange={e => setName(e.target.value)}  required />
        <input style={inp} type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <button type="submit" disabled={loading} className="lp-btn-submit">
        {loading ? 'Enviando…' : 'Quiero mis guías gratis →'}
      </button>
      {err && <p style={{ color: 'red', fontSize: 13, marginTop: 8 }}>{err}</p>}
      <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', marginTop: 10 }}>Sin spam · Sales cuando quieras</p>
    </form>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Poppins:wght@700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'Inter',sans-serif!important;background:#FDFAE6!important;color:#1a1a1a;line-height:1.6;-webkit-font-smoothing:antialiased}

        .lp-sp{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;color:#7C5CBF}
        .lp-sd{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;color:#574088}
        .lp-wrap{max-width:600px;margin:0 auto;padding:0 24px}
        .lp-pill{display:inline-flex;align-items:center;gap:6px;background:white;border:1.5px solid #e8e0f8;border-radius:999px;padding:6px 16px;font-size:11px;font-weight:700;color:#7C5CBF;letter-spacing:.06em;text-transform:uppercase}
        .lp-h2{font-size:2.4rem;font-weight:900;line-height:1.05;letter-spacing:-.025em;margin:14px 0 16px}
        .lp-sub{font-size:15px;color:#777;line-height:1.8;margin-bottom:32px}
        .lp-btn-submit{width:100%;margin-top:12px;padding:16px;background:linear-gradient(135deg,#7C5CBF,#574088);color:white;border:none;border-radius:14px;font-size:15px;font-weight:700;font-family:'Inter',sans-serif;cursor:pointer;letter-spacing:.01em;transition:opacity .2s,transform .15s,box-shadow .2s;box-shadow:0 4px 20px rgba(124,92,191,.35)}
        .lp-btn-submit:hover{opacity:.93;transform:translateY(-2px);box-shadow:0 8px 28px rgba(124,92,191,.4)}
        .lp-btn-submit:active{transform:translateY(0)}
        .lp-btn-submit:disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:none}
        .lp-form-row{display:flex;flex-direction:column;gap:10px}

        /* floating deco */
        .lp-deco{position:absolute;background:white;border-radius:999px;padding:8px 16px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:6px;box-shadow:0 6px 24px rgba(0,0,0,.1);white-space:nowrap;animation:float 4s ease-in-out infinite}
        .lp-deco-sq{position:absolute;background:white;width:44px;height:44px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 6px 24px rgba(0,0,0,.1);animation:float 4s ease-in-out infinite}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

        /* ── HERO ── */
        .lp-hero{background:transparent;padding:52px 20px 64px;position:relative;overflow:hidden;text-align:center;z-index:1}
        .lp-hero::before{content:'';position:absolute;top:-160px;right:-160px;width:600px;height:600px;background:radial-gradient(circle,rgba(124,92,191,.1) 0%,transparent 65%);pointer-events:none}
        .lp-hero::after{content:'';position:absolute;bottom:-100px;left:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(124,92,191,.07) 0%,transparent 65%);pointer-events:none}
        .lp-notif{display:inline-flex;align-items:center;gap:8px;background:white;border:1.5px solid #e8e0f8;border-radius:999px;padding:8px 20px;font-size:13px;color:#555;margin-bottom:28px;box-shadow:0 2px 16px rgba(124,92,191,.1);animation:fadeUp .7s ease both}
        .lp-dot{width:7px;height:7px;border-radius:50%;background:#7C5CBF;flex-shrink:0;animation:pulse 2s ease-in-out infinite}
        .lp-h1{font-size:2.9rem;font-weight:900;line-height:1.05;letter-spacing:-.025em;margin-bottom:16px;animation:fadeUp .7s .1s ease both}
        .lp-hero-sub{font-size:16px;color:#777;line-height:1.7;max-width:460px;margin:0 auto 40px;animation:fadeUp .7s .2s ease both}
        .lp-hero-card{background:white;border-radius:28px;box-shadow:0 8px 48px rgba(0,0,0,.08);border:1px solid #f0ecff;max-width:840px;margin:0 auto;overflow:hidden;animation:fadeUp .7s .3s ease both}
        .lp-hero-grid{display:flex;flex-direction:column}
        .lp-cards-col{display:none;padding:32px 32px 32px 36px;background:linear-gradient(145deg,#f5f0ff,#ede8f8)}
        .lp-form-side{padding:32px}
        .lp-form-badge{display:inline-block;background:#ede8f8;color:#7C5CBF;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 12px;border-radius:999px;margin-bottom:12px}
        .lp-form-title{font-size:1.5rem;font-weight:800;line-height:1.2;margin-bottom:16px}
        .lp-cl{list-style:none;margin:0 0 20px}
        .lp-cl li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#555;margin-bottom:8px;line-height:1.5}
        .lp-ck{width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#7C5CBF,#574088);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-size:10px;color:white;font-weight:700}
        .lp-trust{display:flex;justify-content:center;gap:10px;font-size:12px;color:#aaa;margin-top:14px;flex-wrap:wrap}

        /* guide card stack */
        .lp-stack{position:relative;height:340px;width:340px;margin:0 auto}
        .lp-gc{position:absolute;width:165px;border-radius:20px;padding:18px 14px;box-shadow:0 12px 40px rgba(0,0,0,.18);display:flex;flex-direction:column;justify-content:space-between}
        .lp-gc:nth-child(1){height:230px;top:60px;left:0;transform:rotate(-10deg);z-index:1}
        .lp-gc:nth-child(2){height:250px;top:30px;left:88px;transform:rotate(-2deg);z-index:2}
        .lp-gc:nth-child(3){height:240px;top:16px;left:172px;transform:rotate(7deg);z-index:3}
        .lp-gc-brand{font-family:'Playfair Display',serif;font-style:italic;font-size:12px;font-weight:700}
        .lp-gc-num{font-size:10px;font-weight:600;opacity:.6}
        .lp-gc-lvl{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.65;margin-bottom:6px}
        .lp-gc-title{font-family:'Playfair Display',serif;font-style:italic;font-size:1.1rem;font-weight:700;line-height:1.2;white-space:pre-line}
        .lp-gc-bot{display:flex;align-items:center;justify-content:space-between}
        .lp-gc-tag{background:white;border-radius:999px;padding:4px 10px;font-size:10px;font-weight:700;display:flex;align-items:center;gap:4px;color:#574088}
        .lp-gc-date{font-size:9px;font-weight:600;opacity:.5;letter-spacing:.04em}

        /* ── STATS ── */
        .lp-stats{padding:28px 20px;background:white;border-top:1px solid #f0ecff;border-bottom:1px solid #f0ecff;position:relative;z-index:1}
        .lp-stats-grid{display:flex;flex-direction:column;gap:10px;max-width:840px;margin:0 auto}
        .lp-stat-card{background:linear-gradient(135deg,#7C5CBF,#574088);border-radius:20px;padding:28px 20px;text-align:center;flex:1}
        .lp-stat-n{font-family:'Poppins',sans-serif;font-size:2.6rem;font-weight:900;color:#FDFAE6;line-height:1}
        .lp-stat-l{font-size:13px;color:rgba(253,250,230,.65);margin-top:6px;font-weight:500}

        /* ── ABOUT ── */
        .lp-about{padding:88px 36px;background:transparent;position:relative;overflow:hidden;z-index:1}
        .lp-about::before{content:'';position:absolute;top:-80px;left:-80px;width:360px;height:360px;background:radial-gradient(circle,rgba(124,92,191,.07) 0%,transparent 70%);pointer-events:none}
        .lp-about-grid{display:flex;flex-direction:column;gap:48px;align-items:center;max-width:1100px;margin:0 auto}
        .lp-photo-wrap{position:relative;width:100%;max-width:340px}
        .lp-photo-wrap img{width:100%;height:auto;display:block;object-fit:contain;filter:drop-shadow(0 16px 48px rgba(124,92,191,.28))}
        .lp-about-text .lp-h2{margin-top:16px}
        .lp-about-text p{font-size:15px;color:#555;line-height:1.9}
        .lp-about-text p+p{margin-top:16px}

        /* ── FEATURES ── */
        .lp-feats-sec{padding:88px 20px;background:#FDFAE6;position:relative;z-index:1}
        .lp-feats-grid{}
        .lp-feat{background:white;border-radius:20px;padding:24px;margin-bottom:10px;position:relative;border:1px solid #f0ecff;transition:box-shadow .25s,transform .25s}
        .lp-feat:hover{box-shadow:0 10px 36px rgba(124,92,191,.13);transform:translateY(-3px)}
        .lp-fi{width:48px;height:48px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:14px}
        .lp-fpro{position:absolute;top:20px;right:20px;border:1.5px solid #7C5CBF;color:#7C5CBF;font-size:10px;font-weight:700;letter-spacing:.06em;padding:3px 9px;border-radius:999px}
        .lp-feat h3{font-size:15px;font-weight:800;margin-bottom:6px;line-height:1.3}
        .lp-feat p{font-size:13px;color:#888;line-height:1.65}

        /* ── TESTIMONIALS ── */
        .lp-test-sec{padding:88px 20px;background:transparent;position:relative;z-index:1}
        .lp-test{border-radius:24px;padding:26px;margin-bottom:10px;border:1px solid rgba(0,0,0,.04)}
        .lp-test-head{display:flex;align-items:center;gap:12px;margin-bottom:14px}
        .lp-test-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:#7C5CBF;background:white;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.08)}
        .lp-test-name{font-size:14px;font-weight:700}
        .lp-test-role{font-size:12px;color:#999}
        .lp-test-stars{color:#f5a623;font-size:13px;letter-spacing:1px;margin-bottom:10px}
        .lp-test-q{font-size:28px;font-weight:900;color:#7C5CBF;line-height:1;margin-bottom:6px;font-family:'Playfair Display',serif}
        .lp-test-txt{font-size:14px;color:#444;line-height:1.7}

        /* ── FAQ ── */
        .lp-faq-sec{padding:88px 20px;background:#FDFAE6;position:relative;z-index:1}
        .lp-faq{background:white;border-radius:16px;margin-bottom:8px;overflow:hidden;border:1px solid #f0ecff}
        .lp-faq-btn{width:100%;background:none;border:none;padding:18px 22px;font-size:14px;font-weight:600;font-family:'Inter',sans-serif;color:#1a1a1a;text-align:left;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;line-height:1.4}
        .lp-faq-icon{width:24px;height:24px;border-radius:50%;background:white;border:1.5px solid #e8e0f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:15px;color:#7C5CBF;transition:transform .25s,background .2s,border-color .2s;font-weight:700}
        .lp-faq-icon.open{transform:rotate(45deg);background:#7C5CBF;color:white;border-color:#7C5CBF}
        .lp-faq-ans{font-size:14px;color:#666;line-height:1.75;padding:0 22px 18px}

        /* ── CTA ── */
        .lp-cta{background:linear-gradient(145deg,#7C5CBF 0%,#574088 100%);padding:88px 20px;text-align:center;position:relative;overflow:hidden;z-index:1}
        .lp-cta::before{content:'';position:absolute;top:-120px;right:-120px;width:500px;height:500px;background:radial-gradient(circle,rgba(255,255,255,.08) 0%,transparent 65%);pointer-events:none}
        .lp-cta::after{content:'';position:absolute;bottom:-80px;left:-80px;width:340px;height:340px;background:radial-gradient(circle,rgba(255,255,255,.05) 0%,transparent 65%);pointer-events:none}
        .lp-cta h2{font-size:2.6rem;font-weight:900;line-height:1.1;color:white;margin-bottom:12px}
        .lp-cta-sub{color:rgba(255,255,255,.6);font-size:15px;margin-bottom:36px;line-height:1.75;max-width:420px;margin-left:auto;margin-right:auto}
        .lp-cta-card{background:white;border-radius:24px;padding:28px;text-align:left;max-width:520px;margin:0 auto;box-shadow:0 24px 64px rgba(0,0,0,.2)}

        /* ── FOOTER ── */
        .lp-foot{background:#FDFAE6;border-top:1px solid #eee;padding:40px 24px;text-align:center;position:relative;z-index:1}
        .lp-foot-brand{font-weight:900;font-size:20px;color:#574088;margin-bottom:6px;font-family:'Playfair Display',serif;font-style:italic}
        .lp-foot p{font-size:13px;color:#bbb;margin-top:4px}
        .lp-foot a{color:#7C5CBF;text-decoration:none}

        /* ── DESKTOP ── */
        @media(min-width:900px){
          body{background:linear-gradient(160deg,#fff 0%,#f4efff 50%,#ffe8f4 100%)!important}

          .lp-h1{font-size:3.8rem}
          .lp-hero{padding:72px 24px 80px}
          .lp-hero-grid{display:grid;grid-template-columns:1fr 1fr;align-items:center}
          .lp-cards-col{display:flex;align-items:center;justify-content:center}
          .lp-form-side{padding:36px 36px 36px 32px}
          .lp-form-row{flex-direction:row}

          .lp-stats-grid{flex-direction:row;gap:12px}
          .lp-stat-n{font-size:3.2rem}

          .lp-about-grid{flex-direction:row;gap:80px}
          .lp-photo-wrap{max-width:420px;flex-shrink:0}
          .lp-h2{font-size:3rem}

          .lp-feats-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
          .lp-feats-grid .lp-feat{margin-bottom:0}

          .lp-t-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
          .lp-t-grid .lp-test{margin-bottom:0}

          .lp-faq-cols{columns:2;gap:8px}
          .lp-faq-cols .lp-faq{break-inside:avoid;margin-bottom:8px}

          .lp-cta h2{font-size:3.4rem}
          .lp-wrap{max-width:720px}
        }
      `}</style>

      <ParallaxBlobs />

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-notif">
          <span className="lp-dot" />
          +500 personas aprendiendo · IA en español
        </div>
        <h1 className="lp-h1">
          Aprende <span className="lp-sp">IA</span> en español,<br />
          sin <span className="lp-sd">tecnicismos.</span>
        </h1>
        <p className="lp-hero-sub">
          Recibe gratis las guías de Nico para usar IA en tu día a día. Y entra a la comunidad donde te llevamos mucho más allá.
        </p>

        <div className="lp-hero-card">
          <div className="lp-hero-grid">
            <div className="lp-cards-col">
              <div className="lp-stack">
                {guideCards.map((c, i) => (
                  <div key={i} className="lp-gc" style={{ background: c.bg }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <span className="lp-gc-brand" style={{ color: c.light ? 'rgba(255,255,255,.9)' : '#574088' }}>Nico IA_</span>
                        <span className="lp-gc-num"   style={{ color: c.light ? 'rgba(255,255,255,.6)' : '#574088' }}>Nº {c.num}</span>
                      </div>
                      <div className="lp-gc-lvl"   style={{ color: c.light ? 'rgba(255,255,255,.7)' : '#574088' }}>{c.level}</div>
                      <div className="lp-gc-title" style={{ color: c.light ? '#fff' : '#2a1a4a' }}>{c.title}</div>
                    </div>
                    <div className="lp-gc-bot">
                      <div className="lp-gc-tag">● GRATIS</div>
                      <span className="lp-gc-date" style={{ color: c.light ? 'white' : '#574088' }}>GUÍA · 2026</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lp-form-side">
              <span className="lp-form-badge">GRATIS · GUÍAS</span>
              <h2 className="lp-form-title">
                Recibe las guías <span className="lp-sp">por correo</span>
              </h2>
              <ul className="lp-cl">
                {['Tutoriales paso a paso para usar IA hoy','Plantillas y casos reales para tu negocio','Guías nuevas cada mes, en español','Acceso a la comunidad incluido'].map(item => (
                  <li key={item}><span className="lp-ck">✓</span>{item}</li>
                ))}
              </ul>
              <LeadForm />
              <div className="lp-trust">
                <span>Acceso inmediato</span><span>·</span><span>100% gratis</span><span>·</span><span>En español</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="lp-stats">
        <div className="lp-stats-grid">
          {[
            { n: '+100K', l: 'seguidores en todas las cuentas' },
            { n: '+1.500', l: 'personas ya aprendieron' },
            { n: '+97', l: 'negocios usando IA hoy' },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 100} className="lp-stat-card">
              <div className="lp-stat-n">{s.n}</div>
              <div className="lp-stat-l">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="lp-about">
        <div className="lp-about-grid">
          <Reveal className="lp-photo-wrap">
            <div style={{ position: 'relative' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/PerfilNicoMayo.png" alt="Nico" />
              <div className="lp-deco" style={{ top: 16, left: 8, animationDelay: '0s' }}>+100K 👀</div>
              <div className="lp-deco-sq" style={{ bottom: 40, right: 8, animationDelay: '1.2s', animationName: 'floatB' }}>✨</div>
              <div className="lp-deco" style={{ bottom: 0, left: 8, animationDelay: '.6s' }}>en español 🇪🇸</div>
            </div>
          </Reveal>

          <Reveal delay={150} className="lp-about-text">
            <span className="lp-pill">sobre mí</span>
            <h2 className="lp-h2">Hola, soy <span className="lp-sp">Nico</span>.</h2>
            <p>Hace unos meses no sabía nada de Inteligencia Artificial. Hoy enseño a miles de personas en español a usarla todos los días en su trabajo, su negocio y su vida.</p>
            <p>En solo <strong style={{ color: '#1a1a1a' }}>2 años</strong> pasamos de 0 a más de 100.000 personas aprendiendo IA en español. Esto no es por mí. Es porque la IA está cambiando todo, y tú necesitas estar al frente.</p>
            <p>Si quieres aprender de verdad, sin humo y sin tecnicismos, este es tu lugar.</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              {['Claude & ChatGPT','Agentes sin código','Automatizaciones','Para LATAM y España'].map(tag => (
                <span key={tag} style={{ background: '#ede8f8', color: '#574088', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 600 }}>{tag}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="lp-feats-sec">
        <div className="lp-wrap">
          <Reveal>
            <span className="lp-pill">lo que vas a aprender</span>
            <h2 className="lp-h2">De <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic' }}>prompts</em> a tu <span className="lp-sp">IA empleada</span>.</h2>
            <p className="lp-sub">Empezamos por lo fundamental y subimos hasta agentes, automatizaciones e integraciones avanzadas. Tú avanzas a tu ritmo.</p>
          </Reveal>
          <div className="lp-feats-grid">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="lp-feat">
                  {f.pro && <span className="lp-fpro">PRO</span>}
                  <div className="lp-fi" style={{ background: f.bg }}>{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lp-test-sec">
        <div className="lp-wrap">
          <Reveal>
            <span className="lp-pill">la comunidad</span>
            <h2 className="lp-h2">Gente real, <span className="lp-sp">resultados reales</span>.</h2>
          </Reveal>
          <div className="lp-t-grid" style={{ marginTop: 28 }}>
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="lp-test" style={{ background: t.color }}>
                  <div className="lp-test-head">
                    <div className="lp-test-av">{t.initial}</div>
                    <div>
                      <div className="lp-test-name">{t.name}</div>
                      <div className="lp-test-role">{t.role}</div>
                    </div>
                  </div>
                  <div className="lp-test-stars">★★★★★</div>
                  <div className="lp-test-q">&ldquo;</div>
                  <p className="lp-test-txt">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="lp-faq-sec">
        <div className="lp-wrap">
          <Reveal>
            <span className="lp-pill">preguntas frecuentes</span>
            <h2 className="lp-h2">Lo que <span className="lp-sp">todos preguntan</span>.</h2>
          </Reveal>
          <div className="lp-faq-cols" style={{ marginTop: 28 }}>
            {faqs.map((faq, i) => (
              <div key={i} className="lp-faq">
                <button className="lp-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className={`lp-faq-icon ${openFaq === i ? 'open' : ''}`}>+</span>
                </button>
                {openFaq === i && <div className="lp-faq-ans">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="lp-cta">
        <Reveal>
          <h2>La IA no espera.<br /><em style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', color: 'rgba(255,255,255,.55)' }}>Tú tampoco.</em></h2>
          <p className="lp-cta-sub">Recibe las guías y descubre la comunidad donde te llevamos del primer prompt a tu propia IA empleada.</p>
          <div className="lp-cta-card">
            <LeadForm dark />
          </div>
        </Reveal>
      </div>

      {/* ── FOOTER ── */}
      <footer className="lp-foot">
        <div className="lp-foot-brand">Nico IA</div>
        <p>© 2026 · hecho con cariño en español</p>
        <p style={{ marginTop: 6 }}><a href="mailto:hola@cobrestudio.net">hola@cobrestudio.net</a></p>
      </footer>
    </>
  )
}
