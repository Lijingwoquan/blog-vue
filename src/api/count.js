import axios from "~/axios.js";

export function getKeywordsRank() {
  return axios.get("/manager/getKeywordsRank");
}

export function getUserVisitedCount() {
  return axios.get("/manager/getUserVisitedCount");
}
