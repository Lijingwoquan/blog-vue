import axios from "~/axios.js";
import { toast } from "~/composables/util";
import { getToken } from "~/composables/auth.js";

// 登录
export function login(form) {
  return axios.post("/manager/login", form);
}

// kind
export function updateKind(form) {
  return axios.put("/manager/updateKind", form);
}

// classify
export function updateClassify(form) {
  return axios.put("/manager/updateClassify", form);
}

export function createClassify(form) {
  return axios.post("/manager/addClassify", form);
}

// essay
export function createEssay(form) {
  return axios.post("/manager/addEssay", form);
}

export function updateEssayMsg(form) {
  return axios.put("/manager/updateEssayMsg", form);
}

export function deleteEssay(id) {
  return axios.delete(`/manager/deleteEssay?id=${id}`);
}

export function uploadImg(file) {
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios
      .post("/manager/uploadImg", file, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        toast("上传图片成功", "success");
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
