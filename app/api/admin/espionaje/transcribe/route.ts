import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const ASSEMBLY_KEY = process.env.ASSEMBLYAI_API_KEY

/* ─── POST: Start transcription ──────────────────────────────────── */
export async function POST(req: Request) {
  if (!ASSEMBLY_KEY) {
    return NextResponse.json({ error: 'ASSEMBLYAI_API_KEY no configurado', noKey: true }, { status: 400 })
  }

  const { queueId, videoUrl } = await req.json()
  if (!videoUrl) {
    return NextResponse.json({ error: 'No hay video URL para transcribir' }, { status: 400 })
  }

  // Submit to AssemblyAI
  const res = await fetch('https://api.assemblyai.com/v2/transcript', {
    method: 'POST',
    headers: {
      'authorization': ASSEMBLY_KEY,
      'content-type':  'application/json',
    },
    body: JSON.stringify({
      audio_url:          videoUrl,
      speech_models:      ['universal-2'],
      language_detection: true,
      punctuate:          true,
      format_text:        true,
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err.error ?? 'AssemblyAI error' }, { status: 500 })
  }

  const { id: transcriptId } = await res.json()
  return NextResponse.json({ transcriptId })
}

/* ─── GET: Poll transcription status + save when done ───────────── */
export async function GET(req: Request) {
  if (!ASSEMBLY_KEY) {
    return NextResponse.json({ error: 'ASSEMBLYAI_API_KEY no configurado' }, { status: 400 })
  }

  const { searchParams } = new URL(req.url)
  const transcriptId = searchParams.get('transcriptId')
  const queueId      = searchParams.get('queueId')
  if (!transcriptId) return NextResponse.json({ error: 'transcriptId requerido' }, { status: 400 })

  const res = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
    headers: { 'authorization': ASSEMBLY_KEY },
  })
  const data = await res.json()

  if (data.status === 'error') {
    return NextResponse.json({ status: 'error', message: data.error ?? 'Error en transcripción' })
  }

  if (data.status !== 'completed') {
    return NextResponse.json({ status: data.status }) // queued | processing
  }

  const transcript = data.text ?? ''

  // Save transcript to spy_queue if queueId provided
  if (queueId && transcript) {
    await supabase
      .from('spy_queue')
      .update({ transcript })
      .eq('id', queueId)
  }

  return NextResponse.json({ status: 'completed', transcript })
}
