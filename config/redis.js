const Redis = require('ioredis');

let redisClient;

if (process.env.REDIS_URL) {
  redisClient = new Redis(process.env.REDIS_URL);
  redisClient.on('connect', () => console.log('✅ Redis Connected!'));
  redisClient.on('error', (err) => console.error('❌ Redis error:', err));
} else {
  console.log('🔸 Redis mock: Local mode.');
  redisClient = {
    get: async () => null,
    set: async () => null,
    on: () => {},
  };
}

module.exports = redisClient;
