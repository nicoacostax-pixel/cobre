import type { Metadata } from 'next'
import { CopperNav } from '../../components/CopperNav'

export const metadata: Metadata = {
  title: 'Video con Claude Code y Remotion — Guía 06 · Nico IA',
  description: 'Sin After Effects, sin timeline, sin keyframes. Setup en 1 comando, video en React, render a MP4 desde la terminal. 1 plantilla = 100 reels.',
}

const toc = [
  { id: 'que-es',   label: 'Qué es Remotion + qué hace la skill' },
  { id: 'setup',    label: 'Setup en 1 comando' },
  { id: 'anatomia', label: 'Anatomía del proyecto' },
  { id: 'modelo',   label: 'Mental model · frames, no segundos' },
  { id: 'prompt',   label: 'El prompt que le doy a Claude' },
  { id: 'output',   label: 'Lo que Claude escribe por vos' },
  { id: 'render',   label: 'Render · del preview al MP4' },
  { id: 'debug',    label: 'Lo que se rompe la primera vez' },
  { id: 'combos',   label: 'Cómo se vuelve sistema' },
]

const piezasSkill = [
  { name: '<Composition>',      role: 'Define un video.',     body: 'id, fps, width, height, durationInFrames. Todo fijo, declarativo.' },
  { name: '<Sequence>',         role: 'Escena con timing.',   body: '"Esto aparece en frame 30 y dura 60." Componés el video como Lego.' },
  { name: 'useCurrentFrame()',  role: 'El frame actual.',     body: 'Hook que devuelve qué frame se renderiza ahora. Toda animación parte de aquí.' },
  { name: 'interpolate + spring', role: 'Animaciones reales.', body: 'interpolate para movimiento lineal, spring para físico (rebote, aceleración natural).' },
]

const errores = [
  { n: '01', title: '"Claude no usa la skill, da código mediocre"',    body: 'Pasa cuando la skill se instaló global pero el proyecto está en local. Fuérzala dentro de Claude Code con /skill remotion-best-practices, o nómbrala en el prompt: "Usando las reglas de remotion-best-practices, crea...".' },
  { n: '02', title: '"El render falla con error raro de Chrome"',       body: 'Casi siempre son CSS animations que Claude metió a pesar de la skill. Buscalas con grep -rn "@keyframes\\|animation:\\|transition:" src/ y pedile reescribirlas con interpolate y spring.' },
  { n: '03', title: '"El video va a tirones, no fluye"',               body: 'Casi siempre Claude usó interpolate donde debía usar spring. interpolate es lineal y los humanos vemos lineal como rígido. spring imita física natural.' },
  { n: '04', title: '"Quiero música pero no sé dónde meterla"',        body: 'Ponés el archivo en public/audio.mp3 y le decís a Claude: "añade audio.mp3 al video con fade in de 30 frames y fade out de 30 frames al final, usando <Audio> y volumen interpolado". La skill sabe el patrón.' },
]

const setupNuevo = `# elige tu package manager: npm, pnpm, yarn o bun
$ bun create video

# o: npm create video · pnpm create video · yarn create video

# te pregunta:
? Project name: my-video
? Template: blank
? TypeScript: Yes
? Add Agent Skills? Yes        # ← ESTO
? Install dependencies: Yes`

const setupExistente = `$ cd mi-proyecto-remotion

# instala las skills en .claude/skills/
$ npx skills add remotion-dev/skills

# o desde dentro de Remotion:
$ npx remotion skills add`

const setupVerifica = `$ ls .claude/skills/
remotion-best-practices/         # ← aquí está

$ ls .claude/skills/remotion-best-practices/
SKILL.md
rules/                           # 28 archivos de reglas`

const estructura = `my-video/
│
├── .claude/
│   └── skills/
│       └── remotion-best-practices/    # ← LA SKILL
│           ├── SKILL.md
│           └── rules/
│               ├── animations.md
│               ├── audio.md
│               ├── compositions.md
│               ├── subtitles.md
│               └── ... (24 más)
│
├── src/
│   ├── Root.tsx           # el "compositor": registra videos
│   ├── Composition.tsx    # el video en sí (JSX)
│   └── index.ts           # entry point
│
├── public/                # imágenes, audio, fuentes
├── out/                   # aquí saldrán los MP4
│
├── remotion.config.ts     # config de render
└── package.json`

