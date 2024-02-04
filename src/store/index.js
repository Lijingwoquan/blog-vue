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
      userInfo:{},
      //首页数据
      indexData: [],
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
    setIndexInfo(state, indexData) {
      state.indexData = indexData
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
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
          commit("setUserInfo",res.userInfo)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
  }
});

export default store
