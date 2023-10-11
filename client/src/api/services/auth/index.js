import http from "../../axiosConfig/config";
import ENDPOINTS from '../../endpoints/auth'


export function register(data) {
    return http.post(ENDPOINTS.REGISTER_ENDPOINT, data).then(res => res).catch(e => e)
}
export function login(data) {
    return http.post(ENDPOINTS.LOGIN_ENDPOINT, data).then(res => res).catch(e => e)
}
export function logOut() {
    return http.post(ENDPOINTS.LOGOUT_ENDPOINT).then(res => res).catch(e => e)
}