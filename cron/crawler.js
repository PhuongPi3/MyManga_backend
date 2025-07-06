// cron/crawler.js
const axios = require('axios');
const cron = require('node-cron');
const Manga = require('../models/Manga'); // model MongoDB

// Hàm crawl MangaDex → lưu MongoDB
const crawlMangaDex = async () => {
  console.log('[CRON] Bắt đầu crawl MangaDex...');
  try {
    const response = await axios.get('https://api.mangadex.org/manga', {
      params: {
        limit: 20,
        offset: 0,
        availableTranslatedLanguage: 'en',
        order: { latestUploadedChapter: 'desc' }
      },
      headers: {
        'User-Agent': 'MyMangaApp/1.0',
        'Accept': 'application/json'
      }
    });

    const mangas = response.data.data;

    for (const item of mangas) {
      const id = item.id;
      const title = item.attributes.title.en || 'No title';
      const description = item.attributes.description.en || '';
      const cover = item.relationships.find(r => r.type === 'cover_art');

      const coverUrl = cover
        ? `https://uploads.mangadex.org/covers/${id}/${cover.attributes.fileName}.256.jpg`
        : '';

      // Upsert: nếu đã có thì update
      await Manga.updateOne(
        { mangaDexId: id },
        {
          mangaDexId: id,
          title,
          description,
          coverUrl
        },
        { upsert: true }
      );
    }

    console.log(`[CRON] Crawl MangaDex OK! Đã sync ${mangas.length} manga ✅`);
  } catch (err) {
    if (err.response) {
  console.error('[CRON] MangaDex API lỗi:', err.response.status, err.response.data);
    } else {
    console.error('[CRON] Lỗi crawl:', err);
    }

  }
};

// Setup cron job: chạy mỗi 30 phút
cron.schedule('*/30 * * * *', () => {
  crawlMangaDex();
});

console.log('[CRON] Scheduler đã bật!');
