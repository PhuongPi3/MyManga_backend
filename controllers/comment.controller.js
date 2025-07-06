
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
