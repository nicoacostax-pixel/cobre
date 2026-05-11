'use client'

import { useState } from 'react'

const faqs = [
  { q: '¿Qué son las guías gratis?', a: 'Son tutoriales paso a paso enviados por correo que te enseñan a usar IA en situaciones reales. Desde los conceptos básicos hasta casos de uso avanzados para tu trabajo o negocio.' },
  { q: '¿Y la comunidad? ¿Qué incluye?', a: 'La comunidad incluye acceso a todos los cursos, plantillas, sesiones en vivo, y un grupo activo donde puedes hacer preguntas y compartir avances con personas en la misma situación que tú.' },
  { q: '¿Necesito experiencia previa con IA o tecnología?', a: 'Para nada. Empezamos desde cero. Si sabes usar WhatsApp, puedes aprender IA con nosotros. El contenido está diseñado para personas sin conocimientos técnicos.' },
  { q: '¿Es solo para principiantes?', a: 'No. Tenemos contenido para todos los niveles. Si ya usas IA básica, el contenido PRO te llevará a construir agentes y automatizaciones que transforman cómo trabajas.' },
  { q: '¿Está todo en español?', a: 'Sí, 100%. Todo el contenido, la comunidad, las guías y las sesiones en vivo son en español. Sin traducciones automáticas ni subtítulos.' },
  { q: '¿Para quién es esto?', a: 'Para emprendedores, freelancers, creadores de contenido, profesionales y cualquier persona en LATAM o España que quiera usar la IA para trabajar mejor y ganar más.' },
  { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. La comunidad es una suscripción mensual y puedes cancelar en cualquier momento sin penalizaciones. Las guías gratuitas siempre son gratis.' },
]

const features = [
  { icon: '🧠', bg: '#fce8ef', pro: false, title: 'Domina Claude, ChatGPT y todo el ecosistema', desc: 'No te quedas con un solo modelo. Aprendes a elegir y combinar las mejores herramientas para cada caso.' },
  { icon: '🤖', bg: '#ede8f8', pro: true,  title: 'Automatiza tu negocio con agentes de IA', desc: 'Agentes que responden correos, califican leads, agendan reuniones y hacen el trabajo por ti. Sin código.' },
  { icon: '🏢', bg: '#e8edf8', pro: true,  title: 'Construye tu "IA empleada" para tu equipo', desc: 'Un asistente entrenado con tus documentos, tu marca y tus procesos. Tu propia IA, dentro de tu negocio.' },
  { icon: '🪄', bg: '#fff8e1', pro: false, title: 'Prompts profesionales con sistema de instrucciones', desc: 'Deja los prompts de TikTok. Aprendes a escribir instrucciones que producen resultados de calidad real, una y otra vez.' },
  { icon: '🎬', bg: '#fce8ef', pro: false, title: 'Crea contenido 10× más rápido', desc: 'Ideas, guiones, posts, miniaturas, voces. Plantillas reales para creadores y emprendedores.' },
  { icon: '💸', bg: '#e8f8ef', pro: false, title: 'Vende servicios y productos con IA', desc: 'Modelos de negocio que están funcionando hoy en LATAM y España. Pasa de aprender a facturar.' },
]

const testimonials = [
  { color: 'pink',   text: 'Llevaba meses queriendo entender la IA y nada me hacía clic. Con Ana en una semana ya estaba automatizando mi correo y ahorrándome horas.', name: 'Camila R.', role: 'Coach · Bogotá' },
  { color: 'purple', text: 'Pasé de cero a tener mis propios prompts y plantillas para mi negocio. Lo mejor: todo en español y sin rollo técnico.', name: 'Diego M.', role: 'Emprendedor · CDMX' },
  { color: 'peach',  text: 'La comunidad es oro. Aprendes con gente real, con casos reales, no con teoría. Vale cada centavo.', name: 'Lucía P.', role: 'Freelancer · Madrid' },
]

function LeadForm({ dark = false }: { dark?: boolean }) {
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent]   = useState(false)
  const [err, setErr]     = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErr('')
    const res = await fetch('/api/ai-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone: '', answers: [] }),
    })
    if (res.ok) {
      setSent(true)
    } else {
      setErr('Hubo un error. Intenta de nuevo.')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    border: '1.5px solid #e5e5e5', borderRadius: 12,
    fontSize: 15, fontFamily: 'Inter, sans-serif',
    outline: 'none', marginBottom: 10,
    background: dark ? '#f5f5f5' : '#fafafa',
    color: '#1a1a1a',
  }

  if (sent) return (
    <p style={{ textAlign: 'center', color: '#574088', fontWeight: 700, padding: '24px 0' }}>
      ✅ ¡Listo! Revisa tu correo pronto.
    </p>
  )

  return (
    <form onSubmit={handleSubmit}>
      <input style={inputStyle} type="text"  placeholder="Tu nombre"    value={name}  onChange={e => setName(e.target.value)}  required />
      <input style={inputStyle} type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
      <button type="submit" style={{ width: '100%', padding: 15, background: 'linear-gradient(135deg, #7C5CBF 0%, #574088 100%)', color: 'white', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
        Recibir las guías gratis
      </button>
      {err && <p style={{ color: 'red', fontSize: 13, marginTop: 8 }}>{err}</p>}
      <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', marginTop: 10 }}>Te enviamos las guías al correo. Cero spam, sales cuando quieras.</p>
    </form>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { font-family: 'Inter', sans-serif !important; background: #FDFAE6 !important; color: #1a1a1a; line-height: 1.6; }

        .ia-wrap   { max-width: 480px; margin: 0 auto; padding: 0 20px; }
        .ia-section { padding: 52px 0; }

        .ia-notif  { display: inline-flex; align-items: center; gap: 8px; background: white; border: 1px solid #ddd; border-radius: 999px; padding: 8px 18px; font-size: 13px; color: #555; }
        .ia-dot    { width: 7px; height: 7px; border-radius: 50%; background: #7C5CBF; flex-shrink: 0; }
        .ia-pill   { display: inline-block; background: white; border: 1px solid #ddd; border-radius: 999px; padding: 6px 18px; font-size: 13px; font-weight: 500; color: #555; }

        .ia-h1     { font-size: 2.8rem; font-weight: 900; line-height: 1.05; letter-spacing: -0.02em; margin: 12px 0 16px; text-align: center; }
        .ia-h2     { font-size: 2.5rem; font-weight: 900; line-height: 1.05; letter-spacing: -0.02em; margin: 12px 0 16px; }
        .ia-serif-purple { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; color: #7C5CBF; }
        .ia-serif-dark   { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; color: #574088; }

        .ia-card   { background: white; border-radius: 20px; padding: 26px 22px; box-shadow: 0 2px 16px rgba(0,0,0,0.05); }
        .ia-badge-label { display: inline-block; background: #ede8f8; color: #7C5CBF; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 12px; border-radius: 999px; margin-bottom: 12px; }

        .ia-checklist    { list-style: none; margin: 14px 0 20px; }
        .ia-checklist li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #555; margin-bottom: 9px; }
        .ia-check        { width: 18px; height: 18px; border-radius: 50%; background: #7C5CBF; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; font-size: 10px; color: white; font-weight: 700; }

        .ia-trust { display: flex; justify-content: center; gap: 10px; font-size: 12px; color: #999; margin-top: 16px; flex-wrap: wrap; }

        .ia-stats  { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .ia-stat   { background: white; border-radius: 20px; padding: 24px 20px; text-align: center; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
        .ia-stat.full { grid-column: 1/-1; }
        .ia-stat-n { font-family: 'Playfair Display', serif; font-style: italic; font-size: 3rem; font-weight: 900; color: #7C5CBF; line-height: 1; }
        .ia-stat-n span { color: #1a1a1a; }
        .ia-stat-l { font-size: 13px; color: #888; margin-top: 6px; }

        .ia-photo-wrap { position: relative; border-radius: 24px; overflow: hidden; aspect-ratio: 3/4; }
        .ia-photo-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ia-photo-placeholder { width: 100%; height: 100%; background: linear-gradient(145deg, #d8ccf0, #b8a8e4); display: flex; align-items: center; justify-content: center; font-size: 90px; }
        .ia-badge { position: absolute; background: white; border-radius: 999px; padding: 7px 14px; font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 5px; box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
        .ia-badge-tl { top: 16px; left: 16px; }
        .ia-badge-bl { bottom: 16px; left: 16px; }
        .ia-badge-tr { top: 16px; right: 16px; width: 42px; height: 42px; border-radius: 50%; padding: 0; justify-content: center; }

        .ia-feature { background: white; border-radius: 20px; padding: 22px; margin-bottom: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); position: relative; }
        .ia-f-icon  { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 12px; }
        .ia-f-pro   { position: absolute; top: 20px; right: 20px; border: 1.5px solid #7C5CBF; color: #7C5CBF; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; padding: 3px 9px; border-radius: 999px; }
        .ia-feature h3 { font-size: 15px; font-weight: 800; margin-bottom: 6px; line-height: 1.3; }
        .ia-feature p  { font-size: 13px; color: #777; line-height: 1.6; }

        .ia-t-card { border-radius: 20px; padding: 22px; margin-bottom: 10px; }
        .ia-t-card.pink   { background: #fce8ef; }
        .ia-t-card.purple { background: #ede8f8; }
        .ia-t-card.peach  { background: #fde8d8; }
        .ia-t-quote { font-size: 1.4rem; font-weight: 700; color: #574088; margin-bottom: 10px; }
        .ia-t-text  { font-size: 14px; color: #333; line-height: 1.65; margin-bottom: 14px; }
        .ia-t-name  { font-size: 14px; font-weight: 700; }
        .ia-t-role  { font-size: 12px; color: #999; }

        .ia-faq-item { background: white; border-radius: 16px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 8px rgba(0,0,0,0.04); }
        .ia-faq-btn  { width: 100%; background: none; border: none; padding: 18px 20px; font-size: 15px; font-weight: 500; font-family: 'Inter', sans-serif; color: #1a1a1a; text-align: left; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .ia-faq-icon { font-size: 20px; color: #bbb; flex-shrink: 0; transition: transform 0.2s, color 0.2s; }
        .ia-faq-icon.open { transform: rotate(45deg); color: #7C5CBF; }
        .ia-faq-answer { font-size: 14px; color: #666; line-height: 1.7; padding: 0 20px 18px; }

        .ia-cta { background: linear-gradient(145deg, #7C5CBF 0%, #574088 100%); padding: 60px 24px; text-align: center; color: white; }
        .ia-cta h2 { font-size: 2.4rem; font-weight: 900; line-height: 1.1; margin-bottom: 12px; }
        .ia-cta-sub { font-family: 'Playfair Display', serif; font-style: italic; color: rgba(255,255,255,0.75); }
        .ia-cta p  { color: rgba(255,255,255,0.7); font-size: 15px; margin-bottom: 24px; line-height: 1.7; }
        .ia-cta-form { background: white; border-radius: 20px; padding: 24px; text-align: left; }

        footer.ia-footer { background: #FDFAE6; border-top: 1px solid rgba(124,92,191,0.15); padding: 30px 24px; text-align: center; }
        footer.ia-footer .brand { font-weight: 800; font-size: 16px; margin-bottom: 5px; color: #574088; }
        footer.ia-footer p { font-size: 13px; color: #aaa; }
        footer.ia-footer a { color: #7C5CBF; text-decoration: none; }
      `}</style>

      {/* ── HERO + FORM ── */}
      <section style={{ padding: '40px 0 52px', background: '#FDFAE6' }}>
        <div className="ia-wrap">
          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <div className="ia-notif">
              <span className="ia-dot" />
              +500 personas ya aprendieron con nosotros · IA en español
            </div>
          </div>

          <h1 className="ia-h1">
            Aprende <span className="ia-serif-purple">IA</span> en<br />
            español, sin<br />
            <span className="ia-serif-dark">tecnicismos.</span>
          </h1>

          <p style={{ textAlign: 'center', color: '#666', fontSize: 15, lineHeight: 1.75, marginBottom: 4 }}>
            Recibe gratis nuestras guías para usar IA en tu día a día. Y entra a la comunidad donde te llevamos mucho más allá.
          </p>

          <div className="ia-card" style={{ marginTop: 24 }}>
            <span className="ia-badge-label">GRATIS · GUÍAS</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
              Recibe las guías <span className="ia-serif-purple">por correo</span>
            </h2>
            <ul className="ia-checklist">
              {['Tutoriales paso a paso para usar IA en tu día a día', 'Plantillas y casos reales para tu negocio', 'Guías nuevas cada mes', 'Acceso a la comunidad incluido'].map(item => (
                <li key={item}><span className="ia-check">✓</span> {item}</li>
              ))}
            </ul>
            <LeadForm />
          </div>

          <div className="ia-trust">
            <span>Acceso inmediato</span><span>·</span><span>100% gratis</span><span>·</span><span>En español</span>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '28px 0', background: '#FDFAE6' }}>
        <div className="ia-wrap">
          <div className="ia-stats">
            <div className="ia-stat full">
              <div className="ia-stat-n"><span>+</span>10K</div>
              <div className="ia-stat-l">seguidores en 3 semanas</div>
            </div>
            <div className="ia-stat">
              <div className="ia-stat-n"><span>+</span>500</div>
              <div className="ia-stat-l">personas ya aprendieron</div>
            </div>
            <div className="ia-stat">
              <div className="ia-stat-n"><span>+</span>86</div>
              <div className="ia-stat-l">negocios usan IA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="ia-section" style={{ background: '#FDFAE6' }}>
        <div className="ia-wrap">
          <div className="ia-photo-wrap">
            {/* Reemplaza con: <img src="/tu-foto.jpg" alt="Ana" /> */}
            <div className="ia-photo-placeholder">👩‍💻</div>
            <div className="ia-badge ia-badge-tl">+10K 👀</div>
            <div className="ia-badge ia-badge-tr">✨</div>
            <div className="ia-badge ia-badge-bl">en español 🇪🇸</div>
          </div>

          <div style={{ marginTop: 32 }}>
            <div className="ia-pill" style={{ marginBottom: 12 }}>sobre mí</div>
            <h2 className="ia-h2">Hola, soy <span className="ia-serif-purple">Ana</span> .</h2>
            <p style={{ color: '#666', fontSize: 15, lineHeight: 1.8 }}>
              Hace unos meses no sabía nada de Inteligencia Artificial. Hoy enseño a miles de personas en español a usarla todos los días en su trabajo, su negocio y su vida.
            </p>
            <p style={{ color: '#666', fontSize: 15, lineHeight: 1.8, marginTop: 12 }}>
              En solo <strong style={{ color: '#1a1a1a' }}>3 semanas</strong> pasamos de 0 a más de 10.000 personas aprendiendo IA en español. Esto no es por mí. Es porque la IA está cambiando todo y tú necesitas estar al frente.
            </p>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section className="ia-section" style={{ background: '#FDFAE6' }}>
        <div className="ia-wrap">
          <div className="ia-pill" style={{ marginBottom: 12 }}>lo que vas a aprender</div>
          <h2 className="ia-h2">
            De <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>prompts</em><br />
            a tu <span className="ia-serif-purple">IA empleada</span> .
          </h2>
          <p style={{ color: '#666', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
            Empezamos por lo fundamental y subimos hasta agentes, automatizaciones e integraciones avanzadas. Tú avanzas a tu ritmo.
          </p>

          {features.map(f => (
            <div key={f.title} className="ia-feature">
              {f.pro && <span className="ia-f-pro">PRO</span>}
              <div className="ia-f-icon" style={{ background: f.bg }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="ia-section" style={{ background: '#FDFAE6' }}>
        <div className="ia-wrap">
          <div className="ia-pill" style={{ marginBottom: 12 }}>la comunidad</div>
          <h2 className="ia-h2">Gente real,<br /><span className="ia-serif-purple">resultados reales</span> .</h2>

          <div style={{ marginTop: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} className={`ia-t-card ${t.color}`}>
                <div className="ia-t-quote">&ldquo;</div>
                <p className="ia-t-text">{t.text}</p>
                <div className="ia-t-name">{t.name}</div>
                <div className="ia-t-role">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ia-section" style={{ background: '#FDFAE6' }}>
        <div className="ia-wrap">
          <div className="ia-pill" style={{ marginBottom: 12 }}>preguntas</div>
          <h2 className="ia-h2">Lo que <span className="ia-serif-purple">todos<br />preguntan</span> .</h2>

          <div style={{ marginTop: 24 }}>
            {faqs.map((faq, i) => (
              <div key={i} className="ia-faq-item">
                <button className="ia-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className={`ia-faq-icon ${openFaq === i ? 'open' : ''}`}>+</span>
                </button>
                {openFaq === i && <div className="ia-faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="ia-cta">
        <div style={{ maxWidth: 420, margin: '0 auto' }}>
          <h2>La IA no espera.<br /><span className="ia-cta-sub">Tú tampoco.</span></h2>
          <p>Recibe gratis las guías. Y descubre la comunidad donde te llevamos del primer prompt a tu propia IA empleada.</p>
          <div className="ia-cta-form">
            <LeadForm dark />
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="ia-footer">
        <div className="brand">Ana IA</div>
        <p>© 2026 · hecho con cariño en español</p>
        <p style={{ marginTop: 6 }}>
          <a href="#">Instagram</a> · <a href="#">hola@anaai.com</a>
        </p>
      </footer>
    </>
  )
}
