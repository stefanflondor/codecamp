import React, { useState, useEffect, useRef } from 'react';

export default function TwentyFivePlusFiveClock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  // Handle increment/decrement with bounds 1-60
  const changeLength = (type, amount) => {
    if (isRunning) return;
    if (type === 'break') {
      setBreakLength(prev => {
        const next = prev + amount;
        if (next < 1 || next > 60) return prev;
        return next;
      });
    } else {
      setSessionLength(prev => {
        const next = prev + amount;
        if (next < 1 || next > 60) return prev;
        if (!isRunning) setTimeLeft(next * 60);
        return next;
      });
    }
  };

  // Start/Pause toggle
  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
  };

  // Reset everything
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel('Session');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft < 0) {
      // switch
      if (timerLabel === 'Session') {
        setTimerLabel('Break');
        setTimeLeft(breakLength * 60);
        if (audioRef.current) audioRef.current.play();
      } else {
        setTimerLabel('Session');
        setTimeLeft(sessionLength * 60);
        if (audioRef.current) audioRef.current.play();
      }
    }
  }, [timeLeft, timerLabel, breakLength, sessionLength]);

  // Cleanup on unmount
  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div id="clock-container" style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <h2>25 + 5 Clock</h2>
      <div className="length-controls" style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <div id="break-label">Break Length</div>
          <button id="break-decrement" onClick={() => changeLength('break', -1)}>-</button>
          <span id="break-length" style={{ margin: '0 10px' }}>{breakLength}</span>
          <button id="break-increment" onClick={() => changeLength('break', 1)}>+</button>
        </div>
        <div>
          <div id="session-label">Session Length</div>
          <button id="session-decrement" onClick={() => changeLength('session', -1)}>-</button>
          <span id="session-length" style={{ margin: '0 10px' }}>{sessionLength}</span>
          <button id="session-increment" onClick={() => changeLength('session', 1)}>+</button>
        </div>
      </div>
      <div id="timer" style={{ marginTop: '20px' }}>
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left" style={{ fontSize: '2rem' }}>{formatTime(timeLeft)}</div>
      </div>
      <div className="timer-controls" style={{ marginTop: '20px' }}>
        <button id="start_stop" onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
        <button id="reset" onClick={handleReset}>Reset</button>
      </div>
      <audio
        id="beep"
        ref={audioRef}
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        preload="auto"
      />
    </div>
  );
}
