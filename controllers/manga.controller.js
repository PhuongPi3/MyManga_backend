const axios = require('axios');
const Manga = require('../models/Manga');

exports.getMangaList = async (req, res) => {
  try {
     res.json({ message: 'API manga hoạt động OK!' });
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
        includedTags: tags // Array genre ID
      }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
