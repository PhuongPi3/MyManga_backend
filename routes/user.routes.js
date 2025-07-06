
const router = require('express').Router();
const {
  followManga,
  getLibrary,
  getHistory,
  updateReadingPosition
} = require('../controllers/user.controller');

const { verifyToken } = require('../middleware/auth.middleware');

// Chỉ user đăng nhập mới được follow / lấy thư viện / update lịch sử
router.post('/follow', verifyToken, followManga);
router.get('/library', verifyToken, getLibrary);
router.get('/history', verifyToken, getHistory);
router.post('/history', verifyToken, updateReadingPosition);

module.exports = router;
