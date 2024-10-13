// app.js
const express = require('express');
const sequelize = require('./models');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// 사용자 라우트 연결
app.use('/api/users', userRoutes);

// 데이터베이스와 연결
sequelize.sync({ force: true }).then(() => {
  console.log('데이터베이스와 연결 성공!');
  app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 실행 중입니다.');
  });
}).catch(err => {
  console.error('DB 연결 실패:', err);
});
