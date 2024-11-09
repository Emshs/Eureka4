import React, { useState, useEffect } from 'react';
import './GroupSetting.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='head'>
      <div className='leftside'>
        <Link to="/" className='element1'>소K팅</Link>
      </div>
      <div className='rightside'>
        <div className='element11'></div>
        <div className='element2'>로그아웃</div>
        <div className='element2'>20240000님</div>
      </div>
    </div>
  );
}

const SubHeader = () => {
  return (
    <div className='subhead'>
      <div className='leftside'>
        <input type='text' placeholder='그룹 찾기' id='element3'></input>
      </div>
      <div className='rightside'>
        <div id='element6'>내 그룹 만들기</div>
      </div>
    </div>
  );
}

const Group = ({ groupName, members }) => {
  return (
    <div className='block'>
      <div id='element4'>{groupName}</div>
      <div id='element5'>+ {members.length} members</div>
    </div>
  );
};

const GroupFinding = () => {
  const [groups, setGroups] = useState([]); // State to hold fetched group data

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('https://your-api-url.com/api/groups');
        if (!response.ok) {
          throw new Error('Failed to fetch groups.');
        }
        const data = await response.json();
        setGroups(data); // Assuming data is an array of groups
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className='leftside'>
      {groups.map((group, index) => (
        <Group key={index} groupName={group.groupName} members={group.members} />
      ))}
    </div>
  );
};

const GroupMaking = () => {
  // 팝업 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGroupCreationOpen, setIsGroupCreationOpen] = useState(false); // 그룹 생성 팝업 상태
  const [numberInput, setNumberInput] = useState('');
  const [numbers, setNumbers] = useState([]); // 입력된 숫자들을 저장할 배열
  const [groups, setGroups] = useState([]); // 생성된 그룹들을 저장할 배열
  const [groupName, setGroupName] = useState(''); // 그룹명 상태 추가

  // 팝업 열기/닫기 핸들러
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 그룹 생성 팝업 열기/닫기 핸들러
  const openGroupCreationModal = () => setIsGroupCreationOpen(true);
  const closeGroupCreationModal = () => setIsGroupCreationOpen(false);

  // 숫자 입력 핸들러
  const handleNumberChange = (e) => {
    setNumberInput(e.target.value);
  };

  // 그룹명 입력 핸들러
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  // OK 버튼 클릭 시 동작
  const handleOkClick = () => {
    if (numberInput.length === 8) {
      if (numbers.length < 3) {
        setNumbers((prevNumbers) => [...prevNumbers, numberInput]);
        closeModal(); // 3개 미만이면 모달 닫기
      } else {
        alert('3명이 최대 인원입니다.'); // 3개가 이미 입력된 경우 alert
      }
    } else {
      alert(`${numberInput.length} 자리가 입력되었습니다. 8자리를 입력해주세요.`); // 8자리가 아닐 경우 alert
    }
  };

  // 숫자 제거 핸들러
  const handleRemoveClick = (num) => {
    setNumbers((prevNumbers) => prevNumbers.filter((number) => number !== num));
  };

// 그룹 생성 확인 핸들러
const handleCreateGroup = async () => {
  if (!groupName) { // 그룹명이 비어있는지 체크
    alert('그룹명을 입력해주세요.'); // 그룹명이 없을 경우 경고
  } else if (numbers.length === 0) {
    alert('그룹원 1명을 추가해주세요.'); // 그룹원이 0명인 경우 경고
  } else {
    // 그룹 추가 로직
    const newGroup = { groupName, members: numbers };

    try {
      // 서버로 POST 요청 보내기
      const response = await fetch('https://your-api-url.com/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGroup), // 그룹 정보를 JSON으로 변환하여 전송
      });

      if (!response.ok) {
        throw new Error('네트워크 응답이 좋지 않습니다.');
      }

      const result = await response.json();
      console.log('그룹이 성공적으로 생성되었습니다:', result);

      setGroups((prevGroups) => [...prevGroups, newGroup]); // 그룹 상태 업데이트
      closeGroupCreationModal(); // 팝업 닫기
      setNumbers([]); // 그룹 생성 후 숫자 배열 초기화
      setGroupName(''); // 그룹명 초기화
    } catch (error) {
      console.error('그룹 생성 중 오류 발생:', error);
      alert('그룹 생성에 실패했습니다. 다시 시도해 주세요.');
    }
  }
};


  return (
    <div className='rightside'>
      <div className='upper'>
        <div id='left'>
          <input
            id='element7'
            type='text'
            placeholder='그룹명'
            value={groupName}
            onChange={handleGroupNameChange}
          />
          <button onClick={openModal} id='element8'></button>
        </div>
        <div id='right'>
          <button id='element9' onClick={openGroupCreationModal}>+</button> {/* 그룹 만들기 버튼 */}
        </div>
      </div>
      <div className='lower'>
        <div id='up'>
          {numbers.map((num, index) => (
            <div key={index} className='element10'>
              <div id='element12'>{num}</div>
              <button onClick={() => handleRemoveClick(num)} className='remove-button'>X</button>
            </div>
          ))}
        </div>

        <div id='bottom'>
          {/* 생성된 그룹들 표시 */}
          <div className='group-list'>
            {groups.length === 0 ? (
              <p>아직 생성된 그룹이 없습니다.</p> // 그룹이 없을 때 안내 메시지
            ) : (
              groups.map((group, index) => (
                <div key={index} className='group-item'>
                  <div className='group-name'>
                    <h3 id='element13'>그룹명: {group.groupName}</h3>
                  </div>
                  <div className='group-members'>
                    {group.members.map((member, memberIndex) => (
                      <div key={memberIndex} className='member-id'>
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 학번 입력 팝업(모달) */}
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-contents'>
            <h2>학번을 입력하세요 (8자리)</h2>
            <input
              type="number"
              value={numberInput}
              onChange={handleNumberChange}
              placeholder="학번"
            />
            <div>
              <button onClick={handleOkClick}>확인</button>
              <button onClick={closeModal}>돌아가기</button>
            </div>
          </div>
        </div>
      )}

      {/* 그룹 생성 팝업 */}
      {isGroupCreationOpen && (
        <div className='modal'>
          <div className='modal-contents'>
            <h2>그룹을 만들겠습니까?</h2>
            <div>
              <button onClick={handleCreateGroup}>네</button>
              <button onClick={closeGroupCreationModal}>아니오</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}


const GroupSetting = () => {
  return (
    <div className='container'>
      <Header />
      <SubHeader />
      <div className='contents'>
        <GroupFinding />
        <GroupMaking />
      </div>
    </div>
  );
}

export default GroupSetting;