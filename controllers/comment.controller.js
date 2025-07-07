
const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const { mangaId, chapterId, content, parentId } = req.body;

    const newComment = new Comment({
      userId: req.user.id,
      mangaId,
      chapterId,
      content,
      parentId: parentId || null
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const comments = await Comment.find({ mangaId })
      .populate('userId', 'username')
      .populate('parentId')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Không có quyền xóa' });
    }

    await comment.remove();
    res.json({ message: 'Đã xóa bình luận' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Không có quyền sửa' });
    }

    comment.content = req.body.content;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (!comment.likes) comment.likes = [];
    if (!comment.dislikes) comment.dislikes = [];

    const userId = req.user.id;

    if (comment.likes.includes(userId)) {
      // Đã like → hủy like
      comment.likes = comment.likes.filter(id => id.toString() !== userId);
    } else {
      // Chưa like → thêm like
      comment.likes.push(userId);
      // Nếu đang dislike → gỡ dislike
      comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId);
    }

    await comment.save();

    res.json({
      message: 'Like toggled',
      likes: comment.likes.length,
      dislikes: comment.dislikes.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.dislikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (!comment.likes) comment.likes = [];
    if (!comment.dislikes) comment.dislikes = [];

    const userId = req.user.id;

    if (comment.dislikes.includes(userId)) {
      // Đã dislike → hủy dislike
      comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId);
    } else {
      // Chưa dislike → thêm dislike
      comment.dislikes.push(userId);
      // Nếu đang like → gỡ like
      comment.likes = comment.likes.filter(id => id.toString() !== userId);
    }

    await comment.save();

    res.json({
      message: 'Dislike toggled',
      likes: comment.likes.length,
      dislikes: comment.dislikes.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

