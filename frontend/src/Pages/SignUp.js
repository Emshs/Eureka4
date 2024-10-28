import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';  // CSS 파일 연결

const SignUp = () => {
    const [formData, setFormData] = useState({
        major: '',
        studentId: '',
        age: '',
        gender: '',
        alcoholTolerance: '',
        mbti: '',
        hobby: '',
        heightWeight: '',
        password: '',
        confirmPassword: '', // 비밀번호 확인 추가
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/signup', {
                major: formData.major,
                studentId: formData.studentId,
                age: formData.age,
                gender: formData.gender,
                alcoholTolerance: formData.alcoholTolerance,
                mbti: formData.mbti,
                hobby: formData.hobby,
                heightWeight: formData.heightWeight,
                password: formData.password,
            });
            alert(response.data.message); // 성공 메시지 표시
        } catch (error) {
            alert(error.response.data.message); // 에러 메시지 표시
        }
    };

    return (
        <div className="signup-container">
            <div className="background-circle"></div> {/* 배경 원 추가 */}
            <h2>SIGN UP</h2>
            <form action="#" method="post" className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="left-column">
                        <input 
                            type="text" 
                            name="major" 
                            placeholder="학과(부)" 
                            value={formData.major} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="studentId" 
                            placeholder="학번" 
                            value={formData.studentId} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="number" 
                            name="age" 
                            placeholder="나이" 
                            value={formData.age} 
                            onChange={handleChange} 
                            required 
                        />
                        <select 
                            name="gender" 
                            value={formData.gender} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="" disabled>성별</option>
                            <option value="male">남자</option>
                            <option value="female">여자</option>
                        </select>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="비밀번호 설정" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="right-column">
                        <input 
                            type="text" 
                            name="alcoholTolerance" 
                            placeholder="주량(선택)" 
                            value={formData.alcoholTolerance} 
                            onChange={handleChange} 
                        />
                        <input 
                            type="text" 
                            name="mbti" 
                            placeholder="MBTI(선택)" 
                            value={formData.mbti} 
                            onChange={handleChange} 
                        />
                        <input 
                            type="text" 
                            name="hobby" 
                            placeholder="취미 (선택)" 
                            value={formData.hobby} 
                            onChange={handleChange} 
                        />
                        <input 
                            type="text" 
                            name="heightWeight" 
                            placeholder="키/몸무게 (선택)" 
                            value={formData.heightWeight} 
                            onChange={handleChange} 
                        />
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="비밀번호 확인" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                </div>
                <button type="submit">회원가입하기</button>
            </form>
        </div>
    );
}

export default SignUp;
