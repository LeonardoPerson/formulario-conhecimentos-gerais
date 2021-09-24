import React, { useState, useEffect } from 'react';
import { useResult } from '../providers/Store';

const Questoes = () => {
  const { questoesConfiguradas, setQuestoesConfiguradas } = useResult();

  //Função que permitirá embaralhar as alternativas das questões
  const shuffleArray = (arr) => {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }


  console.log("Componente de questoes", questoesConfiguradas);


  return (
    <div>
      <div>Questões</div>
      {
        questoesConfiguradas && questoesConfiguradas.map((item, index) => (
          <div key={index}>
            <div>Questão {index + 1} - {item.question}</div>
            <div>{item.answer}</div>
            <div>{shuffleArray(item.total_answers)}</div>
          </div>
        ))
      }
    </div>
  )
}

export default Questoes;