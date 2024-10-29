import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 import
import './MainPage.css';  // CSS 파일 연결

const MainPage = () => {
  const [studentId, setStudentId] = useState(null);

  // 로그인 정보를 가져오는 함수 (예시로 localStorage 사용)
  useEffect(() => {
    const loggedInStudentId = localStorage.getItem('studentId'); // 로그인 시 저장한 학번을 가져옴
    if (loggedInStudentId) {
      setStudentId(loggedInStudentId);
    }
  }, []);

  return (
    <div>
      {/* 원형 그라데이션 추가 */}
      <div className="gradient-circle"></div>
      <div className="gradient-circle"></div>

      <div className="header">
        <h1>소K팅</h1>
        {/* 로그인 상태에 따라 링크 변경 */}
        {studentId ? (
          <span className="login">{studentId}님 환영합니다!</span>
        ) : (
          <Link to="/login" className="login">로그인 / 회원가입</Link>
        )}
      </div>

      <div className="main-content">
        <h2>국민대에서 만나는<br />당신만의 특별한 누군가</h2>
        <div className="button-group">
          <button onClick={() => alert('그룹 만들기 페이지로 이동')}>그룹 생성</button>
          <button onClick={() => alert('그룹 찾기 페이지로 이동')}>그룹 탐색</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
