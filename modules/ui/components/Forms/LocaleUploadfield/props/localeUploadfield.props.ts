export const localeUploadfieldProps = {
  languagesData: {
    type: Array,
    default: () => [],
    required: true,
  },
  listOfValues: {
    type: Array,
    default: () => [],
  },
  rule: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: () => '',
    required: true,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  readOnly: {
    type: Boolean,
    default: () => false,
  },
  relatedKey: {
    type: String,
    default: () => null,
  },
  acceptOnly: {
    type: String,
    default: () => '*',
  },
  pathAssetManager: {
    type: String,
    default: () => '',
  },
  hideLangsIcon: {
    type: Boolean,
    default: () => false,
  },
  showLangs: {
    type: Boolean,
    default: () => false,
  },
  errorMessage: {
    type: String,
    default: () => '',
  },
  errorDisabledMsg: {
    type: String,
    default: () => '',
  },
  headers: {
    type: Object,
    required: false,
    default: () => {
      return {};
    },
  },
};
