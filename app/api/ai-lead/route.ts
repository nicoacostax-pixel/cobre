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
    from: 'Nico IA <hola@cobrestudio.net>',
    to: email,
    subject: 'Tus guías de IA en español — aquí están',
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FDFAE6;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FDFAE6;padding:40px 20px">
    <tr><td align="center">
      <table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#7C5CBF,#574088);border-radius:20px 20px 0 0;padding:36px 40px;text-align:center">
          <p style="margin:0 0 6px;color:#cfc0f0;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase">Nico IA</p>
          <h1 style="margin:0;color:white;font-size:28px;font-weight:900;line-height:1.1">¡Hola, ${name}! 👋</h1>
          <p style="margin:12px 0 0;color:#ddd4f8;font-size:15px;line-height:1.6">Ya eres parte de la comunidad de IA en español.</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:white;padding:36px 40px">

          <p style="margin:0 0 24px;font-size:15px;color:#444;line-height:1.7">
            Gracias por unirte. Aquí tienes los 3 pasos para arrancar hoy:
          </p>

          <!-- Step 1 -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px">
            <tr>
              <td width="44" valign="top" style="padding-right:14px">
                <div style="width:36px;height:36px;background:#ede8f8;border-radius:50%;text-align:center;line-height:36px;font-size:18px">📬</div>
              </td>
              <td>
                <p style="margin:0 0 4px;font-size:14px;font-weight:800;color:#1a1a1a">Revisa tu correo</p>
                <p style="margin:0;font-size:13px;color:#777;line-height:1.6">Te enviamos la primera guía gratuita. Si no la ves, revisa spam y márcanos como remitente seguro.</p>
              </td>
            </tr>
          </table>

          <!-- Step 2 -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px">
            <tr>
              <td width="44" valign="top" style="padding-right:14px">
                <div style="width:36px;height:36px;background:#ede8f8;border-radius:50%;text-align:center;line-height:36px;font-size:18px">💬</div>
              </td>
              <td>
                <p style="margin:0 0 4px;font-size:14px;font-weight:800;color:#1a1a1a">Únete al grupo de WhatsApp</p>
                <p style="margin:0 0 10px;font-size:13px;color:#777;line-height:1.6">Ahí compartimos recursos, novedades y respondemos dudas en tiempo real.</p>
                <a href="https://chat.whatsapp.com/F55Or9hAnPoF2FfjrcYNnE?mode=gi_t" style="display:inline-block;background:linear-gradient(135deg,#7C5CBF,#574088);color:white;padding:10px 20px;border-radius:10px;font-size:13px;font-weight:700;text-decoration:none">Unirme al grupo →</a>
              </td>
            </tr>
          </table>

          <!-- Step 3 -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px">
            <tr>
              <td width="44" valign="top" style="padding-right:14px">
                <div style="width:36px;height:36px;background:#ede8f8;border-radius:50%;text-align:center;line-height:36px;font-size:18px">❤️</div>
              </td>
              <td>
                <p style="margin:0 0 4px;font-size:14px;font-weight:800;color:#1a1a1a">Reacciona a los últimos 3 posts</p>
                <p style="margin:0;font-size:13px;color:#777;line-height:1.6">Entra a nuestro perfil, dale like a los últimos 3 posts y activa las notificaciones. Nos ayuda a llegar a más personas.</p>
              </td>
            </tr>
          </table>

          <p style="margin:0;font-size:14px;color:#555;line-height:1.7">
            Nos vemos adentro,<br>
            <strong style="color:#7C5CBF">Nico</strong>
          </p>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f5f0e0;border-radius:0 0 20px 20px;padding:20px 40px;text-align:center">
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
