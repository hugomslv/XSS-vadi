# 🔓 XSS VADI - Démonstration Pédagogique

Application web de démonstration des vulnérabilités XSS (Cross-Site Scripting) à des fins pédagogiques.

## ⚠️ AVERTISSEMENT IMPORTANT

**Cette application est VOLONTAIREMENT VULNÉRABLE.**

- 🚫 **NE PAS déployer en production**
- 🚫 **NE PAS utiliser sur Internet public**
- ✅ **Usage UNIQUEMENT en environnement local contrôlé (salle de classe)**
- ✅ **À des fins pédagogiques UNIQUEMENT**

Cette application a été conçue pour enseigner les concepts de sécurité web dans un environnement contrôlé. Elle ne collecte PAS de vraies données sensibles, uniquement un token de démonstration appelé `demoToken`.

---

## 📚 Objectifs pédagogiques

L'application permet de :
1. Comprendre ce qu'est une faille XSS
2. Observer comment elle se déclenche
3. Voir les conséquences potentielles (exfiltration simulée)
4. Apprendre les techniques de prévention et de défense

---

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 14 ou supérieure)
- npm (installé avec Node.js)

### Étapes d'installation

1. **Cloner ou télécharger le projet**
   ```bash
   cd XSS-vadi
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer le serveur**
   ```bash
   npm start
   ```

   Le serveur démarrera sur le port 3000 et écoutera sur `0.0.0.0` (accessible depuis le réseau local).

4. **Trouver votre adresse IP**

   **Windows :**
   ```bash
   ipconfig
   ```
   Cherchez l'adresse IPv4 (ex: 192.168.1.10)

   **macOS/Linux :**
   ```bash
   ifconfig
   ```
   ou
   ```bash
   ip addr show
   ```

5. **Accéder à l'application**
   - **Localement :** http://localhost:3000
   - **Depuis le réseau :** http://[VOTRE_IP]:3000
   - Exemple : http://192.168.1.10:3000

---

## 👥 Comptes de connexion

### Compte Élève (Utilisateur)
- **Nom d'utilisateur :** N'importe quel prénom (ex: Hugo, Sarah, Marc...)
- **Mot de passe :** `toto`

### Compte Administrateur
- **Login :** `admin`
- **Mot de passe :** `admin**123`

---

## 📖 Structure de l'application

### Pages principales

1. **`/login`** - Page de connexion
2. **`/chapters`** - Liste des chapitres pédagogiques
3. **`/chapter/:id`** - Détail d'un chapitre avec exercices
4. **`/defense`** - Guide des défenses contre XSS
5. **`/admin`** - Panneau administrateur (réservé admin)

### Chapitres disponibles

1. **Chapitre 1 :** Introduction - Injection HTML basique
2. **Chapitre 2 :** XSS simple avec alert()
3. **Chapitre 3 :** XSS stocké (Stored XSS)
4. **Chapitre 4 :** Exfiltration de données (simulation)
5. **Chapitre 5 :** Défenses contre XSS

---

## 🧪 Fonctionnalités pédagogiques

### Pour les élèves

- **Zone de test :** Chaque chapitre dispose d'une zone pour tester des payloads XSS
- **Mode SAFE/UNSAFE :** Toggle pour observer la différence entre contenu échappé et non échappé
- **Messages persistants :** Les posts sont sauvegardés et exécutés à chaque chargement (XSS stocké)
- **Commentaires :** Section pour échanger sur les exercices

### Pour l'administrateur

- **Commentaires globaux :** Publier des annonces visibles sur tous les chapitres
- **Démo Rickroll :** Payload pré-configuré combinant distraction et exfiltration
- **Panneau de captures :** Visualiser les `demoToken` exfiltrés
- **Statistiques :** Vue d'ensemble de l'activité

---

## 🎯 Démonstration type "Rickroll"

L'admin peut utiliser la fonctionnalité de démonstration Rickroll pour montrer :

1. **Distraction visuelle :** Affichage d'une vidéo YouTube (Rickroll)
2. **Exfiltration en arrière-plan :** Envoi du `demoToken` vers `/admin/collect`

### Comment l'utiliser

1. Se connecter en tant qu'admin
2. Aller dans **Admin Panel** → **Démo Rickroll + Exfiltration**
3. Copier le payload fourni
4. Le coller dans un commentaire global
5. Se connecter en tant qu'utilisateur (ou utiliser un autre navigateur)
6. Visiter n'importe quel chapitre
7. Observer : le rickroll apparaît ET le demoToken est capturé
8. Vérifier les captures dans le panneau admin

### ⚠️ Important

- L'exfiltration capture UNIQUEMENT le `demoToken` (cookie de démonstration)
- Aucune donnée sensible réelle n'est collectée
- En situation réelle, un attaquant pourrait voler des cookies de session

---

## 🛡️ Techniques de défense enseignées

L'application enseigne les principales défenses contre XSS :

1. **Échappement (Escaping)**
   - Conversion des caractères spéciaux HTML
   - Utilisation de `<%= %>` au lieu de `<%- %>` en EJS

2. **Sanitization**
   - DOMPurify (côté client)
   - sanitize-html (côté serveur)

3. **Content Security Policy (CSP)**
   - Limitation des sources de scripts autorisés
   - Blocage des scripts inline

4. **Cookies HttpOnly et Secure**
   - Protection des cookies de session
   - Empêcher l'accès JavaScript

5. **Validation des entrées**
   - Vérification côté serveur
   - Utilisation de listes blanches

Consultez la page **`/defense`** pour plus de détails.

---

## 🗂️ Structure du projet

```
XSS-vadi/
├── server.js                 # Serveur Express principal
├── package.json              # Dépendances npm
├── data.json                 # Stockage des données (JSON)
├── README.md                 # Ce fichier
├── routes/                   # Routes Express
│   ├── auth.js              # Authentification (login/logout)
│   ├── chapters.js          # Gestion des chapitres
│   └── admin.js             # Panel administrateur
├── services/                 # Services métier
│   └── jsonStore.js         # Gestion du fichier JSON
├── views/                    # Templates EJS
│   ├── login.ejs
│   ├── chapters.ejs
│   ├── chapter.ejs
│   ├── defense.ejs
│   ├── 404.ejs
│   ├── 403.ejs
│   ├── admin/
│   │   ├── panel.ejs
│   │   └── demo-rickroll.ejs
│   └── partials/
│       ├── navbar.ejs
│       └── footer.ejs
└── public/                   # Fichiers statiques
    └── css/
        └── style.css
