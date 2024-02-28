// * ライブラリのインポート
const c = require('ansi-colors');
const cors = require('cors');
const express = require('express');

// * データベースのインポート
const connectDB = require('./config/db.js');
connectDB();

// * routerのインポート
const usersRouter = require('./router/users.router.js');
const authRouter = require('./router/auth.router.js');
const postsRouter = require('./router/posts.router.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * ルーティング設定
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

app.listen(process.env.API_PORT, () => {
  console.log(c.bgBlue('サーバー起動'))
});