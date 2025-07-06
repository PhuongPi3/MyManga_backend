const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/manga', require('./routes/manga.routes'));
app.use('/api/chapter', require('./routes/chapter.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/comment', require('./routes/comment.routes'));
app.use('/api/genre', require('./routes/genre.routes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// Cron Job
require('./cron/syncMangaDex');


//erorr 
const { errorHandler } = require('./middleware/error.middleware');
app.use(errorHandler);


