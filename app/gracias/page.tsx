import { ArrowRight } from 'lucide-react'
import PixelEvent from '../components/PixelEvent'

export default function GraciasPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 text-center">
      <PixelEvent event="Lead" />

      <div className="max-w-xl">
        <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest mb-6">
          Registro exitoso
        </p>

        <h1 className="text-5xl md:text-6xl font-black uppercase leading-[0.92] tracking-tighter mb-6">
          Gracias por{' '}
          <span className="font-serif italic text-orange-500 font-normal">registrarte.</span>
        </h1>

        <p className="text-gray-400 text-lg leading-relaxed mb-10">
          Nos pondremos en contacto contigo en <strong className="text-white">menos de 24 horas</strong> para
          agendar tu consultoría gratuita y hablar de tu proyecto.
        </p>

        <div className="bg-[#111] border border-white/10 p-6 mb-10 text-left space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest border-l-2 border-orange-600 pl-4">
            ¿Qué sigue?
          </p>
          <ul className="space-y-2 mt-4">
            {[
              'Revisamos tu solicitud y tus respuestas.',
              'Te contactamos por correo o WhatsApp.',
              'Agendamos una llamada de 30 minutos.',
              'Te damos un presupuesto exacto sin compromisos.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                <span className="text-orange-500 font-black shrink-0">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 font-bold text-sm transition-colors active:scale-95"
        >
          Volver al inicio <ArrowRight size={16} />
        </a>
      </div>

    </main>
  )
}
