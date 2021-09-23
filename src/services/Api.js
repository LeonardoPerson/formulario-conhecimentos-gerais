import axios from 'axios';

const baseUrl = "https://opentdb.com/api.php?amount="

export const BuscaQuestoes = (quantidade) => {
  axios.get(baseUrl + quantidade).then(response => {
    return response
  }).catch(error => {
    return error
  })
}