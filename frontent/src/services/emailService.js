/**
 * Service d'envoi de mail pour le formulaire de contact.
 *
 * Backend : FastAPI
 *   POST {API_URL}/api/v1/notifications/send_email
 *   Body JSON : { name, email, phone, message }
 *
 * Le backend se charge de construire le HTML de l'email
 * (template dans backend/email_templates.py).
 */

const API_URL = (import.meta.env.VITE_NOTIFICATION_API_URL || '').replace(/\/+$/, '')
const DESTINATION_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || 'contact@etsintegrity-maritime.com'

const ENDPOINT = `${API_URL}/api/v1/notifications/send_email`

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[0-9\s().-]{6,15}$/

/* ---------- Validation ---------- */

export function validateContact({ name, email, phone, message }) {
  const errors = {}
  const n = (name || '').trim()
  const e = (email || '').trim()
  const p = (phone || '').trim()
  const m = (message || '').trim()

  if (!n) errors.name = 'nameRequired'
  else if (n.length < 2) errors.name = 'nameShort'

  if (!e) errors.email = 'emailRequired'
  else if (!EMAIL_RE.test(e)) errors.email = 'emailInvalid'

  if (!p) errors.phone = 'phoneRequired'
  else if (!PHONE_RE.test(p)) errors.phone = 'phoneInvalid'

  if (!m) errors.message = 'messageRequired'
  else if (m.length < 10) errors.message = 'messageShort'

  return errors
}

/* ---------- Envoi ---------- */

/**
 * Envoie un message de contact à l'API FastAPI.
 *
 * @param {Object} form
 * @param {string} form.name
 * @param {string} form.email
 * @param {string} form.countryCode  - ex: "+237"
 * @param {string} form.phone        - numéro sans indicatif
 * @param {string} form.message
 * @returns {Promise<{ ok: true, payload: Object }>}
 */
export async function sendContactEmail({ name, email, countryCode, phone, message }) {
  const cleanName = (name || '').trim()
  const cleanEmail = (email || '').trim()
  const cleanPhone = (phone || '').trim()
  const cleanMessage = (message || '').trim()
  const cleanCode = (countryCode || '').trim()

  // 1. Validation défensive (au cas où le formulaire serait contourné)
  const errors = validateContact({
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    message: cleanMessage,
  })
  if (Object.keys(errors).length > 0) {
    const err = new Error('Validation failed')
    err.type = 'validation'
    err.errors = errors
    throw err
  }

  // 2. Numéro complet avec indicatif
  const fullPhone = `${cleanCode} ${cleanPhone}`.trim()

  // 3. Payload — correspond exactement au ContactPayload Pydantic du backend
  const payload = {
    name: cleanName,
    email: cleanEmail,
    phone: fullPhone,
    message: cleanMessage,
  }

  // 4. Mode simulation si pas d'URL configurée (utile en dev sans backend)
  if (!API_URL) {
    console.info('[emailService] VITE_NOTIFICATION_API_URL non configurée. Payload simulé :', payload)
    await new Promise((r) => setTimeout(r, 900))
    return { ok: true, simulated: true, payload }
  }

  // 5. Envoi réel
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      let detail = `HTTP ${res.status}`
      try {
        const data = await res.json()
        if (data?.detail) detail = data.detail
      } catch {
        // réponse non-JSON, on garde le message par défaut
      }
      const err = new Error(detail)
      err.type = 'network'
      err.status = res.status
      throw err
    }

    return { ok: true, payload }
  } catch (e) {
    if (e.type) throw e
    const err = new Error(e.message || 'Network error')
    err.type = 'network'
    throw err
  }
}