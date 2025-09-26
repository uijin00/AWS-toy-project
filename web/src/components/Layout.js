import React from 'react';
import { Outlet } from 'react-router-dom';
import LiquidEther from '../LiquidEther.js';
import './Layout.css';

/**
 * 공통 레이아웃 컴포넌트입니다.
 * LiquidEther 배경을 포함하고, <Outlet />을 통해 각 페이지 콘텐츠를 렌더링합니다.
 */
function Layout() {
  return (
    <div className="layout-container">
      {/* 배경 레이어 */}
      <div className="layout-background">
        <LiquidEther
            colors={['#5227ff', '#9ef9ff', '#8be684']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
        />
      </div>
      
      {/* 콘텐츠 레이어 */}
      <main className="layout-content">
        {/* 자식 라우트의 컴포넌트가 이 자리에 렌더링됩니다. */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

