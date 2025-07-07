const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Manga
router.post('/manga', verifyToken, isAdmin, adminController.createManga);
router.put('/manga/:id', verifyToken, isAdmin, adminController.updateManga);
router.delete('/manga/:id', verifyToken, isAdmin, adminController.deleteManga);

// Chapter
router.post('/chapter', verifyToken, isAdmin, adminController.createChapter);
router.put('/chapter/:id', verifyToken, isAdmin, adminController.updateChapter);
router.delete('/chapter/:id', verifyToken, isAdmin, adminController.deleteChapter);

module.exports = router;
