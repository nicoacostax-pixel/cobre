'use client'

import { useEffect, useState, use } from 'react'
import { Check, X, Plus, Trash2, Link2, FileText, Video, Save, Eye, EyeOff, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Resource { id: string; name: string; url: string; type: string }
interface Lesson {
  id: string
  title: string
  description: string
  video_url: string | null
  content: string | null
  duration_min: number | null
  is_published: boolean
  resources: Resource[]
}

const RESOURCE_TYPES = [
  { value: 'pdf',   label: 'PDF',   icon: '📄' },
  { value: 'link',  label: 'Link',  icon: '🔗' },
  { value: 'file',  label: 'Archivo', icon: '📁' },
]

export default function LessonEditorPage({ params }: { params: Promise<{ id: string; lessonId: string }> }) {
  const { id, lessonId } = use(params)

  const [lesson, setLesson]     = useState<Lesson | null>(null)
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // form state
  const [title, setTitle]         = useState('')
  const [desc, setDesc]           = useState('')
  const [videoUrl, setVideoUrl]   = useState('')
  const [content, setContent]     = useState('')
  const [duration, setDuration]   = useState('')
  const [published, setPublished] = useState(false)

  // new resource
  const [addingRes, setAddingRes]   = useState(false)
  const [resName, setResName]       = useState('')
  const [resUrl, setResUrl]         = useState('')
  const [resType, setResType]       = useState('link')
  const [resources, setResources]   = useState<Resource[]>([])

  // video tab: 'url' | 'upload'
  const [videoTab, setVideoTab] = useState<'url' | 'upload'>('url')

  async function load() {
    setLoading(true)
    const res = await fetch(`/api/admin/lecciones/${lessonId}`)
    const data: Lesson = await res.json()
    setLesson(data)
    setTitle(data.title ?? '')
    setDesc(data.description ?? '')
    setVideoUrl(data.video_url ?? '')
    setContent(data.content ?? '')
    setDuration(data.duration_min ? String(data.duration_min) : '')
    setPublished(data.is_published ?? false)
    setResources(data.resources ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [lessonId])

  async function save() {
    setSaving(true)
    await fetch(`/api/admin/lecciones/${lessonId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description: desc,
        video_url:   videoUrl || null,
        content:     content || null,
        duration_min: duration ? parseInt(duration) : null,
        is_published: published,
      }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function uploadVideo(file: File) {
    setUploading(true)
    setUploadProgress(10)
    const ext  = file.name.split('.').pop()
    const path = `videos/${lessonId}-${Date.now()}.${ext}`
    setUploadProgress(30)
    const { error } = await supabase.storage.from('course-media').upload(path, file, { upsert: true })
    setUploadProgress(80)
    if (!error) {
      const { data } = supabase.storage.from('course-media').getPublicUrl(path)
      setVideoUrl(data.publicUrl)
    }
    setUploadProgress(100)
    setUploading(false)
  }

  async function addResource() {
    if (!resName.trim() || !resUrl.trim()) return
    const res = await fetch(`/api/admin/lecciones/${lessonId}/recursos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: resName.trim(), url: resUrl.trim(), type: resType }),
    })
    const newRes = await res.json()
    setResources(prev => [...prev, newRes])
    setResName('')
    setResUrl('')
    setResType('link')
    setAddingRes(false)
  }

  async function deleteResource(rId: string) {
    await fetch(`/api/admin/lecciones/${lessonId}/recursos`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: rId }),
    })
    setResources(prev => prev.filter(r => r.id !== rId))
  }

  if (loading) return <div className="text-gray-600 text-sm py-8">Cargando…</div>
  if (!lesson)  return <div className="text-red-500 text-sm py-8">Lección no encontrada.</div>

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-600 mb-6">
        <Link href="/admin" className="hover:text-orange-500 transition-colors">Admin</Link>
        <span>/</span>
        <Link href="/admin/cursos" className="hover:text-orange-500 transition-colors">Cursos</Link>
        <span>/</span>
        <Link href={`/admin/cursos/${id}`} className="hover:text-orange-500 transition-colors">Constructor</Link>
        <span>/</span>
        <span className="text-gray-400 truncate max-w-[160px]">{lesson.title}</span>
      </div>

      {/* Title bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 min-w-0">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="bg-transparent text-xl font-black text-white outline-none w-full placeholder-gray-700"
            placeholder="Título de la lección…"
          />
        </div>
        <button
          onClick={() => setPublished(p => !p)}
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0 ${published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-gray-500 hover:text-white'}`}
        >
          {published ? <><Eye size={12} /> Publicada</> : <><EyeOff size={12} /> Borrador</>}
        </button>
        <button
          onClick={save}
          disabled={saving}
          className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-colors shrink-0 ${saved ? 'bg-emerald-600 text-white' : 'bg-orange-600 hover:bg-orange-500 text-white'}`}
        >
          {saved ? <><Check size={14} /> Guardado</> : <><Save size={14} /> {saving ? 'Guardando…' : 'Guardar'}</>}
        </button>
      </div>

      <div className="flex flex-col gap-5">

        {/* Description */}
        <div className="bg-[#111] border border-white/5 rounded-xl p-5">
          <label className="text-[10px] text-orange-500 uppercase tracking-widest font-bold block mb-3">Descripción corta</label>
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            rows={2}
            placeholder="Una línea que resume de qué va la lección…"
            className="w-full bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-700 outline-none focus:border-orange-600/30 resize-none"
          />
          <div className="flex items-center gap-3 mt-3">
            <label className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Duración</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="0"
                className="w-16 bg-[#1a1a1a] border border-white/5 rounded px-2 py-1 text-sm text-white outline-none focus:border-orange-600/30 text-center"
              />
              <span className="text-xs text-gray-600">min</span>
            </div>
          </div>
        </div>

        {/* Video */}
        <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5">
            <Video size={15} className="text-orange-500" />
            <span className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Video</span>
            <div className="ml-auto flex items-center gap-1 bg-[#1a1a1a] rounded-lg p-0.5">
              {(['url', 'upload'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setVideoTab(t)}
                  className={`text-xs font-bold px-3 py-1 rounded-md transition-colors ${videoTab === t ? 'bg-orange-600 text-white' : 'text-gray-500 hover:text-white'}`}
                >
                  {t === 'url' ? 'URL / Embed' : 'Subir archivo'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5">
            {videoTab === 'url' ? (
              <>
                <input
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)}
                  placeholder="https://vimeo.com/… · https://youtube.com/… · o URL directa de video"
                  className="w-full bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-700 outline-none focus:border-orange-600/30"
                />
                {videoUrl && (
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-orange-500 hover:text-orange-400"
                  >
                    <ExternalLink size={11} /> Abrir enlace
                  </a>
                )}
              </>
            ) : (
              <>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl py-10 cursor-pointer hover:border-orange-600/30 transition-colors">
                  <Video size={28} className="text-gray-700 mb-3" />
                  <span className="text-sm text-gray-500 mb-1">Arrastra un video o haz clic para seleccionar</span>
                  <span className="text-xs text-gray-700">MP4, MOV, WebM — máx. 500 MB</span>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) uploadVideo(f) }}
                  />
                </label>
                {uploading && (
                  <div className="mt-3">
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-600 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Subiendo… {uploadProgress}%</p>
                  </div>
                )}
                {videoUrl && !uploading && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg">
                    <Check size={12} /> Video subido correctamente
                    <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="ml-auto text-orange-500 hover:text-orange-400 flex items-center gap-1">
                      <ExternalLink size={11} /> Ver
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5">
            <FileText size={15} className="text-orange-500" />
            <span className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Contenido de texto</span>
          </div>
          <div className="p-5">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={12}
              placeholder="Escribe el contenido de la lección. Puedes usar Markdown: **negrita**, ## títulos, - listas, `código`…"
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-700 outline-none focus:border-orange-600/30 resize-y font-mono leading-relaxed"
            />
          </div>
        </div>

        {/* Resources */}
        <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5">
            <Link2 size={15} className="text-orange-500" />
            <span className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Recursos</span>
            <button
              onClick={() => setAddingRes(true)}
              className="ml-auto flex items-center gap-1 text-xs text-gray-600 hover:text-orange-500 transition-colors font-bold"
            >
              <Plus size={12} /> Agregar
            </button>
          </div>

          <div className="p-5 flex flex-col gap-2">
            {resources.length === 0 && !addingRes && (
              <p className="text-xs text-gray-700 py-2">Sin recursos todavía. Agrega PDFs, links o archivos.</p>
            )}

            {resources.map(r => (
              <div key={r.id} className="flex items-center gap-3 bg-[#1a1a1a] rounded-lg px-3 py-2.5">
                <span className="text-base leading-none">
                  {RESOURCE_TYPES.find(t => t.value === r.type)?.icon ?? '📎'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-300 truncate">{r.name}</p>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-orange-500 truncate block transition-colors">
                    {r.url}
                  </a>
                </div>
                <button
                  onClick={() => deleteResource(r.id)}
                  className="w-6 h-6 flex items-center justify-center rounded text-gray-700 hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}

            {addingRes && (
              <div className="bg-[#1a1a1a] border border-orange-600/20 rounded-lg p-4 flex flex-col gap-3">
                <div className="flex gap-2">
                  {RESOURCE_TYPES.map(t => (
                    <button
                      key={t.value}
                      onClick={() => setResType(t.value)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${resType === t.value ? 'bg-orange-600 text-white' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                    >
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>
                <input
                  autoFocus
                  value={resName}
                  onChange={e => setResName(e.target.value)}
                  placeholder="Nombre del recurso"
                  className="bg-[#111] border border-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 outline-none focus:border-orange-600/30"
                />
                <input
                  value={resUrl}
                  onChange={e => setResUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addResource()}
                  placeholder="URL del recurso"
                  className="bg-[#111] border border-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 outline-none focus:border-orange-600/30"
                />
                <div className="flex gap-2">
                  <button onClick={addResource} className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                    <Check size={12} /> Agregar
                  </button>
                  <button onClick={() => { setAddingRes(false); setResName(''); setResUrl('') }} className="text-gray-500 hover:text-white text-xs px-3 py-2 transition-colors">
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom save */}
      <div className="flex justify-end mt-6 pt-6 border-t border-white/5">
        <button
          onClick={save}
          disabled={saving}
          className={`flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-lg transition-colors ${saved ? 'bg-emerald-600 text-white' : 'bg-orange-600 hover:bg-orange-500 text-white'}`}
        >
          {saved ? <><Check size={14} /> Guardado</> : <><Save size={14} /> {saving ? 'Guardando…' : 'Guardar lección'}</>}
        </button>
      </div>
    </div>
  )
}
