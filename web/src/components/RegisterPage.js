import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // CSS 파일 import

function RegisterPage() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const API_Base_URL = process.env.REACT_APP_API_BASE_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_Base_URL}/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nickname, password })
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                navigate('/login');
            } else {
                alert('회원가입 실패: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('네트워크 오류가 발생했습니다.');
        }
    };

    return (
        <div className="register-page-container">
            <div className="register-card">
                <h1 className="register-title">Spotify</h1>
                <h2 className="register-subtitle">Sign up for free</h2>
                <form id="signup-form" onSubmit={handleSubmit} className="register-form">
                    <input 
                        type="text" 
                        id="register-id" 
                        placeholder="Nickname" 
                        name="nickname" 
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="register-input" 
                        required
                    />
                    <input 
                        type="password" 
                        id="register-password" 
                        placeholder="Create a password" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-input" 
                        required
                    />
                    <button type="submit" className="register-button">
                        Sign Up
                    </button>
                </form>
                <p className="login-prompt">
                    Already have an account?{' '}
                    <Link to="/login" className="login-link">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
