import { reactive, ref } from "vue";
import { setIndexPage, getIndexPage } from "~/composables/auth.js";
import { showLoading } from "~/composables/util.js";

export function useCommonInitData(opt = {}) {
  const searchForm = reactive({ ...opt.form });
  const tableData = ref([]);
  const currentPage = ref(1);
  const totalPages = ref(0);
  const loading = ref(false);

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

  const getData = async () => {
    if (searchForm.page) {
      searchForm.page = currentPage.value;
    }
    if (typeof opt.getData === "function") {
      loading.value = true;
      tableData.value = [];
      await showLoading("文章列表渲染中");
      opt
        .getData(searchForm)
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
  getData();

  return {
    searchForm,
    tableData,
    currentPage,
    totalPages,
    loading,
    getData,
  };
}

export function useCommonInitForm(opt = {}) {
  let form = opt.form;
  return {
    form,
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
      opt.getData();
    }
  };

  return {
    toEssay,
    toKind,
    changePage,
  };
}
