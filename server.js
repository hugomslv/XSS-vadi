const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const jsonStore = require('./services/jsonStore');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialiser les chapitres si le fichier est vide
jsonStore.initializeChapters();

// Configuration EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Session
app.use(session({
  secret: 'xss-demo-secret-key-do-not-use-in-prod',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 heures
    httpOnly: false // Volontairement à false pour la démo (permettre accès JS aux cookies)
  }
}));

// Middleware pour rendre la session disponible dans toutes les vues
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isAdmin = req.session.isAdmin || false;
  next();
});

// Routes d'authentification
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// Route de collecte pour la démo d'exfiltration
// IMPORTANT: Doit être AVANT les routes admin pour éviter le middleware requireAdmin
app.post('/api/collect', (req, res) => {
  console.log('\n[COLLECT] 📡 Nouvelle requête d\'exfiltration reçue');
  console.log('[COLLECT] IP:', req.ip);
  console.log('[COLLECT] Session user:', req.session.user);
  console.log('[COLLECT] Body:', req.body);

  // Vérifier que l'utilisateur est authentifié (user ou admin)
  if (!req.session.user) {
    console.log('[COLLECT] ❌ Rejet: utilisateur non authentifié');
    return res.status(401).json({ success: false, error: 'Not authenticated' });
  }

  const { demoToken, chapterId, userName, password, captureType } = req.body;
  const userAgent = req.headers['user-agent'];

  const capture = {
    demoToken,
    chapterId,
    userName,
    password: password || null, // DÉMO: Mot de passe capturé
    userAgent,
    captureType: captureType || 'cookie'
  };

  console.log('[COLLECT] 💾 Sauvegarde de la capture:', {
    ...capture,
    password: password ? '***REDACTED***' : null // Masquer dans les logs serveur
  });

  jsonStore.addCapture(capture);

  console.log('[COLLECT] ✅ Capture enregistrée avec succès');

  res.json({ success: true });
});

// Routes des chapitres
const chapterRoutes = require('./routes/chapters');
app.use('/', chapterRoutes);

// Routes admin
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// Route d'accueil - redirection vers /chapters
app.get('/', (req, res) => {
  res.redirect('/chapters');
});

// Page de défense
app.get('/defense', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('defense', { title: 'Défenses contre XSS' });
});

// Page de démonstration interactive
app.get('/demo', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('demo', { title: 'Démo XSS Interactive' });
});

// Page d'activité pratique
app.get('/activity', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('activity', { title: 'Activité Pratique XSS' });
});

// Guide enseignant (admin uniquement)
app.get('/teacher-guide', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  if (!req.session.isAdmin) {
    return res.status(403).render('403', { title: 'Accès refusé' });
  }
  res.render('teacher-guide', { title: 'Guide Enseignant' });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page non trouvée' });
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  // Détecter l'IP automatiquement
  const os = require('os');
  const networkInterfaces = os.networkInterfaces();
  let serverIP = 'VOTRE_IP';

  // Chercher l'IP IPv4 (pas localhost)
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    if (interfaces) {
      for (const iface of interfaces) {
        if (iface.family === 'IPv4' && !iface.internal) {
          serverIP = iface.address;
          break;
        }
      }
    }
  }

  const isPublicIP = !serverIP.startsWith('192.168.') && !serverIP.startsWith('10.') && !serverIP.startsWith('172.');

  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║           🔓 XSS VADI - Démonstration pédagogique 🔓          ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

  ✅ Serveur démarré sur le port ${PORT}

  📍 Accès local : http://localhost:${PORT}
  📍 Accès réseau : http://${serverIP}:${PORT}

  🌐 URL POUR VOS ÉLÈVES :
     ➡️  http://${serverIP}:${PORT}

  👤 Compte utilisateur :
     - Nom : (libre) | Mot de passe : toto

  👨‍💼 Compte admin :
     - Login : admin | Mot de passe : admin**123

  ${isPublicIP ? '⚠️  IP PUBLIQUE DÉTECTÉE (' + serverIP + ') - Serveur accessible depuis Internet !' : '✅ IP Locale détectée - Serveur accessible uniquement sur le réseau local'}

  ⚠️  AVERTISSEMENT : Cette application est VOLONTAIREMENT vulnérable.
      Usage pédagogique UNIQUEMENT en environnement contrôlé.

  📚 Consultez le README.md pour plus d'informations.

`);
});
