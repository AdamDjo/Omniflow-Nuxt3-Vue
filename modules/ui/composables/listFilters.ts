export default () => {
  const $route: any = useRoute();

  const bodyFilterDefault = ref({
    sort: {},
    current: 1,
    pagesize: 10,
    search: '',
    filter: '',
  });

  const bodyFilter = ref({
    sort: $route.query.sort ? JSON.stringify($route.query.sort) : bodyFilterDefault.value.sort,
    current: $route.query.current || bodyFilterDefault.value.current,
    pagesize: parseInt($route.query.pagesize) || bodyFilterDefault.value.pagesize,
    query: $route.query.search || bodyFilterDefault.value.search,
    filter: $route.query.filter || bodyFilterDefault.value.filter,
  });

  return {
    bodyFilterDefault,
    bodyFilter,
  };
};
