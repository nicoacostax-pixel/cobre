'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'
import QuestionnaireModal from './QuestionnaireModal'
import PhoneInput from './PhoneInput'

export default function ContactForm() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [showModal, setShowModal] = useState(false)
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

    const res = await fetch('/api/ai-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, answers }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(`Error: ${data.error ?? 'No se pudo guardar la solicitud'}`)
      return
    }

    router.push('/gracias')
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
