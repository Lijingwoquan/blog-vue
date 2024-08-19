import { ref } from "vue";
import { createStore } from "vuex";
import { getIndexInfo } from "~/api/user";
import { setToken, getExpendAside, setExpendAside } from "~/composables/auth";
const store = createStore({
  state() {
    return {
      //首页数据
      menu: [],
      classifyList: [],
      kindList: [],
      essayList: [],
      adminAsideWidth: "250px",
    };
  },
  getters: {},
  mutations: {
    setMenu(state, payload) {
      state.menu = payload.menu;
    },
    setKindList(state, payload) {
      state.kindList = payload.kindList;
    },
    setClassifyList(state, payload) {
      state.classifyList = payload.classifyList;
    },
    setEssayList(state, payload) {
      //单独添加文章数据
      state.essayList = payload.essayList;
    },
    handleAdminAsideWidth(state) {
      const ifExpendAside = ref(getExpendAside());
      if (!ifExpendAside.value) {
        state.adminAsideWidth = "250px";
        setExpendAside(1);
      } else {
        state.adminAsideWidth = "60px";
        setExpendAside(0);
      }
    },
    initAsideWidth(state) {
      const ifExpendAside = ref(getExpendAside());
      if (ifExpendAside.value) {
        state.adminAsideWidth = "250px";
      } else {
        state.adminAsideWidth = "60px";
      }
    },
  },
  actions: {
    getIndexInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getIndexInfo()
          .then((res) => {
            let menu = res.menu;
            let essayList = res.essayList;
            let kindList = [];
            let classifyList = [];

            menu.forEach((o) => {
              kindList.push(o.kind);
              o.classifyList.forEach((classify) => {
                classifyList.push(classify);
              });
            });

            commit("setMenu", {
              menu,
            });
            commit("setEssayList", {
              list: essayList,
            });
            commit("setKindList", {
              kindList,
            });
            commit("setClassifyList", {
              classifyList,
            });
            resolve(res);
          })
          .catch((err) => {
            setToken(null);
            reject(err);
          });
      });
    },
  },
});

export default store;
