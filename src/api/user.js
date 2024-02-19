import axios from "~/axios.js";


export function getIndexInfo() {
    return axios.get("/base/index")
}


export function getEssayMsg(id) {
    return axios.get("/base/essay", {
        params: {
            id: id,
        }
    })
}
