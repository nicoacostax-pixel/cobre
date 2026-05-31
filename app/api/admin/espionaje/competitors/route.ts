import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data: competitors, error: ce } = await supabase
    .from('spy_competitors')
    .select('*')
    .order('created_at', { ascending: true })
  if (ce) return NextResponse.json({ error: ce.message, setup: true }, { status: 500 })

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const { data: posts, error: pe } = await supabase
    .from('spy_posts')
    .select('*')
    .gte('posted_at', since)
    .order('likes', { ascending: false })
  if (pe) return NextResponse.json({ error: pe.message, setup: true }, { status: 500 })

  return NextResponse.json({ competitors: competitors ?? [], posts: posts ?? [] })
}

export async function POST(req: Request) {
  const { handle } = await req.json()
  const clean = handle.replace(/^@/, '').trim().toLowerCase()
  if (!clean) return NextResponse.json({ error: 'Handle inválido' }, { status: 400 })

  const { data, error } = await supabase
    .from('spy_competitors')
    .insert({ handle: clean })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  const { error } = await supabase.from('spy_competitors').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
