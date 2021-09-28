import React from 'react';
import { Link } from 'react-router-dom';
import { useResult } from '../providers/Store';
import { Redirect } from 'react-router-dom';

const ConfirmaTeste = () => {  
  const { startQuiz, setStartQuiz } = useResult();
 
  const startQuestionario = () => {
    setStartQuiz(true);
  }

  return (
    <div>
      <button onClick={startQuestionario}>Start</button>
      <Link to="/">Cancel</Link>
      {startQuiz && <Redirect to="/questoes" />}
    </div>
  )
}

export default ConfirmaTeste;