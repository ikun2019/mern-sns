// * ライブラリのインポート
const c = require('ansi-colors');
const cors = require('cors');
const express = require('express');
const path = require('path');

// * データベースのインポート
const connectDB = require('./config/db.js');
connectDB();

// * routerのインポート
const usersRouter = require('./router/users.router.js');
const authRouter = require('./router/auth.router.js');
const postsRouter = require('./router/posts.router.js');
const uploadRouter = require('./router/upload.router.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(process.cwd(), 'public/images')));

// * ルーティング設定
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/upload", uploadRouter);

app.listen(process.env.API_PORT, () => {
  console.log(c.bgBlue('サーバー起動'))
});