import { useState, useMemo } from 'react'
import { User, Mail, Phone, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import { sendContactEmail, validateContact } from '../services/emailService'
import { COUNTRY_CODES, DEFAULT_COUNTRY } from '../services/countryCodes'

const INITIAL = { name: '', email: '', countryCode: DEFAULT_COUNTRY, phone: '', message: '' }

export default function ContactForm() {
  const { tree } = useI18n()
  const [form, setForm] = useState(INITIAL)
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  const fieldErrors = useMemo(() => validateContact(form), [form])
  const isValid = Object.keys(fieldErrors).length === 0
  const errors = tree.form.errors

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const blur = (k) => setTouched(p => ({ ...p, [k]: true }))
  const showError = (k) => touched[k] && fieldErrors[k]
  const errorMsg = (k) => (fieldErrors[k] ? errors[fieldErrors[k]] : '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, message: true })
    if (!isValid) return

    setStatus('submitting')
    setServerError('')

    try {
      await sendContactEmail(form)
      setStatus('success')
      setForm(INITIAL)
      setTouched({})
    } catch (err) {
      // ⬆️ `err` MUST be declared here, inside the parentheses
      setStatus('error')

      // Priorité au message précis renvoyé par le backend
      if (err?.type === 'network' && err?.message && err.message !== 'Network error') {
        setServerError(err.message)
      } else {
        setServerError(errors.network)
      }
    }
  }

  if (status === 'success') {
    return (
      <div className="w-full rounded-3xl glass p-6 sm:p-8 md:p-10 text-center animate-fade-in-up">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
        </div>
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
          {tree.form.successTitle}
        </h3>
        <p className="text-slate-400 text-sm sm:text-base mb-6">{tree.form.successDesc}</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-secondary text-sm w-full sm:w-auto justify-center">
          {tree.form.submit}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-full rounded-3xl glass p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5 overflow-hidden"
    >
      <div className="mb-1 sm:mb-2">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white break-words">
          {tree.form.heading}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 break-words">{tree.form.subheading}</p>
      </div>

      <Field id="name" label={tree.form.name} icon={User} error={showError('name') ? errorMsg('name') : ''}>
        <input
          id="name" type="text" autoComplete="name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          onBlur={() => blur('name')}
          placeholder={tree.form.namePlaceholder}
          className="w-full min-w-0 bg-transparent text-white placeholder-slate-500 outline-none text-sm"
        />
      </Field>

      <Field id="email" label={tree.form.email} icon={Mail} error={showError('email') ? errorMsg('email') : ''}>
        <input
          id="email" type="email" autoComplete="email" inputMode="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          onBlur={() => blur('email')}
          placeholder={tree.form.emailPlaceholder}
          className="w-full min-w-0 bg-transparent text-white placeholder-slate-500 outline-none text-sm"
        />
      </Field>

      {/* Téléphone — FIX responsive */}
      <Field id="phone" label={tree.form.phone} icon={Phone} error={showError('phone') ? errorMsg('phone') : ''}>
        <div className="flex items-center gap-2 w-full min-w-0">
          <div className="relative shrink-0 w-[78px]">
            <select
              aria-label="country code"
              value={form.countryCode}
              onChange={(e) => update('countryCode', e.target.value)}
              className="w-full appearance-none bg-transparent text-slate-200 text-sm outline-none cursor-pointer pr-4"
            >
              {COUNTRY_CODES.map(c => (
                <option key={c.code + c.dial} value={c.code} className="bg-navy-900 text-white">
                  {c.flag} {c.dial}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
          </div>

          <span className="text-slate-600 shrink-0">|</span>

          <input
            id="phone" type="tel" autoComplete="tel" inputMode="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            onBlur={() => blur('phone')}
            placeholder={tree.form.phonePlaceholder}
            className="w-0 flex-1 min-w-0 bg-transparent text-white placeholder-slate-500 outline-none text-sm"
          />
        </div>
      </Field>

      <Field id="message" label={tree.form.message} icon={MessageSquare} error={showError('message') ? errorMsg('message') : ''}>
        <textarea
          id="message" rows={4}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          onBlur={() => blur('message')}
          placeholder={tree.form.messagePlaceholder}
          className="w-full min-w-0 bg-transparent text-white placeholder-slate-500 outline-none text-sm resize-none"
        />
      </Field>

      {status === 'error' && serverError && (
        <div className="flex items-start gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs sm:text-sm text-red-300">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold">{tree.form.errorTitle}</p>
            <p className="text-red-200/80 break-words">{serverError}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full justify-center text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <><Loader2 className="w-4 h-4 animate-spin" />{tree.form.submitting}</>
        ) : (
          <><Send className="w-4 h-4" />{tree.form.submit}</>
        )}
      </button>
    </form>
  )
}

function Field({ id, label, icon: Icon, error, children }) {
  return (
    <div className="w-full min-w-0">
      <label htmlFor={id} className="block text-xs font-semibold text-slate-300 mb-1.5">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 sm:gap-2.5 rounded-xl px-3 sm:px-3.5 py-2.5 sm:py-3
                    border bg-white/5 transition-colors w-full min-w-0
          ${error ? 'border-red-500/50' : 'border-white/10 focus-within:border-ocean-400/60'}`}
      >
        {Icon && <Icon className={`w-4 h-4 shrink-0 ${error ? 'text-red-400' : 'text-slate-400'}`} />}
        {children}
      </div>
      {error && (
        <p className="text-[11px] sm:text-xs text-red-400 mt-1.5 flex items-start gap-1">
          <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
          <span className="break-words min-w-0">{error}</span>
        </p>
      )}
    </div>
  )
}