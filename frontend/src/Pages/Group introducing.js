import React, { useState, useEffect } from 'react';
import './Group introducing.css'; // CSS 파일 import

function App() {
  const [groupName, setGroupName] = useState('');
  const [department, setDepartment] = useState('');
  const [currentGroupName, setCurrentGroupName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://your-api-endpoint.com/data');
      if (response.ok) {
        const data = await response.json();
        setGroupName(data.groupName);
        setDepartment(data.department);
        setCurrentGroupName(data.groupName);
      } else {
        console.error('API 요청 실패:', response.status);
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
    }
  };

  const changeGroupName = async () => {
    const newGroupName = prompt('새로운 그룹명을 입력해주세요:', currentGroupName);
    if (newGroupName && newGroupName !== currentGroupName) {
      try {
        const response = await fetch('https://your-api-endpoint.com/update-group', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ groupName: newGroupName }),
        });
        if (response.ok) {
          setGroupName(newGroupName);
          setCurrentGroupName(newGroupName);
          alert('그룹명이 변경되었습니다!');
        } else {
          console.error('그룹명 업데이트 실패:', response.status);
          alert('그룹명 변경에 실패했습니다.');
        }
      } catch (error) {
        console.error('네트워크 오류:', error);
        alert('서버와의 연결에 문제가 있습니다.');
      }
    }
  };

  return (
    <div>
      <Header />
      <main>
        <LeftPanel groupName={groupName} changeGroupName={changeGroupName} />
        <RightPanel groupName={groupName} department={department} />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>소K팅</h1>
      <nav>
        <a href="#">로그아웃</a>
      </nav>
    </header>
  );
}

function LeftPanel({ groupName, changeGroupName }) {
  return (
    <section className="left-panel">
      <h2>프로필 관리</h2>
      <div className="profile-info">
        <button className="profile-btn">{groupName}</button>
      </div>
      <div className="profile-actions">
        <button className="action-btn" onClick={changeGroupName}>그룹명 변경</button>
      </div>
    </section>
  );
}

function RightPanel({ groupName, department }) {
  const handleAccept = () => alert('매칭이 수락되었습니다!');
  const handleDecline = () => alert('매칭이 거절되었습니다.');

  return (
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
      <SavedGroups />
    </section>
  );
}

function SavedGroups() {
  const savedGroups = [
    { name: '인공지능학부' },
    { name: '정치외교학과' },
    { name: '산림환경시스템학과' },
  ];

  return (
    <section className="saved-groups">
      <h2>저장한 그룹</h2>
      {savedGroups.map((group, index) => (
        <div key={index} className="group">
          <div className="group-icon"></div>
          <p>{group.name}</p>
          <button className="match-btn">매칭 신청</button>
        </div>
      ))}
    </section>
  );
}

export default App;
