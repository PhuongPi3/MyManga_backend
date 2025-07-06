const axios = require('axios');
const Manga = require('../models/Manga');
const redisClient = require('../config/redis');

exports.getMangaList = async (req, res) => {
  try {
    const cacheKey = 'manga_list';
    const cacheData = await redisClient.get(cacheKey);
      if (cacheData) {
          console.log('✅ Cache hit!');
          return res.json(JSON.parse(cacheData));
    }

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

exports.recommendManga = async (req, res) => {
  const { genreId } = req.query;
  const mangas = await Manga.find({ tags: genreId }).limit(10);
  res.json(mangas);
};

// Thêm vào manga.controller.js
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
