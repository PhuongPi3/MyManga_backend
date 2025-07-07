const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mangaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  content: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // 👈 thêm
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // 👈 thêm
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
