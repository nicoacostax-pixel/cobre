'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setLoading(false)

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Error al iniciar sesión')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-orange-600 font-black text-2xl tracking-tighter uppercase">
            CobreStudio
          </span>
          <p className="text-gray-500 text-sm mt-2">Panel de control</p>
        </div>

        <div className="bg-[#111] border border-white/10 p-8">
          <h1 className="text-base font-black uppercase tracking-tight mb-6 border-l-2 border-orange-600 pl-4">
            Iniciar sesión
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                Correo
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="admin@cobrestudio.com"
                required
                className="bg-transparent border-b border-white/20 py-2 focus:border-orange-500 outline-none transition-colors text-sm placeholder:text-gray-700"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                Contraseña
              </label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                required
                className="bg-transparent border-b border-white/20 py-2 focus:border-orange-500 outline-none transition-colors text-sm placeholder:text-gray-700"
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white p-3.5 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              {loading ? 'Entrando...' : <><LogIn size={14} /> Entrar</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
