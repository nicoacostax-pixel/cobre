import { NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

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

  await resend.emails.send({
    from: 'Nico <hola@cobrestudio.net>',
    to: email,
    subject: `Hola ${name}, aquí están tus recursos de IA`,
    text: `Hola ${name},

Gracias por unirte. Ya tienes acceso a los recursos que prometimos.

Estos son los pasos para arrancar:

1. Revisa este correo — si no ves más correos nuestros, revisa la carpeta de spam y agréganos como contacto seguro.

2. Únete al grupo de WhatsApp — ahí compartimos recursos, novedades y respondemos dudas en tiempo real:
https://chat.whatsapp.com/F55Or9hAnPoF2FfjrcYNnE

3. Activa notificaciones en nuestro perfil — así no te pierdes nada nuevo.

Nos vemos adentro,
Nico

---
Recibiste este correo porque te registraste en cobrestudio.net`,
    html: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f9f9;font-family:Georgia,serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:white;border-radius:8px;padding:40px;border:1px solid #eee">
        <tr><td>
          <p style="margin:0 0 24px;font-size:15px;color:#333;line-height:1.8">Hola ${name},</p>
          <p style="margin:0 0 20px;font-size:15px;color:#333;line-height:1.8">Gracias por unirte. Estos son los pasos para arrancar hoy:</p>

          <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.8"><strong>1. Revisa este correo</strong><br>Si no ves más correos nuestros, revisa spam y agréganos como contacto seguro.</p>

          <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.8"><strong>2. Únete al grupo de WhatsApp</strong><br>Ahí compartimos recursos y respondemos dudas en tiempo real.<br><br>
          <a href="https://chat.whatsapp.com/F55Or9hAnPoF2FfjrcYNnE" style="color:#7C5CBF">Entrar al grupo</a></p>

          <p style="margin:0 0 32px;font-size:15px;color:#333;line-height:1.8"><strong>3. Activa notificaciones en nuestro perfil</strong><br>Así no te pierdes nada nuevo que publiquemos.</p>

          <p style="margin:0 0 4px;font-size:15px;color:#333;line-height:1.8">Nos vemos adentro,</p>
          <p style="margin:0 0 32px;font-size:15px;color:#7C5CBF;font-weight:bold">Nico</p>

          <hr style="border:none;border-top:1px solid #eee;margin:0 0 20px">
          <p style="margin:0;font-size:11px;color:#aaa">Recibiste este correo porque te registraste en cobrestudio.net</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  }).catch((err) => console.error('Resend error:', err))

  return NextResponse.json({ ok: true })
}
