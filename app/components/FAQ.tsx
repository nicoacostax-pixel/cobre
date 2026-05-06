'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: '¿Cuánto tiempo toma construir la app?',
    a: 'Entre 10 y 15 días dependiendo del alcance. Proyectos simples pueden estar listos en 6 días, mientras que funcionalidades más complejas como integraciones de pagos o dashboards avanzados pueden extender el timeline a 15 días.',
  },
  {
    q: '¿Qué tecnologías usan?',
    a: 'Stack moderno y probado: React para frontend, Supabase + PostgreSQL para backend y base de datos, y deploy en Railway. Simple, escalable y sin vendor lock-in.',
  },
  {
    q: '¿Cómo son las formas de pago?',
    a: '50% de anticipo (reserva de cupo, planificación y contrato) y 50% al entregar. Aceptamos transferencia bancaria, tarjeta, crypto (USDT/USDC) y PayPal. Sin sorpresas, sin costos ocultos.',
  },
  {
    q: '¿Qué incluye la app?',
    a: 'Código fuente completo, deploy en producción, documentación técnica básica y 2 semanas de soporte post-lanzamiento para bugs críticos. El producto es 100% tuyo.',
  },
  {
    q: '¿Qué pasa si necesito cambios después?',
    a: 'Ofrecemos dos opciones: mantenimiento básico (bugs y actualizaciones menores) o mantenimiento evolutivo (nuevas features y mejoras continuas). También puedes continuar el desarrollo con tu propio equipo — el código es tuyo.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">FAQ</p>
        <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter">
          Preguntas{' '}
          <span className="font-serif italic text-gold font-normal">frecuentes.</span>
        </h2>
        <p className="text-gray-500 mt-4 text-base">Lo que necesitás saber antes de arrancar.</p>
      </div>

      <div className="flex flex-col gap-2">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <div key={i} className={`border transition-colors ${isOpen ? 'border-orange-600/40 bg-[#111]' : 'border-white/10 bg-[#111]'}`}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className={`font-bold text-sm md:text-base transition-colors ${isOpen ? 'text-orange-500' : 'text-white'}`}>
                  {faq.q}
                </span>
                <span className={`shrink-0 transition-colors ${isOpen ? 'text-orange-500' : 'text-gray-500'}`}>
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
