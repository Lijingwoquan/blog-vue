import axios from "~/axios.js";

export function searchData(form) {
  return axios.post(`/keyword/search`, form);
}

export function getSearchKeyCount() {
  return axios.get("/keyword/search");
}
