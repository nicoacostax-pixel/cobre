'use client'

import { useEffect, useState } from 'react'
import { Plus, BookOpen, Lock, Eye, EyeOff, Trash2, ChevronRight, ImageIcon } from 'lucide-react'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  description: string
  level_required: string | null
  is_published: boolean
  order_index: number
  cover_url?: string | null
}

export default function CursosPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newLevel, setNewLevel] = useState('')
  const [uploadingId, setUploadingId] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/cursos')
    const data = await res.json()
    setCourses(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function createCourse() {
    if (!newTitle.trim()) return
    const res = await fetch('/api/admin/cursos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle.trim(),
        level_required: newLevel.trim() || null,
        order_index: courses.length + 1,
      }),
    })
    if (res.ok) {
      setNewTitle('')
      setNewLevel('')
      setCreating(false)
      load()
    }
  }

  async function uploadCover(courseId: string, file: File) {
    setUploadingId(courseId)
    const fd = new FormData()
    fd.append('image', file)
    const res = await fetch(`/api/admin/cursos/${courseId}/cover`, { method: 'POST', body: fd })
    let data: { error?: string; cover_url?: string } = {}
    try { data = await res.json() } catch { /* nginx returned html */ }
    if (!res.ok) {
      alert(res.status === 413
        ? 'Imagen demasiado grande. Usa una de menos de 10 MB.'
        : `Error al subir: ${data.error ?? res.statusText}`)
    } else if (data.cover_url) {
      setCourses(prev => prev.map(c => c.id === courseId ? { ...c, cover_url: data.cover_url } : c))
    }
    setUploadingId(null)
  }

  async function togglePublish(course: Course) {
    await fetch(`/api/admin/cursos/${course.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_published: !course.is_published }),
    })
    load()
  }

  async function deleteCourse(id: string) {
    if (!confirm('¿Eliminar este curso? Se borrarán todos sus módulos y lecciones.')) return
    await fetch(`/api/admin/cursos/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="text-xs text-gray-600 hover:text-orange-500 transition-colors mb-1 flex items-center gap-1">
            ← Admin
          </Link>
          <h1 className="text-2xl font-black">Constructor de Cursos</h1>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} /> Nuevo curso
        </button>
      </div>

      {/* New course form */}
      {creating && (
        <div className="bg-[#111] border border-orange-600/30 rounded-xl p-5 mb-6">
          <p className="text-xs text-orange-500 uppercase tracking-widest font-bold mb-4">Nuevo curso</p>
          <div className="flex flex-col gap-3">
            <input
              autoFocus
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createCourse()}
              placeholder="Título del curso"
              className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-orange-600/50"
            />
            <input
              value={newLevel}
              onChange={e => setNewLevel(e.target.value)}
              placeholder="Nivel requerido (ej: Nivel 2) — dejar vacío si es libre"
              className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-orange-600/50"
            />
            <div className="flex gap-2 pt-1">
              <button
                onClick={createCourse}
                className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors"
              >
                Crear curso
              </button>
              <button
                onClick={() => { setCreating(false); setNewTitle(''); setNewLevel('') }}
                className="text-gray-500 hover:text-white text-sm px-4 py-2 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-gray-600 text-sm py-8">Cargando cursos…</div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 border border-white/5 rounded-xl">
          <BookOpen size={32} className="text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No hay cursos todavía.</p>
          <button
            onClick={() => setCreating(true)}
            className="mt-4 text-orange-500 text-sm font-bold hover:text-orange-400 transition-colors"
          >
            + Crear el primero
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-[#111] border border-white/5 rounded-xl p-5 flex items-center gap-4 hover:border-white/10 transition-colors group"
            >
              <label className="relative w-20 shrink-0 cursor-pointer group/thumb" style={{aspectRatio:'16/9'}}>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploadingId === course.id}
                  onChange={e => { const f = e.target.files?.[0]; if (f) uploadCover(course.id, f) }}
                />
                {course.cover_url ? (
                  <img
                    src={course.cover_url}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full rounded-lg bg-[#1a1a1a] border border-dashed border-white/10 flex items-center justify-center">
                    <ImageIcon size={14} className="text-gray-700" />
                  </div>
                )}
                <div className="absolute inset-0 rounded-lg bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                  {uploadingId === course.id
                    ? <span className="text-[9px] text-white font-bold">…</span>
                    : <span className="text-[9px] text-white font-bold">{course.cover_url ? 'CAMBIAR' : 'SUBIR'}</span>
                  }
                </div>
              </label>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm">{course.title}</span>
                  {course.level_required && (
                    <span className="flex items-center gap-1 text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-full font-bold">
                      <Lock size={9} /> {course.level_required}
                    </span>
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${course.is_published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-gray-600'}`}>
                    {course.is_published ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
                {course.description && (
                  <p className="text-xs text-gray-600 mt-0.5 truncate">{course.description}</p>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => togglePublish(course)}
                  title={course.is_published ? 'Despublicar' : 'Publicar'}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {course.is_published ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
                <Link
                  href={`/admin/cursos/${course.id}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:text-orange-500 hover:bg-orange-500/10 transition-colors"
                >
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
