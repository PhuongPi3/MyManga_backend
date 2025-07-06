const routerN = require('express').Router();
const Notification = require('../models/Notification');

routerN.get('/', async (req, res) => {
  const noti = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(noti);
});

module.exports = routerN;