'use client'

import { useState } from 'react'

const faqs = [
  { q: '¿Qué son las guías gratis?', a: 'Tutoriales paso a paso para usar IA en tu día a día y en tu negocio. Te llegan por correo, son 100% gratis y están en español. Subimos guías nuevas cada mes.' },
  { q: '¿Y la comunidad? ¿Qué incluye?', a: 'La comunidad es donde te llevamos más allá de las guías: tutoriales nuevos cada semana, plantillas listas para copiar, skills personalizadas, automatizaciones reales (clientes, ventas, contenido), y soporte directo. Es la diferencia entre leer sobre IA y hacerla trabajar para ti.' },
  { q: '¿Necesito experiencia previa con IA o tecnología?', a: 'No. Todo está pensado para empezar desde cero. Si sabes usar WhatsApp, puedes hacer esto.' },
  { q: '¿Es solo para principiantes?', a: 'No. Cubrimos desde lo básico (Claude, ChatGPT, prompts) hasta cosas avanzadas como agentes de IA, automatizaciones de negocio, integraciones por API y construir tu propia "IA empleada". Avanzas a tu ritmo.' },
  { q: '¿Está todo en español?', a: 'Sí. Tutoriales, llamadas y comunidad. Todo 100% en español, sin traducciones automáticas raras.' },
  { q: '¿Qué incluye la comunidad?', a: 'Acceso a tutoriales semanales, plantillas de prompts, retos prácticos, y una comunidad activa donde puedes preguntar y recibir feedback.' },
  { q: '¿Para quién es esto?', a: 'Para cualquier persona que quiera usar IA en su día a día: emprendedores, creadores, profesionales o simplemente curiosos.' },
  { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. Cancelas en un clic, sin preguntas.' },
]

const features = [
  { icon: '🧠', bg: 'linear-gradient(135deg,#fce8ef,#fdd6e6)', pro: false, title: 'Domina Claude, ChatGPT y todo el ecosistema', desc: 'No te quedas con un solo modelo. Aprendes a elegir y combinar las mejores herramientas para cada caso.' },
  { icon: '🤖', bg: 'linear-gradient(135deg,#ede8f8,#ddd4f8)', pro: true,  title: 'Automatiza tu negocio con agentes de IA', desc: 'Agentes que responden correos, califican leads, agendan reuniones y hacen el trabajo por ti. Sin código.' },
  { icon: '🏢', bg: 'linear-gradient(135deg,#e8edf8,#d4ddf8)', pro: true,  title: 'Construye tu "IA empleada" para tu equipo', desc: 'Un asistente entrenado con tus documentos, tu marca y tus procesos. Tu propia IA, dentro de tu negocio.' },
  { icon: '🪄', bg: 'linear-gradient(135deg,#fff8e1,#ffefc0)', pro: false, title: 'Prompts profesionales con sistema de instrucciones', desc: 'Deja los prompts de TikTok. Aprendes a escribir instrucciones que producen resultados de calidad real.' },
  { icon: '🎬', bg: 'linear-gradient(135deg,#fce8ef,#fdd6e6)', pro: false, title: 'Crea contenido 10× más rápido', desc: 'Ideas, guiones, posts, miniaturas, voces. Plantillas reales para creadores y emprendedores.' },
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

function LeadForm({ dark = false }: { dark?: boolean }) {
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr]     = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    outline: 'none', background: dark ? '#f5f5f5' : '#fafafa', color: '#1a1a1a',
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
      <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', marginTop: 10 }}>
        Sin spam · Sales cuando quieras
      </p>
    </form>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'Inter',sans-serif!important;background:#FDFAE6!important;color:#1a1a1a;line-height:1.6;-webkit-font-smoothing:antialiased}

        /* ── LAYOUT ── */
        .lp-wrap{max-width:580px;margin:0 auto;padding:0 24px}
        .lp-sp{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;color:#7C5CBF}
        .lp-sd{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;color:#574088}
        .lp-pill{display:inline-flex;align-items:center;gap:6px;background:white;border:1.5px solid #e8e0f8;border-radius:999px;padding:6px 16px;font-size:12px;font-weight:600;color:#7C5CBF;letter-spacing:.04em;text-transform:uppercase}
        .lp-h2{font-size:2.4rem;font-weight:900;line-height:1.05;letter-spacing:-.025em;margin:14px 0 16px}
        .lp-sub{font-size:15px;color:#666;line-height:1.8;margin-bottom:28px}

        /* ── HERO ── */
        .lp-hero{background:#FDFAE6;padding:36px 0 52px;position:relative;overflow:hidden}
        .lp-hero::before{content:'';position:absolute;top:-120px;right:-120px;width:500px;height:500px;background:radial-gradient(circle,rgba(124,92,191,.12) 0%,transparent 70%);pointer-events:none}
        .lp-hero::after{content:'';position:absolute;bottom:-80px;left:-80px;width:350px;height:350px;background:radial-gradient(circle,rgba(124,92,191,.08) 0%,transparent 70%);pointer-events:none}
        .lp-hero-head{text-align:center;padding:0 24px;margin-bottom:32px;position:relative;z-index:1}
        .lp-notif{display:inline-flex;align-items:center;gap:8px;background:white;border:1.5px solid #e8e0f8;border-radius:999px;padding:8px 20px;font-size:13px;color:#555;margin-bottom:24px;box-shadow:0 2px 12px rgba(124,92,191,.1)}
        .lp-dot{width:7px;height:7px;border-radius:50%;background:#7C5CBF;flex-shrink:0;animation:pulse 2s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
        .lp-h1{font-size:2.8rem;font-weight:900;line-height:1.05;letter-spacing:-.025em;margin-bottom:20px}
        .lp-hero-grid{padding:0 24px;position:relative;z-index:1}
        .lp-cards-col{display:none}

        /* guide card stack */
        .lp-stack{position:relative;height:400px}
        .lp-gc{position:absolute;width:185px;border-radius:22px;padding:20px 16px;box-shadow:0 12px 40px rgba(0,0,0,.18);display:flex;flex-direction:column;justify-content:space-between;transition:transform .3s}
        .lp-gc:nth-child(1){height:255px;top:60px;left:0;transform:rotate(-11deg);z-index:1}
        .lp-gc:nth-child(2){height:275px;top:35px;left:75px;transform:rotate(-3deg);z-index:2}
        .lp-gc:nth-child(3){height:265px;top:20px;left:160px;transform:rotate(6deg);z-index:3}
        .lp-gc-brand{font-family:'Playfair Display',serif;font-style:italic;font-size:13px;font-weight:700}
        .lp-gc-num{font-size:11px;font-weight:600;opacity:.6}
        .lp-gc-lvl{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.65;margin-bottom:6px}
        .lp-gc-title{font-family:'Playfair Display',serif;font-style:italic;font-size:1.2rem;font-weight:700;line-height:1.2;white-space:pre-line}
        .lp-gc-bot{display:flex;align-items:center;justify-content:space-between}
        .lp-gc-tag{background:white;border-radius:999px;padding:4px 10px;font-size:10px;font-weight:700;display:flex;align-items:center;gap:4px;color:#574088}
        .lp-gc-date{font-size:9px;font-weight:600;opacity:.5;letter-spacing:.04em}

        /* form card */
        .lp-form-card{background:white;border-radius:28px;padding:28px 24px;box-shadow:0 8px 40px rgba(0,0,0,.08);border:1px solid rgba(255,255,255,.8)}
        .lp-form-badge{display:inline-block;background:#ede8f8;color:#7C5CBF;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 12px;border-radius:999px;margin-bottom:12px}
        .lp-form-title{font-size:1.5rem;font-weight:800;line-height:1.2;margin-bottom:16px}
        .lp-cl{list-style:none;margin:0 0 20px}
        .lp-cl li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#555;margin-bottom:8px;line-height:1.5}
        .lp-ck{width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#7C5CBF,#574088);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-size:10px;color:white;font-weight:700}
        .lp-form-row{display:flex;flex-direction:column;gap:10px}
        .lp-btn-submit{width:100%;margin-top:12px;padding:16px;background:linear-gradient(135deg,#7C5CBF,#574088);color:white;border:none;border-radius:14px;font-size:15px;font-weight:700;font-family:'Inter',sans-serif;cursor:pointer;letter-spacing:.01em;transition:opacity .2s,transform .1s}
        .lp-btn-submit:hover{opacity:.9;transform:translateY(-1px)}
        .lp-btn-submit:disabled{opacity:.6;cursor:not-allowed;transform:none}
        .lp-trust{display:flex;justify-content:center;gap:10px;font-size:12px;color:#aaa;margin-top:14px;flex-wrap:wrap}

        /* ── STATS BAR ── */
        .lp-stats-bar{background:white;border-top:1px solid #f0ecff;border-bottom:1px solid #f0ecff;padding:24px}
        .lp-stats-inner{display:flex;flex-direction:column;gap:14px;align-items:center;text-align:center}
        .lp-stat-n{font-family:'Playfair Display',serif;font-style:italic;font-size:2.4rem;font-weight:900;color:#7C5CBF;line-height:1}
        .lp-stat-l{font-size:12px;color:#999;margin-top:3px;font-weight:500}
        .lp-stat-div{width:1px;height:40px;background:#eee;display:none}

        /* ── ABOUT ── */
        .lp-about{padding:72px 0;background:#FDFAE6}
        .lp-about-grid{display:flex;flex-direction:column;gap:40px;align-items:center}
        .lp-photo-wrap{position:relative;width:100%;max-width:340px;margin:0 auto}
        .lp-photo-wrap img{width:100%;height:auto;display:block;object-fit:contain;filter:drop-shadow(0 16px 48px rgba(124,92,191,.3))}
        .lp-float-badge{position:absolute;background:white;border-radius:999px;padding:8px 16px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:6px;box-shadow:0 6px 20px rgba(0,0,0,.1);white-space:nowrap}
        .lp-about-text{}
        .lp-about-text p{font-size:15px;color:#555;line-height:1.85}
        .lp-about-text p+p{margin-top:14px}

        /* ── SECTION SHARED ── */
        .lp-section{padding:72px 0;background:#FDFAE6}
        .lp-section.lp-alt{background:white}

        /* ── FEATURES ── */
        .lp-feats{}
        .lp-feat{background:white;border-radius:20px;padding:24px;margin-bottom:10px;box-shadow:0 2px 16px rgba(0,0,0,.04);position:relative;border:1px solid #f5f0ff;transition:box-shadow .2s,transform .2s}
        .lp-feat:hover{box-shadow:0 8px 32px rgba(124,92,191,.12);transform:translateY(-2px)}
        .lp-fi{width:48px;height:48px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:14px}
        .lp-fpro{position:absolute;top:20px;right:20px;border:1.5px solid #7C5CBF;color:#7C5CBF;font-size:10px;font-weight:700;letter-spacing:.06em;padding:3px 9px;border-radius:999px}
        .lp-feat h3{font-size:15px;font-weight:800;margin-bottom:6px;line-height:1.3;color:#1a1a1a}
        .lp-feat p{font-size:13px;color:#888;line-height:1.65}

        /* ── TESTIMONIALS ── */
        .lp-test{border-radius:24px;padding:26px;margin-bottom:10px;border:1px solid rgba(0,0,0,.04)}
        .lp-test-head{display:flex;align-items:center;gap:12px;margin-bottom:16px}
        .lp-test-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:#7C5CBF;background:white;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.08)}
        .lp-test-name{font-size:14px;font-weight:700;color:#1a1a1a}
        .lp-test-role{font-size:12px;color:#999}
        .lp-test-stars{color:#f5c518;font-size:12px;letter-spacing:1px;margin-bottom:10px}
        .lp-test-q{font-size:22px;font-weight:900;color:#7C5CBF;line-height:1;margin-bottom:8px}
        .lp-test-txt{font-size:14px;color:#444;line-height:1.7}

        /* ── FAQ ── */
        .lp-faq{background:white;border-radius:16px;margin-bottom:8px;overflow:hidden;border:1px solid #f0ecff}
        .lp-faq-btn{width:100%;background:none;border:none;padding:18px 22px;font-size:14px;font-weight:600;font-family:'Inter',sans-serif;color:#1a1a1a;text-align:left;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;line-height:1.4}
        .lp-faq-icon{width:22px;height:22px;border-radius:50%;background:#f5f0ff;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#7C5CBF;transition:transform .25s,background .2s;font-weight:700}
        .lp-faq-icon.open{transform:rotate(45deg);background:#7C5CBF;color:white}
        .lp-faq-ans{font-size:14px;color:#666;line-height:1.75;padding:0 22px 18px}

        /* ── CTA ── */
        .lp-cta{background:linear-gradient(145deg,#7C5CBF 0%,#574088 100%);padding:80px 24px;text-align:center;position:relative;overflow:hidden}
        .lp-cta::before{content:'';position:absolute;top:-100px;right:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(255,255,255,.08) 0%,transparent 70%);pointer-events:none}
        .lp-cta h2{font-size:2.4rem;font-weight:900;line-height:1.1;color:white;margin-bottom:12px}
        .lp-cta p{color:rgba(255,255,255,.65);font-size:15px;margin-bottom:32px;line-height:1.75;max-width:440px;margin-left:auto;margin-right:auto}
        .lp-cta-card{background:white;border-radius:24px;padding:28px;text-align:left;max-width:520px;margin:0 auto;box-shadow:0 24px 64px rgba(0,0,0,.2)}

        /* ── FOOTER ── */
        .lp-foot{background:#FDFAE6;border-top:1px solid #eee;padding:36px 24px;text-align:center}
        .lp-foot-brand{font-weight:900;font-size:18px;color:#574088;margin-bottom:6px;font-family:'Playfair Display',serif;font-style:italic}
        .lp-foot p{font-size:13px;color:#bbb;margin-top:4px}
        .lp-foot a{color:#7C5CBF;text-decoration:none}
        .lp-foot a:hover{text-decoration:underline}

        /* ── DESKTOP ── */
        @media(min-width:900px){
          body{background:linear-gradient(160deg,#fff 0%,#f4efff 50%,#ffe8f4 100%)!important}

          .lp-hero{padding:72px 0 96px}
          .lp-hero-head{max-width:720px;margin:0 auto 48px}
          .lp-h1{font-size:3.6rem}
          .lp-hero-grid{max-width:1160px;margin:0 auto;padding:0 60px;display:grid;grid-template-columns:1fr 480px;gap:80px;align-items:center}
          .lp-cards-col{display:block}
          .lp-form-row{flex-direction:row}

          .lp-stats-bar{padding:32px 60px}
          .lp-stats-inner{flex-direction:row;justify-content:center;gap:0;text-align:center;max-width:800px;margin:0 auto}
          .lp-stat-item{flex:1}
          .lp-stat-div{display:block}
          .lp-stat-n{font-size:3rem}

          .lp-wrap{max-width:700px}

          .lp-about{padding:96px 0}
          .lp-about-grid{flex-direction:row;gap:80px;align-items:center;max-width:1100px;margin:0 auto;padding:0 60px}
          .lp-photo-wrap{max-width:420px;flex-shrink:0}
          .lp-about-text{flex:1}
          .lp-h2{font-size:3rem}

          .lp-section{padding:96px 0}
          .lp-feats{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .lp-feats .lp-feat{margin-bottom:0}

          .lp-t-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
          .lp-t-grid .lp-test{margin-bottom:0}

          .lp-faq-cols{columns:2;gap:8px}
          .lp-faq-cols .lp-faq{break-inside:avoid;margin-bottom:8px}

          .lp-cta h2{font-size:3.2rem}
          .lp-cta p{margin-bottom:36px}
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-head">
          <div className="lp-notif">
            <span className="lp-dot" />
            +500 personas aprendiendo · IA en español
          </div>
          <h1 className="lp-h1">
            Aprende <span className="lp-sp">IA</span> en español,<br />sin <span className="lp-sd">tecnicismos.</span>
          </h1>
        </div>

        <div className="lp-hero-grid">
          {/* Stacked cards — desktop */}
          <div className="lp-cards-col">
            <div className="lp-stack">
              {guideCards.map((c, i) => (
                <div key={i} className="lp-gc" style={{ background: c.bg }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
                      <span className="lp-gc-brand" style={{ color: c.light ? 'rgba(255,255,255,.9)' : '#574088' }}>Nico IA_</span>
                      <span className="lp-gc-num"   style={{ color: c.light ? 'rgba(255,255,255,.7)' : '#574088' }}>Nº {c.num}</span>
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

          {/* Form card */}
          <div>
            <div className="lp-form-card">
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
            </div>
            <div className="lp-trust">
              <span>Acceso inmediato</span><span>·</span><span>100% gratis</span><span>·</span><span>En español</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="lp-stats-bar">
        <div className="lp-stats-inner">
          <div className="lp-stat-item">
            <div className="lp-stat-n">+100K</div>
            <div className="lp-stat-l">seguidores en todas las cuentas</div>
          </div>
          <div className="lp-stat-div" />
          <div className="lp-stat-item">
            <div className="lp-stat-n">+1.500</div>
            <div className="lp-stat-l">personas ya aprendieron</div>
          </div>
          <div className="lp-stat-div" />
          <div className="lp-stat-item">
            <div className="lp-stat-n">+97</div>
            <div className="lp-stat-l">negocios usando IA hoy</div>
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="lp-about">
        <div className="lp-about-grid">
          {/* Foto */}
          <div className="lp-photo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/PerfilNicoMayo.png" alt="Nico" />
            <div className="lp-float-badge" style={{ top: 16, left: 0 }}>+100K 👀</div>
            <div className="lp-float-badge" style={{ bottom: 24, right: 0 }}>en español 🇪🇸</div>
          </div>

          {/* Texto */}
          <div className="lp-about-text">
            <span className="lp-pill">sobre mí</span>
            <h2 className="lp-h2" style={{ marginTop: 16 }}>
              Hola, soy <span className="lp-sp">Nico</span>.
            </h2>
            <p>Hace unos meses no sabía nada de Inteligencia Artificial. Hoy enseño a miles de personas en español a usarla todos los días en su trabajo, su negocio y su vida.</p>
            <p>En solo <strong style={{ color: '#1a1a1a' }}>2 años</strong> pasamos de 0 a más de 100.000 personas aprendiendo IA en español. Esto no es por mí. Es porque la IA está cambiando todo, y tú necesitas estar al frente.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              {['Claude & ChatGPT','Agentes sin código','Automatizaciones','Para LATAM y España'].map(tag => (
                <span key={tag} style={{ background: '#ede8f8', color: '#574088', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 600 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section className="lp-section lp-alt">
        <div className="lp-wrap">
          <span className="lp-pill">lo que vas a aprender</span>
          <h2 className="lp-h2">De <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic' }}>prompts</em> a tu <span className="lp-sp">IA empleada</span>.</h2>
          <p className="lp-sub">Empezamos por lo fundamental y subimos hasta agentes, automatizaciones e integraciones avanzadas. Tú avanzas a tu ritmo.</p>
          <div className="lp-feats">
            {features.map(f => (
              <div key={f.title} className="lp-feat">
                {f.pro && <span className="lp-fpro">PRO</span>}
                <div className="lp-fi" style={{ background: f.bg }}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lp-section">
        <div className="lp-wrap">
          <span className="lp-pill">la comunidad</span>
          <h2 className="lp-h2">Gente real, <span className="lp-sp">resultados reales</span>.</h2>
          <div className="lp-t-grid" style={{ marginTop: 28 }}>
            {testimonials.map(t => (
              <div key={t.name} className="lp-test" style={{ background: t.color }}>
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
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="lp-section lp-alt">
        <div className="lp-wrap">
          <span className="lp-pill">preguntas frecuentes</span>
          <h2 className="lp-h2">Lo que <span className="lp-sp">todos preguntan</span>.</h2>
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
        <h2>La IA no espera.<br /><em style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', color: 'rgba(255,255,255,.6)' }}>Tú tampoco.</em></h2>
        <p>Recibe las guías y descubre la comunidad donde te llevamos del primer prompt a tu propia IA empleada.</p>
        <div className="lp-cta-card">
          <LeadForm dark />
        </div>
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
