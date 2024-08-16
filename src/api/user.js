import axios from "~/axios.js";
import { queryToUrl } from "~/composables/util";

export function getIndexInfo() {
  return axios.get("/base/index");
}

export function getEssayList(form) {
  let q = queryToUrl(form);
  return axios.get(`/base/essay_list${q}`);
}

export function getEssayMsg(id) {
  return axios.get("/base/essay", {
    params: {
      id: id,
    },
  });
}