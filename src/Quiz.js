import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [correctScore, setCorrectScore] = useState(0);
  const [askedCount, setAskedCount] = useState(0);
  const totalQuestion = 10;

  useEffect(() => {
    loadQuestion();
  }, []);

  // load question from API
  const loadQuestion = async () => {
    const APIUrl = 'https://opentdb.com/api.php?amount=1';
    const result = await fetch(APIUrl);
    const data = await result.json();
    const questionData = data.results[0];
    setQuestion(questionData.question);
    setOptions([...questionData.incorrect_answers, questionData.correct_answer]);
    setCorrectAnswer(questionData.correct_answer);
  };

  // handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // check answer and update score
  const checkAnswer = () => {
    if (selectedOption === correctAnswer) {
      setCorrectScore((prevScore) => prevScore + 1);
    }
    setAskedCount((prevCount) => prevCount + 1);
    setSelectedOption(null);
    loadNextQuestion();
  };

  // load next question or show results
  const loadNextQuestion = () => {
    if (askedCount < totalQuestion) {
      loadQuestion();
    } else {
      showResults();
    }
  };

  // show quiz results
  const showResults = () => {
    // Perform any necessary actions with the final score
    console.log('Quiz Completed! Score:', correctScore);
  };

  // restart the quiz
  const restartQuiz = () => {
    setCorrectScore(0);
    setAskedCount(0);
    loadQuestion();
  };

  return (
    <div className="quiz-container">
      {askedCount < totalQuestion ? (
        <div>
          <h2>Question {askedCount + 1}</h2>
          <p className="question">{question}</p>
          <div className="options">
            {options.map((option, index) => (
              <div key={index} className="option">
                <input
                  type="radio"
                  id={option}
                  name="answer"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
          <button className="check-btn" onClick={checkAnswer}>
            Check Answer
          </button>
        </div>
      ) : (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your score is: {correctScore}</p>
          <button className="play-again-btn" onClick={restartQuiz}>
            Start New Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
