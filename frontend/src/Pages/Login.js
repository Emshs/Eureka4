import React from 'react';
import './Login.css';  // CSS 파일 연결
import { Link } from 'react-router-dom'; // Link 컴포넌트 import

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-background"></div> {/* 배경 원 추가 */}
      <h2>LOGIN</h2>
      <form action="/login_process" method="post">
        <input type="text" name="student_id" placeholder="학번" className="student-id" required />
        <input type="password" name="password" placeholder="PASSWORD" className="password" required />
        <button type="submit">로그인하기</button>
      </form>
      <div className="separator">
        <span className="separator-text">또는</span>
      </div>
      {/* Link를 사용하여 회원가입 페이지로 이동 */}
      <Link to="/signup">
        <button>회원가입하기</button>
      </Link>
    </div>
  );
}

export default Login;
