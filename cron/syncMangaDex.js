
const cron = require('node-cron');
const axios = require('axios');
const Manga = require('../models/Manga');

cron.schedule('0 0 * * *', async () => {
  console.log('🔄 Đang sync MangaDex...');
  try {
    const { data } = await axios.get('https://api.mangadex.org/manga', {
      params: { limit: 5 }
    });

    for (const m of data.data) {
      await Manga.findOneAndUpdate(
        { mangaDexId: m.id },
        { title: m.attributes.title.en, description: m.attributes.description.en },
        { upsert: true }
      );
    }
    console.log('✅ Sync xong!');
  } catch (err) {
    console.error('❌ Sync lỗi:', err.message);
  }
});
