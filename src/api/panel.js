import axios from "~/axios.js";

export function getIndexPanel() {
  return axios.get("/manager/panel");
}


