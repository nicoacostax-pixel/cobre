import { NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { supabase } from '@/lib/supabase'

function sha256(value: string) {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

async function sendCapiLead(email: string, phone: string) {
  const token = process.env.FB_ACCESS_TOKEN
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID
  if (!token || !pixelId) return

  const eventTime = Math.floor(Date.now() / 1000)
  const normalizedPhone = phone.replace(/\D/g, '')

  await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: [
        {
          event_name: 'Lead',
          event_time: eventTime,
          action_source: 'website',
          user_data: {
            em: [sha256(email)],
            ph: normalizedPhone ? [sha256(normalizedPhone)] : undefined,
          },
        },
      ],
    }),
  })
}

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

  await sendCapiLead(email, phone)

  return NextResponse.json({ ok: true })
}
