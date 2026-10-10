import { Scale, MapPinned, Clock4 } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'

const ICONS = [Scale, MapPinned, Clock4]

export default function WhyUs() {
  const { tree } = useI18n()
  const w = tree.why

  return (
    <section id="pourquoi-nous" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-ocean-400 mb-3">
            {w.tag}
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white leading-tight">
            {w.title1} <span className="gradient-text">{w.titleBrand}</span><br />
            {w.title2}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {w.items.map((r, i) => {
            const Icon = ICONS[i]
            return (
              <div key={i}
                   className="group relative rounded-3xl glass p-8 hover:border-ocean-400/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ocean-500/20 to-cyan-400/10 border border-ocean-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-ocean-300" />
                </div>
                <span className="inline-block text-[11px] font-semibold tracking-widest text-gold-400 mb-2">
                  {r.tag}
                </span>
                <h3 className="font-display font-bold text-xl text-white mb-3">{r.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{r.desc}</p>
                <ul className="space-y-2">
                  {r.points.map(p => (
                    <li key={p} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-ocean-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}