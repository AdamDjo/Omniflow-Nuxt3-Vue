export const SubTableProps = {
  data: {
    type: Array,
    required: true,
  },
  lineNumber: {
    type: Object,
  },
  descriptionEmpty: {
    type: String,
    default: () => {
      return '';
    },
  },
  toggleStatus: {
    type: String,
    default: () => {
      return '';
    },
  },
  columns: {
    type: Array,
    default: () => {
      return [];
    },
  },
  customCols: {
    type: Array,
    default: () => {
      return ['icon'];
    },
  },
  hasDraggable: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};
