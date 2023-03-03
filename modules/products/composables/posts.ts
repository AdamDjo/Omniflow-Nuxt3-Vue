export const useProducts = () => {
  const store = useProductsStore();
  const productsPlayload: any = ref({});
  const locale: string = useNuxtApp().$i18n.locale.value;

  const { bodyFilter } = listFilters();
  const productsForm: any = ref(null);
  const rules = reactive({});

  const useFormDataChange = (data: any, name: any) => {
    if (name) {
      productsPlayload.value[name] = data;
    } else {
      productsPlayload.value = { ...productsPlayload.value, ...data };
    }
  };
  const loadingProducts = computed(() => {
    return store.loading;
  });

  const useClearValidate = (fieldProp: any) => {
    productsForm.value.clearValidate(fieldProp);
  };

  /** delete translation item */
  const useRemoveProducts = (record: any) => {
    
    store.useDeleteProducts({
  
      $id: record._id.toString(),
      onError: useOnError,
      onSuccess: () => {
        useOnSuccess(useNuxtApp().$i18n.t('SUCCESS'));
        useGetProductsList();
      },
    });
  };

  const useGetProductsList = () => {
    useGetProductsListItems();
    useGetProductsTotalItems();
  };

  const useGetProductsTotalItems = () => {
    store.useProductsItemsNumber({
      $filters: bodyFilter.value,
      onError: () => {
        /* */
      },
      onSuccess: () => {
        /* */
      },
    });
  };

  const useGetProductsListItems = () => {
    store.useProductsList({
      $filters: bodyFilter.value,
      onError: () => {
        /* */
      },
      onSuccess: () => {
        /* */
      },
    });
  };

  const useGetProducts = (id: any) => {
    productsPlayload.value.id = id;
    store.useGetProducts({
      $id: id,
      onError: () => {
        /* */
      },
      onSuccess: () => {
        /** */
      },
    });
  };

  const useAddProducts = () => {
    productsForm.value.validate().then((valid: boolean) => {
      if (valid) {
        store.useAddProducts({
          $data: productsPlayload.value,
          onError: (e: any) => useOnError(e.code == '5003' ? useNuxtApp().$i18n.t('PRODUCTS.EXIST') : ''),
          onSuccess: () => useOnSuccess(useNuxtApp().$i18n.t('SUCCESS'), { path: '/' + locale + '/' + 'products' }),
        });
      } else {
        return false;
      }
    });
  };

  const useUpdateProducts = () => {
    
    productsForm.value.validate().then((valid: boolean) => {
      if (valid) {
        console.log(productsPlayload.value)
        store.useUpdateProducts({
        
          $data: productsPlayload.value,
          onError: (e: any) => useOnError(e.code == '5003' ? useNuxtApp().$i18n.t('PRODUCTS.EXIST') : ''),
          onSuccess: () => useOnSuccess(useNuxtApp().$i18n.t('SUCCESS'), { path: '/' + locale + '/' + 'products' }),
        });
      } else {
        return false;
      }
    });
  };

  const useGetExtraFieldsProducts = () => {
    store.useGetExtraFieldsProducts();
  };

  return {
    productsForm,
    bodyFilter,
    productsPlayload,
    loadingProducts,
    rules,
    useRemoveProducts,
    useGetProductsList,
    useAddProducts,
    useUpdateProducts,
    useGetProducts,
    useFormDataChange,
    useClearValidate,
    useGetProductsListItems,
    useGetProductsTotalItems,
    useGetExtraFieldsProducts,
  };
};
