import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
  const body = await req.json()
  const { data, error } = await supabase
    .from('resources')
    .insert({
      lesson_id: lessonId,
      name:      body.name,
      url:       body.url,
      type:      body.type ?? 'link',
    })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
  const { id } = await req.json()
  const { error } = await supabase
    .from('resources')
    .delete()
    .eq('id', id)
    .eq('lesson_id', lessonId)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
