import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('courses')
    .select('*, modules(count)')
    .order('order_index', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { data, error } = await supabase
    .from('courses')
    .insert({
      title:          body.title,
      description:    body.description ?? '',
      level_required: body.level_required ?? null,
      is_published:   false,
      order_index:    body.order_index ?? 99,
    })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
