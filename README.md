# XSS VADI - Demonstration Pedagogique

Application web de demonstration des vulnerabilites XSS (Cross-Site Scripting) pour le module ICT-183.

## AVERTISSEMENT IMPORTANT

**Cette application est VOLONTAIREMENT VULNERABLE.**

- **NE PAS deployer en production**
- **NE PAS utiliser sur Internet public**
- **Usage UNIQUEMENT en environnement local controle (salle de classe)**
- **A des fins pedagogiques UNIQUEMENT**

---

## Demarrage rapide

### Prerequisites
- Node.js (version 14+)
- npm

### Installation

```bash
cd XSS-vadi
npm install
npm start
```

Le serveur affiche automatiquement l'URL reseau pour les eleves.

### Comptes

| Role | Login | Mot de passe |
|------|-------|--------------|
| Eleve | N'importe quel prenom | N'importe quel mdp |
| Admin | `admin` | `admin**123` |

---

## Pages de l'application

| Page | URL | Description |
|------|-----|-------------|
| Connexion | `/login` | Page de connexion |
| Accueil | `/chapters` | Liste des chapitres et parcours pedagogique |
| Chapitre | `/chapter/:id` | Contenu de cours + zone de test XSS |
| Demo Interactive | `/demo` | Comparaison vulnerable vs securise en temps reel |
| Activite Pratique | `/activity` | Quiz et exercices guides (15-20 min) |
| Contre-mesures | `/defense` | Techniques de defense pour dev junior |
| Guide Enseignant | `/teacher-guide` | Guide complet pour animer le cours (admin) |
| Panel Admin | `/admin` | Gestion captures et commentaires (admin) |

---

## Deroulement recommande du cours (45-60 min)

### 1. Introduction (10 min)
- Expliquer XSS et ses types (Reflechi, Stocke, DOM-based)
- Presenter les risques
- Support : Chapitres 1-2

### 2. Demo en direct (10 min)
- Ouvrir `/demo` sur l'ecran projete
- Tester des payloads simples
- Montrer la difference vulnerable/securise

### 3. Activite pratique (20 min)
- Eleves sur `/activity`
- 6 exercices avec timer integre
- Circuler pour aider

### 4. Contre-mesures (10 min)
- Parcourir `/defense` ensemble
- Insister sur la checklist dev junior

### 5. Synthese (5 min)
- Recapituler les points cles
- Questions/reponses

---

## Script de demo rapide (5 min)

1. Ouvrir `/demo`
2. Taper : `<b>Hello</b>` - Montrer HTML interprete vs texte brut
3. Taper : `<img src=x onerror="alert('XSS')">` - Montrer l'alerte
4. Expliquer : "En production, ce serait du vol de donnees"
5. Conclure : "Toujours echapper les donnees utilisateur"

---

## Payloads de test (pedagogiques)

```html
<!-- HTML basique -->
<strong>Texte en gras</strong>
<em>Texte en italique</em>

<!-- Alert inoffensive -->
<script>alert('XSS Demo')</script>

<!-- Via evenement (fonctionne avec innerHTML) -->
<img src="x" onerror="alert('XSS via image')">
```

---

## Techniques de defense enseignees

1. **Echappement** - textContent au lieu de innerHTML, <%= au lieu de <%- en EJS
2. **Sanitization** - DOMPurify (client), sanitize-html (serveur)
3. **CSP** - Content-Security-Policy header
4. **Cookies** - HttpOnly, Secure, SameSite
5. **Validation** - Cote serveur, listes blanches

---

## Structure du projet

```
XSS-vadi/
├── server.js           # Serveur Express
├── package.json        # Dependances
├── data.json           # Base de donnees JSON
├── CLAUDE.md           # Regles du projet
├── README.md           # Ce fichier
├── routes/
│   ├── auth.js         # Authentification
│   ├── chapters.js     # Chapitres
│   └── admin.js        # Panel admin
├── services/
│   └── jsonStore.js    # Persistance
├── views/
│   ├── login.ejs
│   ├── chapters.ejs
│   ├── chapter.ejs
│   ├── demo.ejs        # Demo interactive
│   ├── activity.ejs    # Activite pratique
│   ├── defense.ejs     # Contre-mesures
│   ├── teacher-guide.ejs # Guide prof
│   ├── admin/panel.ejs
│   └── partials/
└── public/
    ├── css/style.css   # Design system
    └── js/app.js       # JavaScript client
```

---

## Depannage

### Le serveur ne demarre pas
- Verifier que le port 3000 n'est pas utilise
- Essayer `npm run dev` pour voir les erreurs

### Les eleves ne peuvent pas se connecter
- Verifier le pare-feu (autoriser port 3000)
- Verifier que tous sont sur le meme reseau
- Utiliser l'IP affichee au demarrage du serveur

### Reinitialiser les donnees
Supprimer `data.json` et redemarrer le serveur.

---

## Developpement

```bash
# Mode developpement avec auto-reload
npm run dev

# Linter (si configure)
npm run lint
```

---

## Ressources

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [MDN - Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [DOMPurify](https://github.com/cure53/DOMPurify)

---

## Licence

MIT - Usage pedagogique uniquement

---

**Rappel :** La connaissance en securite doit etre utilisee de maniere ethique et responsable !
