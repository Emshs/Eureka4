import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './Group introducing.css'; // CSS 파일 import

function GroupIntroducing() {
  const [groupName, setGroupName] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    // 로그인 확인
    const loggedInStudentId = localStorage.getItem('studentId');
    if (!loggedInStudentId) {
      navigate('/login'); // 로그인되어 있지 않으면 로그인 페이지로 이동
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://your-api-endpoint.com/data');
      if (response.ok) {
        const data = await response.json();
        setGroupName(data.groupName);
        setDepartment(data.department);
      } else {
        console.error('API 요청 실패:', response.status);
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
    }
  };

  const handleAccept = () => {
    alert('매칭이 수락되었습니다!');
  };

  const handleDecline = () => {
    alert('매칭이 거절되었습니다.');
  };

  const handleLogout = () => {
    localStorage.removeItem('studentId'); // 로그아웃 시 studentId 제거
    navigate('/'); // 로그아웃 후 메인 페이지로 이동
  };

  const handleHomeClick = () => {
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <div>
      <header>
        <h1 onClick={handleHomeClick} style={{ cursor: 'pointer' }}>소K팅</h1>
        <nav>
          <a href="#" onClick={handleLogout}>로그아웃</a>
        </nav>
      </header>

      <section className="right-panel">
        <h2>
          <span className="bell-icon">🔔</span> 매칭 신청
        </h2>
        <div className="matching-content">
          <div className="matching-image"></div>
          <div className="matching-info">
            <p>{groupName} ({department})</p>
          </div>
          <div className="matching-actions">
            <button className="accept" onClick={handleAccept}>매칭 수락</button>
            <button className="decline" onClick={handleDecline}>관심 없음</button>
          </div>
          <p className="matching-note">신청을 수락하면 매칭이 완료됩니다.</p>
        </div>

        <section className="saved-groups">
          <h2>매칭된 그룹</h2>
          {[
            { name: '인공지능학부' },
            { name: '정치외교학과' },
            { name: '산림환경시스템학과' },
          ].map((group, index) => (
            <div key={index} className="group">
              <div className="group-icon"></div>
              <p>{group.name}</p>
              <button className="match-btn">채팅 하기</button>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}

export default GroupIntroducing;
