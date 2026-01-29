const express = require('express');
const router = express.Router();

// Générer un demoToken aléatoire
function generateDemoToken() {
  return 'DEMO-' + Math.random().toString(36).substring(2, 15);
}

// Page de login
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/chapters');
  }
  res.render('login', { title: 'Connexion', error: null });
});

// Traitement du login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Vérifier si c'est l'admin
  if (username === 'admin' && password === 'admin**123') {
    req.session.user = 'admin';
    req.session.isAdmin = true;

    // Créer un demoToken pour l'admin aussi
    const demoToken = generateDemoToken();
    // Cookies configurés pour fonctionner en réseau local
    res.cookie('demoToken', demoToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,  // Accessible en JS pour la démo
      sameSite: 'lax'   // Permet les requêtes cross-site en GET
    });
    res.cookie('userName', username, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: 'lax'
    });

    console.log(`[AUTH] ✅ Admin connecté - demoToken: ${demoToken}`);

    return res.redirect('/admin');
  }

  // Vérifier si c'est un utilisateur (n'importe quel nom + n'importe quel mot de passe)
  // Tant que ce n'est pas le username "admin", on accepte
  if (username && password && username !== 'admin') {
    req.session.user = username;
    req.session.isAdmin = false;

    // Créer un demoToken pour cet utilisateur
    const demoToken = generateDemoToken();
    res.cookie('demoToken', demoToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: 'lax'
    });
    res.cookie('userName', username, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: 'lax'
    });

    console.log(`[AUTH] ✅ User "${username}" connecté - demoToken: ${demoToken}`);

    return res.redirect('/chapters');
  }

  // Échec de connexion
  res.render('login', {
    title: 'Connexion',
    error: 'Identifiants incorrects. Vérifiez votre nom d\'utilisateur et mot de passe.'
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('demoToken');
  res.clearCookie('userName');
  res.redirect('/login');
});

// Middleware de protection des routes (authentification requise)
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// Middleware de protection admin
function requireAdmin(req, res, next) {
  if (!req.session.isAdmin) {
    return res.status(403).render('403', { title: 'Accès refusé' });
  }
  next();
}

module.exports = router;
module.exports.requireAuth = requireAuth;
module.exports.requireAdmin = requireAdmin;
