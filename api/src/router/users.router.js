const { putUserData, deleteUserData, getUserData, putUserFollow, putUserUnfollow, getUserQuery } = require('../controllers/users.controller');

const router = require('express').Router();

// * /api/users/:id => PUT
router.put('/:id', putUserData);

// * /api/users/:id => DELETE
router.delete('/:id', deleteUserData);

// * /api/users/:id => GET
router.get('/:id', getUserData);
router.get('/', getUserQuery);

// * /api/users/:id/follow => PUT
router.put('/:id/follow', putUserFollow);

// * /api/users/:id/unfollow => PUT
router.put('/:id/unfollow', putUserUnfollow);

module.exports = router;