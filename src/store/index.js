import { createStore } from 'vuex';
import { getIndexInfo, login } from "~/api/user"
import { setToken, removeToken, getToken } from "~/composables/auth.js"
const store = createStore({
  state() {
    return {
      //阅读模式
      mod: 'day',
      //背景颜色
      bgColor: '',
      //文本颜色
      textColor: '',
      //用户信息
      userInfo: {},
      //首页数据
      indexData: [],
      //分类数据
      classifyData: [],
      //文章数据
      essayData: [],
    }
  },
  mutations: {
    changeReadindMod(state) {
      state.mod = state.mod === 'day' ? 'night' : 'day';
      state.bgColor = state.mod === 'day' ? '' : 'black';
      state.textColor = state.mod === 'day' ? '' : 'white';
      document.body.style.backgroundColor = state.mod === 'day' ? 'white' : 'black';
      document.body.style.color = state.mod === 'day' ? 'black' : 'white';
    },
    setIndexInfo(state, indexData) {//添加index数据
      state.indexData = indexData
    },
    setClassify(state, indexData) {
      indexData.forEach((base) => {
        base.classifyDetails.forEach((classifyDetails) => {
          let router = classifyDetails.router
          let name = classifyDetails.name
          let id = classifyDetails.id
          state.classifyData.push({ name, router, id })
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
            state.essayData.push({ name, router, introduction, kind, id })
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
    logout({ commit }) {
      //移除cookie里面的token
      removeToken()
      //清除当前用户状态
      commit("setUserInfo", {})
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
          reject(err)
        })
      })
    },
  }
});

export default store
