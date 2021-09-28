import axios from 'axios';

const baseUrl = "https://opentdb.com/api.php?amount="

export const BuscaQuestoes = (quantidade, retorno) => {
  axios.get(baseUrl + quantidade).then(response => {
    
    retorno(response.data.results);
  }).catch(error => {
    console.log(error)
    retorno(error);
  })
}