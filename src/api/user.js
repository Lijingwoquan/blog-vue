import axios from "~/axios.js";

export function login(username, password) {
    return axios.post("/base/login", {
        username,
        password
    })
}

export function logout(username) {
    return axios.post("/base/logout", {
        username
    })
}


export function updateUserMsg() {
    return axios.post("/base/updateUserMsg", {
        username
    })
}

export function getIndexInfo() {
    return axios.get("/base/index")
}


export function getEssayMsg(id) {
     return   axios.get("/base/essay", {
            params: {
                id: id
            }
        })
}
