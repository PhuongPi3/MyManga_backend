const router = require('express').Router();
const { getGenres } = require('../controllers/genre.controller');

router.get('/', getGenres);

module.exports = router;
