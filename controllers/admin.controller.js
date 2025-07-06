const Manga = require('../models/Manga');
const Chapter = require('../models/Chapter');

// CRUD Manga
exports.createManga = async (req, res) => {
  const manga = new Manga(req.body);
  await manga.save();
  res.json({ message: 'Manga created', manga });
};

exports.updateManga = async (req, res) => {
  const { id } = req.params;
  const manga = await Manga.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ message: 'Manga updated', manga });
};

exports.deleteManga = async (req, res) => {
  const { id } = req.params;
  await Manga.findByIdAndDelete(id);
  res.json({ message: 'Manga deleted' });
};

// CRUD Chapter
exports.createChapter = async (req, res) => {
  const chapter = new Chapter(req.body);
  await chapter.save();
  res.json({ message: 'Chapter created', chapter });
};

exports.updateChapter = async (req, res) => {
  const { id } = req.params;
  const chapter = await Chapter.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ message: 'Chapter updated', chapter });
};

exports.deleteChapter = async (req, res) => {
  const { id } = req.params;
  await Chapter.findByIdAndDelete(id);
  res.json({ message: 'Chapter deleted' });
};
