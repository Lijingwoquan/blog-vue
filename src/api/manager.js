import axios from "~/axios.js";
import { toast } from '~/composables/util'

// kind
export function updateKind(id, name, icon) {
    console.log(id)
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
export function updateEssay(essay) {
    return new Promise((resolve, reject) => {
        axios.put("/manager/updateEssayMsg", {
            ...essay
        })
            .then(res => {
                toast("修改文章信息成功", "success")
                resolve(res)
            }).catch(err => {
                toast("添加文章信息失败", "error")
                reject(err)
            })
    })
}

export function deleteEssay(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`/manager/deleteEssay?id=${id}`)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    })
}

export function addEssay(addEssayParms) {
    console.log(addEssayParms)
    return new Promise((resolve, reject) => {
        axios.post("/manager/addEssay", {
            ...addEssayParms
        })
            .then(res => {
                toast("添加文章成功", "success")
                resolve(res)
            }).catch(err => {
                toast("添加文章失败", "error")
                reject(err)
            })
    })
}