import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  const { name, email, phone, answers } = await request.json()

  const { error } = await supabase.from('cobre leads').insert({
    nombre:      name,
    correo:      email,
    telefono:    phone,
    respuesta_1: answers[0] ?? '',
    respuesta_2: answers[1] ?? '',
    respuesta_3: answers[2] ?? '',
    respuesta_4: answers[3] ?? '',
    respuesta_5: answers[4] ?? '',
  })

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
