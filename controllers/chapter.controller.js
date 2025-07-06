const axios = require('axios');

exports.getChaptersByManga = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const { data } = await axios.get(`https://api.mangadex.org/chapter`, {
      params: { manga: mangaId }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.readChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const { data } = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