```

---

## 🔧 Développement

### Mode développement avec auto-reload

```bash
npm install -g nodemon
npm run dev
```

### Réinitialiser les données

Supprimer le fichier `data.json` et redémarrer le serveur. Les chapitres seront automatiquement recréés.

---

## 🐛 Dépannage

### Le serveur ne démarre pas
- Vérifiez que le port 3000 n'est pas déjà utilisé
- Essayez de changer le port dans `server.js`

### Les élèves ne peuvent pas se connecter depuis leur PC
- Vérifiez que le serveur écoute bien sur `0.0.0.0`
- Vérifiez le pare-feu Windows (autoriser le port 3000)
- Vérifiez que vous êtes sur le même réseau

### Erreur lors de l'écriture de data.json
- Vérifiez les permissions d'écriture dans le dossier
- Supprimez le fichier `data.json.tmp` s'il existe

---

## 📝 Utilisation en classe

### Scénario pédagogique suggéré

1. **Introduction (15 min)**
   - Présenter les concepts de sécurité web
   - Expliquer ce qu'est une faille XSS

2. **Chapitres 1-2 (30 min)**
   - Les élèves explorent l'injection HTML et les XSS simples
   - Essayer différents payloads

3. **Chapitre 3 (20 min)**
   - Comprendre la différence entre XSS réfléchi et stocké
   - Observer la persistance

4. **Chapitre 4 + Démo (30 min)**
   - L'enseignant fait une démonstration de l'exfiltration
   - Utiliser le Rickroll pour illustrer
   - Montrer les captures dans l'admin

5. **Défenses (30 min)**
   - Consulter la page `/defense`
   - Comparer mode SAFE vs UNSAFE
   - Discuter des bonnes pratiques

6. **Conclusion (15 min)**
   - Quiz ou questions-réponses
   - Insister sur l'importance de la sécurité

---

## 📚 Ressources complémentaires

- [OWASP XSS Guide](https://owasp.org/www-community/attacks/xss/)
- [DOMPurify](https://github.com/cure53/DOMPurify)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

## 📄 Licence

MIT - Usage pédagogique uniquement

---

## 🤝 Contribution

Cette application est destinée à un usage pédagogique local. N'hésitez pas à l'adapter à vos besoins de formation.

---

## ✨ Crédits

Développé pour l'enseignement de la sécurité web en environnement scolaire contrôlé.

**Rappelez-vous :** La connaissance en sécurité doit être utilisée de manière éthique et responsable ! 🛡️
