import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayerPage.css'; // CSS 파일 import

function MusicPlayerPage() {
    const [playlistData, setPlaylistData] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false); // 1. 재생 상태를 추적하는 state 추가
    const audioPlayerRef = useRef(null);

    const API_Base_URL = process.env.REACT_APP_API_BASE_URL;

    // 플레이리스트를 불러오는 useEffect
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await fetch(`${API_Base_URL}/music/playlist`);
                if (response.ok) {
                    const data = await response.json();
                    setPlaylistData(data);
                    // 2. 페이지 로드 시 자동 재생을 막기 위해 첫 곡 설정 로직 제거
                    // if (data.length > 0) {
                    //     setCurrentSongIndex(0); 
                    // }
                } else {
                    alert('플레이리스트를 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                alert('네트워크 오류로 플레이리스트를 불러올 수 없습니다.');
            }
        };
        fetchPlaylist();
    }, [API_Base_URL]);

    // 노래가 변경될 때 오디오 소스를 업데이트하고 재생하는 useEffect
    useEffect(() => {
        if (currentSongIndex !== null && audioPlayerRef.current) {
            const currentSong = playlistData[currentSongIndex];
            if (audioPlayerRef.current.src !== currentSong.src) {
                audioPlayerRef.current.src = currentSong.src;
                audioPlayerRef.current.load(); // 새 소스를 명시적으로 로드
            }

            // 3. isPlaying 상태가 true일 때만 재생 시도
            if (isPlaying) {
                // play()는 Promise를 반환하므로 catch로 오류 처리
                audioPlayerRef.current.play().catch(e => {
                    console.error("오디오 재생에 실패했습니다:", e);
                    setIsPlaying(false); // 재생 실패 시 상태를 false로 변경
                });
            } else {
                audioPlayerRef.current.pause();
            }
        }
    }, [currentSongIndex, isPlaying, playlistData]); // isPlaying을 의존성 배열에 추가

    // 사용자가 재생목록에서 노래를 클릭했을 때
    const playSong = (index) => {
        setCurrentSongIndex(index);
        setIsPlaying(true); // 4. 사용자가 재생을 시작했음을 명시
    };

    // 노래 재생이 끝나면 다음 곡을 자동으로 재생
    const handleSongEnd = () => {
        const nextIndex = (currentSongIndex + 1) % playlistData.length;
        setCurrentSongIndex(nextIndex);
        // isPlaying이 true인 상태를 유지하여 다음 곡이 바로 재생되도록 함
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
                            {currentSong ? currentSong.title.replace(".mp3", "") : '노래를 선택해주세요'}
                        </h2>
                    </div>
                    <audio
                        ref={audioPlayerRef}
                        controls
                        className="audio-player"
                        onEnded={handleSongEnd}
                        // 5. 브라우저의 기본 컨트롤러와 재생 상태를 동기화
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
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
