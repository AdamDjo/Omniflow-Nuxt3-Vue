export const textEditor = {
  readOnly: {
    type: Boolean,
    default: () => false,
  },
  defaultValue: {
    type: String,
    default: () => '',
  },
  className: {
    type: String,
    default: () => '',
  },
  placeholder: {
    type: String,
    default: () => '',
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  externUploadUrl: {
    type: Boolean,
    default: () => true,
  },
  uploadedFile: {
    type: String,
    default: () => '',
  },
};
