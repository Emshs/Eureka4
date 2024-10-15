// app.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require('./models');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

// 사용자 라우트 연결
app.use('/api/users', userRoutes);

// 소켓 연결 설정
io.on('connection', (socket) => {
  console.log('새로운 클라이언트가 연결되었습니다.');

  // 메시지 수신 이벤트
  socket.on('sendMessage', (message) => {
    console.log('메시지 수신:', message);
    // 모든 클라이언트에게 메시지 전송
    io.emit('receiveMessage', message);
  });

  // 클라이언트 연결 해제 시
  socket.on('disconnect', () => {
    console.log('클라이언트 연결이 해제되었습니다.');
  });
});

// 데이터베이스와 연결
sequelize.sync({ force: true }).then(() => {
  console.log('데이터베이스와 연결 성공!');
  server.listen(3000, () => {
    console.log('서버가 3000번 포트에서 실행 중입니다.');
  });
}).catch(err => {
  console.error('DB 연결 실패:', err);
});