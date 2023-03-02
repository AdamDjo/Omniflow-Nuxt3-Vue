export default () => {
  const useFillColumns = (columns: any, cols: any) => {
    cols.forEach((element: any) => {
      columns.push(element);
    });
  };
  return {
    useFillColumns,
  };
};
