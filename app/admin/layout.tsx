import LogoutButton from './components/LogoutButton'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/5 bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-orange-600 font-black text-lg tracking-tighter uppercase">
              CobreStudio
            </span>
            <span className="text-white/20">·</span>
            <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">
              Panel de control
            </span>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  )
}
