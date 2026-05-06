import { ArrowRight, ArrowDown } from "lucide-react";
import ContactForm from "./components/ContactForm";
import FadeIn from "./components/FadeIn";
import FAQ from "./components/FAQ";
import Portfolio from "./components/Portfolio";
import RotatingCube from "./components/RotatingCube";

const painPoints = [
  {
    quote: '"Me entregaron algo a medias y nunca más supe de él."',
    desc: "El clásico freelancer que desaparece cuando más lo necesitas.",
  },
  {
    quote: '"La app se veía horrible. Daba vergüenza mostrarla."',
    desc: "Interfaz mal diseñada que espanta usuarios desde el primer segundo.",
  },
  {
    quote: '"Llena de bugs. No funcionaba ni el primer día."',
    desc: "Sin pruebas, sin calidad, sin cuidado por el resultado final.",
  },
  {
    quote: '"Me dijeron 2 semanas y pasaron 6 meses."',
    desc: "Fechas que cambian, excusas que se repiten, dinero que se va.",
  },
];

const steps = [
  {
    days: "Día 1-2",
    title: "Kickoff & Diseño",
    desc: "Definimos flujos, pantallas y estructura de datos contigo.",
  },
  {
    days: "Día 3-8",
    title: "Prototipo funcional",
    desc: "Ya puedes ver y tocar tu app. Ajustamos en base a tu feedback.",
  },
  {
    days: "Día 6-13",
    title: "Desarrollo completo",
    desc: "Programación, base de datos, integraciones y todas las funciones.",
  },
  {
    days: "Día 13-15",
    title: "Testing & Entrega",
    desc: "Pruebas exhaustivas. Cero errores antes de salir al aire.",
  },
];

const features = [
  {
    icon: "📱",
    title: "App móvil (iOS + Android)",
    desc: "Nativa o híbrida según tu necesidad. Publicada en las tiendas y lista para tus usuarios.",
  },
  {
    icon: "🌐",
    title: "App web",
    desc: "Funciona en cualquier navegador, en cualquier dispositivo. Rápida, fluida, profesional.",
  },
  {
    icon: "🎨",
    title: "Diseño UI/UX profesional",
    desc: "Cada pantalla diseñada para enamorar a tus usuarios desde el primer clic. No de plantilla.",
  },
  {
    icon: "🗄️",
    title: "Base de datos estructurada",
    desc: "Arquitectura limpia, escalable y segura. Tu app crecerá sin problemas técnicos.",
  },
  {
    icon: "✅",
    title: "Testing completo",
    desc: "Probamos cada flujo, cada botón, cada caso de uso. Si sale al aire, sale sin errores.",
  },
  {
    icon: "📄",
    title: "Documentación técnica",
    desc: "Todo documentado. Tu equipo puede mantenerla, escalarla o contratar a alguien más sin depender de nosotros.",
  },
];

