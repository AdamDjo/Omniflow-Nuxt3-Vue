<template>
  <span class="wrapper-switch">
    <a-popconfirm
      :title="status ? confirmTextDeactivateStatus : confirmTextActiveStatus"
      :cancel-text="$t('CANCEL')"
      @confirm="useConfirm"
    >
      <template #icon>
        <img
          src="@UI/assets/img/confirm.svg"
          alt=""
          class="icon"
        >
      </template>
      <a-switch
        class="table-switch"
        size="small"
        :checked="status"
      />
    </a-popconfirm>
  </span>
</template>
<script lang="ts" setup>
import { asyncStatusProps } from './props/asyncStatus.props';
const props: any = defineProps(asyncStatusProps);
const emit: any = defineEmits(['putStatus']);
const confirmTextActiveStatus = computed(() =>
  props.surePublish ? props.surePublish : useNuxtApp().$i18n.t('surePublish')
);
const confirmTextDeactivateStatus = computed(() =>
  props.sureUnpublish ? props.sureUnpublish : useNuxtApp().$i18n.t('sureUnpublish')
);
let record = { ...props.data };
const useConfirm = () => {
  record[props.keyStatus] = props.data[props.keyStatus] == props.isChecked ? props.isNotChecked : props.isChecked;
  emit(`putStatus`, record);
};
</script>

<style lang="scss" scoped>
@import '@UI/assets/scss/variable';

.ant-switch-checked {
  background-color: $greenLight;
}

.table-switch {
  margin: 0 12px 2px;
}

.wrapper-switch::before {
  height: 10px;
  border-left: 1px solid $greyColor;
  content: '';
  opacity: 0.5;
}
</style>
