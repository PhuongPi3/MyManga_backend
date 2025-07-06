const Redis = require('ioredis');

let redisClient;

if (process.env.NODE_ENV === 'production') {
  redisClient = new Redis(process.env.REDIS_URL);
} else {
  console.log('🔸 Redis mock: Local mode.');
  redisClient = {
    get: async () => null,
    set: async () => null,
    on: () => {},
  };
}

module.exports = redisClient;
