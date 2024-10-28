const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const history = require('connect-history-api-fallback');
const PORT = 4000; // 포트 번호 변경

app.use(cors());
app.use(bodyParser.json());

app.use(history());

// 사용자 정보를 저장할 배열 (여기서는 메모리에서 임시 저장)
let users = [];

// 회원가입 엔드포인트
app.post('/api/signup', (req, res) => {
    const { major, studentId, age, gender, alcoholTolerance, mbti, hobby, heightWeight, password } = req.body;

    // 필수 입력값 확인
    if (!major || !studentId || !age || !gender || !password) {
        return res.status(400).json({ message: '(선택)외의 입력값들을 모두 입력해주세요.' });
    }

    // 사용자 데이터 저장
    users.push({ major, studentId, age, gender, alcoholTolerance, mbti, hobby, heightWeight, password });
    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
});

// 로그인 엔드포인트
app.post('/api/login', (req, res) => {
    const { studentId, password } = req.body;

    // 사용자가 있는지 확인
    const user = users.find(user => user.studentId === studentId && user.password === password);
    if (user) {
        res.status(200).json({ message: '로그인 성공' });
    } else {
        res.status(401).json({ message: '잘못된 학번 또는 비밀번호' });
    }
});

// React 앱의 정적 파일 제공
app.use(express.static(path.join(__dirname, '../frontend/build'))); // frontend/build 경로 설정

// 모든 다른 경로에 대한 요청도 index.html로 리다이렉트
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
