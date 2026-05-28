'use client'

import { useEffect, useState, use } from 'react'
import { Plus, Trash2, ChevronRight, GripVertical, BookOpen, FileText, Eye, EyeOff, Pencil, Check, X, ImageIcon } from 'lucide-react'
import Link from 'next/link'

interface Lesson  { id: string; title: string; is_published: boolean; order_index: number; video_url?: string }
interface Module  { id: string; title: string; order_index: number; lessons: Lesson[] }
interface Course  { id: string; title: string; description: string; level_required: string | null; is_published: boolean; cover_url?: string; modules: Module[] }

export default function CourseBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [course, setCourse]         = useState<Course | null>(null)
  const [loading, setLoading]       = useState(true)
  const [editingTitle, setEditingTitle] = useState(false)
  const [titleDraft, setTitleDraft] = useState('')
  const [descDraft, setDescDraft]   = useState('')
  const [editingDesc, setEditingDesc] = useState(false)
  const [newModTitle, setNewModTitle]       = useState('')
  const [addingMod, setAddingMod]           = useState(false)
  const [addingLesson, setAddingLesson]     = useState<string | null>(null)
  const [newLessonTitle, setNewLessonTitle] = useState('')
  const [editingMod, setEditingMod]         = useState<string | null>(null)
  const [modDraft, setModDraft]             = useState('')
  const [uploadingCover, setUploadingCover] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch(`/api/admin/cursos/${id}`)
    const data = await res.json()
    setCourse(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [id])

  async function uploadCover(file: File) {
    setUploadingCover(true)
    const fd = new FormData()
    fd.append('image', file)
    const res = await fetch(`/api/admin/cursos/${id}/cover`, { method: 'POST', body: fd })
    let data: { error?: string; cover_url?: string } = {}
    try { data = await res.json() } catch { /* nginx returned html */ }
    if (!res.ok) {
      alert(res.status === 413
        ? 'Imagen demasiado grande. Usa una de menos de 10 MB.'
        : `Error al subir: ${data.error ?? res.statusText}`)
    } else if (data.cover_url) {
      setCourse(prev => prev ? { ...prev, cover_url: data.cover_url } : prev)
    }
    setUploadingCover(false)
  }

  async function saveTitle() {
    await fetch(`/api/admin/cursos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: titleDraft }),
    })
    setEditingTitle(false)
    load()
  }

  async function saveDesc() {
    await fetch(`/api/admin/cursos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: descDraft }),
    })
    setEditingDesc(false)
    load()
  }

  async function togglePublish() {
    await fetch(`/api/admin/cursos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_published: !course!.is_published }),
    })
    load()
  }

  async function addModule() {
    if (!newModTitle.trim()) return
    await fetch(`/api/admin/cursos/${id}/modulos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newModTitle.trim(), order_index: (course?.modules?.length ?? 0) + 1 }),
    })
    setNewModTitle('')
    setAddingMod(false)
    load()
  }

  async function deleteModule(moduloId: string) {
    if (!confirm('¿Eliminar módulo y todas sus lecciones?')) return
    await fetch(`/api/admin/modulos/${moduloId}`, { method: 'DELETE' })
    load()
  }

  async function saveModTitle(moduloId: string) {
    await fetch(`/api/admin/modulos/${moduloId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: modDraft }),
    })
    setEditingMod(null)
    load()
  }

  async function addLesson(moduloId: string) {
    if (!newLessonTitle.trim()) return
    const mod = course?.modules.find(m => m.id === moduloId)
    await fetch(`/api/admin/modulos/${moduloId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newLessonTitle.trim(), order_index: (mod?.lessons?.length ?? 0) + 1 }),
    })
    setNewLessonTitle('')
    setAddingLesson(null)
    load()
  }

  async function deleteLesson(lessonId: string) {
    if (!confirm('¿Eliminar esta lección?')) return
    await fetch(`/api/admin/lecciones/${lessonId}`, { method: 'DELETE' })
    load()
  }

  async function toggleLessonPublish(lesson: Lesson) {
    await fetch(`/api/admin/lecciones/${lesson.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_published: !lesson.is_published }),
    })
    load()
  }

  if (loading) return <div className="text-gray-600 text-sm py-8">Cargando…</div>
  if (!course)  return <div className="text-red-500 text-sm py-8">Curso no encontrado.</div>

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-600 mb-6">
        <Link href="/admin" className="hover:text-orange-500 transition-colors">Admin</Link>
        <span>/</span>
        <Link href="/admin/cursos" className="hover:text-orange-500 transition-colors">Cursos</Link>
        <span>/</span>
        <span className="text-gray-400">{course.title}</span>
      </div>

      {/* Course header */}
      <div className="bg-[#111] border border-white/5 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            {editingTitle ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={titleDraft}
                  onChange={e => setTitleDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') saveTitle(); if (e.key === 'Escape') setEditingTitle(false) }}
                  className="bg-[#1a1a1a] border border-orange-600/40 rounded-lg px-3 py-1.5 text-lg font-black text-white outline-none flex-1"
                />
                <button onClick={saveTitle} className="w-7 h-7 flex items-center justify-center bg-orange-600 rounded-lg"><Check size={13} /></button>
                <button onClick={() => setEditingTitle(false)} className="w-7 h-7 flex items-center justify-center bg-white/5 rounded-lg text-gray-400"><X size={13} /></button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group/title">
                <h1 className="text-xl font-black">{course.title}</h1>
                <button
                  onClick={() => { setTitleDraft(course.title); setEditingTitle(true) }}
                  className="opacity-0 group-hover/title:opacity-100 w-6 h-6 flex items-center justify-center rounded text-gray-600 hover:text-white transition-all"
                >
                  <Pencil size={12} />
                </button>
              </div>
            )}

            {editingDesc ? (
              <div className="flex items-start gap-2 mt-2">
                <textarea
                  autoFocus
                  value={descDraft}
                  onChange={e => setDescDraft(e.target.value)}
                  rows={2}
                  className="bg-[#1a1a1a] border border-orange-600/40 rounded-lg px-3 py-2 text-sm text-gray-400 outline-none flex-1 resize-none"
                />
                <div className="flex flex-col gap-1">
                  <button onClick={saveDesc} className="w-7 h-7 flex items-center justify-center bg-orange-600 rounded-lg"><Check size={13} /></button>
                  <button onClick={() => setEditingDesc(false)} className="w-7 h-7 flex items-center justify-center bg-white/5 rounded-lg text-gray-400"><X size={13} /></button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => { setDescDraft(course.description ?? ''); setEditingDesc(true) }}
                className="mt-1 text-sm text-gray-600 cursor-text hover:text-gray-400 transition-colors"
              >
                {course.description || <span className="italic">Sin descripción — haz clic para agregar</span>}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {course.level_required && (
              <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded-full font-bold">
                🔒 {course.level_required}
              </span>
            )}
            <button
              onClick={togglePublish}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${course.is_published ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
            >
              {course.is_published ? <><Eye size={12} /> Publicado</> : <><EyeOff size={12} /> Borrador</>}
            </button>
          </div>
        </div>

        {/* Cover image */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
          {course.cover_url ? (
            <div className="w-32 aspect-video rounded-lg overflow-hidden shrink-0 border border-white/10">
              <img src={course.cover_url} alt="Portada" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-32 aspect-video rounded-lg bg-[#1a1a1a] border border-dashed border-white/10 flex items-center justify-center shrink-0">
              <ImageIcon size={20} className="text-gray-700" />
            </div>
          )}
          <div>
            <label className={`cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${uploadingCover ? 'bg-white/5 text-gray-600 pointer-events-none' : 'bg-orange-600/10 text-orange-500 hover:bg-orange-600/20'}`}>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingCover}
                onChange={e => { const f = e.target.files?.[0]; if (f) uploadCover(f) }}
              />
              {uploadingCover ? 'Subiendo…' : course.cover_url ? 'Cambiar portada' : 'Subir portada'}
            </label>
            <p className="text-[11px] text-gray-700 mt-1.5">JPG, PNG o WebP · Se muestra en la pestaña Clases</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-600 border-t border-white/5 pt-4 mt-4">
          <span>{course.modules?.length ?? 0} módulos</span>
          <span>·</span>
          <span>{course.modules?.reduce((acc, m) => acc + (m.lessons?.length ?? 0), 0)} lecciones</span>
        </div>
      </div>

      {/* Modules */}
      <div className="flex flex-col gap-4">
        {(course.modules ?? []).map((mod, mIdx) => (
          <div key={mod.id} className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
            {/* Module header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5">
              <GripVertical size={14} className="text-gray-700 shrink-0" />
              <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest shrink-0">
                Módulo {mIdx + 1}
              </span>
              {editingMod === mod.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    autoFocus
                    value={modDraft}
                    onChange={e => setModDraft(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') saveModTitle(mod.id); if (e.key === 'Escape') setEditingMod(null) }}
                    className="bg-[#1a1a1a] border border-orange-600/40 rounded px-2 py-1 text-sm text-white outline-none flex-1"
                  />
                  <button onClick={() => saveModTitle(mod.id)} className="w-6 h-6 flex items-center justify-center bg-orange-600 rounded"><Check size={11} /></button>
                  <button onClick={() => setEditingMod(null)} className="w-6 h-6 flex items-center justify-center bg-white/5 rounded text-gray-400"><X size={11} /></button>
                </div>
              ) : (
                <div className="flex items-center gap-2 flex-1 group/mod">
                  <span className="font-bold text-sm">{mod.title}</span>
                  <button
                    onClick={() => { setModDraft(mod.title); setEditingMod(mod.id) }}
                    className="opacity-0 group-hover/mod:opacity-100 w-5 h-5 flex items-center justify-center rounded text-gray-600 hover:text-white transition-all"
                  >
                    <Pencil size={10} />
                  </button>
                </div>
              )}
              <button
                onClick={() => deleteModule(mod.id)}
                className="w-7 h-7 flex items-center justify-center rounded text-gray-700 hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
              >
                <Trash2 size={13} />
              </button>
            </div>

            {/* Lessons */}
            <div className="flex flex-col">
              {(mod.lessons ?? []).map((lesson, lIdx) => (
                <div key={lesson.id} className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group/lesson">
                  <GripVertical size={13} className="text-gray-800 shrink-0" />
                  <FileText size={13} className="text-gray-600 shrink-0" />
                  <span className="text-xs text-gray-700 shrink-0 w-4">{lIdx + 1}.</span>
                  <span className="text-sm flex-1 text-gray-300">{lesson.title}</span>
                  {lesson.video_url && (
                    <span className="text-[10px] bg-orange-600/10 text-orange-500 px-1.5 py-0.5 rounded font-bold">VIDEO</span>
                  )}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${lesson.is_published ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-gray-600'}`}>
                    {lesson.is_published ? 'ON' : 'OFF'}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover/lesson:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleLessonPublish(lesson)}
                      className="w-6 h-6 flex items-center justify-center rounded text-gray-600 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {lesson.is_published ? <EyeOff size={11} /> : <Eye size={11} />}
                    </button>
                    <button
                      onClick={() => deleteLesson(lesson.id)}
                      className="w-6 h-6 flex items-center justify-center rounded text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={11} />
                    </button>
                    <Link
                      href={`/admin/cursos/${id}/leccion/${lesson.id}`}
                      className="w-6 h-6 flex items-center justify-center rounded text-gray-600 hover:text-orange-500 hover:bg-orange-500/10 transition-colors"
                    >
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}

              {/* Add lesson */}
              {addingLesson === mod.id ? (
                <div className="flex items-center gap-2 px-5 py-3">
                  <input
                    autoFocus
                    value={newLessonTitle}
                    onChange={e => setNewLessonTitle(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') addLesson(mod.id); if (e.key === 'Escape') { setAddingLesson(null); setNewLessonTitle('') } }}
                    placeholder="Título de la lección…"
                    className="bg-[#1a1a1a] border border-orange-600/30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 outline-none flex-1"
                  />
                  <button onClick={() => addLesson(mod.id)} className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded-lg"><Check size={13} /></button>
                  <button onClick={() => { setAddingLesson(null); setNewLessonTitle('') }} className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg text-gray-400"><X size={13} /></button>
                </div>
              ) : (
                <button
                  onClick={() => { setAddingLesson(mod.id); setNewLessonTitle('') }}
                  className="flex items-center gap-2 px-5 py-3 text-xs text-gray-600 hover:text-orange-500 transition-colors text-left"
                >
                  <Plus size={12} /> Agregar lección
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add module */}
        {addingMod ? (
          <div className="bg-[#111] border border-orange-600/20 rounded-xl p-4 flex items-center gap-2">
            <BookOpen size={15} className="text-orange-600 shrink-0" />
            <input
              autoFocus
              value={newModTitle}
              onChange={e => setNewModTitle(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addModule(); if (e.key === 'Escape') { setAddingMod(false); setNewModTitle('') } }}
              placeholder="Nombre del módulo…"
              className="bg-transparent text-sm text-white placeholder-gray-700 outline-none flex-1"
            />
            <button onClick={addModule} className="w-7 h-7 flex items-center justify-center bg-orange-600 rounded-lg shrink-0"><Check size={13} /></button>
            <button onClick={() => { setAddingMod(false); setNewModTitle('') }} className="w-7 h-7 flex items-center justify-center bg-white/5 rounded-lg text-gray-400 shrink-0"><X size={13} /></button>
          </div>
        ) : (
          <button
            onClick={() => setAddingMod(true)}
            className="flex items-center gap-2 border border-dashed border-white/10 rounded-xl px-5 py-4 text-sm text-gray-600 hover:text-orange-500 hover:border-orange-600/30 transition-colors"
          >
            <Plus size={15} /> Agregar módulo
          </button>
        )}
      </div>
    </div>
  )
}
