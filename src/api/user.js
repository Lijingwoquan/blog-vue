import axios from "~/axios.js";

export function login(username, password) {
    return axios.post("/user/login", {
        username,
        password
    })
}

export function logout(username) {
    return axios.post("/user/logout", {
        username
    })
}


export function updateUserMsg(username, password,rePassword, email) {
    return axios.post("/user/updateUserMsg",{
        username,
        password,
        email,
        rePassword
    })
}

export function getIndexInfo() {
    return axios.get("/base/index")
}


export function getEssayMsg(id) {
    return axios.get("/base/essay", {
        params: {
            id: id
        }
    })
}
