// config/redis.js
const Redis = require('ioredis');

let redisClient;

if (process.env.NODE_ENV === 'production') {
  redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  });
} else {
  console.log('🔸 Redis mock: Local mode.');
  redisClient = {
    get: async () => null,
    set: async () => null,
    on: () => {},
  };
}

module.exports = redisClient;
