const Post = require('../models/Post');
const User = require('../models/User');

// * /api/posts => Post
exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// * /api/posts/:id => PUT
exports.editPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      res.status(200).json({ message: '投稿の編集に成功しました' });
    } else {
      res.status(403).json({ message: '自分の投稿しか編集できません' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// * /api/posts/:id => DELETE
exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({ message: '投稿を削除しました' });
    } else {
      return res.status(403).json({ message: '自分の投稿しか削除できません' });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// * /api/posts/:id => GET
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// * /api/posts/:id/like => PUT
exports.setLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        }
      });
      return res.status(200).json({ message: 'イイネしました' });
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        }
      });
      return res.status(200).json({ message: 'イイネを外しました' });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// * /api/posts/timeline/:userId => GET
exports.getTimeline = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    // 自分がフォローしているフォロワーの投稿内容を取得
    const friendPosts = await Promise.all(
      currentUser.followings.map(friendId => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(400).json(error);
  }
};

// * /api/posts/profile/:username => GET
exports.getUserPost = async (req, res) => {
  try {
    const user = await User.find({ username: req.params.username });
    const posts = await Post.find({ userId: user[0]._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};