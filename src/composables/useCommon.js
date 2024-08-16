import { reactive, ref } from "vue";
import { setIndexPage, getIndexPage } from "~/composables/auth.js";

export function useCommonInitData(opt = {}) {
  const searchForm = reactive({ ...opt.form });

  const tableData = ref([]);
  const currentPage = ref(1);
  const totalPages = ref(0);
  const loading = ref(false);

  const getOldPage = () => {
    let oldPage = getIndexPage();
    console.log(oldPage);
    currentPage.value = oldPage;
  };
  getOldPage();

  const getData = () => {
    searchForm.page = currentPage.value;
    if (typeof opt.getData === "function") {
      loading.value = true;
      tableData.value = [];
      opt
        .getData(searchForm)
        .then((res) => {
          tableData.value = res.list;
          totalPages.value = res.totalPages;
          if (res.list == null) {
            setIndexPage(1);
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
