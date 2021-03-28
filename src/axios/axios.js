import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  validateStatus: status => status < 500
})

export default axiosInstance
