import axios from "~/axios.js";
import { toast } from '~/composables/util'
import { getToken } from "~/composables/auth.js";

// 登录
export function login(form) {
    return axios.post("/manager/login", form)
}

// kind
export function updateKind(kindParams) {
    return axios.put("/manager/updateKind", {
        ...kindParams,
        name: kindParams.kind
    })
}

// classify
export function updateClassify(classifyParams) {
    classifyParams.router = classifyParams.router.split(" ").join("")
    if (classifyParams.router[0] !== "/") {
        classifyParams.router = `/${classifyParams.router}`
    }
    return axios.put("/manager/updateClassify", classifyParams)
}

export function addClassify(classifyParams) {
    classifyParams.router = classifyParams.router.split(" ").join("")
    if (classifyParams.router[0] !== "/") {
        classifyParams.router = `/${classifyParams.router}`
    }
    return axios.post("/manager/addClassify", classifyParams)
}

// essay
export function addEssay(addEssayParms) {
    addEssayParms.router = addEssayParms.router.split(" ").join("")
    if (addEssayParms.router[0] !== "/") {
        addEssayParms.router = `/${addEssayParms.router}`
    }

    return axios.post("/manager/addEssay", {
        ...addEssayParms
    })
}

export function updateEssayMsg(essayObj) {
    return axios.put("/manager/updateEssayMsg", essayObj)
}

export function deleteEssay(id) {
    return axios.delete(`/manager/deleteEssay?id=${id}`)
}

export function uploadImg(file) {
    const token = getToken()
    return new Promise((resolve, reject) => {
        axios.post("/manager/uploadImg", file, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(res => {
                toast("上传图片成功", "success")
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    })
}