import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PUT(req: Request, { params }: { params: Promise<{ moduloId: string }> }) {
  const { moduloId } = await params
  const body = await req.json()
  const { data, error } = await supabase
    .from('modules')
    .update(body)
    .eq('id', moduloId)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ moduloId: string }> }) {
  const { moduloId } = await params
  const { error } = await supabase.from('modules').delete().eq('id', moduloId)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function POST(req: Request, { params }: { params: Promise<{ moduloId: string }> }) {
  const { moduloId } = await params
  const body = await req.json()
  const { data, error } = await supabase
    .from('lessons')
    .insert({
      module_id:   moduloId,
      title:       body.title,
      description: body.description ?? '',
      order_index: body.order_index ?? 99,
      is_published: false,
    })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
