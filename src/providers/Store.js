import React, { useState, useContext, useEffect } from 'react';
import { BuscaQuestoes } from '../services/Api';

export const StoreContext = React.createContext({});

export const StoreProvider = (props) => {
  const [questoes, setQuestoes] = useState({});
  const [quantidade, setQuantidade] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);

  useEffect(() => {
    if(quantidade){
      const resultado = BuscaQuestoes(quantidade)
      setQuestoes(resultado);
    }    
  }, [quantidade])

  return (
    <StoreContext.Provider value={{ questoes, setQuestoes, quantidade, setQuantidade, pontuacao, setPontuacao }}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useResult = () => useContext(StoreContext);

