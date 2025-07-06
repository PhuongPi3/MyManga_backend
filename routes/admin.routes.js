const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

// Manga
router.post('/manga', adminController.createManga);
router.put('/manga/:id', adminController.updateManga);
router.delete('/manga/:id', adminController.deleteManga);

// Chapter
router.post('/chapter', adminController.createChapter);
router.put('/chapter/:id', adminController.updateChapter);
router.delete('/chapter/:id', adminController.deleteChapter);

module.exports = router;
