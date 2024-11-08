import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import './MainPage.css';

const MainPage = () => {
  const [studentId, setStudentId] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const loggedInStudentId = localStorage.getItem('studentId');
    if (loggedInStudentId) {
      setStudentId(loggedInStudentId);
    }
  }, []);

  return (
    <div>
      <div className="gradient-circle"></div>
      <div className="gradient-circle"></div>

      <div className="header">
        <h1>소K팅</h1>
        {studentId ? (
          <span className="login">{studentId}님 환영합니다!</span>
        ) : (
          <Link to="/login" className="login">로그인 / 회원가입</Link>
        )}
      </div>

      <div className="main-content">
        <h2>국민대에서 만나는<br />당신만의 특별한 누군가</h2>
        <div className="button-group">
          <button onClick={() => navigate('/group-setting')}>시작하기</button>
          <button onClick={() => navigate('/group-introducing')}>확인하기</button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
