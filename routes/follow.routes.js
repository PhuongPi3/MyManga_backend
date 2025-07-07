const router = require('express').Router();
const Follow = require('../models/Follow');

// Bấm Follow
router.post('/:mangaId', async (req, res) => {
  const follow = await Follow.create({
    userId: req.user._id,
    mangaId: req.params.mangaId
  });
  res.json(follow);
});

// Bỏ theo dõi
router.delete('/:mangaId', async (req, res) => {
  await Follow.deleteOne({
    userId: req.user._id,
    mangaId: req.params.mangaId
  });
  res.json({ message: 'Unfollowed' });
});

// Xem danh sách đã theo dõi
router.get('/', async (req, res) => {
  const follows = await Follow.find({ userId: req.user._id }).populate('mangaId');
  res.json(follows);
});

module.exports = router;
