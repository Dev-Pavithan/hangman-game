import React, { useState, useEffect } from 'react';
import Word from './Word';
import Keyboard from './Keyboard';
import HangmanDrawing from './HangmanDrawing';
import Timer from './Timer';
import ResultCard from './ResultCard';

const wordsData = [
  { word: "html", clue: "A standard markup language for creating web pages." },
  { word: "css", clue: "A style sheet language used for describing the presentation of a document written in a markup language." },
  { word: "javascript", clue: "A programming language that is one of the core technologies of the World Wide Web." },
  { word: "react", clue: "A JavaScript library for building user interfaces." },
  { word: "node", clue: "A JavaScript runtime built on Chrome's V8 JavaScript engine." },
  { word: "express", clue: "A minimal and flexible Node.js web application framework." },
  { word: "json", clue: "A lightweight data interchange format." },
  { word: "api", clue: "A set of functions and procedures allowing the creation of applications that access the features or data of an operating system, application, or other service." },
  { word: "server", clue: "A computer or computer program which manages access to a centralized resource or service in a network." }
];

const Hangman = () => {
  const [words, setWords] = useState(wordsData);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [results, setResults] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showHangman, setShowHangman] = useState(false);

  const maxWrongGuesses = 3;

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 || wrongGuesses >= maxWrongGuesses) {
      setResults((prev) => [
        ...prev,
        { word: words[currentWordIndex].word, found: isGameWon, timeTaken: 60 - timeLeft }
      ]);
      setShowHangman(true);
    }
  }, [timeLeft, wrongGuesses, gameOver]);

  useEffect(() => {
    if (showHangman) {
      const handleNextWord = () => {
        nextWord();
        setShowHangman(false);
      };

      document.addEventListener('click', handleNextWord);

      return () => document.removeEventListener('click', handleNextWord);
    }
  }, [showHangman]);

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (!words[currentWordIndex].word.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  const isGameWon = words[currentWordIndex]?.word.split('').every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuesses >= maxWrongGuesses;

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    } else {
      setGameOver(true);
    }

    setGuessedLetters([]);
    setWrongGuesses(0);
    setTimeLeft(60);
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setScore(0);
    setTimeLeft(60);
    setResults([]);
    setGameOver(false);
    setShowHangman(false);
  };

  return (
    <div>
      <h1>Hangman Game</h1>
      {gameOver ? (
        <ResultCard results={results} score={score} resetGame={resetGame} />
      ) : (
        <>
          <HangmanDrawing wrongGuesses={wrongGuesses} showHangman={showHangman} />
          <p>Clue: {words[currentWordIndex].clue}</p>
          <Word word={words[currentWordIndex].word} guessedLetters={guessedLetters} />
          <Keyboard guessedLetters={guessedLetters} handleGuess={handleGuess} />
          <Timer timeLeft={timeLeft} />
          <p>Wrong guesses: {wrongGuesses}</p>
          {(isGameWon || isGameLost) && <button onClick={nextWord}>Next Word</button>}
        </>
      )}
    </div>
  );
};

export default Hangman;
