const router = require('express').Router();
const { getMangaList, getMangaDetail, searchManga, filterManga ,getMangaByGenre,recommendByHistory} = require('../controllers/manga.controller');


// 💡 IMPORT middleware
const { verifyToken } = require('../middleware/auth.middleware.js');


router.get('/', getMangaList);
router.get('/:id', getMangaDetail);
router.get('/search', searchManga);
router.get('/filter', filterManga);
router.get('/genre/:genreId', getMangaByGenre); 
router.get('/recommend/history', verifyToken, recommendByHistory);


module.exports = router;
