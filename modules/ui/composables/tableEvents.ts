export default (emit: any) => {
  const useHandleTableChange = (pagination: any, filters: any, sorter: any) => {
    emit('filterData', { sort: { field: sorter.field, order: sorter.order } });
  };
  /** emit one item data to be Deleted */
  const useRemoveItem = (record: any) => {
    emit('removeItem', record);
  };

  const useFilterTable = (data: any) => {
    emit('filterData', data);
  };

  const usePutStatus = (record: any) => {
    emit('putStatus', record);
  };

  return {
    useRemoveItem,
    useHandleTableChange,
    useFilterTable,
    usePutStatus,
  };
};
