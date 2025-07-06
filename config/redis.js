const { createClient } = require('redis');


module.exports = redisClient;

const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});


redisClient.on('error', (err) => console.error('❌ Redis Client Error', err));

redisClient.connect().then(() => console.log('✅ Redis Connected'));

module.exports = redisClient;
