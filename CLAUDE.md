# CLAUDE.md - Regles du projet XSS VADI

## Objectif du projet

XSS VADI est une application web **pedagogique** de demonstration des failles Cross-Site Scripting (XSS) pour le module ICT-183. L'application est **volontairement vulnerable** pour permettre aux eleves de comprendre les risques et les contre-mesures.

## Regles de securite strictes

### Payloads autorises (pedagogiques uniquement)
- `<strong>texte</strong>` - Mise en forme HTML basique
- `<em>texte</em>` - Mise en forme HTML basique
- `<script>alert('message')</script>` - Demonstration alert inoffensive
- `<img src=x onerror="alert('XSS')">` - Demonstration evenement

### Payloads INTERDITS (ne jamais ajouter)
- Exfiltration vers des serveurs externes
- Keyloggers ou capture de saisie
- Vol de cookies vers des domaines tiers
- Redirections vers des sites malveillants
- Payloads de cryptomining
- Code obfusque ou encode
- Tout payload reutilisable hors contexte demo

### Regles API /api/collect
- Endpoint de demo UNIQUEMENT pour capturer des demoTokens locaux
- Ne jamais envoyer de donnees vers l'exterieur
- Les captures restent sur le serveur local
- Authentification requise (session)

## Conventions de code

### Structure des dossiers
```
/
├── server.js           # Point d'entree Express
├── routes/             # Routes Express
│   ├── auth.js         # Authentification
│   ├── chapters.js     # Chapitres et posts
│   └── admin.js        # Panel admin
├── services/
│   └── jsonStore.js    # Persistance JSON
├── views/              # Templates EJS
│   ├── partials/       # Navbar, footer
│   └── admin/          # Vues admin
├── public/
│   ├── css/style.css   # Design system
│   └── js/app.js       # JavaScript client
└── data.json           # Base de donnees
```

### Naming conventions
- **Variables JS** : camelCase (`userName`, `postContent`)
- **Classes CSS** : kebab-case (`card-header`, `btn-primary`)
- **Fichiers EJS** : kebab-case (`teacher-guide.ejs`)
- **Routes** : kebab-case (`/teacher-guide`, `/api/collect`)

### Regles CSS
- Utiliser les variables CSS du design system (style.css)
- Eviter les styles inline sauf exception justifiee
- Composants reutilisables : btn, card, alert, badge, form-*
- Prefixes pour variantes : `.btn-primary`, `.card-danger`

### Regles EJS
- `<%= %>` pour echapper le HTML (SECURISE)
- `<%- %>` uniquement pour inclusions et contenu de confiance
- Toujours inclure navbar et footer via partials
- Variable `currentPage` pour l'etat actif du menu

## Checklist avant commit

### Code
- [ ] Pas de payloads dangereux ajoutes
- [ ] Variables CSS utilisees (pas de valeurs hardcodees)
- [ ] Pas de console.log en production
- [ ] Fichiers non necessaires exclus (.env, node_modules)

### Securite
- [ ] Donnees utilisateur echappees avec `<%= %>`
- [ ] Pas d'endpoint API expose vers l'exterieur
- [ ] Sessions et cookies configures correctement
- [ ] Pas de credentials dans le code

### Tests manuels
- [ ] Login fonctionne (user et admin)
- [ ] Navigation entre pages OK
- [ ] Demo XSS affiche correctement
- [ ] Activite avec scoring fonctionne
- [ ] Panel admin accessible (admin uniquement)

## Comment lancer le projet

```bash
# Installation
cd D:\XSS-vadi
npm install

# Demarrage en developpement
npm run dev

# Demarrage en production
npm start
```

Le serveur affiche l'URL reseau pour les eleves.

### Comptes
- **Eleves** : n'importe quel nom + n'importe quel mot de passe
- **Admin** : `admin` / `admin**123`

## Comment ajouter un nouvel exercice

1. Ajouter le HTML dans `views/activity.ejs`
2. Suivre le pattern existant (quiz-question, quiz-options)
3. Ajouter la logique JS dans le script de la page
4. Mettre a jour le compteur total (actuellement 6)
5. Ajouter le corrige dans `views/teacher-guide.ejs`

## Comment modifier le design

1. Editer les variables CSS dans `public/css/style.css` (section 1)
2. Les composants sont documentes dans les sections 5-19
3. Tester sur mobile (responsive) et desktop
4. Verifier les contrastes (accessibilite)

## Ressources

- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [DOMPurify](https://github.com/cure53/DOMPurify)
