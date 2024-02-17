import { createStore } from 'vuex';
import { getIndexInfo, login, logout, updateUserMsg } from "~/api/user"
import { setToken, removeToken } from "~/composables/auth.js"
const store = createStore({
  state() {
    return {
      //用户信息
      userInfo: {},
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
      indexData.forEach((base) => {
        let kind = base.classifyKind
        let id = base.id
        let icon = base.icon
        state.classifyKind.push({ kind, id, icon })
        base.classifyDetails.forEach((classifyDetails) => {
          let kind = classifyDetails.kind
          let router = classifyDetails.router
          let name = classifyDetails.name
          let id = classifyDetails.id
          state.classifyData.push({ kind, name, router, id })
        })
      })
    },
    setUserInfo(state, userInfo) { //添加用户数据
      state.userInfo = userInfo
    },
    setEssayInfo(state, indexData) { //单独添加文章数据
      indexData.forEach((base) => {
        base.classifyDetails.forEach((classifyDetails) => {
          let classifyRoute = classifyDetails.router
          let kind = classifyDetails.name
          classifyDetails.essay.forEach(e => {
            let name = e.name
            let router = classifyRoute + e.router
            let introduction = e.introduction
            let id = e.id
            let updatedTime = e.updatedTime.split("T").join(" ").split("Z")[0].split(" ")[0]
            let page = e.page
            state.essayData.push({ name, router, introduction, kind, id, updatedTime, page })
          })
        })
      })
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password).then(res => {
          setToken(res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateUserMsg({ commit }, { username, password, rePassword, email }) {
      return new Promise((resolve, reject) => {
        updateUserMsg(username, password, rePassword, email).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout({ commit }, { username }) {
      return new Promise((resolve, reject) => {
        logout(username).then(res => {
          //移除cookie里面的token
          removeToken()
          //清除当前用户状态
          commit("setUserInfo", {})
          commit("indexData", {})
          commit("classifyData", {})
          commit("essayData", {})
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })

    },
    getIndexInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getIndexInfo().then(res => {
          commit("setIndexInfo", res.dataAboutIndexMenu)
          commit("setEssayInfo", res.dataAboutIndexMenu)
          commit("setClassify", res.dataAboutIndexMenu)
          commit("setUserInfo", res.userInfo)
          resolve(res)
        }).catch(err => {
          removeToken()
          reject(err)
        })
      })
    },
  }
});

export default store