const promises = [
  {
    icon: "⏱",
    title: "Entrega garantizada en 30 días",
    desc: "O te devolvemos el dinero. Sin letra chica.",
  },
  {
    icon: "🔒",
    title: "Precio fijo desde el inicio",
    desc: "Sin cobros sorpresa, sin extras no acordados.",
  },
  {
    icon: "🔧",
    title: "30 días de soporte post-entrega",
    desc: "Si algo falla después del lanzamiento, lo resolvemos.",
  },
  {
    icon: "📦",
    title: "El código es tuyo, 100%",
    desc: "Recibes acceso completo a repositorios y servidores.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-orange-600 font-black text-xl tracking-tighter uppercase">
            CobreStudio
          </span>
          <a
            href="#contacto"
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center gap-2"
          >
            Hablemos Hoy <ArrowRight size={12} />
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="grid-bg relative flex items-center">
        {/* Smooth radial glow — no hard edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 80% at 95% 50%, rgba(120, 40, 8, 0.55) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-16 pb-12 grid lg:grid-cols-[3fr_2fr] gap-5 items-center">
          <div>
            <div className="inline-block border border-white/20 rounded-full px-4 py-1.5 mb-8">
              <span className="text-[9px] text-orange-500 font-bold tracking-widest uppercase">
                Hecha en 15 días · Sin excusas
              </span>
            </div>

            <h1 className="text-[9vw] sm:text-[9vw] md:text-[50px] font-black leading-[1.1] tracking-tighter uppercase mb-8">
              Transformamos
              <br />
              <span className="text-orange-600 font-serif italic tracking-wide">tus ideas</span>
              <br />
              en apps
            </h1>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              Tu aplicación{" "}
              <span className="text-white font-semibold underline decoration-orange-500 underline-offset-4">
                terminada al 100%
              </span>{" "}
              en 10 a 15 días.{" "}
              Sin bugs. Sin excusas. Sin freelancers que desaparecen.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-bold text-sm transition-colors flex items-center gap-2 active:scale-95"
              >
                Quiero mi app ahora <ArrowRight size={16} />
              </a>
              <a
                href="#incluye"
                className="text-white/60 hover:text-white px-4 py-4 font-medium text-sm transition-colors flex items-center gap-2"
              >
                Ver qué incluye <ArrowDown size={16} />
              </a>
            </div>
          </div>

          <RotatingCube />
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <FadeIn className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-5">
              El Problema
            </p>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-[0.88] tracking-tighter mb-8">
              ¿Llevas meses
              <br />
              con ese proyecto
              <br />
              <span className="font-serif italic text-gold font-normal">parado?</span>
            </h2>
            <div className="space-y-5 text-gray-300 text-base leading-relaxed">
              <p>
                Tienes la idea clara, pero{" "}
                <strong className="text-white">no encuentras a alguien en quien confiar</strong> para
                desarrollarla bien.
              </p>
              <p>
                Cada semana que pasa son{" "}
                <strong className="text-white">ventas perdidas</strong> y competidores avanzando.
                El mercado de desarrollo está lleno de promesas que nunca se cumplen.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {painPoints.map(({ quote, desc }) => (
              <div
                key={quote}
                className="bg-[#111] border border-white/10 border-l-[3px] border-l-orange-600 p-6"
              >
                <p className="font-bold text-white mb-2 text-sm md:text-base">{quote}</p>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <div className="flex justify-center py-8">
        <a href="#contacto" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-bold text-sm transition-colors flex items-center gap-2 active:scale-95">
          Quiero mi app <ArrowRight size={16} />
        </a>
      </div>

      {/* ── Process ── */}
      <section className="bg-[#0d0d0d] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-5">
              La Solución
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.88] tracking-tighter">
              Tu app en{" "}
              <span className="font-serif italic text-gold font-normal">10 a 15 días.</span>{" "}
              Punto.
            </h2>
            <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
              Proceso claro, avance en tiempo real, entrega garantizada.
            </p>
          </FadeIn>

          <FadeIn delay={150} className="relative grid md:grid-cols-4 gap-10">
            <div className="hidden md:block absolute top-1.5 left-6 right-6 h-px bg-orange-600/30" />
            {steps.map(({ days, title, desc }) => (
              <div key={days} className="relative">
                <div className="w-3.5 h-3.5 rounded-full bg-orange-600 mb-6 relative z-10 ring-4 ring-[#0d0d0d]" />
                <p className="text-orange-600 text-[10px] font-black uppercase tracking-wider mb-2">
                  {days}
                </p>
                <h3 className="font-black text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <div className="flex justify-center py-8 bg-[#0d0d0d]">
        <a href="#contacto" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-bold text-sm transition-colors flex items-center gap-2 active:scale-95">
          Quiero mi app <ArrowRight size={16} />
        </a>
      </div>

      {/* ── Includes ── */}
      <section id="incluye" className="max-w-7xl mx-auto px-6 py-12">
        <FadeIn className="grid lg:grid-cols-2 gap-12 mb-10 items-end">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-5">
              Qué incluye
            </p>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-[0.88] tracking-tighter">
              Todo.{" "}
              <span className="font-serif italic text-gold font-normal block">Llave en mano.</span>
            </h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            Completo, testeado y listo para arrancar. Sin depender de nadie más.
          </p>
        </FadeIn>

        <FadeIn delay={100} className="bg-[#111] rounded-sm p-8 md:p-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="w-12 h-12 bg-[#1c1c1c] rounded-xl flex items-center justify-center text-2xl">
                {icon}
              </div>
              <h3 className="font-bold text-white text-base">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </FadeIn>
      </section>

      <div className="flex justify-center py-8">
        <a href="#contacto" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-bold text-sm transition-colors flex items-center gap-2 active:scale-95">
          Quiero mi app <ArrowRight size={16} />
        </a>
      </div>

      {/* ── Promise ── */}
      <section className="bg-[#0d0d0d] py-12">
        <FadeIn className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-5">
              Nuestra Promesa
            </p>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-[0.88] tracking-tighter mb-8">
              Sin dramas.
              <br />
              Sin sorpresas.
              <br />
              <span className="font-serif italic text-gold font-normal">Sin excusas.</span>
            </h2>
            <div className="space-y-4 text-gray-300 text-base leading-relaxed mb-10">
              <p>
                <strong className="text-white">Diseñamos y desarrollamos nosotros</strong>, con
                estándares de producto. Tu presupuesto es el presupuesto. Tu fecha es la fecha.
              </p>
              <p>
                Si algo no queda como acordamos,{" "}
                <strong className="text-white">lo corregimos sin costo adicional.</strong>
              </p>
            </div>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-bold text-sm transition-colors active:scale-95"
            >
              Empezar ahora <ArrowRight size={16} />
            </a>
          </div>

          <div className="space-y-4">
            {promises.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#111] border border-white/10 p-5 flex items-start gap-4"
              >
                <span className="text-2xl mt-0.5 shrink-0">{icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Portfolio ── */}
      <FadeIn>
        <Portfolio />
      </FadeIn>

      <div className="flex justify-center py-8">
        <a href="#contacto" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-bold text-sm transition-colors flex items-center gap-2 active:scale-95">
          Quiero mi app <ArrowRight size={16} />
        </a>
      </div>

      {/* ── FAQ ── */}
      <FadeIn>
        <FAQ />
      </FadeIn>

      <div className="flex justify-center py-8">
        <a href="#contacto" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-bold text-sm transition-colors flex items-center gap-2 active:scale-95">
          Quiero mi app <ArrowRight size={16} />
        </a>
      </div>

      {/* ── CTA + Form ── */}
      <section id="contacto" className="cta-glow py-16">
        <FadeIn className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-6">
            ¿Listo para arrancar?
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.88] tracking-tighter mb-6">
            Si ya estás listo,{" "}
            <span className="font-serif italic text-gold font-normal">hablamos hoy.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            30 minutos para saber si podemos hacerlo y darte un presupuesto exacto.
          </p>

          <div className="bg-[#111] border border-white/10 p-8 md:p-10 text-left max-w-lg mx-auto">
            <h3 className="text-xs font-bold uppercase tracking-widest border-l-2 border-orange-600 pl-4 mb-8">
              Agenda tu consultoría gratuita
            </h3>
            <ContactForm />
          </div>

          <p className="text-gray-600 text-xs mt-6">
            Sin compromisos · Respuesta en menos de 24 horas · Completamente gratis
          </p>
        </FadeIn>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-orange-600 font-black text-lg tracking-tighter uppercase">
            CobreStudio
          </span>
          <p className="text-gray-600 text-xs text-center sm:text-right">
            © 2025 · Transformamos tus ideas en Apps
          </p>
        </div>
      </footer>
    </main>
  );
}
