import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MusicPlayerPage from './components/MusicPlayerPage';
import Layout from './components/Layout'; // 공통 레이아웃 컴포넌트 import
import './App.css'; 

function App() {
    return (
        <Router>
            <Routes>
                {/* Layout 컴포넌트를 부모 라우트로 설정합니다. */}
                {/* 이 안에 있는 자식 페이지들은 모두 공통 Layout(배경 등)을 공유하게 됩니다. */}
                <Route element={<Layout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/music" element={<MusicPlayerPage />} /> 
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

