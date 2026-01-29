# 👨‍🏫 Guide de l'Enseignant - XSS VADI

Ce guide vous aidera à organiser une session pédagogique efficace sur les vulnérabilités XSS.

---

## 📋 Vue d'ensemble

**Durée suggérée :** 2h30 - 3h
**Public :** Étudiants en informatique, développement web, cybersécurité
**Prérequis :** Connaissances de base en HTML/JavaScript

---

## 🎯 Objectifs d'apprentissage

À la fin de cette session, les élèves seront capables de :

1. ✅ Identifier une vulnérabilité XSS dans une application web
2. ✅ Comprendre les différents types de XSS (réfléchi, stocké, DOM-based)
3. ✅ Mesurer l'impact potentiel d'une attaque XSS
4. ✅ Implémenter les défenses appropriées
5. ✅ Adopter une approche de développement sécurisé

---

## 📅 Plan de cours détaillé

### 🔹 Phase 1 : Introduction (20 minutes)

#### Objectifs
- Contextualiser la sécurité web
- Introduire le concept de XSS

#### Activités

1. **Présentation théorique (10 min)**
   - Qu'est-ce qu'une application web ?
   - Où se situe le code (client vs serveur) ?
   - Qu'est-ce que le Cross-Site Scripting ?
   - Pourquoi c'est dangereux ?

2. **Statistiques et exemples réels (5 min)**
   - XSS dans l'OWASP Top 10
   - Exemples d'incidents réels (MySpace, Facebook, etc.)
   - Conséquences pour les entreprises

3. **Présentation de l'application (5 min)**
   - Démo de l'interface
   - Explication des comptes (élève vs admin)
   - Avertissement sur l'usage éthique

#### Supports
- Slides PowerPoint/PDF
- Projection de l'application

---

### 🔹 Phase 2 : Chapitres 1-2 - Premiers pas (40 minutes)

#### Chapitre 1 : Injection HTML (20 min)

**Objectif :** Comprendre que l'utilisateur peut injecter du contenu dans la page.

**Activités :**
1. Les élèves se connectent (nom libre + "toto")
2. Ils accèdent au Chapitre 1
3. Exercice : Injecter du HTML basique

**Payloads suggérés :**
```html
<strong>Mon texte en gras</strong>
<h1>Je modifie la page !</h1>
<img src="URL_IMAGE">
```

**Questions de réflexion :**
- Que se passe-t-il quand je poste ce message ?
- Le HTML est-il exécuté ?
- Est-ce dangereux à ce stade ?

#### Chapitre 2 : XSS avec JavaScript (20 min)

**Objectif :** Exécuter du code JavaScript via XSS.

**Activités :**
1. Les élèves testent des payloads avec `alert()`
2. Observation : le JavaScript s'exécute !

**Payloads suggérés :**
```html
<script>alert('XSS')</script>
<img src=x onerror="alert('XSS')">
<svg onload="alert('XSS')">
```

**Démonstration enseignant :**
- Montrer que d'autres événements fonctionnent (onmouseover, onfocus, etc.)
- Expliquer que si `alert()` fonctionne, n'importe quel code JS peut s'exécuter

**Questions de réflexion :**
- Pourquoi l'alerte s'affiche-t-elle ?
- Quel autre code JavaScript pourrait-on exécuter ?
- Qui est affecté par ce code ?

---

### 🔹 Phase 3 : Chapitre 3 - XSS Stocké (30 minutes)

#### Objectif
Comprendre la différence entre XSS réfléchi et XSS stocké (persistant).

#### Activités

1. **Exercice (15 min)**
   - Les élèves postent un payload XSS dans le chapitre 3
   - Ils rechargent la page
   - Observation : le script s'exécute à nouveau !

2. **Discussion (15 min)**
   - Pourquoi est-ce plus dangereux ?
   - Qui est affecté ? (tous les utilisateurs)
   - Exemples de conséquences :
     - Vol de session
     - Redirection vers un site malveillant
     - Modification du contenu pour tous

**Payload suggéré :**
```html
<script>
  alert('XSS stocké - Je m\'exécute à chaque visite !');
</script>
```

**Comparaison XSS réfléchi vs stocké :**

| Type | Stockage | Cible | Gravité |
|------|----------|-------|---------|
| Réfléchi | Non | Victime qui clique sur un lien | Moyenne |
| Stocké | Oui (base de données) | Tous les utilisateurs | Haute |
| DOM-based | Non | Victime (via JS client) | Moyenne |

---

### 🔹 Phase 4 : Chapitre 4 - Exfiltration (40 minutes)

#### Objectif
Montrer qu'un attaquant peut voler des données sensibles.

#### Préparation (Enseignant)

1. Se connecter en tant qu'admin
2. Aller dans `/admin/demo-rickroll`
3. Copier le payload complet
4. Le poster comme commentaire global

