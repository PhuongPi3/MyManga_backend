
const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  mangaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
  chapterDexId: String,
  title: String,
  chapterNumber: String,
  volume: String,
  pages: [String],
  scanGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'ScanGroup' },
  views: { type: Number, default: 0 },
  uploadDate: Date
});

module.exports = mongoose.model('Chapter', chapterSchema);
