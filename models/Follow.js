const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mangaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
  followDate: { type: Date, default: Date.now }
}, { timestamps: true });

followSchema.index({ userId: 1, mangaId: 1 }, { unique: true });

module.exports = mongoose.model('Follow', followSchema);
