const readingHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mangaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
  chapterId: String,
  lastPage: Number,
}, { timestamps: true });
readingHistorySchema.index({ userId: 1, mangaId: 1 });
module.exports = mongoose.model('ReadingHistory', readingHistorySchema);