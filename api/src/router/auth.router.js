const router = require('express').Router();
const { postSignupUser, postLoginUser } = require('../controllers/auth.controller');

// * /api/auth/register => POST
router.post('/register', postSignupUser);

// * /api/auth/login => POST
router.post('/login', postLoginUser);

module.exports = router;