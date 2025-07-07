const axios = require('axios');
const Manga = require('../models/Manga');

exports.getMangaList = async (req, res) => {
  try {
       const { data } = await axios.get('https://api.mangadex.org/manga', {
      params: { limit: 20 } // VD: limit, sort
    });
    res.json(data);
  } catch (err) {
    console.error(err.response?.data || err);
    if (res.headersSent) return;

    res.status(500).json({ error: 'Không thể kết nối MangaDex. Kiểm tra Internet hoặc Firewall!' });
  }
};

exports.getMangaDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`https://api.mangadex.org/manga/${id}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchManga = async (req, res) => {
  try {
    const { q } = req.query;
    const { data } = await axios.get('https://api.mangadex.org/manga', {
      params: { title: q }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.filterManga = async (req, res) => {
  try {
    const { status, tags } = req.query;
    const { data } = await axios.get('https://api.mangadex.org/manga', {
      params: {
        status,
        includedTags: tags 
      }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getMangaByGenre = async (req, res) => {
  try {
    const { genreId } = req.params;
    const { data } = await axios.get('https://api.mangadex.org/manga', {
      params: {
        includedTags: [genreId],
        limit: 20
      }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.autocomplete = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 1) return res.json([]);

    const regex = new RegExp(q, 'i'); 
    const mangas = await Manga.find(
      { title: { $regex: regex } },
      { _id: 1, title: 1, thumbnail: 1 } 
    ).limit(10);

    res.json(mangas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.recommendManga = async (req, res) => {
  const { genreId } = req.query;
  const mangas = await Manga.find({ tags: genreId }).limit(10);
  res.json(mangas);
};


exports.getMangaByGenre = async (req, res) => {
  try {
    const { genreId } = req.params;

    const { data } = await axios.get('https://api.mangadex.org/manga', {
      params: {
        includedTags: [genreId],
        limit: 20
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const History = require('../models/History');

// GỢI Ý TRUYỆN DỰA LỊCH SỬ
exports.recommendByHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Lấy lịch sử đọc của user
    const histories = await History.find({ userId }).populate('mangaId');

    if (!histories.length) {
      return res.json([]); // Không có lịch sử thì trả về rỗng
    }

    // Gom tất cả tags
    const allTags = [];
    histories.forEach(h => {
      if (h.mangaId?.tags?.length) {
        allTags.push(...h.mangaId.tags);
      }
    });

    if (!allTags.length) {
      return res.json([]); // Lịch sử không có tag
    }

    // Đếm tag phổ biến
    const tagCount = {};
    allTags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });

    // Lấy top tag
    const sortedTags = Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);

    // Tìm truyện có tag tương tự
    const mangas = await Manga.find({
      tags: { $in: sortedTags }
    }).limit(10);

    res.json(mangas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 📁 controllers/manga.controller.js

exports.autocomplete = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const results = await Manga.find({
      title: { $regex: q, $options: 'i' }
    }).select('title thumbnail').limit(10);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

