<template>
  <a-modal
    :visible="visible"
    :title="title"
    :ok-button-props="{ props: { disabled: input == '' ? true : false } }"
    @ok="useSubmitApproval"
    @cancel="useHandleCancel"
  >
    <div>
      {{ description }}
    </div>
    <a-form-item :label="review">
      <a-input
        v-model="input"
        type="textarea"
      />
    </a-form-item>
  </a-modal>
</template>

<script lang="ts" setup>
import { confirmationModalProps } from './props/confirmationModal.props';
defineProps(confirmationModalProps);
const emit: any = defineEmits(['useSubmitApproval', 'useCloseModal']);
const input = ref('');
const useSubmitApproval = () => {
  emit('useSubmitApproval', input.value);
};
const useHandleCancel = () => {
  emit('useCloseModal');
};
</script>
