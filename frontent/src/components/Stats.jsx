import { useI18n } from '../i18n/I18nProvider'

export default function Stats() {
  const { tree } = useI18n()
  return (
    <section className="relative py-16 border-y border-white/5 bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {tree.stats.map(s => (
          <div key={s.label} className="text-center">
            <p className="font-display font-extrabold text-3xl md:text-4xl gradient-text">{s.value}</p>
            <p className="text-sm text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}