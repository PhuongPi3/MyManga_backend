// 📁 controllers/admin.controller.js
const Manga = require('../models/Manga');
const Chapter = require('../models/Chapter');

// 📌 CRUD Manga
exports.createManga = async (req, res) => {
  try {
    const manga = await Manga.create(req.body);
    res.status(201).json({ message: '✅ Manga created', manga });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateManga = async (req, res) => {
  try {
    const manga = await Manga.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: '✅ Manga updated', manga });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteManga = async (req, res) => {
  try {
    await Manga.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Manga deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 CRUD Chapter
exports.createChapter = async (req, res) => {
  try {
    const chapter = await Chapter.create(req.body);
    res.status(201).json({ message: '✅ Chapter created', chapter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: '✅ Chapter updated', chapter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    await Chapter.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Chapter deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const Log = require('../models/Log');

exports.createManga = async (req, res) => {
  const manga = await Manga.create(req.body);

  await Log.create({
    userId: req.user.id,
    action: 'CREATE_MANGA',
    detail: `Tạo truyện ${manga.title}`
  });

  res.status(201).json(manga);
};
