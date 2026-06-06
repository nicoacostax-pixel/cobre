'use client'

import { useState } from 'react'
import { BorderBeam } from './components/magicui/border-beam'
import { ShimmerButton } from './components/magicui/shimmer-button'
import { RetroGrid } from './components/magicui/retro-grid'
import { Meteors } from './components/magicui/meteors'

const checks = [
  '15+ guías gratis sobre IA real — prompts, agentes, automatizaciones',
  'En español, sin tecnicismos, aplicables desde el primer día',
  'Guías nuevas cada mes directo en tu correo',
]

const proof = [
  { text: 'En una semana ya estaba automatizando mi correo.', name: 'Vanessa R.', role: 'Coach · Barcelona' },
  { text: 'Pasé de cero a tener prompts y plantillas para mi negocio.', name: 'Gonzalo M.', role: 'Emprendedor · Monterrey' },
  { text: 'Por fin alguien que explica esto sin jerga.', name: 'Sofía L.', role: 'Copywriter · Madrid' },
]

function LeadForm() {
  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr]       = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setErr(''); setLoading(true)
    const res = await fetch('/api/ai-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone: '', answers: [] }),
    })
    if (res.ok) { window.location.href = '/gracias' }
    else { setLoading(false); setErr('Hubo un error. Intenta de nuevo.') }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          className="cp-input" type="text" placeholder="Tu nombre"
          value={name} onChange={e => setName(e.target.value)} required
        />
        <input
          className="cp-input" type="email" placeholder="tu@email.com"
          value={email} onChange={e => setEmail(e.target.value)} required
        />
      </div>
      <ShimmerButton
        type="submit" disabled={loading}
        shimmerColor="rgba(232,168,78,0.45)"
        background={loading ? '#6B4020' : 'linear-gradient(135deg,#C87533 0%,#A86025 100%)'}
        shimmerDuration="2.2s"
        style={{
          width: '100%', marginTop: 10, padding: '15px 24px',
          fontSize: 15, fontFamily: "'DM Mono',monospace", fontWeight: 500,
          color: '#EDE8DC', letterSpacing: '0.04em', borderRadius: 10,
          opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Enviando…' : 'Quiero mis guías gratis →'}
      </ShimmerButton>
      {err && <p style={{ color: '#E07B4A', fontSize: 13, marginTop: 8, fontFamily: "'DM Mono',monospace" }}>{err}</p>}
      <p style={{ fontSize: 11, color: '#6B6054', textAlign: 'center', marginTop: 10, fontFamily: "'DM Mono',monospace", letterSpacing: '0.05em' }}>
        SIN SPAM · TE VAS CUANDO QUIERAS
      </p>
    </form>
  )
}

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: var(--font-geist-sans), sans-serif !important;
          background: #0C0A07 !important;
          color: #EDE8DC;
          -webkit-font-smoothing: antialiased;
        }
        :root {
          --copper: #C87533; --copper-dim: rgba(200,117,51,0.14);
          --copper-glow: rgba(200,117,51,0.28); --amber: #E8A84E;
          --cream: #EDE8DC; --cream-dim: #998E82;
          --bg: #0C0A07; --bg2: #141009; --bg3: #1C160C;
          --border: rgba(200,117,51,0.15); --border-mid: rgba(200,117,51,0.28);
        }
        body::after {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px 180px; pointer-events: none; z-index: 1000; opacity: 0.4;
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 28px;
          background: rgba(12,10,7,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-brand {
          font-family: 'DM Mono', monospace; font-size: 14px;
          font-weight: 500; color: var(--cream); text-decoration: none;
          letter-spacing: 0.08em; display: flex; align-items: center; gap: 8px;
        }
        .nav-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--copper); box-shadow: 0 0 8px var(--copper-glow);
          animation: pulse 2.5s ease-in-out infinite;
        }
        .nav-link {
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.08em; color: var(--cream-dim);
          text-decoration: none; transition: color 0.2s;
        }
        .nav-link:hover { color: var(--cream); }

        /* HERO */
        .hero {
          min-height: 100svh;
          display: flex; align-items: center; justify-content: center;
          padding: 100px 24px 60px;
          position: relative; overflow: hidden;
        }
        .hero-inner {
          position: relative; z-index: 2;
          width: 100%; max-width: 1080px;
          display: flex; flex-direction: column; align-items: center;
          gap: 56px;
        }
        @media(min-width:880px){
          .hero-inner { flex-direction: row; align-items: center; gap: 72px; }
        }

        /* LEFT — copy */
        .hero-copy { flex: 1; max-width: 540px; }
        .tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace; font-size: 10px;
          font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--copper); background: var(--copper-dim);
          border: 1px solid var(--border-mid);
          border-radius: 4px; padding: 5px 12px; margin-bottom: 24px;
        }
        .tag-line { width: 16px; height: 1px; background: var(--copper); opacity: 0.7; }
        .h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 7vw, 5.2rem);
          font-weight: 700; line-height: 0.96;
          letter-spacing: -0.02em; color: var(--cream);
          margin-bottom: 20px;
        }
        .h1 em { font-style: italic; color: var(--copper); }
        .sub {
          font-size: 16px; color: var(--cream-dim);
          line-height: 1.75; margin-bottom: 28px; max-width: 420px;
        }
        .checks { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
        .check {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 14px; color: var(--cream-dim); line-height: 1.5;
        }
        .check-icon {
          width: 16px; height: 16px; border-radius: 50%;
          background: var(--copper-dim); border: 1px solid var(--border-mid);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
          font-size: 8px; color: var(--copper); font-weight: 700;
        }

        /* RIGHT — form */
        .form-card {
          position: relative; background: var(--bg2);
          border: 1px solid var(--border-mid);
          border-radius: 20px; padding: 30px;
          width: 100%; max-width: 400px; flex-shrink: 0;
        }
        .form-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 10px;
        }
        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 700; line-height: 1.15;
          color: var(--cream); margin-bottom: 20px;
        }
        .form-title em { font-style: italic; color: var(--amber); }
        .cp-input {
          width: 100%; padding: 13px 16px;
          border: 1px solid var(--border-mid); border-radius: 9px;
          font-size: 14px; font-family: var(--font-geist-sans), sans-serif;
          outline: none; background: rgba(12,10,7,0.8); color: var(--cream);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cp-input::placeholder { color: var(--cream-dim); opacity: 0.6; }
        .cp-input:focus {
          border-color: var(--copper);
          box-shadow: 0 0 0 3px rgba(200,117,51,0.1);
        }

        /* VIDEO */
        .video-wrap {
          position: relative; z-index: 2;
          max-width: 860px; margin: 0 auto;
          padding: 0 24px 60px;
        }
        .video-container {
          position: relative; width: 100%; padding-bottom: 56.25%;
          border-radius: 16px; overflow: hidden;
          border: 1px solid var(--border-mid);
          box-shadow: 0 0 60px rgba(200,117,51,0.1);
        }
        .video-container iframe {
          position: absolute; inset: 0;
          width: 100%; height: 100%; border: none;
        }

        /* PROOF */
        .proof {
          position: relative; z-index: 2;
          display: grid; gap: 12px; padding: 0 24px 60px;
          max-width: 1080px; margin: 0 auto; width: 100%;
        }
        @media(min-width:640px){ .proof { grid-template-columns: repeat(3,1fr); } }
        .proof-item {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; padding: 18px 20px;
        }
        .proof-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem; font-style: italic;
          color: var(--cream-dim); line-height: 1.6; margin-bottom: 10px;
        }
        .proof-name {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.06em; color: #4A3D30;
        }

        /* FOOTER */
        .footer {
          position: relative; z-index: 2;
          border-top: 1px solid var(--border);
          padding: 24px; text-align: center;
        }
        .footer-brand {
          font-family: 'DM Mono', monospace; font-size: 13px;
          font-weight: 500; letter-spacing: 0.08em; color: var(--cream-dim);
        }
        .footer-brand span { color: var(--copper); }
        .footer-links {
          display: flex; justify-content: center; gap: 20px;
          margin-top: 10px; flex-wrap: wrap;
        }
        .footer-link {
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.06em; color: #4A3D30;
          text-decoration: none; transition: color 0.2s;
        }
        .footer-link:hover { color: var(--copper); }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a className="nav-brand" href="/">
          <span className="nav-dot" />
          NICO_IA
        </a>
        <a className="nav-link" href="/recursos">VER GUÍAS →</a>
      </nav>

      {/* HERO */}
      <section className="hero" id="registro">
        <RetroGrid opacity={0.5} cellSize={64} lightLineColor="rgba(200,117,51,0.08)" />
        <Meteors number={16} color="rgba(200,117,51,0.4)" />

        <div className="hero-inner">

          {/* Copy */}
          <div className="hero-copy">
            <div className="tag">
              <span className="tag-line" />
              IA en español · gratis
              <span className="tag-line" />
            </div>
            <h1 className="h1">
              Usas IA todos los días,<br />
              pero sigues en la<br />
              <em>misma posición.</em>
            </h1>
            <p className="sub">
              Más de 10 recursos gratuitos te van a ayudar a cambiar eso.
            </p>
            <ul className="checks">
              {checks.map(c => (
                <li key={c} className="check">
                  <span className="check-icon">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="form-card">
            <BorderBeam duration={8} colorFrom="#C87533" colorTo="#E8A84E" />
            <p className="form-label">— Acceso gratuito</p>
            <h2 className="form-title">
              Recibe las guías<br /><em>en tu correo.</em>
            </h2>
            <LeadForm />
          </div>

        </div>
      </section>

      {/* VIDEO */}
      <div className="video-wrap">
        <div className="video-container">
          <iframe
            src="https://player.vimeo.com/video/1198946839?badge=0&autopause=0&player_id=0&app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            title="Nico IA"
          />
        </div>
      </div>

      {/* SOCIAL PROOF */}
      <div className="proof">
        {proof.map(p => (
          <div key={p.name} className="proof-item">
            <p className="proof-text">"{p.text}"</p>
            <span className="proof-name">{p.name} · {p.role}</span>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">NICO_<span>IA</span></div>
        <div className="footer-links">
          <a className="footer-link" href="/recursos">RECURSOS</a>
          <a className="footer-link" href="mailto:hola@cobrestudio.net">HOLA@COBRESTUDIO.NET</a>
        </div>
      </footer>
    </>
  )
}
