import React, { useRef, useState } from 'react';
import LogoutButton from './LogoutButton';

function StopWatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const [laps, setLaps] = useState([]);

    function handleStart() {
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTime(prevTime => prevTime + 10);
        }, 10);
    }

    function handlePause() {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    }

    function handleReset() {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    }

    function handleLap() {
        setLaps([...laps, time])
    }

    function formatTime(time) {
        const milliseconds = `0${(time % 1000) / 10 }`.slice(-2);
        const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
        const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
        return `${minutes}:${seconds}.${milliseconds}`;
    }

    return (
    <>
        <h1>ストップウォッチ</h1>
        <p>{formatTime(time)}</p>
        {isRunning ? (
            <div>
                <button onClick={handlePause}>停止</button>
                <button onClick={handleLap}>ラップ</button>
            </div>
        ) : (
            <div>
                <button onClick={handleStart}>開始</button>
                <button onClick={handleReset}>リセット</button>
            </div>
        )}
        <ul>
            {laps.map((lap, index) => (
                <li key={index}>
                    ラップ {index + 1}: {formatTime(lap)}
                </li>
            ))}
        </ul>
        <LogoutButton />
    </>
    );
}

export default StopWatch;