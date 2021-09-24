import React, { useState, useContext, useEffect } from 'react';
import { BuscaQuestoes } from '../services/Api';

export const StoreContext = React.createContext({});

export const StoreProvider = (props) => {
  const [questoes, setQuestoes] = useState([]);
  const [questoesConfiguradas, setQuestoesConfiguradas] = useState([]);
  const [quantidade, setQuantidade] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);

  useEffect(() => {
    if (quantidade) {
      BuscaQuestoes(quantidade, response => {
        setQuestoes(response);
      });
    }
  }, [quantidade]);

  const configuraQuestoes = () => {
    const alteracao = questoes && questoes.map(item => 
      ({...item, total_answers: [...item.incorrect_answers, item.correct_answer]})
    );
    setQuestoesConfiguradas(alteracao);
  }

  useEffect(() => {
    configuraQuestoes()
  }, [questoes]);  

  return (
    <StoreContext.Provider value={{ questoesConfiguradas, quantidade, setQuantidade, pontuacao, setPontuacao }}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useResult = () => useContext(StoreContext);

