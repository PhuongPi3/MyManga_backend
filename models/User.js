
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: String,
  password: { type: String, required: true },
  roles: { type: [String], default: ['User'] },
  followedManga: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manga' }],
  history: [
    {
      mangaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
      chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
      pageNumber: Number,
      updatedAt: { type: Date, default: Date.now }
    }
  ],
  theme: { type: String, default: 'light' },
  oauthProvider: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
