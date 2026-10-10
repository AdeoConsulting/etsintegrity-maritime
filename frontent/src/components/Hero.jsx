import { Ship, ShieldCheck, FileCheck2, Clock, ArrowRight, CheckCircle2, MapPin } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'

export default function Hero() {
  const { tree } = useI18n()
  const h = tree.hero

  const badges = [
    { icon: ShieldCheck, label: h.badges.compliance },
    { icon: FileCheck2,  label: h.badges.dossier },
    { icon: Clock,       label: h.badges.speed },
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-40 pb-20 overflow-hidden">
      {/* Fonds dégradés */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950" />
      <div className="absolute inset-0 opacity-30"
           style={{
             backgroundImage:
               'radial-gradient(circle at 20% 30%, rgba(14,165,233,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.20), transparent 45%), radial-gradient(circle at 60% 20%, rgba(239,68,68,0.10), transparent 40%)'
           }} />
      <div className="absolute inset-0 opacity-[0.06]"
           style={{
             backgroundImage:
               'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
             backgroundSize: '60px 60px'
           }} />
      <svg className="absolute bottom-0 left-0 w-[200%] h-40 text-navy-900 animate-wave opacity-60"
           viewBox="0 0 1200 120" fill="currentColor" preserveAspectRatio="none">
        <path d="M0,64 C150,20 350,20 500,64 C650,108 850,108 1000,64 C1150,20 1300,20 1200,64 L1200,120 L0,120 Z"/>
      </svg>

      {/* Watermark drapeau cameroun discret */}
      <div className="pointer-events-none absolute right-[-6%] top-[15%] select-none opacity-[0.04]">
        <div className="w-[600px] h-[400px] flex">
          <div className="flex-1 bg-emerald-500" />
          <div className="w-1/3 bg-red-500 flex items-center justify-center">
            <span className="text-yellow-400 text-[180px] leading-none">★</span>
          </div>
          <div className="flex-1 bg-yellow-400" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center w-full">
        {/* Colonne gauche */}
        <div className="lg:col-span-7 animate-fade-in-up">
          {/* Bandeau Cameroun */}
          {/* Badge Cameroun — single line, clean */}
          <div className="inline-flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full
                          bg-white/5 border border-emerald-400/30 backdrop-blur-md mb-6
                          max-w-full">
            {/* Mini drapeau Cameroun en SVG (rendu partout, jamais en texte) */}
            <span className="flex items-center justify-center shrink-0 w-7 h-7 rounded-full
                            bg-emerald-500/15 border border-emerald-400/30">
              <svg viewBox="0 0 30 20" className="w-4 h-3 rounded-[2px] overflow-hidden">
                <rect width="10" height="20" fill="#007a5e" />
                <rect x="10" width="10" height="20" fill="#ce1126" />
                <rect x="20" width="10" height="20" fill="#fcd116" />
                <polygon
                  points="15,7 15.9,9.8 18.8,9.8 16.5,11.6 17.3,14.4 15,12.7 12.7,14.4 13.5,11.6 11.2,9.8 14.1,9.8"
                  fill="#fcd116"
                />
              </svg>
            </span>

            <span className="text-xs sm:text-sm text-slate-200 font-medium leading-tight truncate">
              {h.badgeCameroon}
              <span className="hidden sm:inline text-slate-500 mx-1.5">·</span>
              <span className="hidden sm:inline text-slate-400">{h.badge}</span>
            </span>

            {/* Petit point vert pulsé */}
            <span className="relative flex w-1.5 h-1.5 shrink-0">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white mb-6">
            {h.title1}{' '}
            <span className="relative inline-block">
              <span className="gradient-text">{h.title2}</span>
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-emerald-400/60"
                   viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0,4 Q50,0 100,4 T200,4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="block mt-2">{h.title3}</span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
            {h.descStart}{' '}
            <strong className="text-white">{h.descStrong1}</strong>{' '}
            {h.descMid}{' '}
            <strong className="text-white">{h.descStrong2}</strong>{' '}
            {h.descEnd}
          </p>

          {/* Chip Cameroun : "Toutes les Circonscriptions couvertes" */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-3 rounded-xl glass px-4 py-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold">{h.cameroonChip}</p>
                <p className="text-sm font-semibold text-white">{h.cameroonChipValue}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Douala</span><span>·</span>
              <span>Limbé</span><span>·</span>
              <span>Kribi</span><span>·</span>
              <span>Garoua</span><span>·</span>
              <span>+ autres</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#contact" className="btn-primary">
              {h.cta1} <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#services" className="btn-secondary">{h.cta2}</a>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl">
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                <Icon className="w-5 h-5 text-ocean-400 shrink-0" />
                <span className="text-sm text-slate-200">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne droite : carte dossier style officiel Cameroun */}
        <div className="lg:col-span-5 relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -inset-6 bg-gradient-to-tr from-emerald-500/15 via-ocean-500/20 to-red-500/10 blur-3xl rounded-full" />
          <div className="relative glass rounded-3xl p-6 shadow-2xl overflow-hidden">
            {/* Watermark CAMEROUN */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
              <span className="font-display font-extrabold text-[80px] tracking-widest text-white/[0.04] rotate-[-18deg]">
                {h.card.watermark}
              </span>
            </div>

            {/* En-tête officiel */}
            <div className="relative flex items-center gap-3 pb-4 mb-5 border-b border-white/10">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-xl">
                {h.card.headerFlag}
              </div>
              <div className="leading-tight">
                <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-300 font-bold">
                  {h.card.headerLine}
                </p>
                <p className="text-sm font-semibold text-white">{h.card.headerSub}</p>
              </div>
              <span className="ml-auto text-xs px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {h.card.valid}
              </span>
            </div>

            <div className="relative flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-cyan-400 flex items-center justify-center">
                  <Ship className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{h.card.title}</p>
                  <p className="text-xs text-slate-400">{h.card.ref}</p>
                </div>
              </div>
            </div>

            <div className="relative space-y-3">
              {h.card.steps.map((step, i) => (
                <div key={step} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-sm text-slate-200">{step}</span>
                  <span className="ml-auto text-xs text-slate-500">0{i + 1}</span>
                </div>
              ))}
            </div>

            <div className="relative mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">{h.card.progress}</p>
                <p className="font-display font-bold text-white">{h.card.status}</p>
              </div>
              <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-emerald-400 via-ocean-400 to-cyan-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}