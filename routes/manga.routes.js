
const router = require('express').Router();
const { getMangaList, getMangaDetail, searchManga, filterManga } = require('../controllers/manga.controller');

router.get('/', getMangaList);
router.get('/:id', getMangaDetail);
router.get('/search', searchManga);
router.get('/filter', filterManga);

module.exports = router;
