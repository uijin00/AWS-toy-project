import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayerPage.css'; // CSS 파일 import

function MusicPlayerPage() {
    const [playlistData, setPlaylistData] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const audioPlayerRef = useRef(null);

    const API_Base_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await fetch(`${API_Base_URL}/music/playlist`);
                if (response.ok) {
                    const data = await response.json();
                    setPlaylistData(data);
                    if (data.length > 0) {
                        setCurrentSongIndex(0); // 첫 번째 곡으로 설정
                    }
                } else {
                    alert('플레이리스트를 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                alert('네트워크 오류로 플레이리스트를 불러올 수 없습니다.');
            }
        };
        fetchPlaylist();
    }, [API_Base_URL]);

    useEffect(() => {
        if (currentSongIndex !== null && audioPlayerRef.current) {
            audioPlayerRef.current.src = playlistData[currentSongIndex].src;
            audioPlayerRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
    }, [currentSongIndex, playlistData]);

    const playSong = (index) => {
        setCurrentSongIndex(index);
    };

    const handleSongEnd = () => {
        // 마지막 곡이면 0번으로, 아니면 다음 곡으로
        const nextIndex = (currentSongIndex + 1) % playlistData.length;
        setCurrentSongIndex(nextIndex);
    };

    const currentSong = currentSongIndex !== null ? playlistData[currentSongIndex] : null;

    return (
        <div className="music-page-container">
            <header className="player-header">
                <h1 className="player-header-title">Spotify Player</h1>
            </header>

            <main className="main-content">
                <section className="player-section">
                    <div className="album-art">
                        <span>🎵</span>
                    </div>
                    <div className="song-details">
                        <h2 id="current-song-title">
                            {currentSong ? currentSong.title.replace(".mp3", "") : 'Select a song'}
                        </h2>
                    </div>
                    <audio
                        ref={audioPlayerRef}
                        controls
                        className="audio-player"
                        onEnded={handleSongEnd}
                    >
                        Your browser does not support the audio element.
                    </audio>
                </section>

                <section className="playlist-section">
                    <h3 className="playlist-title">Playlist</h3>
                    <ul id="playlist">
                        {playlistData.length > 0 ? (
                            playlistData.map((song, index) => (
                                <li
                                    key={index}
                                    className={`music-item ${index === currentSongIndex ? 'active' : ''}`}
                                    onClick={() => playSong(index)}
                                >
                                    <span>{song.title.replace('.mp3', '')}</span>
                                </li>
                            ))
                        ) : (
                            <li className="loading-message">
                                Loading playlist...
                            </li>
                        )}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default MusicPlayerPage;
