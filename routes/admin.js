const express = require('express');
const router = express.Router();
const jsonStore = require('../services/jsonStore');
const { requireAuth, requireAdmin } = require('./auth');

// Toutes les routes admin nécessitent l'authentification admin
router.use(requireAuth);
router.use(requireAdmin);

// Panel admin principal
router.get('/', (req, res) => {
  const chapters = jsonStore.getChapters();
  const globalComments = jsonStore.getGlobalAdminComments();
  const captures = jsonStore.getCaptures();

  res.render('admin/panel', {
    title: 'Panneau Administrateur',
    chapters,
    globalComments,
    captures: captures.reverse() // Les plus récentes en premier
  });
});

// Ajouter un commentaire admin global
router.post('/global-comment', (req, res) => {
  const { content } = req.body;

  if (content) {
    jsonStore.addGlobalAdminComment({ content });
  }

  res.redirect('/admin');
});

// Supprimer un commentaire admin global
router.post('/global-comment/delete/:id', (req, res) => {
  const commentId = req.params.id;
  jsonStore.deleteGlobalAdminComment(commentId);
  res.redirect('/admin');
});

// Vider les captures
router.post('/captures/clear', (req, res) => {
  jsonStore.clearCaptures();
  res.redirect('/admin');
});

// API: Récupérer les captures en JSON (pour le rafraîchissement automatique)
router.get('/api/captures', (req, res) => {
  const captures = jsonStore.getCaptures();
  res.json({
    success: true,
    count: captures.length,
    captures: captures.reverse() // Les plus récentes en premier
  });
});

// Payload de démonstration "rickroll"
router.get('/demo-rickroll', (req, res) => {
  res.render('admin/demo-rickroll', {
    title: 'Démonstration Rickroll + Exfiltration'
  });
});

module.exports = router;
