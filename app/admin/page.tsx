import { createClient } from '@supabase/supabase-js'
import LeadsTable from './components/LeadsTable'
import { Users, PhoneCall, Star } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const revalidate = 0

export default async function AdminDashboard() {
  const { data: leads, error } = await supabase
    .from('cobre leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="text-red-500 text-sm">Error al cargar leads: {error.message}</p>
  }

  const all = leads ?? []
  const calificados  = all.filter(l => l.calificacion === 'verde').length
  const sinContactar = all.filter(l => !l.contactado).length

  const stats = [
    { icon: Users,     value: all.length,    label: 'Leads totales'   },
    { icon: Star,      value: calificados,   label: 'Calificados'     },
    { icon: PhoneCall, value: sinContactar,  label: 'Sin contactar'   },
  ]

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="bg-[#111] border border-white/10 p-6 flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-600/10 rounded-lg flex items-center justify-center shrink-0">
              <Icon size={18} className="text-orange-600" />
            </div>
            <div>
              <p className="text-3xl font-black">{value}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-5">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Calificación:</p>
        {[
          { color: 'bg-emerald-500', label: 'Lead calificado' },
          { color: 'bg-yellow-400',  label: 'Posible lead'    },
          { color: 'bg-red-500',     label: 'Mal lead'        },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
            <span className="text-[10px] text-gray-500">{label}</span>
          </div>
        ))}
      </div>

      <LeadsTable leads={all} />
    </div>
  )
}
