
// * /api/upload
exports.postFile = async (req, res) => {
  try {
    res.status(200).json('画像アップロードが成功しました');
  } catch (error) {
    console.error(error);
  }
};