import Image from 'next/image'

const clients = [
  { name: 'Qualiway',    src: '/logos/qualiway.png'   },
  { name: 'InfoAtid',    src: '/logos/infoatid.png'   },
  { name: 'Ecofrienly',  src: '/logos/ecofrienly.png' },
  { name: 'Habity',      src: '/logos/habity.png'     },
]

export default function Portfolio() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-5">
          Portfolio
        </p>
        <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter mb-4">
          Proyectos que{' '}
          <span className="font-serif italic text-gold font-normal">lanzamos.</span>
        </h2>
        <p className="text-gray-500 text-base">
          Clientes que confiaron en nosotros para construir su app.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {clients.map(({ name, src }) => (
          <div
            key={name}
            className="group relative bg-[#d6d2cc] aspect-4/3 flex items-center justify-center overflow-hidden"
          >
            <Image
              src={src}
              alt={name}
              fill
              className="object-cover grayscale opacity-40 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
