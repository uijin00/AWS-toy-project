import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const API_Base_URL = process.env.REACT_APP_API_BASE_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_Base_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nickname, password })
            });

            const result = await response.json();

            if (response.ok) {
                // alert() 대신 더 나은 UI/UX를 위해 모달이나 토스트 메시지를 사용하는 것을 권장합니다.
                console.log(result.message);
                // 로그인 성공 시 '/music' 페이지로 이동
                navigate('/music');
            } else {
                alert('로그인 실패: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('네트워크 오류가 발생했습니다.');
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card">
                <h1 className="login-title">Spotify</h1>
                <h2 className="login-subtitle">Log in</h2>
                
                <form id="login-form" onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        id="login-id"
                        placeholder="Nickname"
                        name="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="login-input"
                        required
                    />
                    <input
                        type="password"
                        id="login-password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />
                    <button type="submit" className="login-button">
                        Log In
                    </button>
                </form>
                
                <p className="signup-prompt">
                    Don't have an account?{' '}
                    <Link to="/register" className="signup-link">
                        Sign up for Spotify
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
