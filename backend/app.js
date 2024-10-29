require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken'); // JWT 사용을 위한 모듈
const mysql = require('mysql2/promise'); // Promise 기반의 MySQL2 라이브러리 사용
const bcrypt = require('bcrypt'); // bcrypt 패키지 사용


const app = express();
const PORT = 4000;

const dbConfig = {
    host: 'localhost',
    user: 'root', // MySQL 사용자 이름
    password: '1974', // MySQL 비밀번호
    database: 'signup' // 사용하려는 데이터베이스 이름
};

// 데이터베이스 연결 함수
async function connectDB() {
    const connection = await mysql.createConnection(dbConfig);
    console.log('DB 연결 성공');
    return connection;
}

app.use(cors());
app.use(bodyParser.json());

// 비밀 키 (JWT 서명용)
const SECRET_KEY = process.env.SECRET_KEY;

// 회원가입 엔드포인트
app.post('/api/signup', async (req, res) => {
    const { major, studentId, age, gender, alcoholTolerance, mbti, hobby, heightWeight, password } = req.body;

    try {
        const db = await connectDB(); // DB 연결

        // 중복 학번 확인
        const [rows] = await db.query('SELECT * FROM users WHERE studentId = ?', [studentId]);
        if (rows.length > 0) {
            return res.status(400).json({ message: '이미 존재하는 학번입니다.' });
        }

        // 사용자 정보 삽입 (비밀번호를 해시하지 않고 저장)
        await db.query('INSERT INTO users (major, studentId, age, gender, alcoholTolerance, mbti, hobby, heightWeight, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [major, studentId, age, gender, alcoholTolerance, mbti, hobby, heightWeight, password]);

        res.status(201).json({ message: '회원가입 성공!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});


// 로그인 엔드포인트 (JWT 발급)
app.post('/api/login', async (req, res) => {
    const { studentId, password } = req.body;

    try {
        const db = await connectDB(); // DB 연결

        // 사용자의 정보를 데이터베이스에서 가져오기
        const [rows] = await db.query('SELECT * FROM users WHERE studentId = ?', [studentId]);
        
        if (rows.length === 0) {
            return res.status(401).json({ message: '학번 또는 비밀번호가 잘못되었습니다.' });
        }

        const user = rows[0];

        // 비밀번호 확인 (해시화하지 않으므로 직접 비교)
        if (password !== user.password) {
            return res.status(401).json({ message: '학번 또는 비밀번호가 잘못되었습니다.' });
        }

        // 비밀번호가 유효하면 JWT 토큰 생성
        const token = jwt.sign({ id: user.id, studentId: user.studentId }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
});



// JWT 검증 미들웨어
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: '토큰이 필요합니다.' });
    }
};

// 개인화된 메인 페이지 엔드포인트 (JWT 인증 필요)
app.get('/api/main', authenticateJWT, (req, res) => {
    // 로그인한 사용자의 데이터를 반환
    const user = users.find(u => u.studentId === req.user.studentId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
});

// React 앱의 정적 파일 제공
app.use(express.static(path.join(__dirname, '../frontend/build'))); // frontend/build 경로 설정

// 모든 다른 경로에 대한 요청도 index.html로 리다이렉트
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
