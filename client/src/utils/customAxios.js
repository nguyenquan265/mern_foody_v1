import axios from 'axios'

const url = 'http://localhost:8000/api/v1'

axios.defaults.withCredentials = true

const customAxios = axios.create({
  baseURL: url
})

export default customAxios
