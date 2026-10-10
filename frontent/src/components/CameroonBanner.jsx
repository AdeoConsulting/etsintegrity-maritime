import { useI18n } from '../i18n/I18nProvider'

export default function CameroonBanner() {
  const { tree } = useI18n()
  const b = tree.banner

  return (
    <div className="relative z-[60] w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-red-700 text-white text-xs sm:text-sm">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 8px, transparent 8px, transparent 16px)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-center gap-2 sm:gap-3 text-center min-w-0">
        <svg viewBox="0 0 30 20" className="w-5 h-3.5 shrink-0 rounded-[2px] overflow-hidden shadow-sm">
          <rect width="10" height="20" fill="#007a5e" />
          <rect x="10" width="10" height="20" fill="#ce1126" />
          <rect x="20" width="10" height="20" fill="#fcd116" />
          <polygon
            points="15,7 15.9,9.8 18.8,9.8 16.5,11.6 17.3,14.4 15,12.7 12.7,14.4 13.5,11.6 11.2,9.8 14.1,9.8"
            fill="#fcd116"
          />
        </svg>
        <p className="font-semibold leading-snug truncate min-w-0">{b.main}</p>
        <span className="hidden md:inline text-white/60">•</span>
        <p className="hidden md:inline text-white/90 truncate min-w-0">{b.sub}</p>
      </div>
    </div>
  )
}