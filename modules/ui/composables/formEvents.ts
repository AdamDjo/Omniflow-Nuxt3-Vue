export default (emit: any) => {
  const events: Array<string> = ['clearValidate', 'updateData', 'textEditorFileUpload'];
  const useClearValidate = (fieldProp: any) => {
    emit('clearValidate', fieldProp);
  };

  const useFormDataChange = (data: any, name: string, index: number) => {
    emit('updateData', data, name, index);
  };

  const useTextEditorFileUpload = (file: any) => {
    emit('textEditorFileUpload', file);
  };

  return {
    events,
    useClearValidate,
    useFormDataChange,
    useTextEditorFileUpload,
  };
};
