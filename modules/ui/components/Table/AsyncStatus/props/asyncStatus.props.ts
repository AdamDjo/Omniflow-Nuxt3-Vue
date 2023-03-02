export const asyncStatusProps = {
  data: {
    type: Object,
    default: () => {
      return;
    },
  },
  status: {
    type: Boolean,
    default: () => {
      return;
    },
  },
  sureUnpublish: {
    type: String,
    default: () => {
      return null;
    },
  },
  surePublish: {
    type: String,
    default: () => {
      return null;
    },
  },
  isNotChecked: [String, Boolean],
  isChecked: [String, Boolean],
  keyStatus: {
    type: String,
    default: () => {
      return;
    },
  },
};
