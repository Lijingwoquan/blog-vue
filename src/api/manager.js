import axios from "~/axios.js";
import { toast } from '~/composables/util'
import { getToken } from "~/composables/auth.js";

// 登录
export function login(form) {
    return axios.post("/manager/login", form)
}

// kind
export function updateKind(id, name, icon) {
    return new Promise((resolve, reject) => {
        axios.put("/manager/updateKind", {
            id,
            name,
            icon
        })
            .then(res => {
                toast("修改分类种类成功", "success")
                resolve(res)
            }).catch(err => {
                toast("修改分类种类失败", "error")
                reject(err)
            })
    })
}

// classify
export function updateClassify(id, name, router) {
    return new Promise((resolve, reject) => {
        axios.put("/manager/updateClassify", {
            id,
            name,
            router
        }).then(res => {
            toast("修改分类成功", "success")
            resolve(res)
        }).catch(err => {
            toast("修改分类失败", "error")
            reject(err)
        })
    })
}

export function addClassify(classifyParms) {
    return new Promise((resolve, reject) => {
        axios.post("/manager/addClassify", {
            ...classifyParms
        })
            .then(res => {
                toast("添加分类种类成功", "success")
                resolve(res)
            }).catch(err => {
                toast("添加分类种类失败", "error")
                reject(err)
            })
    })
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

// export function updateEssayContent(id, content) {
//     return new Promise((resolve, reject) => {
//         axios.put("/manager/updateEssayContent", {
//             id,
//             content
//         })
//             .then(res => {
//                 toast("修改文章内容成功", "success")
//                 resolve(res)
//             }).catch(err => {
//                 toast("修改文章内容失败", "error")
//                 reject(err)
//             })
//     })
// }