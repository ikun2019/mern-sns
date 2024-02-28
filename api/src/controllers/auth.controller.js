const User = require('../models/User');

// * /api/auth/register => POST
exports.postSignupUser = async (req, res) => {
  console.log('PostSignup');
  const { username, email, password } = req.body;
  try {
    const newUser = new User({
      username,
      email,
      password,
    });
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// * /api/auth/login => POST
exports.postLoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(400).json({ message: 'パスワードが違います' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};