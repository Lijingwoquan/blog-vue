import axios from "~/axios.js";


export function addSearchKeyCount(keyword) {
    return axios.post(`/keyword/search`, {
        keyword: keyword
    })
}


export function getSearchKeyCount() {
    return axios.get("/keyword/search")
}