const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mangaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  lastReadAt: { type: Date, default: Date.now },
}, { timestamps: true });

historySchema.index({ userId: 1, mangaId: 1 }, { unique: true });

module.exports = mongoose.model('History', historySchema);
