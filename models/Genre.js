
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('Genre', genreSchema);
