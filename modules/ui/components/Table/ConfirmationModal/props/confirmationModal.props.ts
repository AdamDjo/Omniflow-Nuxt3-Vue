export const confirmationModalProps = {
  visible: {
    type: Boolean,
    default: () => false,
  },
  name: {
    type: String,
    default: () => '',
    required: false,
  },
  review: {
    type: String,
    default: () => '',
    required: false,
  },
  description: {
    type: String,
    default: () => '',
    required: false,
  },
  title: {
    type: String,
    default: () => '',
    required: false,
  },
};
