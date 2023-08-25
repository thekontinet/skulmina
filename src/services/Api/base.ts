import axios from 'axios'

const request = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})


request.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token')
    if(token) config.headers['Authorization'] = `Bearer ${token}`
    return config
})

export default request