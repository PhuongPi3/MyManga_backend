
const router = require('express').Router();
const { register, login } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);

module.exports = router;

// 📁 routes/auth.routes.js
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Tạo JWT tại đây nếu cần
    res.redirect('/'); // FE sẽ handle JWT
  }
);
