
import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  return axios.get(`${baseUrl}/all`).then(responese => responese.data)
}

const getByName = (name) => {
    return axios.get(`${baseUrl}/name/${name}`).then(responese => responese.data)
}

export default { getAll, getByName }