import { reactive, ref } from "vue";
import { setIndexPage, getIndexPage } from "~/composables/auth.js";
import { showLoading } from "~/composables/util.js";

// 获取数据 分页 loading状态
export function useCommonGetData(opt = {}) {
  const searchForm = reactive({ ...opt.form });
  const id = ref(opt.id);
  const tableData = ref([]);
  const OneData = ref({});
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
        OneData.value = res;
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
    OneData,
    currentPage,
    totalPages,
    loading,
    getOneData,
    getDataList,
  };
}

// 增删改 简而言之就是除get以外的请求
export function useCommonForm(opt = {}) {
  let form = opt.form;

  const handleUpdate = () => {
    loading.value = true;
    if (typeof opt.update === "function") {
      opt
        .update(form)
        .then(() => {
          toast("更新成功");
        })
        .finally(() => {
          loading.value = false;
        });
    }
  };

  const handelDelete = () => {
    loading.value = true;
    if (typeof opt.delete === "function")
      opt
        .delete(form)
        .then(() => {
          toast("删除成功");
        })
        .finally(() => {
          loading.value = false;
        });
  };

  return {
    form,
    handleUpdate,
    handelDelete,
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
