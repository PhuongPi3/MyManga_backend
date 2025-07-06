const routerH = require('express').Router();
const ReadingHistory = require('../models/ReadingHistory');

routerH.post('/:mangaId/:chapterId', async (req, res) => {
  const { lastPage } = req.body;
  await ReadingHistory.findOneAndUpdate(
    { userId: req.user._id, mangaId: req.params.mangaId },
    { chapterId: req.params.chapterId, lastPage },
    { upsert: true }
  );
  res.json({ message: 'History saved' });
});

routerH.get('/', async (req, res) => {
  const history = await ReadingHistory.find({ userId: req.user._id }).populate('mangaId');
  res.json(history);
});

module.exports = routerH;