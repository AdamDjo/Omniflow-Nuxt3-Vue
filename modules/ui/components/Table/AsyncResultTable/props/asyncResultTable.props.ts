export const asyncResultTableProps = {
  res: {
    type: Array,
    default: () => {
      return;
    },
  },
  cols: {
    type: Array,
    default: () => {
      return;
    },
  },
  filters: {
    type: Object,
    default: () => {
      return;
    },
  },
  editPath: {
    type: String,
    default: () => {
      return;
    },
  },
  editQueryPath: {
    type: Object,
    default: () => {
      return;
    },
  },
  msgNoData: {
    type: String,
    default: () => {
      return;
    },
  },
  customCols: {
    type: Array,
    default: () => {
      return ['icon'];
    },
  },
  customId: {
    type: String,
    default: () => {
      return 'id';
    },
  },
  nbElements: {
    type: Number,
    default: () => {
      return;
    },
  },
  searchPlaceholder: {
    type: String,
    default: () => {
      return;
    },
  },
  hasEditPrem: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
  readOnlyPerm: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
  hasDeletePrem: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
  hasPublish: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
  hasModalfilters: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
  customDeleteMsg: {
    type: String,
    default: () => {
      return useNuxtApp().$i18n.t('SUREDELETE');
    },
  },
  sureUnpublish: {
    type: String,
    default: () => {
      return useNuxtApp().$i18n.t('SUREUNPULISH');
    },
  },
  surePublish: {
    type: String,
    default: () => {
      return useNuxtApp().$i18n.t('SUREPULISH');
    },
  },
  isNotChecked: [String, Boolean],
  isChecked: [String, Boolean],
  keyStatus: {
    type: String,
    default: () => {
      return 'status';
    },
  },
  customEdit: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
  customDelete: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
  hasToggleActions: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
  actionList: {
    type: Array,
    default: () => {
      return [];
    },
  },
  filtersModalData: {
    type: Object,
    default: null,
  },
  isDeleteFromPopover: {
    type: Boolean,
    default: false,
  },
  isConfirmationModalVisible: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
};
