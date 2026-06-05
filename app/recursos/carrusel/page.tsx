import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Carruseles que paran el scroll — Guía · Nico IA',
  description: 'Skill instalable para Claude. Hook, setup, contenido, cierre y CTA. 6 tipos de carrusel. Adaptable a cualquier nicho.',
}

const toc = [
  { id: 'que-es',   label: 'Qué es esta skill' },
  { id: 'instalar', label: 'Cómo instalarla en Claude' },
  { id: 'reglas',   label: 'Las 5 reglas no negociables' },
  { id: 'anatomia', label: 'Anatomía · los 5 bloques del carrusel' },
  { id: 'tipos',    label: 'Los 6 tipos de carrusel' },
  { id: 'ejemplo',  label: 'Ejemplo completo · 9 slides' },
  { id: 'errores',  label: 'Errores que matan un carrusel' },
]

const reglas = [
  { n: '01', title: 'Tono natural y propio', desc: 'Escribe como hablarías. Sin cringe, sin "¡hola chic@s!", sin emojis decorativos al inicio. Frases cortas. Si no se lee en 2 segundos por slide, no se lee.' },
  { n: '02', title: 'Una idea por slide', desc: 'Si un slide tiene dos ideas, son dos slides. Si una idea no entra en un slide, simplifícala. No la partas en dos.' },
  { n: '03', title: '6-10 slides es el rango', desc: 'Menos de 6 se siente flojo. Más de 10 pierde el scroll. El sweet spot es 7-9.' },
  { n: '04', title: 'El slide 1 vende, el último convierte', desc: 'Los del medio entregan. Si el slide 1 no funciona, los demás dan igual. Si el último no convierte, el carrusel no genera DMs ni comentarios.' },
  { n: '05', title: 'Adaptable a cualquier nicho', desc: 'La estructura es la misma (hook → setup → contenido → cierre → CTA). Lo que cambia es el TIPO. IA, fitness, finanzas, marketing, lo que sea.' },
]

const tipos = [
  { n: '01', name: 'Listicle-pack',  when: 'Lista de items intercambiables', use: 'Prompts, errores, herramientas, libros. El 70% de los carruseles caen aquí.' },
  { n: '02', name: 'Step-by-step',   when: 'Tutorial paso a paso',           use: 'Procesos donde el orden importa. Recetas, setups técnicos, rutinas.' },
  { n: '03', name: 'Storytelling',   when: 'Caso real / antes-después',      use: 'Historia personal con tensión y giro. Mucho compartido, menos DM.' },
  { n: '04', name: 'Myth-buster',    when: 'Lo que crees vs la realidad',    use: 'Atacas creencias del nicho. Estructura binaria por slide: mito → verdad.' },
  { n: '05', name: 'Framework',      when: 'Sistema con nombre propio',      use: 'Tu metodología. Componentes que se aplican juntos en orden.' },
  { n: '06', name: 'Hot-take',       when: 'Opinión contraria · manifiesto', use: 'Una postura defendida con argumentos. Genera mucho comentario.' },
]

const bloques = [
  { tag: 'SLIDE 1',      title: 'Hook · para el dedo, promete algo concreto', body: '6-12 palabras máximo. Sin "hilo 🧵", sin "post importante". Patterns que funcionan: número + promesa, negación de lo común, pregunta provocadora, confesión-insight, antes-después con cifra.', accent: false },
  { tag: 'SLIDE 2',      title: 'Setup · engancha al que ya entró',            body: 'Tres opciones: dolor (mostrar el problema), insight contraintuitivo (romper una creencia), o promesa amplificada (subir el stake). Nunca uses el slide 2 para auto-presentarte.', accent: false },
  { tag: 'SLIDES 3 a N-2', title: 'Cuerpo · el valor real',                   body: 'Una idea por slide. Titular en mayúsculas (3-7 palabras) + 1-3 líneas de cuerpo. Mezcla densidad: no todos los slides con la misma cantidad de texto, eso cansa.', accent: false },
  { tag: 'SLIDE N-1',   title: 'Cierre · recap, twist o bonus',               body: 'Cierra el contenido antes del CTA. Recap si es lista de 5+ items. Twist (la lección de fondo) si es story o framework. Bonus si tienes un consejo extra que suma.', accent: false },
  { tag: 'SLIDE FINAL', title: 'CTA · UN único llamado',                      body: 'Drop por DM (palabra clave en MAYÚSCULAS, 4-7 letras: PROMPT, GUÍA, PLAN). Engagement (comentario público). Save/share (cuando es referencia). Nunca "comenta + sigue + comparte + guarda".', accent: true },
]

