import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Link 컴포넌트 import
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        studentId: '',
        password: ''
    });

    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/login', formData);

            // 로그인 성공 시 학번과 토큰을 저장하고 메인 페이지로 이동
            localStorage.setItem('studentId', formData.studentId); // 학번을 로컬 스토리지에 저장
            localStorage.setItem('token', response.data.token); // JWT 토큰을 로컬 스토리지에 저장
            navigate('/'); // 메인 페이지로 이동
        } catch (error) {
            alert(error.response.data.message); // 에러 메시지 표시
        }
    };

    return (
        <div className="login-container">
            <div className="login-background"></div>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="studentId"
                    placeholder="학번"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="PASSWORD"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
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
