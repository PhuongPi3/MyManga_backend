const router = require('express').Router();
const History = require('../models/History');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/:mangaId/:chapterId', verifyToken, async (req, res) => {
  // ...
});

router.get('/', verifyToken, async (req, res) => {
  // ...
});

router.delete('/:mangaId', verifyToken, async (req, res) => {
  // ...
});

module.exports = router;
