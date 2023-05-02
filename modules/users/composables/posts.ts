export const useUsers = () => {
  const store = useUsersStore();
  const usersPlayload: any = ref({});
  const locale: string = useNuxtApp().$i18n.locale.value;

  const { bodyFilter } = listFilters();
  const usersForm: any = ref(null);
  const rules = reactive({});

  const useFormDataChange = (data: any, name: any) => {
    if (name) {
     usersPlayload.value[name] = data;
    } else {
      usersPlayload.value = { ...usersPlayload.value, ...data };
    }
  };
  const loadingUsers = computed(() => {
    return store.loading;
  });

  const useClearValidate = (fieldProp: any) => {
    usersForm.value.clearValidate(fieldProp);
  };

  /** delete translation item */
  const useRemoveUsers = (record: any) => {
    
    store.useDeleteUsers({
  
      $id: record._id.toString(),
      onError: useOnError,
      onSuccess: () => {
        useOnSuccess(useNuxtApp().$i18n.t('SUCCESS'));
        useGetUsersList();
      },
    });
  };

  const useGetUsersList = () => {
    useGetUsersListItems();
    useGetUsersTotalItems();
  };

  const useGetUsersTotalItems = () => {
    store.useUsersItemsNumber({
      $filters: bodyFilter.value,
      onError: () => {
        /* */
      },
      onSuccess: () => {
        /* */
      },
    });
  };

  const useGetUsersListItems = () => {
    store.useUsersList({
      $filters: bodyFilter.value,
      onError: () => {
        /* */
      },
      onSuccess: () => {
        /* */
      },
    });
  };

  const useGetUsers = (id: any) => {
    usersPlayload.value.id = id;
    store.useUsersList({
      $id: id,
      onError: () => {
        /* */
      },
      onSuccess: () => {
        /** */
      },
    });
  };

  const useAddUsers = () => {
    usersForm.value.validate().then((valid: boolean) => {
      if (valid) {
        store.useAddUsers({
          $data: usersPlayload.value,
          onError: (e: any) => useOnError(e.code == '5003' ? useNuxtApp().$i18n.t('PRODUCTS.EXIST') : ''),
          onSuccess: () => useOnSuccess(useNuxtApp().$i18n.t('SUCCESS'), { path: '/' + locale + '/' + 'users' }),
        });
      } else {
        return false;
      }
    });
  };

  const useUpdateUsers = () => {
    
    usersForm.value.validate().then((valid: boolean) => {
      if (valid) {
        console.log(usersPlayload.value)
        store.useUpdateUsers({
        
          $data: usersPlayload.value,
          onError: (e: any) => useOnError(e.code == '5003' ? useNuxtApp().$i18n.t('PRODUCTS.EXIST') : ''),
          onSuccess: () => useOnSuccess(useNuxtApp().$i18n.t('SUCCESS'), { path: '/' + locale + '/' + 'users' }),
        });
      } else {
        return false;
      }
    });
  };

  const useGetExtraFieldsUsers = () => {
    store.useGetExtraFieldsUsers();
  };

  return {
    usersForm,
    bodyFilter,
    usersPlayload,
    loadingUsers,
    rules,
    useRemoveUsers,
    useGetUsersList,
    useAddUsers,
    useUpdateUsers,
    useGetUsers,
    useFormDataChange,
    useClearValidate,
    useGetUsersListItems,
    useGetUsersTotalItems,
    useGetExtraFieldsUsers,
  };
};
