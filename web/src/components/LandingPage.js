import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // CSS 파일 import

function LandingPage() {
    return (
        <div className="landing-page-container">
            <div>
                <header className="landing-header">
                    <h1 className="header-title">Spotify</h1>
                </header>

                
                    <h1 className="main-title">
                        Listening is<br />everything
                    </h1>
                    <p className="subtitle">
                        Millions of songs and podcasts. No credit card needed.
                    </p>
                    <Link to="/login" className="login-link-button">
                        Log In
                    </Link>
                
            </div>
        </div>
    );
}

export default LandingPage;
