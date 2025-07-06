const User = require('../models/User');
const Manga = require('../models/Manga');
const mongoose = require('mongoose');

exports.followManga = async (req, res) => {
  try {
    const { mangaId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(mangaId)) {
      return res.status(400).json({ error: 'Invalid manga ID' });
    }

    const user = await User.findById(req.user.id);
    const alreadyFollowed = user.followedManga.some(
      id => id.toString() === mangaId
    );

    if (alreadyFollowed) {
      user.followedManga.pull(mangaId);
    } else {
      user.followedManga.push(mangaId);
    }

    await user.save();
    res.json({ message: alreadyFollowed ? 'Unfollowed' : 'Followed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLibrary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('followedManga');
    res.json(user.followedManga);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'history.mangaId history.chapterId'
    });
    res.json(user.history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReadingPosition = async (req, res) => {
  try {
    const { mangaId, chapterId, pageNumber } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(mangaId) ||
      !mongoose.Types.ObjectId.isValid(chapterId)
    ) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const user = await User.findById(req.user.id);

    const historyIndex = user.history.findIndex(
      (h) =>
        h.mangaId.toString() === mangaId &&
        h.chapterId.toString() === chapterId
    );

    if (historyIndex > -1) {
      user.history[historyIndex].pageNumber = pageNumber;
      user.history[historyIndex].updatedAt = new Date();
    } else {
      user.history.push({ mangaId, chapterId, pageNumber });
    }

    if (user.history.length > 50) {
      user.history.shift();
    }

    await user.save();
    res.json({ message: 'Đã lưu vị trí đọc' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
