import axios from "axios";

const httpClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
    }
})

httpClient.interceptors.request.use(function(config){
    const token = localStorage.getItem('token')
    config.headers['Authorization'] = `Bearer ${token}`
    return config
})

export default httpClient