const axios = require('axios');
const cron = require('node-cron');
const Manga = require('../models/Manga');

const crawlMangaDex = async () => {
  console.log('🔄 [CRON] Bắt đầu crawl MangaDex...');
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
    console.log(`ℹ️ [CRON] Tìm thấy ${mangas.length} manga`);

    for (const item of mangas) {
      const id = item.id;
      const title = item.attributes.title.en || 'No title';
      const description = item.attributes.description.en || '';
      const cover = item.relationships.find(r => r.type === 'cover_art');

      const coverUrl = cover
        ? `https://uploads.mangadex.org/covers/${id}/${cover.attributes.fileName}.256.jpg`
        : '';

      await Manga.updateOne(
        { mangaDexId: id },
        { $set: { mangaDexId: id, title, description, coverUrl } },
        { upsert: true }
      );

      console.log(`✅ [CRON] Đã sync manga: ${title}`);
    }

    console.log(`🎉 [CRON] Hoàn thành crawl MangaDex (${mangas.length} manga)`);
  } catch (err) {
    if (err.response) {
      console.error('[CRON] MangaDex API lỗi:', err.response.status, err.response.data);
    } else {
      console.error('[CRON] Lỗi crawl:', err);
    }
  }
};

// ✅ Export ra hàm khởi chạy
module.exports.start = () => {
  console.log('⏰ [CRON] Scheduler đã bật!');
  cron.schedule('*/30 * * * *', crawlMangaDex);
};
