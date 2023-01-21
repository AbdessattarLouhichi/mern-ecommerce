import axios from 'axios'
//axios configuration
export const clientUrl = process.env.REACT_APP_.BASE_URL_CLIENT
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2I4YjAyMjAzOWU2MDU4MGQwYWM3ZmQiLCJ1c2VyRW1haWwiOiJsb3VoaWNoaS5hYmRlc3NhdHRhckB5YWhvby5jb20iLCJpYXQiOjE2NzQyOTMzNDMsImV4cCI6MTY3NDMwMDU0M30.cT7fzcDU93ImnMgdI6jyXsKJBDWlEditXk3wCxEsQEE'
axios.defaults.baseURL = process.env.REACT_APP_.BASE_URL_BACKEND
axios.defaults.headers.common = {
  'Content-type': 'application/json',
  Authorization: `Bearer ${token}`,
}
export default axios
