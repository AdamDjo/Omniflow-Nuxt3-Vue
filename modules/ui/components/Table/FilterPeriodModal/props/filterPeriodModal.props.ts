export const filterPeriodModal = {
  showModal: {
    type: Boolean,
    default: false,
    required: true,
  },
  filters: {
    type: Object,
    default: () => {
      return {};
    },
    required: true,
  },
};