const antipatrones = [
  'Hooks genéricos: "hilo importante", "tienes que ver esto", "lo que nadie te dice"',
  'Slide 2 con auto-presentación ("hola, soy X, llevo Y años…")',
  'Slides con la misma densidad de texto. El ritmo se pierde y la gente abandona.',
  'Más de un CTA en el último slide ("comenta + sigue + comparte + guarda")',
  'Numeración inconsistente (mezclar 1. con 01)',
  'Emojis decorativos en cada slide',
  'Promesas que el contenido no cumple. Si dijiste "7 prompts", son 7. No 5 + "comenta para los otros 2".',
  'Texto que solo se entiende leído en orden. Cada slide debe tener sentido aunque alguien entre por el medio.',
  'Llamar "swipe" o "desliza" en el propio texto. Eso lo dice el formato, no tú.',
  'Capslock en bloques largos. Mayúsculas selectivas para títulos sí; frases enteras en mayúsculas no.',
]

const ejemplo = `**SLIDE 1 · HOOK**
─────────────────────
TITULAR: 5 prompts que uso a diario
CUERPO: ninguno es del tipo "actúa como experto en…"

**SLIDE 2 · SETUP**
─────────────────────
TITULAR: cero teoría, cero relleno
CUERPO: cada uno con su contexto de uso y el caso real
donde se aplica. cópialos, ajusta los corchetes, listos.

**SLIDE 3 · ITEM 01**
─────────────────────
TITULAR: 01 · DESATASCA UNA DECISIÓN
CUERPO: para cuando llevas días dándole vueltas a algo.

—

soy alguien que lleva días pensando en [DECISIÓN].
hazme 5 preguntas que un coach me haría para forzarme
a tomarla esta semana. ninguna empieza con "qué quieres".

**SLIDE 4 · ITEM 02**
─────────────────────
TITULAR: 02 · APRENDE UN TEMA EN 20 MIN
CUERPO: para cuando entras en una reunión sobre algo
que no dominas.

—

quiero entender [TEMA] en 20 min para hablar con
alguien que sí sabe. dame: 5 conceptos clave, 3 errores
de principiante, 2 preguntas inteligentes.

**SLIDE 5 · ITEM 03**
─────────────────────
TITULAR: 03 · CONVERSACIÓN DIFÍCIL
CUERPO: para cuando tienes que decirle algo incómodo
a alguien y quieres ensayar.

—

actúa como [PERSONA] reaccionando con la peor respuesta
posible. yo respondo. después dame feedback duro: qué
dije bien, qué dije mal, versión mejorada.

**SLIDE 6 · ITEM 04**
─────────────────────
TITULAR: 04 · AUDITOR DE GASTOS
CUERPO: para cuando miras tu cuenta y no sabes
qué pasó este mes.

—

agrupa mi extracto en 5 categorías. dime: el gasto
fantasma más grande, qué % es discrecional, cuál sería
el primer recorte sin moralina.

**SLIDE 7 · ITEM 05**
─────────────────────
TITULAR: 05 · RED TEAM A TU IDEA
CUERPO: para cuando tienes una idea que te gusta
demasiado.

—

actúa como inversor que ya rechazó 50 ideas como esta
este mes. dame los 3 motivos por los que esta también
va a fallar. sin suavizar.

**SLIDE 8 · RECAP**
─────────────────────
TITULAR: en una frase cada uno
CUERPO:
01 desatasca decisiones
02 aprende temas en 20 min
03 ensaya conversaciones difíciles
04 audita gastos
05 red team a tus ideas

**SLIDE 9 · CTA**
─────────────────────
TITULAR: ¿los quieres en formato pegable?
CUERPO: comenta PROMPT aquí abajo y te los mando
los 5 al dm, listos para copiar.

PALABRA CLAVE PARA EL DM: PROMPT`

