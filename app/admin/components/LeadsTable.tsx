'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Phone } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Calificacion = 'rojo' | 'amarillo' | 'verde' | null
type Filtro = 'todos' | 'no_contactados' | 'contactados'

interface Lead {
  id: string
  nombre: string
  correo: string
  telefono: string
  respuesta_1: string
  respuesta_2: string
  respuesta_3: string
  respuesta_4: string
  respuesta_5: string
  created_at: string
  calificacion: Calificacion
  contactado: boolean
}

const questions = [
  '¿Qué problema resuelve tu app y quién lo tiene?',
  '¿Cuáles son las 3 funciones sin las que la app no sirve?',
  '¿App móvil, web o las dos? ¿Hay pagos o integraciones?',
  '¿Tienes marca definida o también se diseña desde cero?',
  '¿Cuál es tu fecha límite y tu presupuesto aproximado?',
]

const calOptions: { value: Calificacion; color: string; label: string }[] = [
  { value: 'verde',    color: 'bg-emerald-500',  label: 'Lead calificado' },
  { value: 'amarillo', color: 'bg-yellow-400',   label: 'Posible lead'    },
  { value: 'rojo',     color: 'bg-red-500',      label: 'Mal lead'        },
]

function CalBadge({ value }: { value: Calificacion }) {
  const opt = calOptions.find(o => o.value === value)
  return (
    <span className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${opt ? opt.color : 'bg-white/15'}`} />
  )
}

export default function LeadsTable({ leads: initial }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initial)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filtro, setFiltro] = useState<Filtro>('todos')

  const filtered = leads.filter(l => {
    if (filtro === 'contactados')    return l.contactado
    if (filtro === 'no_contactados') return !l.contactado
    return true
  })

  async function updateLead(id: string, patch: Partial<Lead>) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l))
    await supabase.from('cobre leads').update(patch).eq('id', id)
  }

  function toggleCalificacion(lead: Lead, value: Calificacion) {
    updateLead(lead.id, { calificacion: lead.calificacion === value ? null : value })
  }

  const tabs: { key: Filtro; label: string }[] = [
    { key: 'todos',           label: `Todos (${leads.length})` },
    { key: 'no_contactados',  label: `Sin contactar (${leads.filter(l => !l.contactado).length})` },
    { key: 'contactados',     label: `Contactados (${leads.filter(l => l.contactado).length})` },
  ]

  if (leads.length === 0) {
    return <div className="text-center py-20 text-gray-600 text-sm">Aún no hay leads registrados.</div>
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-1 mb-5 bg-[#111] border border-white/10 p-1 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFiltro(tab.key)}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${
              filtro === tab.key
                ? 'bg-orange-600 text-white'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leads */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-600 text-sm">
            No hay leads en esta categoría.
          </div>
        )}

        {filtered.map(lead => {
          const isOpen = expanded === lead.id
          const date = new Date(lead.created_at).toLocaleDateString('es-MX', {
            day: '2-digit', month: 'short', year: 'numeric',
          })
          const answers = [
            lead.respuesta_1, lead.respuesta_2, lead.respuesta_3,
            lead.respuesta_4, lead.respuesta_5,
          ]

          return (
            <div
              key={lead.id}
              className={`bg-[#111] border transition-colors ${
                lead.contactado ? 'border-white/5 opacity-70' : 'border-white/10'
              }`}
            >
              {/* Row */}
              <div className="flex items-center gap-3 p-4">
                {/* Qualification dots */}
                <div className="flex flex-col gap-1 shrink-0">
                  {calOptions.map(opt => (
                    <button
                      key={opt.value}
                      title={opt.label}
                      onClick={() => toggleCalificacion(lead, opt.value)}
                      className={`w-3 h-3 rounded-full transition-all ${opt.color} ${
                        lead.calificacion === opt.value
                          ? 'ring-2 ring-white/40 scale-110'
                          : 'opacity-25 hover:opacity-70'
                      }`}
                    />
                  ))}
                </div>

                {/* Info — clickable to expand */}
                <button
                  onClick={() => setExpanded(isOpen ? null : lead.id)}
                  className="flex-1 flex items-center gap-4 text-left min-w-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <CalBadge value={lead.calificacion} />
                      <p className="font-bold text-white text-sm truncate">{lead.nombre}</p>
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5 truncate">{lead.correo}</p>
                  </div>
                  <p className="text-gray-400 text-xs hidden sm:block shrink-0">{lead.telefono}</p>
                  <p className="text-gray-600 text-xs hidden md:block shrink-0">{date}</p>
                  {isOpen ? <ChevronUp size={14} className="text-gray-500 shrink-0" /> : <ChevronDown size={14} className="text-gray-500 shrink-0" />}
                </button>

                {/* Contacted toggle */}
                <button
                  title={lead.contactado ? 'Marcar como no contactado' : 'Marcar como contactado'}
                  onClick={() => updateLead(lead.id, { contactado: !lead.contactado })}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-colors shrink-0 ${
                    lead.contactado
                      ? 'border-emerald-600/40 text-emerald-500 bg-emerald-600/10'
                      : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <Phone size={11} />
                  {lead.contactado ? 'Contactado' : 'Contactar'}
                </button>
              </div>

              {/* Expanded answers */}
              {isOpen && (
                <div className="border-t border-white/10 p-5 grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2 flex items-center gap-4 text-xs text-gray-500 sm:hidden">
                    <span>{lead.telefono}</span>
                    <span>·</span>
                    <span>{date}</span>
                  </div>
                  {questions.map((q, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider">
                        {i + 1}. {q}
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {answers[i] || <span className="text-gray-600 italic">Sin respuesta</span>}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
