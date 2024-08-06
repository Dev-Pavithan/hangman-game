import React from 'react';
import './Timer.css';

const Timer = ({ timeLeft }) => {
  return (
    <div className={`timer ${timeLeft > 30 ? 'green' : timeLeft > 10 ? 'yellow' : 'red'}`}>
      <div className="timer-ring">
        <span>{timeLeft}s</span>
      </div>
    </div>
  );
};

export default Timer;