export default function CarruselPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: var(--font-geist-sans), sans-serif !important;
          background: #0C0A07 !important;
          color: #EDE8DC; min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }
        body::after {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px 180px; pointer-events: none; z-index: 1000; opacity: 0.4;
        }
        :root {
          --copper: #C87533; --copper-dim: rgba(200,117,51,0.12);
          --copper-glow: rgba(200,117,51,0.28);
          --amber: #E8A84E; --verdigris: #3D7A6E; --verdigris-dim: rgba(61,122,110,0.14);
          --cream: #EDE8DC; --cream-dim: #998E82;
          --bg: #0C0A07; --bg2: #141009; --bg3: #1C160C;
          --border: rgba(200,117,51,0.15); --border-mid: rgba(200,117,51,0.28);
        }

        .gc-wrap { max-width: 740px; margin: 0 auto; padding: 0 24px 120px; position: relative; z-index: 1; }

        /* HEADER */
        .gc-header { padding: 48px 0 44px; }
        .gc-kicker {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: #4A3D30; margin-bottom: 20px;
        }
        .gc-pill {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--copper); background: var(--copper-dim);
          border: 1px solid var(--border-mid);
          border-radius: 4px; padding: 5px 12px; margin-bottom: 24px;
        }
        .gc-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 7vw, 4.5rem);
          font-weight: 700; line-height: 0.97;
          letter-spacing: -0.02em; color: var(--cream);
          margin-bottom: 24px;
        }
        .gc-h1 em { font-style: italic; color: var(--copper); }
        .gc-intro { font-size: 16px; color: var(--cream-dim); line-height: 1.85; margin-bottom: 28px; }
        .gc-intro strong { color: var(--cream); font-weight: 600; }
        .gc-intro em { font-style: italic; color: var(--amber); }
        .gc-btns { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
        .gc-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--copper); color: var(--cream);
          padding: 13px 24px; border-radius: 8px;
          font-family: 'DM Mono', monospace; font-size: 12px;
          font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none; transition: box-shadow 0.2s, opacity 0.2s;
        }
        .gc-btn-primary:hover { box-shadow: 0 0 32px var(--copper-glow); opacity: 0.9; }
        .gc-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--bg2); color: var(--cream-dim);
          border: 1px solid var(--border-mid);
          padding: 13px 20px; border-radius: 8px;
          font-family: 'DM Mono', monospace; font-size: 12px;
          letter-spacing: 0.06em; text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .gc-btn-secondary:hover { border-color: var(--copper); color: var(--cream); }
        .gc-meta-row {
          display: flex; flex-wrap: wrap; gap: 20px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.06em; color: #4A3D30;
        }

        /* STATS */
        .gc-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin: 36px 0; }
        .gc-stat {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; padding: 18px 20px;
        }
        .gc-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem; font-weight: 700;
          color: var(--copper); line-height: 1;
          text-shadow: 0 0 24px var(--copper-glow);
        }
        .gc-stat-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #4A3D30; margin-top: 6px;
        }

        /* TOC */
        .gc-toc {
          background: var(--copper-dim); border: 1px solid var(--border-mid);
          border-radius: 12px; padding: 22px 24px; margin: 0 0 52px;
        }
        .gc-toc-title {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 14px;
        }
        .gc-toc-list { list-style: none; display: flex; flex-direction: column; }
        .gc-toc-list li { border-bottom: 1px dashed var(--border); }
        .gc-toc-list li:last-child { border-bottom: none; }
        .gc-toc-list a {
          display: flex; align-items: baseline; gap: 14px;
          padding: 10px 0; font-size: 14px; color: var(--cream-dim);
          text-decoration: none; transition: color 0.2s;
        }
        .gc-toc-list a:hover { color: var(--cream); }
        .gc-toc-num {
          font-family: 'DM Mono', monospace; font-size: 10px;
          color: #4A3D30; flex-shrink: 0; width: 20px;
        }

        /* SECTION HEADING */
        .gc-section { margin-bottom: 72px; }
        .gc-section-kicker {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 10px;
          display: flex; align-items: center; gap: 10px;
        }
        .gc-section-kicker::before {
          content: ''; display: inline-block;
          width: 20px; height: 1px; background: var(--copper); opacity: 0.7;
        }
        .gc-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700; line-height: 1.05;
          letter-spacing: -0.02em; color: var(--cream);
          margin-bottom: 20px;
        }
        .gc-h2 em { font-style: italic; color: var(--copper); }
        .gc-body { font-size: 15px; color: var(--cream-dim); line-height: 1.85; }
        .gc-body p { margin-bottom: 14px; }
        .gc-body p:last-child { margin-bottom: 0; }
        .gc-body strong { color: var(--cream); font-weight: 600; }
        .gc-h3 {
          font-size: 16px; font-weight: 600;
          color: var(--cream); margin: 28px 0 12px;
        }

        /* STEPS LIST */
        .gc-steps { display: flex; flex-direction: column; gap: 0; margin: 16px 0; }
        .gc-step {
          display: flex; align-items: baseline; gap: 16px;
          padding: 14px 0; border-bottom: 1px solid var(--border);
          font-size: 14px; color: var(--cream-dim); line-height: 1.6;
        }
        .gc-step:last-child { border-bottom: none; }
        .gc-step-n {
          font-family: 'Cormorant Garamond', serif; font-size: 1.1rem;
          font-weight: 700; color: var(--copper); flex-shrink: 0; width: 28px;
        }
        .gc-step strong { color: var(--cream); font-weight: 600; }
        .gc-step em { font-style: italic; color: var(--amber); }
        .gc-step code {
          font-family: 'DM Mono', monospace; font-size: 11px;
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 3px; padding: 1px 6px; color: var(--copper);
        }

        /* CODE BOX */
        .gc-code {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; overflow-x: auto; margin: 20px 0;
        }
        .gc-code-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 18px; border-bottom: 1px solid var(--border);
        }
        .gc-code-title {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase; color: #4A3D30;
        }
        .gc-code pre {
          font-family: 'DM Mono', monospace; font-size: 12.5px;
          line-height: 1.8; color: var(--cream-dim);
          white-space: pre-wrap; word-break: break-word; padding: 18px 20px;
        }

        /* CALLOUT */
        .gc-tip {
          background: var(--bg2); border: 1px solid var(--border);
          border-left: 2px solid var(--copper);
          border-radius: 10px; padding: 16px 20px; margin: 20px 0;
        }
        .gc-tip.warn { border-left-color: var(--amber); }
        .gc-tip-head {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 7px;
        }
        .gc-tip.warn .gc-tip-head { color: var(--amber); }
        .gc-tip-body { font-size: 13.5px; color: var(--cream-dim); line-height: 1.7; }
        .gc-tip-body strong { color: var(--cream); font-weight: 600; }
        .gc-tip-body em { font-style: italic; color: var(--amber); }

        /* REGLAS */
        .gc-reglas { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
        .gc-regla {
          display: flex; gap: 18px; align-items: flex-start;
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; padding: 18px 20px;
        }
        .gc-regla-n {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 700; color: var(--copper);
          flex-shrink: 0; line-height: 1; margin-top: 2px;
          text-shadow: 0 0 20px var(--copper-glow);
        }
        .gc-regla-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 5px; }
        .gc-regla-desc { font-size: 13px; color: var(--cream-dim); line-height: 1.65; }

        /* BLOQUES */
        .gc-bloques { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
        .gc-bloque {
          display: flex; flex-direction: column; gap: 6px;
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; padding: 18px 20px;
        }
        .gc-bloque.accent { border-color: var(--border-bright); }
        @media(min-width:600px){
          .gc-bloque { flex-direction: row; align-items: baseline; gap: 20px; }
          .gc-bloque-tag { width: 120px; flex-shrink: 0; }
        }
        .gc-bloque-tag {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper);
        }
        .gc-bloque-title {
          font-style: italic; font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-weight: 600; color: var(--cream); margin-bottom: 4px;
        }
        .gc-bloque-body { font-size: 13px; color: var(--cream-dim); line-height: 1.65; }

        /* TIPOS */
        .gc-tipos { display: grid; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-tipos { grid-template-columns: 1fr 1fr; } }
        .gc-tipo {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 12px; padding: 18px 20px;
        }
        .gc-tipo-top { display: flex; align-items: baseline; gap: 10px; margin-bottom: 6px; }
        .gc-tipo-n {
          font-family: 'DM Mono', monospace; font-size: 10px; color: #4A3D30;
        }
        .gc-tipo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 700; font-style: italic; color: var(--cream);
        }
        .gc-tipo-when {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 6px;
        }
        .gc-tipo-use { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

        /* ANTIPATRONES */
        .gc-anti { display: flex; flex-direction: column; gap: 8px; margin: 20px 0; }
        .gc-anti-item {
          display: flex; align-items: flex-start; gap: 14px;
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 10px; padding: 14px 16px;
          font-size: 13.5px; color: var(--cream-dim); line-height: 1.6;
        }
        .gc-anti-n {
          font-family: 'DM Mono', monospace; font-size: 10px;
          color: rgba(239,68,68,0.6); flex-shrink: 0; margin-top: 2px;
        }

        /* PAQUETE */
        .gc-files { display: grid; gap: 8px; margin: 16px 0; }
        @media(min-width:560px){ .gc-files { grid-template-columns: 1fr 1fr; } }
        .gc-file {
          display: flex; align-items: center; gap: 10px;
          background: var(--bg3); border: 1px solid var(--border);
          border-radius: 8px; padding: 10px 14px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: var(--cream-dim); letter-spacing: 0.04em;
        }
        .gc-file-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--copper); flex-shrink: 0; }

        /* DIVIDER */
        .gc-divider {
          height: 1px; margin: 60px 0;
          background: linear-gradient(90deg, transparent, var(--border-mid), transparent);
        }

        /* CTA FINAL */
        .gc-cta {
          background: var(--bg2); border: 1px solid var(--border-mid);
          border-radius: 16px; padding: 40px; text-align: center; margin-top: 72px;
          position: relative; overflow: hidden;
        }
        .gc-cta-tag {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--copper); margin-bottom: 16px;
        }
        .gc-cta h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: var(--cream);
          line-height: 1.1; margin-bottom: 12px;
        }
        .gc-cta h3 em { font-style: italic; color: var(--copper); }
        .gc-cta p { font-size: 14px; color: var(--cream-dim); line-height: 1.75; margin-bottom: 28px; }
      `}</style>

      <CopperNav activeHref="/recursos" />

      <div className="gc-wrap">

        {/* HEADER */}
        <div className="gc-header">
          <div className="gc-kicker">Skill · Carrusel de Instagram</div>
          <div className="gc-pill">Skill instalable · plug and play</div>
          <h1 className="gc-h1">
            Carruseles que paran el scroll<br />y disparan <em>DMs.</em>
          </h1>
          <p className="gc-intro">
            Una <strong>skill instalable</strong> para Claude que escribe el copy completo de un carrusel de IG slide por slide, desde la portada que para el scroll hasta el CTA que dispara conversación o DMs.{' '}
            <em>No es un curso. Es la skill.</em>
          </p>
          <div className="gc-btns">
            <a href="#instalar" className="gc-btn-primary">↓ Cómo instalarla</a>
            <a href="#anatomia" className="gc-btn-secondary">Ver anatomía →</a>
          </div>
          <div className="gc-meta-row">
            <span>— skill · descarga directa</span>
            <span>— 6 tipos de carrusel</span>
            <span>— adaptable a cualquier nicho</span>
          </div>
        </div>

        {/* STATS */}
        <div className="gc-stats">
          <div className="gc-stat">
            <div className="gc-stat-num">6-10</div>
            <div className="gc-stat-label">slides por carrusel</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">2s</div>
            <div className="gc-stat-label">por slide o no se lee</div>
          </div>
          <div className="gc-stat">
            <div className="gc-stat-num">UN</div>
            <div className="gc-stat-label">solo CTA al final</div>
          </div>
        </div>

        {/* TOC */}
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

        {/* QUÉ ES */}
        <div className="gc-section" id="que-es">
          <div className="gc-section-kicker">Qué es</div>
          <h2 className="gc-h2">Una skill que escribe carruseles<br /><em>como tú.</em></h2>
          <div className="gc-body">
            <p>Esta skill produce el copy de un carrusel de Instagram, slide por slide, desde la portada que para el scroll hasta el CTA que dispara conversación o DMs. Es el formato más rentable de IG: alto guardado, alto compartido, alto comentario si está bien cerrado.</p>
            <p>No es un caption. No es un reel. Es una secuencia de 6-10 slides donde cada uno tiene UN trabajo: enganchar, contextualizar, entregar, o convertir.</p>
          </div>
        </div>

        <div className="gc-divider" />

        {/* INSTALACIÓN */}
        <div className="gc-section" id="instalar">
          <div className="gc-section-kicker">01 · Instalación</div>
          <h2 className="gc-h2">Cómo <em>instalarla</em><br />en Claude</h2>
          <div className="gc-body">
            <p>El archivo <code style={{fontFamily:'DM Mono,monospace',fontSize:12,background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:3,padding:'1px 6px',color:'var(--copper)'}}>SKILL.md</code> contiene la skill principal y 3 archivos de referencia que Claude lee cuando los necesita. Lo subís una vez y queda disponible en cada chat de tu Project.</p>
          </div>

          <div className="gc-h3">Pasos</div>
          <div className="gc-steps">
            <div className="gc-step">
              <span className="gc-step-n">01</span>
              <span>Descargá el archivo <code>ig-carousel.skill</code> (o copiá el contenido de abajo).</span>
            </div>
            <div className="gc-step">
              <span className="gc-step-n">02</span>
              <span>Abrí Claude en la web → entrá al Project donde querés usar la skill (o creá uno nuevo).</span>
            </div>
            <div className="gc-step">
              <span className="gc-step-n">03</span>
              <span>En la sección <strong>Skills</strong> del Project, subí el archivo. Claude lo procesa solo.</span>
            </div>
            <div className="gc-step">
              <span className="gc-step-n">04</span>
              <span>Ya está. Escribí algo como <em>"hazme un carrusel sobre [tema]"</em> y Claude activa la skill automáticamente.</span>
            </div>
          </div>

          <div className="gc-tip">
            <div className="gc-tip-head">— Cómo activarla</div>
            <div className="gc-tip-body">
              La skill se dispara cuando pedís "un carrusel", "el copy del carrusel", "los slides", "un post de varias diapositivas", o cuando le pasás un tema y decís que querés convertirlo en carrusel.
            </div>
          </div>

          <div className="gc-h3">Qué viene dentro del paquete</div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">ig-carousel/</span>
            </div>
            <pre>{`ig-carousel/
