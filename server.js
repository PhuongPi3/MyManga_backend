const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});


global._io = io;

app.use(cors());
app.use(express.json());

// ROUTES
app.get('/api/ping', (req, res) => {
  res.send('pong 🏓');
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/manga', require('./routes/manga.routes'));
app.use('/api/chapter', require('./routes/chapter.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/comment', require('./routes/comment.routes'));
app.use('/api/genre', require('./routes/genre.routes'));
app.use('/api/admin', require('./routes/admin.routes'));


// ERROR HANDLER
const { errorHandler } = require('./middleware/error.middleware');
app.use(errorHandler);

// SOCKET.IO
io.on('connection', (socket) => {
  console.log(`🔌 [Socket] User connected: ${socket.id}`);
});

// CRON
const crawlMangaDex = require('./cron/syncMangaDex');
crawlMangaDex.start();

// SERVER
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


