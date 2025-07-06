const router = require('express').Router();
const { getChaptersByManga, readChapter } = require('../controllers/chapter.controller');

router.get('/:mangaId', getChaptersByManga);
router.get('/read/:chapterId', readChapter);

module.exports = router;
