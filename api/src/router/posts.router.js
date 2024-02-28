const { createPost, editPost, getSinglePost, setLikes, getTimeline, getUserPost } = require('../controllers/posts.controller');

const router = require('express').Router();

// * /api/posts => POST
router.post('/', createPost);

// * /api/posts/:id => PUT
router.put('/:id', editPost);

// * /api/posts/:id => DELETE
router.delete('/:id');

// * /api/posts/:id => GET
router.get('/:id', getSinglePost);

// * /api/posts/:id/like => PUT
router.put('/:id/like', setLikes);

// * /api/posts/timeline/:userId => GET
router.get('/timeline/:userId', getTimeline);

// * /api/posts/profile/:username => GET
router.get('/profile/:username', getUserPost);

module.exports = router;