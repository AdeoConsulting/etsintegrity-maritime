# ETSINTEGRITY-MARITIME — Landing Page

> Site vitrine pour ETSINTEGRITY-MARITIME, spécialiste de l'immatriculation de navires au Cameroun et des services maritimes.
> Landing page for ETSINTEGRITY-MARITIME, vessel registration specialists in Cameroon.

---

## 📋 Table des matières / Table of contents

- [Aperçu / Overview](#-aperçu--overview)
- [Stack technique / Tech stack](#-stack-technique--tech-stack)
- [Prérequis / Prerequisites](#-prérequis--prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Développement / Development](#-développement--development)
- [Build & déploiement / Build & deploy](#-build--déploiement)
- [Structure du projet / Project structure](#-structure-du-projet--project-structure)
- [Internationalisation / i18n](#-internationalisation--i18n)
- [Formulaire de contact / Contact form](#-formulaire-de-contact--contact-form)
- [SEO](#-seo)
- [Dépannage / Troubleshooting](#-dépannage--troubleshooting)

---

## 🎯 Aperçu / Overview

Landing page one-page moderne avec :

- **Hero** centré sur l'immatriculation de navires **au Cameroun**
- Bandeau tricolore 🇨🇲 et drapeaux SVG (compatibles Windows)
- Section **Pourquoi nous** (3 piliers : conformité, proximité, disponibilité)
- **6 services** maritimes détaillés
- **Processus en 4 étapes**
- **Statistiques** de confiance (10+ ans, 24/7, toutes les Circonscriptions)
- **Formulaire de contact** avec validation temps réel et sélecteur d'indicatif pays
- **Bilingue FR / EN** avec détection automatique du navigateur
- **SEO complet** : meta tags, Open Graph, Twitter Card, JSON-LD (`LocalBusiness` + `Service`)
- **100% responsive** — mobile-first, sans débordement horizontal

---

## 🛠 Stack technique / Tech stack

| Couche | Technologie |
|---|---|
| Framework | React **19.2.4** |
| Bundler | Vite **8.0.4** |
| CSS | Tailwind CSS **3.4.19** |
| Icônes | lucide-react |
| Formulaires | Natif (React state) + validation custom |
| Backend (email) | FastAPI (endpoint externe) |
| Déploiement | FTP / FTPS / SFTP |
| i18n | Custom (Context API + `localStorage`) |

---

## ✅ Prérequis / Prerequisites

- **Node.js** ≥ 20.x
- **npm** ≥ 10.x (ou pnpm / yarn)
- Accès FTP au serveur (pour le déploiement)
- Backend FastAPI accessible (pour le formulaire de contact)

---

## 📦 Installation

```bash
# Cloner le dépôt
git clone <your-repo-url> etsintegrity-maritime
cd etsintegrity-maritime/frontend

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env
# → éditez .env avec vos valeurs (voir section Configuration)
```

---

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine (jamais commité) :

```env
# URL de base de l'API backend (sans slash final)
VITE_NOTIFICATION_API_URL=http://localhost:8000

# Destinataire des messages du formulaire
VITE_CONTACT_EMAIL=contact@etsintegrity-maritime.com

# Coordonnées affichées sur le site
VITE_CONTACT_PHONE=+237 6XX XXX XXX
```

### Environnements

| Variable | Dev | Prod |
|---|---|---|
| `VITE_NOTIFICATION_API_URL` | `http://localhost:8000` | `https://api.stephanemebenga.com` |
| `VITE_CONTACT_EMAIL` | votre email de test | `contact@etsintegrity-maritime.com` |
| `VITE_CONTACT_PHONE` | placeholder | numéro réel |

> ⚠️ **Important** : les variables `VITE_*` sont **inlinées au moment du build**. Après tout changement, vous devez **rebuilder** (`npm run build`) pour que la production prenne la nouvelle valeur.

---

## 🚀 Développement / Development

```bash
# Lancer le serveur de dev (http://localhost:5173)
npm run dev

# Lancer le build de production
npm run build

# Prévisualiser le build localement (http://localhost:4173)
npm run preview
```

---

## 📤 Build & déploiement / Build & deploy

### 1. Générer le build

```bash
npm run build
```

Le dossier `dist/` contient tous les fichiers statiques prêts à déployer.

### 2. Déployer sur le serveur

**Option A — FileZilla (manuel)**

1. Connectez-vous à votre serveur FTP
2. Naviguez vers `public_html/`
3. Supprimez l'ancien contenu
4. Glissez-déposez **le contenu** de `dist/` (pas le dossier `dist` lui-même)
5. Vérifiez que `index.html` est bien à la racine

**Option B — Déploiement automatisé (`vite-plugin-push`)**

```bash
npm install -D vite-plugin-push
```

Configurez `.publish.js` (voir doc du plugin) puis :

```bash
vite build --mode production
```

**Option C — GitHub Actions**

Voir `.github/workflows/deploy.yml` (workflow d'exemple avec `SamKirkland/FTP-Deploy-Action`).

### 3. Tester le déploiement

Après upload, vérifiez :

- La page se charge sans erreur console
- Le favicon apparaît dans l'onglet
- Le sélecteur de langue fonctionne
- Le formulaire envoie bien un mail (voir Network tab)
- Pas de 404 sur les assets

---

## 🗂 Structure du projet / Project structure

```
etsintegrity-maritime/frontend/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── favicon-96x96.png
│   ├── apple-touch-icon.png
│   ├── web-app-manifest-192x192.png
│   ├── web-app-manifest-512x512.png
│   ├── og-image.png               # Open Graph 1200×630
│   ├── og-image.svg               # Source
│   ├── site.webmanifest
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── CameroonBanner.jsx
│   │   ├── Hero.jsx
│   │   ├── Stats.jsx
│   │   ├── WhyUs.jsx
│   │   ├── Services.jsx
│   │   ├── Process.jsx
│   │   ├── CTA.jsx
│   │   ├── ContactForm.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   ├── Flag.jsx
│   │   └── Footer.jsx
│   ├── i18n/
│   │   ├── I18nProvider.jsx
│   │   └── translations.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── countryCodes.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env.example
└── README.md
```

---

## 🌍 Internationalisation / i18n

Le système i18n est basé sur le **Context API** de React et le `localStorage`.

### Ajouter une nouvelle langue

1. Ouvrez `src/i18n/translations.js`
2. Dupliquez un bloc existant (ex. `fr`) et traduisez :

```js
export const translations = {
  fr: { /* ... */ },
  en: { /* ... */ },
  es: {  // ⬅ nouvelle langue
    nav: { services: 'Servicios', /* ... */ },
    // ...
  },
}

export const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English'  },
  { code: 'es', label: 'Español'  },  // ⬅ ajouter
]
```

3. Ajoutez le drapeau correspondant dans `src/components/Flag.jsx` :

```jsx
export function SpainFlag({ className = 'w-5 h-3.5' }) {
  return (
    <svg viewBox="0 0 30 20" className={`${STYLE} ${className}`}>
      <rect width="30" height="20" fill="#aa151b" />
      <rect y="5" width="30" height="10" fill="#f1bf00" />
    </svg>
  )
}

const LANG_FLAGS = {
  fr: FranceFlag,
  en: UkFlag,
  es: SpainFlag,   // ⬅ ajouter
}
```

### Utilisation dans un composant

```jsx
import { useI18n } from '../i18n/I18nProvider'

function MyComponent() {
  const { t, lang, setLang, tree } = useI18n()

  return (
    <div>
      <h1>{t('hero.title1')}</h1>          {/* chemin dot-notation */}
      <p>{tree.hero.title2}</p>            {/* accès direct à la clé */}
      <button onClick={() => setLang('en')}>Switch to EN</button>
    </div>
  )
}
```

---

## 📬 Formulaire de contact / Contact form

### Flux

```
User → ContactForm.jsx → sendContactEmail() → FastAPI → SMTP → Email
```

### Endpoint attendu

**POST** `{VITE_NOTIFICATION_API_URL}/api/v1/notifications/send_email`

**Payload JSON** :

```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "+237 6968787454",
  "message": "Bonjour, je souhaite immatriculer mon navire…"
}
```

**Réponse attendue** :

```json
{ "message": "Email sending initiated." }
```

### Validation côté frontend

| Champ | Règle |
|---|---|
| `name` | requis, ≥ 2 caractères |
| `email` | requis, format email valide |
| `phone` | requis, 6–15 chiffres (avec indicatif pays) |
| `message` | requis, ≥ 10 caractères |

### Ajouter un honeypot anti-spam

Ajoutez un champ invisible dans `ContactForm.jsx` :

```jsx
<input
  type="text"
  name="website"
  value={form.website || ''}
  onChange={(e) => update('website', e.target.value)}
  style={{ position: 'absolute', left: '-9999px' }}
  tabIndex={-1}
  autoComplete="off"
/>
```

Côté backend, rejetez les requêtes où `website` n'est pas vide.

---

## 🔎 SEO

### Fichiers clés

| Fichier | Rôle |
|---|---|
| `index.html` | Meta tags, OG, Twitter Card, JSON-LD |
| `public/robots.txt` | Directives crawler + lien sitemap |
| `public/sitemap.xml` | Plan du site |
| `public/og-image.png` | Carte de partage social (1200×630) |
| `public/site.webmanifest` | Manifest PWA |

### Balises structurées (JSON-LD)

Le site expose 3 entités Schema.org :

- `LocalBusiness` — l'entreprise, sa géolocalisation, ses horaires
- `Service` — l'immatriculation de navires
- `WebSite` — le site lui-même

### Tester le SEO

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [OpenGraph.xyz](https://www.opengraph.xyz/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Soumettre le sitemap

1. Créez un compte [Google Search Console](https://search.google.com/search-console)
2. Ajoutez votre propriété
3. Soumettez `https://etsintegrity-maritime.com/sitemap.xml`

---

## 🐛 Dépannage / Troubleshooting

### Le formulaire renvoie `404 Not Found`

Vérifiez dans l'ordre :

1. Le backend a bien la route `POST /api/v1/notifications/send_email`
2. nginx ne réécrit pas l'URL (pas de trailing slash sur `proxy_pass`)
3. Le conteneur backend tourne la **dernière** version du code

```bash
# Bypass nginx pour tester FastAPI directement
docker compose exec <service> curl -X POST http://localhost:8000/api/v1/notifications/send_email \
  -H "Content-Type: application/json" \
  -d '{"name":"T","email":"t@t.com","phone":"+237 6","message":"test message here"}'
```

### Erreur CORS `No 'Access-Control-Allow-Origin' header`

Ajoutez l'origine exacte du frontend à `CORS_ORIGINS` dans le backend (avec **et** sans `www`) :

```python
CORS_ORIGINS = [
    "https://etsintegrity-maritime.com",
    "https://www.etsintegrity-maritime.com",
    # ...
]
```

Puis **recréez** le conteneur (un `restart` ne recharge pas `.env`) :

```bash
docker compose up -d --force-recreate <service>
```

### Le numéro de téléphone envoie `"CM +237..."` au lieu de `"+237..."`

Vérifiez que le `<option>` du sélecteur utilise `value={c.dial}` (et non `value={c.code}`). Le service email normalise de toute façon, mais corrigez à la source.

### Les drapeaux emoji s'affichent en texte (`CM`, `FR`) sur Windows

Windows ne supporte pas les emojis drapeaux. Utilisez le composant `<CameroonFlag />` (SVG inline) ou `<CountryFlag code="CM" />` (flagcdn.com). Voir `src/components/Flag.jsx`.

### `EPERM: operation not permitted` au build (Windows)

Vite ne peut pas vider `dist/`. Solutions :

1. Fermez tous les terminaux / VS Code / File Explorer ouverts dans `dist/`
2. Supprimez `dist/` manuellement
3. Ou ajoutez `emptyOutDir: false` dans `vite.config.js` et nettoyez manuellement

### Les variables d'environnement ne se mettent pas à jour

Les `VITE_*` sont **inlinées au build**. Après modification :

```bash
# 1. Arrêter le serveur (Ctrl+C)
# 2. Supprimer dist/
rm -rf dist
# 3. Rebuilder
npm run build
```

---

## 📄 Licence / License

© 2026 ETSINTEGRITY-MARITIME. Tous droits réservés.

---

## 📞 Contact

- **Site** : [etsintegrity-maritime.com](https://etsintegrity-maritime.com)
- **Email** : contact@etsintegrity-maritime.com
- **Téléphone** : +237 6XX XXX XXX
- **Localisation** : Douala, Cameroun

---

<div align="center">

**Made with ⚓ for ETSINTEGRITY-MARITIME**

</div>