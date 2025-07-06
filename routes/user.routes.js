const router = require('express').Router();
const {
  followManga,
  getLibrary,
  getHistory,
  updateReadingPosition
} = require('../controllers/user.controller');

const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

router.post('/follow', verifyToken, followManga);
router.get('/library', verifyToken, getLibrary);
router.get('/history', verifyToken, getHistory);
router.post('/history', verifyToken, updateReadingPosition);

module.exports = router;
