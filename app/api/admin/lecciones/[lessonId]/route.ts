import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(_: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
  const { data, error } = await supabase
    .from('lessons')
    .select('*, resources(*)')
    .eq('id', lessonId)
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
  const body = await req.json()
  const { data, error } = await supabase
    .from('lessons')
    .update(body)
    .eq('id', lessonId)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
  const { error } = await supabase.from('lessons').delete().eq('id', lessonId)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
