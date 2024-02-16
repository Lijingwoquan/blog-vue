import axios from "~/axios.js";
import { toast } from '~/composables/util'

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