#### Démonstration en direct (20 min)

1. **Scénario :**
   - "Un attaquant a réussi à injecter du code malveillant"
   - "Voyons ce qui se passe pour un utilisateur normal"

2. **Action :**
   - Se connecter en tant qu'élève (ou demander à un élève volontaire)
   - Visiter n'importe quel chapitre
   - Le rickroll apparaît !

3. **Révélation :**
   - Retourner sur le panneau admin
   - Montrer la section "Captures"
   - Expliquer : "En arrière-plan, le `demoToken` a été exfiltré"

4. **Explication technique :**
   - Montrer le code du payload
   - Expliquer `document.cookie`
   - Expliquer `fetch()` vers `/admin/collect`
   - **Important :** Préciser que c'est une simulation (demoToken, pas de vraies données)

#### Discussion (20 min)

**Questions :**
- Qu'est-ce qui a été volé ?
- En situation réelle, qu'aurait pu voler l'attaquant ?
  - Cookies de session
  - Tokens CSRF
  - Données de formulaires
  - Informations personnelles affichées
- Comment l'attaquant aurait-il pu utiliser ces données ?
  - Usurpation d'identité
  - Accès aux comptes
  - Actions en tant que victime

**Scénarios réels :**
- Vol de compte Facebook/Twitter
- Accès à un compte bancaire
- Modification de données sensibles
- Propagation du malware (worm XSS)

---

### 🔹 Phase 5 : Chapitre 5 - Défenses (40 minutes)

#### Objectif
Apprendre à se protéger contre XSS.

#### Activités

1. **Retour aux chapitres (10 min)**
   - Les élèves retestent leurs payloads en mode SAFE
   - Observation : le code n'est plus exécuté, il est affiché comme texte

2. **Visite de la page `/defense` (15 min)**
   - Lecture guidée des 5 défenses principales
   - L'enseignant explique chaque technique

3. **Démonstration de code (15 min)**

   **Échappement (EJS) :**
   ```ejs
   <!-- UNSAFE : rendu HTML -->
   <%- userInput %>

   <!-- SAFE : échappement -->
   <%= userInput %>
   ```

   **Sanitization (DOMPurify) :**
   ```javascript
   const dirty = '<img src=x onerror=alert(1)> <b>Texte</b>';
   const clean = DOMPurify.sanitize(dirty);
   // Résultat : '<img src="x"> <b>Texte</b>'
   ```

   **CSP (Content-Security-Policy) :**
   ```javascript
   res.setHeader(
     'Content-Security-Policy',
     "default-src 'self'; script-src 'self'"
   );
   ```

   **HttpOnly Cookies :**
   ```javascript
   res.cookie('sessionId', 'abc123', {
     httpOnly: true,  // ✅ Protégé contre document.cookie
     secure: true,     // ✅ HTTPS uniquement
     sameSite: 'strict'
   });
   ```

#### Exercice pratique (optionnel)

Modifier le code d'un chapitre pour activer l'échappement par défaut.

---

### 🔹 Phase 6 : Conclusion et évaluation (20 minutes)

#### Synthèse (10 min)

**Récapitulatif :**
1. ✅ Les XSS permettent d'exécuter du JavaScript arbitraire
2. ✅ Le XSS stocké est particulièrement dangereux
3. ✅ Un attaquant peut voler des données sensibles
4. ✅ Il existe des défenses efficaces
5. ✅ La sécurité doit être pensée dès le développement

**Messages clés :**
- 🔒 **Ne jamais faire confiance aux entrées utilisateur**
- 🔒 **Toujours valider et échapper les données**
- 🔒 **Utiliser les outils modernes (frameworks, librairies)**
- 🔒 **La sécurité est la responsabilité de tous**

#### Quiz / Questions-Réponses (10 min)

**Questions suggérées :**

1. Quelle est la différence entre XSS réfléchi et XSS stocké ?
2. Donnez 3 exemples de défenses contre XSS.
3. Pourquoi les cookies devraient-ils être marqués HttpOnly ?
4. Qu'est-ce que le Content Security Policy ?
5. Comment un attaquant pourrait-il exploiter une faille XSS dans un site de e-commerce ?

#### Évaluation (optionnelle)

- Quiz en ligne
- TP noté (sécuriser une application volontairement vulnérable)
- Rapport d'analyse de vulnérabilités

---

## 🛠️ Préparation technique

### Avant la session

1. **Tester l'installation**
   ```bash
   npm install
   npm start
   ```

2. **Trouver votre IP**
   ```bash
   node find-ip.js
   ```
   ou
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

3. **Tester l'accès réseau**
   - Connectez-vous depuis un autre appareil avec `http://[IP]:3000`
   - Vérifiez que le pare-feu autorise le port 3000