const promptTemplate = `Crea un video vertical de 20 segundos a 30 fps
(formato 1080×1920, para Reels/TikTok).

Composición se llama "hook-skills". Tres escenas:

Escena 1 · 0-180 frames (6 seg)
- Fondo crema (#F2EDE2)
- Texto centrado: "La mayoría usa Claude con un prompt suelto."
- Aparece con spring desde y=20 a y=0
- Tipografía: Inter, weight 800, color #1A1A1A

Escena 2 · 180-420 frames (8 seg)
- Mismo fondo
- Texto: "Yo tengo skills. Y dejé de pegar el mismo prompt 50×/día."
- Aparece línea a línea con stagger de 15 frames

Escena 3 · 420-600 frames (6 seg · CTA)
- Texto: "Comenta SKILLS y te paso las 5"
- Pulsa con spring cada 60 frames

Reglas:
- usa interpolate y spring, nunca CSS animations
- saca todo en frames, no en ms
- crea el componente en src/HookSkills.tsx
  y regístralo en src/Root.tsx
- si necesitas fuente, usa @remotion/google-fonts`

const outputCode = `import {
  AbsoluteFill, Sequence, interpolate, spring,
  useCurrentFrame, useVideoConfig
} from "remotion";

export const HookSkills: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F2EDE2" }}>
      <Sequence from={0} durationInFrames={180}>
        <Scene1 />
      </Sequence>
      <Sequence from={180} durationInFrames={240}>
        <Scene2 />
      </Sequence>
      <Sequence from={420} durationInFrames={180}>
        <Scene3CTA />
      </Sequence>
    </AbsoluteFill>
  );
};

// Escena 1 · texto entra con spring
const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const y = spring({ frame, fps, from: 20, to: 0 });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{
      justifyContent: "center",
      alignItems: "center",
      transform: \`translateY(\${y}px)\`,
      opacity,
    }}>
      <h1 style={{
        fontFamily: "Inter",
        fontWeight: 800,
        fontSize: 72,
        textAlign: "center",
        padding: "0 80px",
        color: "#1A1A1A",
      }}>
        La mayoría usa Claude
      </h1>
    </AbsoluteFill>
  );
};

// Scene2 y Scene3CTA siguen el mismo patrón
// con spring + interpolate.`

const renderCmds = `# básico · saca el MP4 a out/hook-skills.mp4
$ npx remotion render hook-skills out/hook-skills.mp4

# vertical para Reels/TikTok (1080×1920)
$ npx remotion render hook-skills out/reel.mp4 \\
    --width=1080 --height=1920

# calidad alta (CRF más bajo = más calidad, archivo más grande)
$ npx remotion render hook-skills out/hd.mp4 --crf=18

# como GIF para preview rápido
$ npx remotion render hook-skills out/preview.gif --codec=gif

# mismo video, distinto texto (parametrizado)
$ npx remotion render hook-skills out/v2.mp4 \\
    --props='{"hook":"Otro hook diferente"}'`

const combos = [
  { n: '01', when: 'IDEA → GUION',       title: 'brand-voice → prompt',   body: 'Pedís un guion de 20s a brand-voice. Lo pegás tal cual al prompt de Remotion. El video sale en tu voz.', link: null },
  { n: '02', when: '1 VIDEO → 4 PIEZAS', title: 'render → repurpose',     body: 'Sacás el MP4. Le das el guion a content-repurpose. Tenés carrusel + tweet + email del mismo ángulo.', link: '/recursos/carrusel' },
  { n: '03', when: 'ESCALA',             title: '1 plantilla → 50 reels', body: 'Parametrizás la Composition con un campo hook. Tirás un script que llama npx remotion render 50 veces con 50 hooks distintos. Te despertás con 50 reels listos.', link: null },
]

const flujoMental = [
  { n: '01', title: 'Defino duración', sub: 'en frames' },
  { n: '02', title: 'Compongo escenas', sub: '<Sequence>' },
  { n: '03', title: 'Animo cada una', sub: 'interpolate / spring' },
  { n: '04', title: 'Renderizo', sub: 'remotion render' },
]

