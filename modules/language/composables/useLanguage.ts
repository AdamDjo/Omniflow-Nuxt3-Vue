export const useLanguagesList = () => {
  const store = useLanguageStore();
  const loading: any = ref<boolean>(false);

  const useGetData = async () => {
    loading.value = true;
    store.useLanguageList({
      onError: () => {
        loading.value = false;
      },
      onSuccess: () => {
        loading.value = false;
      },
    });
  };

  const langs = computed(() => {
    return store.languages;
  });

  return { useGetData, langs, loading };
};
