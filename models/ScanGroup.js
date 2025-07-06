
const mongoose = require('mongoose');

const scanGroupSchema = new mongoose.Schema({
  name: String,
  description: String,
  website: String,
  contact: String
});

module.exports = mongoose.model('ScanGroup', scanGroupSchema);