export default function VideoPage() {
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

        .gc-grid-2 { display: grid; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-grid-2 { grid-template-columns: 1fr 1fr; } }
        .gc-grid-4 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0; }
        @media(min-width:560px){ .gc-grid-4 { grid-template-columns: repeat(4, 1fr); } }
        .gc-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px; }
        .gc-card-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); margin-bottom: 6px; }
        .gc-card-title { font-size: 13px; font-weight: 600; color: var(--cream); margin-bottom: 4px; }
        .gc-card-body { font-size: 12px; color: var(--cream-dim); line-height: 1.5; }

        .gc-skill-card-bad { background: rgba(200,64,64,0.06); border: 1px solid rgba(200,64,64,0.2); border-radius: 12px; padding: 16px 18px; }
        .gc-skill-card-good { background: rgba(61,122,110,0.08); border: 1px solid rgba(61,122,110,0.2); border-radius: 12px; padding: 16px 18px; }
        .gc-skill-kicker-bad { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #C84040; margin-bottom: 6px; }
        .gc-skill-kicker-good { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--verdigris); margin-bottom: 6px; }
        .gc-skill-title { font-size: 13px; font-weight: 600; color: var(--cream); margin-bottom: 4px; }
        .gc-skill-body { font-size: 12px; color: var(--cream-dim); line-height: 1.5; }

        .gc-archivos { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .gc-archivo-item { display: flex; gap: 10px; align-items: baseline; font-size: 13px; color: var(--cream-dim); }
        .gc-archivo-arrow { color: var(--copper); font-family: 'DM Mono', monospace; font-size: 11px; flex-shrink: 0; }
        .gc-archivo-code { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--copper); }

        .gc-errores { display: flex; flex-direction: column; gap: 12px; margin: 20px 0; }
        .gc-error { display: flex; gap: 20px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 18px 20px; }
        .gc-error-n { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-style: italic; font-weight: 700; color: var(--copper); line-height: 1; flex-shrink: 0; }
        .gc-error-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 6px; }
        .gc-error-body { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }

        .gc-combos { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
        .gc-combo { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; }
        .gc-combo.accent { border-color: var(--border-mid); background: rgba(200,117,51,0.06); }
        .gc-combo-when { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: #4A3D30; margin-bottom: 6px; }
        .gc-combo-title { font-size: 14px; font-weight: 600; color: var(--cream); margin-bottom: 6px; font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; }
        .gc-combo-body { font-size: 13px; color: var(--cream-dim); line-height: 1.6; }
        .gc-combo-link { font-size: 12px; color: var(--copper); text-decoration: none; margin-top: 8px; display: inline-block; }

        .gc-prompt-rules { margin: 16px 0; display: flex; flex-direction: column; gap: 8px; }
        .gc-rule { display: flex; gap: 10px; align-items: baseline; font-size: 13px; color: var(--cream-dim); border-radius: 8px; padding: 10px 14px; }
        .gc-rule.ok { background: rgba(61,122,110,0.08); border: 1px solid rgba(61,122,110,0.15); }
        .gc-rule.bad { background: rgba(200,64,64,0.06); border: 1px solid rgba(200,64,64,0.15); }
        .gc-rule-icon { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 700; flex-shrink: 0; }
        .gc-rule.ok .gc-rule-icon { color: var(--verdigris); }
        .gc-rule.bad .gc-rule-icon { color: #C84040; }

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
          <div className="gc-kicker">Guía 06 · Video · Claude Code · Remotion · 2026</div>
          <div className="gc-pill">Sin After Effects · sin timeline</div>
          <h1 className="gc-h1">
            Le hablo. Él escribe el código.<br />
            <em>Sale un MP4.</em>
          </h1>
          <p className="gc-intro">
            Cómo hago un video desde cero con <strong>Claude Code</strong> y la skill de <strong>Remotion</strong>. Sin After Effects, sin timeline, sin mover keyframes a mano.
          </p>
          <p className="gc-intro">
            <strong>~2 minutos</strong> de setup · <strong>1 comando</strong> para empezar · <strong>0€</strong> por video.
          </p>
          <div className="gc-divider-h" />
        </div>

        {/* TOC */}
        <div className="gc-toc">
          <div className="gc-toc-title">El recorrido</div>
          <div className="gc-toc-links">
            {toc.map(item => (
              <a key={item.id} href={`#${item.id}`}>{item.label}</a>
            ))}
          </div>
        </div>

        {/* QUÉ ES REMOTION */}
        <div className="gc-section" id="que-es">
          <div className="gc-section-kicker">Empezá acá</div>
          <h2 className="gc-h2">Qué es Remotion.<br /><em>Y qué hace la skill.</em></h2>
          <div className="gc-body">
            <p><strong>Remotion</strong> es un framework para hacer videos escribiendo código React. En vez de arrastrar clips en un timeline, escribís JSX, definís escenas, y exportás un MP4 desde la terminal.</p>
            <p>Un video deja de ser <em>"un archivo que editás"</em> y se convierte en <em>"un componente que renderizás"</em>. Eso significa: versionable en Git, parametrizable (1 plantilla = 100 videos) y, lo importante, escribible por un agente como Claude Code.</p>
            <p>Pero Claude solo no escribe Remotion bien. Mete CSS animations que rompen al renderizar, calcula timing en milisegundos cuando debería ser en frames, y se inventa APIs que no existen. Por eso existe la <strong>Agent Skill de Remotion</strong>: 28 archivos de reglas que Claude carga sola al detectar un proyecto Remotion.</p>
          </div>
          <div className="gc-grid-2">
            <div className="gc-skill-card-bad">
              <div className="gc-skill-kicker-bad">Sin la Skill</div>
              <div className="gc-skill-title">Claude improvisa.</div>
              <div className="gc-skill-body">Mezcla CSS keyframes con código React, calcula mal los frames, los renders fallan o salen bruscos.</div>
            </div>
            <div className="gc-skill-card-good">
              <div className="gc-skill-kicker-good">Con la Skill</div>
              <div className="gc-skill-title">Claude usa Remotion bien.</div>
              <div className="gc-skill-body">Usa interpolate y spring, mide en frames, compone con Sequence. Sale a la primera.</div>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* SETUP */}
        <div className="gc-section" id="setup">
          <div className="gc-paso-label">Paso 01 · Setup</div>
          <h2 className="gc-h2">Un comando.<br /><em>Y a correr.</em></h2>
          <div className="gc-body">
            <p>Pre-requisitos: <strong>Node 18+</strong> instalado y <strong>Claude Code</strong>. Nada más.</p>
          </div>
          <h3 className="gc-h3">Opción A · Proyecto nuevo (recomendada)</h3>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal · proyecto nuevo</span>
            </div>
            <pre>{setupNuevo}</pre>
          </div>
          <h3 className="gc-h3">Opción B · Ya tenés proyecto Remotion</h3>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal · proyecto existente</span>
            </div>
            <pre>{setupExistente}</pre>
          </div>
          <h3 className="gc-h3">Verificá que se instaló</h3>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal · verificar</span>
            </div>
            <pre>{setupVerifica}</pre>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— La skill viaja con el proyecto</div>
            <div className="gc-tip-body">
              Vive en <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>.claude/skills/</code>, dentro del repo. Eso significa que se versiona en Git, que el equipo entero la usa igual, y que cada proyecto tiene SUS propias reglas.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* ANATOMÍA */}
        <div className="gc-section" id="anatomia">
          <div className="gc-paso-label">Paso 02 · Anatomía</div>
          <h2 className="gc-h2">Qué hay <em>dentro</em><br />del proyecto.</h2>
          <div className="gc-body">
            <p>El comando te crea una estructura predecible. Lo importante son tres sitios: dónde vive la skill, dónde vive el código del video, y dónde sale el MP4.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">my-video/ · estructura tras bun create video</span>
            </div>
            <pre>{estructura}</pre>
          </div>
          <h3 className="gc-h3">Los 3 archivos que vas a tocar</h3>
          <div className="gc-archivos">
            {[
              { code: 'src/Composition.tsx', desc: 'Aquí vive el video. Es un componente React. Claude lo edita por vos.' },
              { code: 'src/Root.tsx',        desc: 'Registra qué composiciones existen. Si añadís un video nuevo, aquí se anota.' },
              { code: 'remotion.config.ts',  desc: 'Formato de salida (codec, resolución). Casi nunca lo tocás.' },
            ].map(a => (
              <div key={a.code} className="gc-archivo-item">
                <span className="gc-archivo-arrow">→</span>
                <span><span className="gc-archivo-code">{a.code}</span> · {a.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* MENTAL MODEL */}
        <div className="gc-section" id="modelo">
          <div className="gc-paso-label">Paso 03 · Mental model</div>
          <h2 className="gc-h2">El video se mide en <em>frames</em>,<br />no en segundos.</h2>
          <div className="gc-body">
            <p>Esta es la idea que cambia todo. Si tu video va a 30 fps (frames por segundo), el frame 90 es el segundo 3. La animación nunca se piensa en <em>"que dure 2 segundos"</em>. Se piensa en <em>"que dure 60 frames"</em>.</p>
            <p>La skill instala esa lógica en Claude. Por eso deja de mezclar CSS animations (que se miden en ms) con código de render (que se mide en frames).</p>
          </div>
          <h3 className="gc-h3">Las 4 piezas que la skill le enseña a Claude</h3>
          <div className="gc-grid-2">
            {piezasSkill.map(p => (
              <div key={p.name} className="gc-card">
                <div className="gc-card-tag">{p.name}</div>
                <div className="gc-card-title">{p.role}</div>
                <div className="gc-card-body">{p.body}</div>
              </div>
            ))}
          </div>
          <div className="gc-tip warn">
            <div className="gc-tip-head">— Lo que la skill prohíbe</div>
            <div className="gc-tip-body">
              Cero CSS animations (<code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>@keyframes</code>, <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>transition</code>, <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>animation</code>). Cero <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>setTimeout</code>. Cero medir tiempo en milisegundos. Esto es lo que hace que los renders dejen de fallar.
            </div>
          </div>
          <h3 className="gc-h3">Flujo mental</h3>
          <div className="gc-grid-4">
            {flujoMental.map(f => (
              <div key={f.n} className="gc-card">
                <div className="gc-card-tag">Paso {f.n}</div>
                <div className="gc-card-title">{f.title}</div>
                <div className="gc-card-body" style={{ fontFamily: 'DM Mono', fontSize: '11px', color: '#4A3D30' }}>{f.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="gc-divider" />

        {/* EL PROMPT */}
        <div className="gc-section" id="prompt">
          <div className="gc-paso-label">Paso 04 · El prompt</div>
          <h2 className="gc-h2">Cómo le pido<br /><em>un video real.</em></h2>
          <div className="gc-body">
            <p>Abro Claude Code dentro de la carpeta del proyecto. La skill se carga sola en cuanto detecta el proyecto Remotion. No tengo que invocar nada.</p>
            <p>El prompt no es <em>"hacé un video chulo"</em>. Es específico: duración, escenas, ángulo. Cuanto más concreto, menos itera.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">claude code · prompt template</span>
            </div>
            <pre>{promptTemplate}</pre>
          </div>
          <h3 className="gc-h3">Bien · y mal</h3>
          <div className="gc-prompt-rules">
            <div className="gc-rule ok">
              <span className="gc-rule-icon">✓</span>
              <span><strong style={{ color: 'var(--cream)' }}>Bien:</strong> duración en frames, fps explícito, dónde guardar el archivo, prohibir CSS animations.</span>
            </div>
            <div className="gc-rule bad">
              <span className="gc-rule-icon">✗</span>
              <span><strong style={{ color: 'var(--cream)' }}>Mal:</strong> <em>"que dure unos 20 segundos"</em>, no decir dónde va el componente, asumir que Claude sabe la marca.</span>
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* EL OUTPUT */}
        <div className="gc-section" id="output">
          <div className="gc-paso-label">Paso 05 · El output</div>
          <h2 className="gc-h2">Esto es lo que<br /><em>acaba escribiendo.</em></h2>
          <div className="gc-body">
            <p>No tenés que escribir esto a mano. Claude lo hace solo. Lo dejo aquí para que veas cómo se ve un componente Remotion bien hecho. El tipo de código que la skill obliga a producir.</p>
          </div>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">src/HookSkills.tsx · output de Claude Code</span>
            </div>
            <pre>{outputCode}</pre>
          </div>
          <div className="gc-tip info">
            <div className="gc-tip-head">— Lo que está bien</div>
            <div className="gc-tip-body">
              Medido en frames, animaciones con <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>spring</code> e <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>interpolate</code>, escenas separadas con <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>{'<Sequence>'}</code>. Cero CSS animations. Es lo que la skill obliga.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* RENDER */}
        <div className="gc-section" id="render">
          <div className="gc-paso-label">Paso 06 · Render</div>
          <h2 className="gc-h2">Del preview<br /><em>al MP4 final.</em></h2>
          <div className="gc-body">
            <p>Mientras Claude trabaja, dejo el preview corriendo en otra pestaña. Veo cada cambio en directo. Cuando me gusta, renderizo.</p>
          </div>
          <h3 className="gc-h3">Preview en vivo · localhost:3000</h3>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal · preview</span>
            </div>
            <pre>{`# abre Remotion Studio en el navegador
$ bun run dev          # o: npm run dev

# → http://localhost:3000
# → ves el video, scrubs por frames, ajustás mientras Claude edita`}</pre>
          </div>
          <h3 className="gc-h3">Render a MP4</h3>
          <div className="gc-code">
            <div className="gc-code-header">
              <div className="gc-code-dots">
                <div className="gc-code-dot" style={{ background: '#ff5f57' }} />
                <div className="gc-code-dot" style={{ background: '#ffbd2e' }} />
                <div className="gc-code-dot" style={{ background: '#28c941' }} />
              </div>
              <span className="gc-code-title">terminal · render</span>
            </div>
            <pre>{renderCmds}</pre>
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Atajo · 1 plantilla = 100 videos</div>
            <div className="gc-tip-body">
              El último comando es la magia real. Si parametrizás tu Composition (le pasás el texto del hook como prop), tirás un script que renderiza 100 versiones distintas con 100 hooks distintos en una noche. Eso separa <em>"hago videos"</em> de <em>"tengo un sistema"</em>.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* DEBUG */}
        <div className="gc-section" id="debug">
          <div className="gc-section-kicker">Debug</div>
          <h2 className="gc-h2">Lo que se rompe<br /><em>la primera vez.</em></h2>
          <div className="gc-body">
            <p>No es que vaya a salir mal. Es que va a salir mal de una de estas formas concretas. Aquí tenés el desbloqueo de cada una.</p>
          </div>
          <div className="gc-errores">
            {errores.map(e => (
              <div key={e.n} className="gc-error">
                <span className="gc-error-n">{e.n}</span>
                <div>
                  <div className="gc-error-title">{e.title}</div>
                  <div className="gc-error-body">{e.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="gc-tip">
            <div className="gc-tip-head">— Regla rápida · spring vs interpolate</div>
            <div className="gc-tip-body">
              Movimiento (entrar, salir, escalar): <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>spring</code>. Cambios suaves de valor (opacidad de 0 a 1, color, número que cuenta): <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>interpolate</code>. Si dudás, probá <code style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--copper)' }}>spring</code> primero.
            </div>
          </div>
        </div>

        <div className="gc-divider" />

        {/* COMBOS */}
        <div className="gc-section" id="combos">
          <div className="gc-section-kicker">El truco</div>
          <h2 className="gc-h2">Esto solo no sirve.<br /><em>Combínalo</em> con lo demás.</h2>
          <div className="gc-body">
            <p>Un video Remotion suelto es un MP4 chulo en una carpeta. Donde se vuelve sistema es cuando lo enchufás con las otras skills que ya tenés.</p>
          </div>
          <div className="gc-combos">
            {combos.map(c => (
              <div key={c.n} className={`gc-combo${c.n === '03' ? ' accent' : ''}`}>
                <div className="gc-combo-when">Combo {c.n} · {c.when}</div>
                <div className="gc-combo-title">{c.title}</div>
                <div className="gc-combo-body">{c.body}</div>
                {c.link && <a href={c.link} className="gc-combo-link">Ver la skill de carruseles →</a>}
              </div>
            ))}
          </div>
          <div className="gc-tip info">
            <div className="gc-tip-head">— El último consejo · el de verdad</div>
            <div className="gc-tip-body">
              El primer video va a salir feo. El segundo, decente. El cuarto, ya enseñable. La skill no te hace senior en Remotion. Te hace operativo. Lo que separa los videos buenos de los regulares no es la skill: es el guion. <strong>Trabajá el guion antes que la animación. Siempre.</strong>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="gc-cta">
          <div className="gc-cta-tag">— el siguiente paso</div>
          <h3>La guía te enseña.<br /><em>La comunidad te lo monta con vos.</em></h3>
          <p>Dentro de la comunidad: skills nuevas cada semana, plantillas parametrizadas listas para tirar 50 videos en una noche, sesiones de guion para tus reels, y casos reales de gente publicando con Claude todos los días.</p>
          <a href="/recursos" className="gc-btn-primary">Ver todas las guías →</a>
        </div>

      </div>
    </>
  )
}
