import { computed, reactive, ref } from "vue";
import { setIndexPage, getIndexPage } from "~/composables/auth.js";
import { showLoading, toast } from "~/composables/util.js";
import store from "~/store/index.js";

const menu = computed(() => store.state.menu);
const kindList = computed(() => store.state.kindList);
const essayList = computed(() => store.state.essayList);
const classifyList = computed(() => store.state.classifyList);

// 获取数据 分页 loading状态
export function useCommonGetData(opt = {}) {
  const searchForm = reactive({ ...opt.form });
  const id = ref(opt.id);
  const tableData = ref([]);
  const oneData = ref({});
  const currentPage = ref(1);
  const totalPages = ref(0);
  const loading = ref(false);

  if (!opt.loadingText) {
    opt.loadingText = "正在加载";
  }

  const getOldPage = () => {
    if (searchForm.page) {
      let oldPage = getIndexPage();
      if (oldPage) {
        currentPage.value = oldPage;
      } else {
        currentPage.value = 1;
      }
      searchForm.page = currentPage.value;
    }
  };
  getOldPage();

  const getOneData = async () => {
    loading.value = false;
    await showLoading(opt.loadingText);
    await opt
      .getOneData(id.value)
      .then((res) => {
        oneData.value = res;
      })
      .finally(() => {
        loading.value = true;
      });
  };

  const getDataList = async () => {
    if (searchForm.page) {
      searchForm.page = currentPage.value;
    }
    if (typeof opt.getDataList === "function") {
      loading.value = true;
      tableData.value = [];
      await showLoading(opt.loadingText);
      await opt
        .getDataList(searchForm)
        .then((res) => {
          tableData.value = res.list;
          totalPages.value = res.totalPages;
          if (res.list == null) {
            currentPage.value = 1;
            setIndexPage(1);
            getData();
          }
        })
        .finally(() => {
          loading.value = false;
        });
    }
  };

  return {
    searchForm,
    id,
    tableData,
    oneData,
    currentPage,
    totalPages,
    loading,
    getOneData,
    getDataList,
  };
}

// 增删改 简而言之就是除get以外的请求
export function useCommonForm(opt = {}) {
  const btnLoading = ref(false);
  const tableLoading = ref(false);
  const drawerVisiableRef = ref(false);
  const id = ref(0);

  let form = opt.form;

  const disposeRouter = () => {
    if (form.router) {
      form.router = form.router.split(" ").join("");
      if (form.router[0] !== "/") {
        form.router = `/${form.router}`;
      }
    }
  };

  const reload = async () => {
    if (opt.reloadData) {
      tableLoading.value = true;
      await store.dispatch("getIndexInfo").then((res) => {
        tableLoading.value = false;
      });

      if (typeof opt.reloadData === "function") {
        opt.reloadData();
      }
    }
  };

  const handelCreate = () => {
    btnLoading.value = true;
    if (typeof opt.create === "function") {
      disposeRouter();
      opt
        .create(form)
        .then(() => {
          toast("创建成功");
          reload();
        })
        .catch((err) => {
          toast(err, "error");
        })
        .finally(() => {
          btnLoading.value = false;
          drawerVisiableRef.value = false;
        });
    }
  };

  const handelUpdate = () => {
    btnLoading.value = true;
    disposeRouter();
    if (typeof opt.update === "function") {
      opt
        .update(form)
        .then(() => {
          toast("更新成功");
          reload();
        })
        .finally(() => {
          btnLoading.value = false;
          drawerVisiableRef.value = false;
        });
    }
  };

  const handelDelete = () => {
    btnLoading.value = true;
    if (typeof opt.delete === "function")
      opt
        .delete(id.value)
        .then(() => {
          toast("删除成功");
          reload();
        })
        .finally(() => {
          btnLoading.value = false;
        });
  };

  return {
    form,
    btnLoading,
    tableLoading,
    drawerVisiableRef,
    id,
    handelCreate,
    handelUpdate,
    handelDelete,
  };
}

export function useCommonData() {
  return {
    menu,
    kindList,
    classifyList,
    essayList,
  };
}

export function useCommonNav(opt = {}) {
  const toEssay = (r) => {
    opt.router.push(`/essay${r.kindRouter}${r.router}`);
  };

  const toKind = (r) => {
    opt.router.push("classify" + r.kindRouter);
  };

  const changePage = (p) => {
    if (opt.currentPage) {
      opt.currentPage.value = p;
      setIndexPage(p);
      opt.getDataList();
    }
  };

  return {
    toEssay,
    toKind,
    changePage,
  };
}
