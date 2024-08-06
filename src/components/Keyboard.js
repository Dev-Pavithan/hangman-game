import React from 'react';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const Keyboard = ({ guessedLetters, handleGuess }) => {
  return (
    <div>
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
