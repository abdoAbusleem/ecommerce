
import http from "../../axiosConfig/config";
import ENDPOINTS from '../../endpoints/products'


export function fetchAllPosts(data) {
    return http.post(ENDPOINTS.ALL_PRODUCTS_ENDPOINT, data).then(res => res).catch(e => e)
}
export function fetchProductDetails(id) {
    return http.get(`${ENDPOINTS.PRODUCT_DETAILS_ENDPOINT}/${id}`).then(res => res).catch(e => e)
}