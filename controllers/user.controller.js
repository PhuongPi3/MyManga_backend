
const User = require('../models/User');
const Manga = require('../models/Manga');

exports.followManga = async (req, res) => {
  try {
    const { mangaId } = req.body;
    const user = await User.findById(req.user.id);

    const alreadyFollowed = user.followedManga.includes(mangaId);
    if (alreadyFollowed) {
      // Bỏ theo dõi
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

    const user = await User.findById(req.user.id);

    const historyIndex = user.history.findIndex(
      (h) => h.mangaId.toString() === mangaId && h.chapterId.toString() === chapterId
    );

    if (historyIndex > -1) {
      user.history[historyIndex].pageNumber = pageNumber;
      user.history[historyIndex].updatedAt = new Date();
    } else {
      user.history.push({ mangaId, chapterId, pageNumber });
    }

    await user.save();
    res.json({ message: 'Lưu vị trí đọc thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
