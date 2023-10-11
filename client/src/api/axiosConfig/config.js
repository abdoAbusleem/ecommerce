import axios from "axios";
import { auth } from "@/plugins/store/modules/auth";
let http = axios.create({
    baseURL: 'http://localhost:9200/api',
    withCredentials: true
})

// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // let token = localStorage.getItem('AUTH_TOKEN')
    // if (token) {
    //     config.headers['access-token'] = `${token}`;
    // }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

http.interceptors.response.use(response => {
    return response;
}, error => {
    const authModule = auth()
    if (error.response.status === 401) {
        //place your reentry code
        authModule.clearLoggedIn()
    }
    return error;
});

export default http