import { useI18n } from '../i18n/I18nProvider'

export default function Process() {
  const { tree } = useI18n()
  const p = tree.process

  return (
    <section id="processus" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-ocean-400 mb-3">
            {p.tag}
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white leading-tight">
            {p.title1} <span className="gradient-text">{p.titleBrand}</span>
          </h2>
        </div>

        <div className="relative grid md:grid-cols-4 gap-6">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ocean-500/40 to-transparent" />
          {p.steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-navy-900 border border-ocean-400/40 flex items-center justify-center mb-5 font-display font-extrabold text-ocean-300">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}