'use client'

import { useState } from 'react'
import { X, ArrowLeft, ArrowRight, Send } from 'lucide-react'

interface Option {
  emoji: string
  label: string
  sub:   string
}

interface Question {
  q:       string
  options: Option[]
}

const questions: Question[] = [
  {
    q: '¿Qué tipo de aplicación necesitas?',
    options: [
      { emoji: '📱', label: 'App móvil',       sub: 'iOS y Android' },
      { emoji: '🌐', label: 'App web',          sub: 'Funciona en el navegador' },
      { emoji: '📦', label: 'Ambas',            sub: 'Móvil + web' },
      { emoji: '🤔', label: 'Todavía no lo sé', sub: 'Me pueden asesorar' },
    ],
  },
  {
    q: '¿Cuál es la función principal de tu app?',
    options: [
      { emoji: '💳', label: 'Ventas o pagos',         sub: 'E-commerce, suscripciones' },
      { emoji: '📅', label: 'Agenda o reservas',       sub: 'Citas, turnos, eventos' },
      { emoji: '👥', label: 'Gestión de equipos',      sub: 'CRM, operaciones internas' },
      { emoji: '🔗', label: 'Integración de sistemas', sub: 'APIs, conectores, ERPs' },
    ],
  },
  {
    q: '¿Tu app requiere pagos o integraciones externas?',
    options: [
      { emoji: '💰', label: 'Sí, pagos',          sub: 'Stripe, MercadoPago, etc.' },
      { emoji: '🔌', label: 'Sí, integraciones',  sub: 'Con sistemas existentes' },
      { emoji: '⚡', label: 'Ambas',              sub: 'Pagos e integraciones' },
      { emoji: '🚀', label: 'No por ahora',       sub: 'Empezamos simple' },
    ],
  },
  {
    q: '¿Tienes marca o identidad visual definida?',
    options: [
      { emoji: '✅', label: 'Sí, completa',    sub: 'Logo, colores y tipografía' },
      { emoji: '🎨', label: 'Parcialmente',    sub: 'Algo tengo, falta afinar' },
      { emoji: '🆕', label: 'No, desde cero', sub: 'Diseñamos todo' },
      { emoji: '🤝', label: 'Prefiero guía',  sub: 'Que me recomienden' },
    ],
  },
  {
    q: '¿Cuál es tu presupuesto aproximado en dólares?',
    options: [
      { emoji: '💵', label: '$0 a $1,000', sub: 'Proyecto inicial' },
      { emoji: '💰', label: '+$1,000',     sub: 'Proyecto mediano' },
      { emoji: '💎', label: '+$3,000',     sub: 'Proyecto completo' },
      { emoji: '🚀', label: '+$5,000',     sub: 'Proyecto enterprise' },
    ],
  },
]

interface Props {
  isOpen:     boolean
  onClose:    () => void
  onComplete: (answers: string[]) => void
}

export default function QuestionnaireModal({ isOpen, onClose, onComplete }: Props) {
  const [step, setStep]           = useState(0)
  const [answers, setAnswers]     = useState<string[]>(Array(questions.length).fill(''))
  const [advancing, setAdvancing] = useState(false)

  if (!isOpen) return null

  const current  = questions[step]
  const selected = answers[step]
  const isLast   = step === questions.length - 1

  function pickOption(label: string) {
    const next = [...answers]
    next[step] = label
    setAnswers(next)

    if (advancing) return
    setAdvancing(true)
    setTimeout(() => {
      setAdvancing(false)
      if (step < questions.length - 1) {
        setStep(s => s + 1)
      } else {
        onComplete(next)
      }
    }, 380)
  }

  function handlePrev() {
    if (step > 0) setStep(s => s - 1)
  }

  function handleNext() {
    if (!selected) return
    if (isLast) {
      onComplete(answers)
    } else {
      setStep(s => s + 1)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-[#111] border border-white/10 w-full max-w-lg relative">

        {/* Top bar */}
        <div className="flex items-center justify-between px-8 pt-7 pb-4">
          <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">
            Pregunta {step + 1} de {questions.length}
          </p>
          <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1 px-8">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-[2px] flex-1 transition-all duration-300 ${
                i <= step ? 'bg-orange-600' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-8 pt-8 pb-8">
          <h3 className="text-lg md:text-xl font-black leading-snug mb-6">
            {current.q}
          </h3>

          {/* Options grid */}
          <div className="grid grid-cols-2 gap-3">
            {current.options.map(opt => {
              const active = selected === opt.label
              return (
                <button
                  key={opt.label}
                  onClick={() => pickOption(opt.label)}
                  className={`flex flex-col items-start gap-1 p-4 border text-left transition-all duration-150 active:scale-[.98] ${
                    active
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/10 bg-[#1a1a1a] hover:border-white/25 hover:bg-white/5'
                  }`}
                >
                  <span className="text-2xl leading-none">{opt.emoji}</span>
                  <span className={`text-sm font-bold mt-1 ${active ? 'text-orange-400' : 'text-white'}`}>
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-gray-500 leading-tight">{opt.sub}</span>
                </button>
              )
            })}
          </div>

          {/* Nav */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrev}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                step === 0 ? 'invisible' : 'text-gray-500 hover:text-white'
              }`}
            >
              <ArrowLeft size={14} /> Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={!selected}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-30 disabled:cursor-not-allowed text-white px-6 py-3 font-bold text-[11px] uppercase tracking-wider transition-colors active:scale-95"
            >
              {isLast ? (
                <>Enviar <Send size={13} /></>
              ) : (
                <>Siguiente <ArrowRight size={13} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
