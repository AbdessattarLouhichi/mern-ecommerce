import axios from 'axios'
//axios configuration
export const clientUrl = process.env.REACT_APP_.BASE_URL_CLIENT
const token = localStorage.getItem('token')
axios.defaults.baseURL = process.env.REACT_APP_.BASE_URL_BACKEND
axios.defaults.headers.common = {
  'Content-type': 'application/json',
  Authorization: `Bearer ${token}`,
}
export default axios
