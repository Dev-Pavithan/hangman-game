import React from 'react';
import './HangmanDrawing.css';

const HangmanDrawing = ({ wrongGuesses, showHangman }) => {
  return (
    <div className={`hangman-container ${showHangman ? 'swinging' : ''}`}>
      <div className={`hangman ${wrongGuesses >= 1 ? 'show' : ''}`}>
        {/* Rope and Head */}
        {wrongGuesses >= 1 && <div className="hangman-rope"></div>}
        {wrongGuesses >= 1 && <div className="hangman-head"></div>}
        
        {/* Body and Arms */}
        {wrongGuesses >= 2 && (
          <>
            <div className="hangman-body"></div>
            <div className="hangman-arm-left"></div>
            <div className="hangman-arm-right"></div>
          </>
        )}
        
        {/* Legs */}
        {wrongGuesses >= 3 && (
          <>
            <div className="hangman-leg-left"></div>
            <div className="hangman-leg-right"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default HangmanDrawing;
