const express = require('express');
const router = express.Router();
const jsonStore = require('../services/jsonStore');
const { requireAuth } = require('./auth');

// Liste des chapitres
router.get('/chapters', requireAuth, (req, res) => {
  const chapters = jsonStore.getChapters();
  res.render('chapters', {
    title: 'Liste des chapitres',
    chapters: chapters.sort((a, b) => a.order - b.order)
  });
});

// Détail d'un chapitre
router.get('/chapter/:id', requireAuth, (req, res) => {
  const chapterId = req.params.id;
  const chapter = jsonStore.getChapterById(chapterId);

  if (!chapter) {
    return res.status(404).render('404', { title: 'Chapitre non trouvé' });
  }

  const posts = jsonStore.getPostsByChapter(chapterId);
  const comments = jsonStore.getCommentsByChapter(chapterId);
  const globalComments = jsonStore.getGlobalAdminComments();

  res.render('chapter', {
    title: chapter.title,
    chapter,
    posts,
    comments,
    globalComments
  });
});

// Poster un message dans un chapitre
router.post('/chapter/:id/post', requireAuth, (req, res) => {
  const chapterId = req.params.id;
  const { content, safe } = req.body;

  jsonStore.addPost(chapterId, {
    content,
    author: req.session.user,
    safe: safe === 'true'
  });

  res.redirect(`/chapter/${chapterId}`);
});

// Ajouter un commentaire dans un chapitre
router.post('/chapter/:id/comment', requireAuth, (req, res) => {
  const chapterId = req.params.id;
  const { content } = req.body;

  jsonStore.addComment(chapterId, {
    content,
    author: req.session.user
  });

  res.redirect(`/chapter/${chapterId}`);
});

// API: Récupérer les données d'un chapitre en JSON (pour le rafraîchissement automatique)
router.get('/api/chapter/:id', requireAuth, (req, res) => {
  const chapterId = req.params.id;
  const posts = jsonStore.getPostsByChapter(chapterId);
  const comments = jsonStore.getCommentsByChapter(chapterId);
  const globalComments = jsonStore.getGlobalAdminComments();

  res.json({
    success: true,
    chapterId: chapterId,
    posts: posts,
    comments: comments,
    globalComments: globalComments,
    counts: {
      posts: posts.length,
      comments: comments.length,
      globalComments: globalComments.length
    }
  });
});

module.exports = router;
