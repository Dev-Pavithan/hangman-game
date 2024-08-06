import React from 'react';
import './ResultCard.css';

const ResultCard = ({ results, score, resetGame }) => {
  return (
    <div className="result-card">
      <h2>Game Over!</h2>
      <p>Your score: {score}</p>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            Word: {result.word}, Found: {result.found ? 'Yes' : 'No'}, Time Taken: {result.timeTaken}s
          </li>
        ))}
      </ul>
      <button onClick={resetGame}>Restart Game</button>
    </div>
  );
};

export default ResultCard;
