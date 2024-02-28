const User = require('../models/User');

// * /api/users/:id => PUT
exports.putUserData = async (req, res) => {
  const userId = req.params.id;
  if (req.body.userId === userId || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(userId, {
        $set: req.body,
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json({ message: '認証してください' });
  }
};

// * /api/users/:id => DELETE
exports.deleteUserData = async (req, res) => {
  const userId = req.params.id;
  if (req.body.userId === userId || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json(`${user.name}を削除しました`);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json({ message: '認証してください' });
  }
};

// * /api/users/:id => GET
exports.getUserData = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({ message: '自分のアカウントの情報だけが閲覧できます' });
    }
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// * /api/users/ => GET
exports.getUserQuery = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId ? await User.findById(userId) : await User.findOne({ username: username });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// * /api/users/:id/follow => PUT
exports.putUserFollow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: {
            followers: req.body.userId,
          }
        });
        await currentUser.updateOne({
          $push: {
            followings: req.params.id,
          }
        });
        res.status(200).json({ message: 'フォローに成功しました' });
      } else {
        return res.status(403).json({ message: 'すでにこのユーザーをフォローしています' });
      }
    } catch (error) {
      console.error(error);
      return res.status(403).json(error);
    }
  } else {
    return res.status(500).json({ message: '自分をフォローすることはできません' });
  }
};

// * /api/users/:id/unfollow => PUT
exports.putUserUnfollow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: {
            followers: req.body.userId,
          }
        });
        await currentUser.updateOne({
          $pull: {
            followings: req.params.id,
          }
        });
        return res.status(200).json({ message: 'フォローを外しました' });
      } else {
        return res.status(403).json({ message: 'このユーザーはフォロー解除できません' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  } else {
    return res.status(500).json({ message: '自分自身をフォロー解除できません' });
  }
};
