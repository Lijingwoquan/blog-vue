import { createStore } from 'vuex';
import { getIndexInfo } from "~/api/user"
import { setToken } from "~/composables/auth"

const store = createStore({
  state() {
    return {
      //首页数据
      indexData: [],
      //分类种类
      classifyKind: [],
      //分类数据
      classifyData: [],
      //文章数据
      essayData: [],
    }
  },
  mutations: {
    setIndexInfo(state, indexData) {//添加index数据
      state.indexData = indexData
    },
    setClassify(state, indexData) {
      state.classifyKind = []
      state.classifyData = []
      indexData.forEach((base) => {
        let kind = base.classifyKind
        let id = base.id
        let icon = base.icon
        state.classifyKind.push({ kind, id, icon })
        if (base.classifyDetails == null) {
          return
        }
        base.classifyDetails.forEach((classifyDetails) => {
          let kind = classifyDetails.kind
          let router = classifyDetails.router
          let name = classifyDetails.name
          let id = classifyDetails.id
          state.classifyData.push({ kind, name, router, id })
        })
      })
    },
    setEssayInfo(state, indexData) { //单独添加文章数据
      state.essayData = []
      indexData.forEach((base) => {
        if (base.classifyDetails == null) {
          return
        }
        base.classifyDetails.forEach((classifyDetails) => {
          let classifyRoute = classifyDetails.router
          let kind = classifyDetails.name
          classifyDetails.essay.forEach(e => {
            let name = e.name
            let router = classifyRoute + e.router
            let introduction = e.introduction
            let id = e.id
            let createdTime = e.createdTime.split("T").join(" ")
            let page = e.page
            let keywords = e.keywords
            state.essayData.push({ name, router, introduction, kind, id, createdTime, page, keywords })
          })
        })
      })
    }
  },
  actions: {
    getIndexInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getIndexInfo()
          .then(res => {
            commit("setIndexInfo", res.dataAboutIndexMenu)
            commit("setClassify", res.dataAboutIndexMenu)
            commit("setEssayInfo", res.dataAboutIndexMenu)
            resolve(res)
          })
          .catch(err => {
            setToken(null)
            reject(err)
          })
      })
    },
  }
});

export default store
