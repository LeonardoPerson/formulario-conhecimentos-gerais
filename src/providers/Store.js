import React, { useState, useContext, useEffect } from 'react';
import { BuscaQuestoes } from '../services/Api';


export const StoreContext = React.createContext({});

export const StoreProvider = (props) => {
  const [questoes, setQuestoes] = useState([]);
  const [questoesConfiguradas, setQuestoesConfiguradas] = useState([]);
  const [buscaQuestoesStorage, setBuscaQuestoesStorage] = useState([]);
  const [quantidade, setQuantidade] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);

   //Buscando as questões -------------------------------------------------------------------------------------
   useEffect(() => {
    if (quantidade) {
      BuscaQuestoes(quantidade, response => {
        console.log("Buscando questões", response)
        setQuestoes(response);
      });
    }
  }, [quantidade]);

  //Embaralhando o array de alternativas ---------------------------------------------------------------------
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

  //Criando um array com as questões incorretas e a correta --------------------------------------------------
  const configuraQuestoes = () => {
    const alteracao = questoes && questoes.map(item =>
      ({ ...item, total_answers: shuffleArray([...item.incorrect_answers, item.correct_answer]) })
    );
    setQuestoesConfiguradas(alteracao);
  }

  //Quanto houver o array de questões, elas serão adaptadas -------------------------------------------------
  useEffect(() => {
    configuraQuestoes();
  }, [questoes]);

  //Função responsável pelo envio do questionário para o localStorage --------------------------------------
  const updateLocalStorage = () => {
    localStorage.setItem("questoesStorage", JSON.stringify(questoesConfiguradas));
  }

  //Assim que tivermos as questões disponíveis, elas serão enviadas para o localStorage -----------------------
  useEffect(() => {
    if (questoesConfiguradas.length > 0) {
      updateLocalStorage()
    }
  }, [questoesConfiguradas])
  

  return (
    <StoreContext.Provider value={{
      questoes, 
      setQuestoes,
      questoesConfiguradas,
      setQuestoesConfiguradas,
      buscaQuestoesStorage,
      setBuscaQuestoesStorage,
      quantidade,
      setQuantidade,
      startQuiz,
      setStartQuiz,
    }}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useResult = () => useContext(StoreContext);

