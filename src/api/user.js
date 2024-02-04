import axios from "~/axios.js";

export function login(username,password) {
    return axios.post("/base/login", {
        username,
        password
    })
}

export function getIndexInfo() { 
    return axios.get("/base/index")
}