import { ref } from "vue";
import { createStore } from "vuex";
import { getIndexInfo } from "~/api/user";
import { setToken, getExpendAside, setExpendAside } from "~/composables/auth";
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
      adminAsideWidth: "250px",
    };
  },
  mutations: {
    setIndexInfo(state, indexData) {
      //添加index数据
      state.indexData = indexData;
    },
    setClassify(state, indexData) {
      state.classifyKind = [];
      state.classifyData = [];
      indexData.forEach((base) => {
        let kind = base.classifyKind;
        let id = base.id;
        let icon = base.icon;
        state.classifyKind.push({ kind, id, icon });
        if (base.classifyDetails == null) {
          return;
        }
        base.classifyDetails.forEach((classifyDetails) => {
          let kind = classifyDetails.kind;
          let router = classifyDetails.router;
          let name = classifyDetails.name;
          let id = classifyDetails.id;
          state.classifyData.push({ kind, name, router, id });
        });
      });
    },
    setEssayInfo(state, indexData) {
      //单独添加文章数据
      state.essayData = [];
      indexData.forEach((base) => {
        if (base.classifyDetails == null) {
          return;
        }
      });
    },
    //展开|缩起侧边
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
            commit("setIndexInfo", res.dataAboutIndexMenu);
            commit("setClassify", res.dataAboutIndexMenu);
            commit("setEssayInfo", res.dataAboutIndexMenu);
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