4. **Préparer le payload Rickroll**
   - Se connecter en admin
   - Ouvrir `/admin/demo-rickroll`
   - Avoir le payload prêt à copier-coller

5. **Matériel de projection**
   - Prévoir un projecteur ou écran partagé
   - Tester la visibilité depuis le fond de la classe

### Pendant la session

1. **Surveillance**
   - Circuler pour aider les élèves en difficulté
   - Vérifier que tout le monde progresse

2. **Gestion du panneau admin**
   - Surveiller les captures en temps réel
   - Vider les captures entre les exercices si nécessaire

3. **Documentation**
   - Avoir le fichier `PAYLOADS.md` ouvert pour référence rapide

---

## 📊 Variantes et extensions

### Pour aller plus loin

1. **TP : Sécuriser l'application**
   - Donner le code source aux élèves
   - Leur demander d'implémenter les défenses
   - Vérifier que les payloads ne fonctionnent plus

2. **CTF (Capture The Flag)**
   - Créer des défis XSS de difficulté croissante
   - Points bonus pour les payloads créatifs

3. **Analyse d'un site réel**
   - Utiliser un site de bug bounty (HackerOne, YesWeHack)
   - Analyser un rapport de vulnérabilité XSS publié

4. **Démonstration d'outils**
   - Burp Suite (scanner XSS)
   - OWASP ZAP
   - XSStrike

### Pour une session plus courte (1h30)

- Chapitres 1-2 : 20 min
- Chapitre 3 : 15 min
- Chapitre 4 (démo) : 20 min
- Défenses : 20 min
- Conclusion : 15 min

---

## 🚨 Gestion des situations problématiques

### Problème : Les élèves ne peuvent pas se connecter

**Solutions :**
1. Vérifier le pare-feu Windows
2. Vérifier que le serveur écoute sur `0.0.0.0`
3. Donner l'URL exacte avec l'IP
4. En dernier recours : partager l'écran

### Problème : Les payloads ne fonctionnent pas

**Solutions :**
1. Vérifier que le mode SAFE est désactivé
2. Vérifier la syntaxe du payload
3. Ouvrir la console développeur (F12) pour voir les erreurs
4. Utiliser les payloads du fichier `PAYLOADS.md`

### Problème : Les élèves vont "trop loin"

**Rappel :**
- L'usage éthique est fondamental
- Ces techniques ne doivent JAMAIS être utilisées sans autorisation
- Des sanctions peuvent être prises en cas d'abus

**Actions :**
- Rappeler les règles en début de session
- Surveiller les activités
- Désactiver l'accès si nécessaire

---

## 📚 Ressources complémentaires

### Documentation
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [PortSwigger Web Security Academy - XSS](https://portswigger.net/web-security/cross-site-scripting)
- [MDN - Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### Vidéos
- OWASP Top 10 expliqué
- Chaîne YouTube de LiveOverflow (hacking éthique)

### Plateformes d'entraînement
- [HackTheBox](https://www.hackthebox.com/)
- [TryHackMe](https://tryhackme.com/)
- [PentesterLab](https://pentesterlab.com/)

### Livres
- "The Web Application Hacker's Handbook"
- "OWASP Testing Guide"

---

## ✅ Checklist avant la session

- [ ] Node.js installé
- [ ] Dépendances installées (`npm install`)
- [ ] Serveur démarre sans erreur
- [ ] IP locale identifiée
- [ ] Accès réseau testé depuis un autre appareil
- [ ] Pare-feu configuré (port 3000 autorisé)
- [ ] Payload Rickroll prêt
- [ ] Matériel de projection testé
- [ ] Fichier `PAYLOADS.md` imprimé ou accessible
- [ ] Slides de présentation prêts
- [ ] Quiz/évaluation préparé (optionnel)

---

## 💡 Conseils pédagogiques

1. **Rendre la session interactive**
   - Poser des questions régulièrement
   - Encourager les élèves à partager leurs découvertes
   - Utiliser des exemples concrets

2. **Adapter le rythme**
   - Observer si les élèves suivent
   - Prendre le temps pour les concepts difficiles
   - Sauter les parties optionnelles si nécessaire

3. **Insister sur l'éthique**
   - Rappeler régulièrement l'importance de l'usage responsable
   - Parler des conséquences légales
   - Promouvoir le hacking éthique

4. **Valoriser la créativité**
   - Encourager les élèves à créer leurs propres payloads
   - Organiser un concours du payload le plus créatif
   - Discuter des techniques avancées

5. **Lier théorie et pratique**
   - Montrer du vrai code
   - Expliquer comment les frameworks modernes protègent (React, Vue, Angular)
   - Faire le lien avec le développement professionnel

---

**Bonne session ! 🎓**

N'hésitez pas à adapter ce guide selon votre public et vos objectifs pédagogiques.
