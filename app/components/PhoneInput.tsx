'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const countries = [
  { name: 'México',           dial: '+52',  flag: '🇲🇽' },
  { name: 'España',           dial: '+34',  flag: '🇪🇸' },
  { name: 'Argentina',        dial: '+54',  flag: '🇦🇷' },
  { name: 'Colombia',         dial: '+57',  flag: '🇨🇴' },
  { name: 'Chile',            dial: '+56',  flag: '🇨🇱' },
  { name: 'Perú',             dial: '+51',  flag: '🇵🇪' },
  { name: 'Venezuela',        dial: '+58',  flag: '🇻🇪' },
  { name: 'Ecuador',          dial: '+593', flag: '🇪🇨' },
  { name: 'Guatemala',        dial: '+502', flag: '🇬🇹' },
  { name: 'Cuba',             dial: '+53',  flag: '🇨🇺' },
  { name: 'Bolivia',          dial: '+591', flag: '🇧🇴' },
  { name: 'Rep. Dominicana',  dial: '+1',   flag: '🇩🇴' },
  { name: 'Honduras',         dial: '+504', flag: '🇭🇳' },
  { name: 'Paraguay',         dial: '+595', flag: '🇵🇾' },
  { name: 'El Salvador',      dial: '+503', flag: '🇸🇻' },
  { name: 'Nicaragua',        dial: '+505', flag: '🇳🇮' },
  { name: 'Costa Rica',       dial: '+506', flag: '🇨🇷' },
  { name: 'Panamá',           dial: '+507', flag: '🇵🇦' },
  { name: 'Uruguay',          dial: '+598', flag: '🇺🇾' },
  { name: 'Puerto Rico',      dial: '+1',   flag: '🇵🇷' },
]

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function PhoneInput({ value, onChange }: Props) {
  const [selected, setSelected] = useState(countries[0])
  const [open, setOpen] = useState(false)
  const [number, setNumber] = useState(value.replace(/^\+\d+\s?/, ''))
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function selectCountry(country: typeof countries[0]) {
    setSelected(country)
    setOpen(false)
    onChange(`${country.dial} ${number}`)
  }

  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const n = e.target.value
    setNumber(n)
    onChange(`${selected.dial} ${n}`)
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center border-b border-white/20 focus-within:border-orange-500 transition-colors">
        {/* Country selector button */}
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1.5 pr-3 py-2 text-sm shrink-0 text-white/80 hover:text-white transition-colors"
        >
          <span className="text-base leading-none">{selected.flag}</span>
          <span className="text-xs font-medium">{selected.dial}</span>
          <ChevronDown
            size={12}
            className={`text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        <div className="w-px h-4 bg-white/15 mr-3 shrink-0" />

        {/* Number input */}
        <input
          type="tel"
          value={number}
          onChange={handleNumberChange}
          placeholder="000 000 0000"
          className="bg-transparent outline-none text-sm w-full py-2 placeholder:text-gray-700"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-[#1a1a1a] border border-white/10 z-50 max-h-56 overflow-y-auto shadow-xl">
          {countries.map(country => (
            <button
              key={`${country.name}-${country.dial}`}
              type="button"
              onClick={() => selectCountry(country)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors ${
                selected.name === country.name ? 'text-orange-500' : 'text-gray-300'
              }`}
            >
              <span className="text-base leading-none">{country.flag}</span>
              <span className="flex-1">{country.name}</span>
              <span className="text-gray-500 text-xs">{country.dial}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
