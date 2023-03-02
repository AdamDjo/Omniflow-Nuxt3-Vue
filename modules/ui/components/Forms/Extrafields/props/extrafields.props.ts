export const extrafieldsProps = {
  schema: {
    type: Array,
    required: true,
  },
  langs: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => null,
  },
  rules: {
    type: Object,
    default: () => null,
  },
};
