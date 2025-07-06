const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  mangaDexId: { type: String, unique: true }, // BẮT BUỘC unique key
  title: String,
  description: String,
  coverUrl: String,
  authors: [String],
  status: { type: String, enum: ['ongoing', 'completed'] },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ScanGroup' }],
  views: { type: Number, default: 0 },
  followers: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Manga', mangaSchema);
