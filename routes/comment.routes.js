
const router = require('express').Router();
const {
  createComment,
  getComments,
  deleteComment,
  updateComment,
  likeComment,      
  dislikeComment 
} = require('../controllers/comment.controller');

const { verifyToken } = require('../middleware/auth.middleware');

// Tạo bình luận mới (cần đăng nhập)
router.post('/', verifyToken, createComment);

// Lấy danh sách bình luận của manga/chapter
router.get('/:mangaId', getComments);

// Xóa bình luận (chỉ owner hoặc admin)
router.delete('/:id', verifyToken, deleteComment);

// Sửa bình luận (chỉ owner)
router.put('/:id', verifyToken, updateComment);


router.post('/:id/like', verifyToken, likeComment);

router.post('/:id/dislike', verifyToken, dislikeComment);


module.exports = router;
