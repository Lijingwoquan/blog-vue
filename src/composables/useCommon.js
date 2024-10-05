import { computed, reactive, ref } from "vue";
import { showLoading, toast } from "~/composables/util.js";
import { router } from "~/router";
import store from "~/store/index.js";

const menu = computed(() => store.state.menu);
const kindList = computed(() => store.state.kindList);
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

  const getOneData = async () => {
    loading.value = true;
    await showLoading(opt.loadingText);
    await opt
      .getOneData(id.value)
      .then((res) => {
        oneData.value = res;
      })
      .catch(() => {
        router.push("/404");
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const getDataList = async () => {
    searchForm.page = currentPage.value;
    if (typeof opt.getDataList === "function") {
      loading.value = true;
      tableData.value = [];
      await showLoading(opt.loadingText);
      await opt
        .getDataList(searchForm)
        .then((res) => {
          tableData.value = res.list;
          totalPages.value = res.totalPages;
        })
        .catch(() => {
          router.push("/404");
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
    if (opt.reload) {
      tableLoading.value = true;
      await store.dispatch("getIndexInfo").then((res) => {
        tableLoading.value = false;
      });

      if (typeof opt.reload === "function") {
        opt.reload();
      }
    }
  };

  const handelCreate = () => {
    btnLoading.value = true;
    disposeRouter();
    const create = () => {
      if (typeof opt.create?.needCustomizeDispose === "function") {
        return opt.create.needCustomizeDispose(form);
      } else if (typeof opt.create === "function") {
        return opt.create(form);
      }
    };
    create()
      .then(() => {
        toast("创建成功");
        reload();
      })
      .finally(() => {
        btnLoading.value = false;
        drawerVisiableRef.value = false;
      });
  };

  const handelUpdate = () => {
    btnLoading.value = true;
    disposeRouter();

    const update = () => {
      if (typeof opt.update?.needCustomizeDispose === "function") {
        return opt.update.needCustomizeDispose(form);
      } else if (typeof opt.update === "function") {
        return opt.update(form);
      }
    };

    update()
      .then(() => {
        toast("更新成功");
        reload();
      })

      .finally(() => {
        btnLoading.value = false;
        drawerVisiableRef.value = false;
      });
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
  };
}

export function useCommonNav(opt = {}) {
  const getEssayHref = (essay) => {
    return `/essay${essay.kindRouter}${essay.router}?id=${essay.id}`;
  };

  const getKindHref = (essay) => {
    return `/classify${essay.kindRouter}`;
  };

  return {
    getEssayHref,
    getKindHref,
  };
}
