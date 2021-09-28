import React, { useState, useEffect } from 'react';
import { useResult } from '../providers/Store';
import { Redirect } from 'react-router-dom';

const Questionario = () => {
  const {
    buscaQuestoesStorage,
    setBuscaQuestoesStorage,
    setStartQuiz
  } = useResult();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [backHome, setBackHome] = useState(false);

  //Função responsável pela busca das questões no localStorage --------------------------------------------
  const questoesStorage = () => {
    const questoesLocalStorage = localStorage.getItem("questoesStorage");
    if (questoesLocalStorage) {
      setBuscaQuestoesStorage(JSON.parse(questoesLocalStorage));
    }
  }

  useEffect(() => {
    questoesStorage();
  }, []);

  const handleAnswerButtonClick = (correctAnswer, answerOption) => {
    if (answerOption === correctAnswer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < buscaQuestoesStorage.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      setStartQuiz(false);
    }
  };

  const handleBackHome = () => {
    setBackHome(true);
  }

  return (
    <div className='app'>
      {
        showScore ?
          (
            <div>
              <div className='score-section'>You scored {score} out of {buscaQuestoesStorage.length}</div>
              <button onClick={handleBackHome}>Back to home</button>
            </div>
          )
          :
          (
            <div>
              <div className='question-count'>
                <span>Question {currentQuestion + 1}</span>/{buscaQuestoesStorage.length}
              </div>
              <div className='question-text'>
                {
                  buscaQuestoesStorage[currentQuestion] &&
                  buscaQuestoesStorage[currentQuestion].question
                }
              </div>

              <div className='answer-section'>
                {
                  buscaQuestoesStorage[currentQuestion] &&
                  buscaQuestoesStorage[currentQuestion].total_answers.map((alternativa, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerButtonClick(buscaQuestoesStorage[currentQuestion].correct_answer, alternativa)}>
                      {alternativa}
                    </button>
                  ))
                }
              </div>
            </div>
          )}
      {backHome && <Redirect to="/" />}
    </div>
  );
}

export default Questionario;