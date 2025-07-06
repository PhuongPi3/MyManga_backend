require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Manga = require('../models/Manga');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected (Cron)');
  } catch (err) {
    console.error('❌ MongoDB Error:', err);
  }
};

const crawlMangaDex = async () => {
  try {
    const { data } = await axios.get('https://api.mangadex.org/manga', {
      params: { limit: 50 } // Lấy 50 manga mới nhất
    });

    for (const item of data.data) {
      const exist = await Manga.findOne({ mangaDexId: item.id });
      if (!exist) {
        await Manga.create({
          mangaDexId: item.id,
          title: item.attributes.title.en || 'No Title',
          status: item.attributes.status,
          description: item.attributes.description.en || '',
          tags: item.attributes.tags.map(tag => tag.id)
        });
      }
    }

    console.log('✅ Crawl Done. Manga saved!');
  } catch (err) {
    console.error('❌ Crawl Error:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

const run = async () => {
  await connectDB();
  await crawlMangaDex();
};

run();
