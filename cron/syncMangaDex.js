const axios = require('axios');
const Manga = require('../models/Manga');
const cron = require('node-cron');

// 📌 MangaDex API base
const BASE_URL = 'https://api.mangadex.org/manga';

// ✅ Hàm crawl 1 lần
const syncManga = async () => {
  console.log('🔄 [CRON] Bắt đầu sync manga từ MangaDex...');

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        limit: 20,
        includes: ['author', 'artist', 'cover_art'],
        order: { updatedAt: 'desc' }
      },
      headers: {
        'User-Agent': 'MyMangaApp/1.0 (https://yourdomain.com)',
        'Accept': 'application/json'
      }
    });

    const mangas = response.data.data;

    // 📌 Duyệt list và lưu vào DB
    for (const m of mangas) {
      const title = m.attributes.title.en || 'No Title';
      const desc = m.attributes.description.en || '';
      const mangaId = m.id;

      await Manga.findOneAndUpdate(
        { mangaId },
        {
          mangaId,
          title,
          description: desc
        },
        { upsert: true, new: true }
      );
    }

    console.log(`✅ [CRON] Đã sync ${mangas.length} manga.`);
  } catch (err) {
    console.error('❌ [CRON] Lỗi crawl:', err.message);
  }
};

// ✅ Tạo job chạy mỗi 6 tiếng (tuân thủ rate limit)
cron.schedule('0 */6 * * *', () => {
  syncManga();
});

// ✅ Lần đầu chạy ngay khi server khởi động
syncManga();
