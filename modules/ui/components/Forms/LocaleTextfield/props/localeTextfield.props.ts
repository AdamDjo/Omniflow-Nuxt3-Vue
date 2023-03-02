export const localeTextfieldProps = {
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
  className: {
    type: String,
    default: () => '',
  },
  placeholder: {
    type: String,
    default: () => '',
  },
  relatedKey: {
    type: String,
    default: () => null,
  },
  type: {
    type: String,
    default: () => '',
  },
};