├── SKILL.md                    ← la skill principal
└── references/
    ├── anatomia.md             ← cada bloque del carrusel
    ├── tipos-de-carrusel.md    ← los 6 tipos con plantilla
    └── ejemplos.md             ← carruseles completos por nicho`}</pre>
          </div>

          <div className="gc-files">
            {['SKILL.md', 'references/anatomia.md', 'references/tipos-de-carrusel.md', 'references/ejemplos.md'].map(f => (
              <div key={f} className="gc-file">
                <span className="gc-file-dot" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* REGLAS */}
        <div className="gc-section" id="reglas">
          <div className="gc-section-kicker">Las 5 reglas</div>
          <h2 className="gc-h2">Las 5 reglas <em>no negociables</em></h2>
          <div className="gc-body">
            <p>Si la skill rompe alguna de estas, el carrusel no funciona. Da igual el tema, el nicho o el tono. Estas son las reglas que hacen que el formato rinda.</p>
          </div>
          <div className="gc-reglas">
            {reglas.map(r => (
              <div key={r.n} className="gc-regla">
                <span className="gc-regla-n">{r.n}</span>
                <div>
                  <div className="gc-regla-title">{r.title}</div>
                  <div className="gc-regla-desc">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* ANATOMÍA */}
        <div className="gc-section" id="anatomia">
          <div className="gc-section-kicker">Anatomía</div>
          <h2 className="gc-h2">Los 5 bloques de <em>cualquier</em> carrusel</h2>
          <div className="gc-body">
            <p>Da igual el tipo: todo carrusel se compone de los mismos 5 bloques. Cambia lo que va dentro, pero el esqueleto es el mismo.</p>
          </div>
          <div className="gc-bloques">
            {bloques.map(b => (
              <div key={b.tag} className={`gc-bloque${b.accent ? ' accent' : ''}`}>
                <span className="gc-bloque-tag">{b.tag}</span>
                <div>
                  <div className="gc-bloque-title">{b.title}</div>
                  <div className="gc-bloque-body">{b.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Truco</div>
            <div className="gc-tip-body">
              Si el slide 1 ya hizo todo el trabajo (hook fuerte + cuerpo que contextualiza), podés saltar el setup y pasar directo al primer ítem. Carrusel de 8 slides en lugar de 9. <em>No fuerces el setup.</em>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* 6 TIPOS */}
        <div className="gc-section" id="tipos">
          <div className="gc-section-kicker">Los 6 tipos</div>
          <h2 className="gc-h2">Cada carrusel encaja en <em>uno</em> de estos</h2>
          <div className="gc-body">
            <p>Identificá el tipo antes de escribir. La estructura interna y el ritmo cambian. Mezclar tipos = un carrusel que hace dos cosas a medias.</p>
          </div>
          <div className="gc-tipos">
            {tipos.map(t => (
              <div key={t.n} className="gc-tipo">
                <div className="gc-tipo-top">
                  <span className="gc-tipo-n">{t.n}</span>
                  <span className="gc-tipo-name">{t.name}</span>
                </div>
                <div className="gc-tipo-when">{t.when}</div>
                <div className="gc-tipo-use">{t.use}</div>
              </div>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Si dudás entre dos tipos</div>
            <div className="gc-tip-body">
              Elegí el más concreto. Un <strong>listicle</strong> casi siempre va a rendir más que un <strong>hot-take</strong> si el contenido permite ambos. Los listicles son el formato de mayor guardado.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* EJEMPLO */}
        <div className="gc-section" id="ejemplo">
          <div className="gc-section-kicker">Ejemplo completo</div>
          <h2 className="gc-h2">Un carrusel <em>listicle</em> · 9 slides</h2>
          <div className="gc-body">
            <p>Cinco prompts de IA, formato pegable. Esto es lo que te entrega la skill cuando le pedís un carrusel. Copiá el ritmo, no el contenido.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <span className="gc-code-title">output / carrusel-prompts.txt</span>
            </div>
            <pre>{ejemplo}</pre>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Otros 5 ejemplos completos</div>
            <div className="gc-tip-body">
              El paquete incluye carruseles completos para empleo (storytelling), productividad (hot-take), marketing (framework), finanzas (myth-buster) y ciberseguridad (step-by-step). Cubren los 6 tipos con tono adaptado por nicho.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* ANTI-PATRONES */}
        <div className="gc-section" id="errores">
          <div className="gc-section-kicker">Anti-patrones</div>
          <h2 className="gc-h2">Errores que <em>matan</em> un carrusel</h2>
          <div className="gc-body">
            <p>La skill ya viene blindada contra estos. Pero conviene que los reconozcas para no añadirlos vos al revisar el output.</p>
          </div>
          <div className="gc-anti">
            {antipatrones.map((a, i) => (
              <div key={i} className="gc-anti-item">
                <span className="gc-anti-n">{String(i + 1).padStart(2, '0')}</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>Una skill resuelve un caso.<br /><em>Dominá el formato.</em></h3>
          <p>
            Instalá la skill, pedile a Claude un carrusel sobre tu próximo tema<br />
            y publicá. El formato que más guarda y comparte en Instagram.
          </p>
          <a href="/recursos" className="gc-btn-primary">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
