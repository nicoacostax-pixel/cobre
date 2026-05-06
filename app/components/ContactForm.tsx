'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import QuestionnaireModal from './QuestionnaireModal'
import PhoneInput from './PhoneInput'
import { supabase } from '@/lib/supabase'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setShowModal(true)
  }

  async function handleComplete(answers: string[]) {
    setShowModal(false)

    const { error } = await supabase.from('cobre leads').insert({
      nombre: form.name,
      correo: form.email,
      telefono: form.phone,
      respuesta_1: answers[0] ?? '',
      respuesta_2: answers[1] ?? '',
      respuesta_3: answers[2] ?? '',
      respuesta_4: answers[3] ?? '',
      respuesta_5: answers[4] ?? '',
    })

    if (error) {
      console.error('Supabase error:', error)
      setError(`Error: ${error.message}`)
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="text-2xl font-black mb-3">¡Listo!</p>
        <p className="text-gray-400 text-sm">
          Nos pondremos en contacto contigo en menos de 24 horas.
        </p>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="group flex flex-col gap-1">
          <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold group-focus-within:text-orange-500 transition-colors">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            required
            className="bg-transparent border-b border-white/20 py-2 focus:border-orange-500 outline-none transition-colors text-sm w-full placeholder:text-gray-700"
          />
        </div>
        <div className="group flex flex-col gap-1">
          <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold group-focus-within:text-orange-500 transition-colors">
            Correo
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="nombre@empresa.com"
            required
            className="bg-transparent border-b border-white/20 py-2 focus:border-orange-500 outline-none transition-colors text-sm w-full placeholder:text-gray-700"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
            Número
          </label>
          <PhoneInput
            value={form.phone}
            onChange={val => setForm(prev => ({ ...prev, phone: val }))}
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs">{error}</p>
        )}

        <button
          type="submit"
          className="mt-4 bg-orange-600 hover:bg-orange-700 text-white p-4 font-bold text-xs md:text-sm transition-colors flex items-center justify-center gap-2 w-full active:scale-95"
        >
          RESERVAR CONSULTORÍA GRATUITA <Send size={16} />
        </button>
      </form>

      <QuestionnaireModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onComplete={handleComplete}
      />
    </>
  )
}
