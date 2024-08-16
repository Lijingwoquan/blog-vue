import { reactive, ref } from "vue";
import { setIndexPage, getIndexPage } from "~/composables/auth.js";
import { showLoading } from "~/composables/util.js";

export function useCommonInitData(opt = {}) {
  const searchForm = reactive({ ...opt.form });
  console.log(searchForm);
  const tableData = ref([]);
  const currentPage = ref(1);
  const totalPages = ref(0);
  const loading = ref(false);

  const getOldPage = () => {
    let oldPage = getIndexPage();
    if (oldPage) {
      currentPage.value = oldPage;
    }
    currentPage.value = 1;
    setIndexPage(1);
  };
  getOldPage();

  const getData = async () => {
    searchForm.page = currentPage.value;
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
            getOldPage();
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

export function useCommonNav(router, currentPage, getData) {
  const toEssay = (r) => {
    router.push(`essay/${r.kind}${r.router}`);
  };

  const toKind = (r) => {
    console.log(r);
    router.push("classify" + r.kindRoute);
  };

  const changePage = (p) => {
    currentPage.value = p;
    setIndexPage(p);
    getData();
  };

  return {
    toEssay,
    toKind,
    changePage,
  };
}
