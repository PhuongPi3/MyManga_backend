const axios = require('axios');

exports.getGenres = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.mangadex.org/manga/tag');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
