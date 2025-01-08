import axios from 'axios'

const api = axios.create({
    // baseURL : "http://localhost:3000"
    baseURL : "https://backpatrimonio-rxlf.onrender.com"
})

export default api