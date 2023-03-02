export const formBuilderProps = {
  formModel: {
    type: Array,
    required: true,
  },
  langs: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Object,
    default: () => null,
  },
  rules: {
    type: Object,
    default: () => null,
  },
  headers: {
    type: Object,
    required: false,
    default: () => {
      return {};
    },
  },
  textEditorUploadedFileUrl: {
    type: String,
    default: () => {
      return '';
    },
  },
};
