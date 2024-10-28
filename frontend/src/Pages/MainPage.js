import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 import
import './MainPage.css';  // CSS 파일 연결

const MainPage = () => {
  return (
    <div>
      {/* 원형 그라데이션 추가 */}
      <div className="gradient-circle"></div>
      <div className="gradient-circle"></div>

      <div className="header">
        <h1>소K팅</h1>
        <Link to="/login" className="login">로그인 / 회원가입</Link> {/* Link 사용 */}
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
