<template>
  <a-modal
    :visible="isVisible"
    :destroy-on-close="true"
    :mask-closable="false"
    :centered="true"
    :closable="false"
    style="width: 450px"
    :cancel-text="$t('CANCEL')"
    wrap-class-name="confirmModal"
    @ok="$emit('onConfirmModal')"
    @cancel="$emit('onCloseModal')"
  >
    <div class="modal-wrapper">
      <img
        src="@UI/assets/img/confirm.svg"
        alt=""
        class="icon"
      >
      <span class="content"> {{ content }} </span>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: '',
  },
});
</script>

<style lang="less">
@import 'ant-design-vue/lib/style/default.less';
@import 'ant-design-vue/lib/style/components.less';
</style>
<style lang="scss">
@import '@UI/assets/scss/form';

.confirmModal {
  .modal-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .content {
      padding-top: 30px;
      font-family: $sfBold;
      font-size: 16px;
      text-align: center;
    }
  }

  .ant-modal-content {
    display: flex;
    height: auto;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 15px;
    border-radius: 12px;

    .ant-modal-body {
      padding: 10px;
    }
  }

  .ant-modal-footer {
    display: flex;
    min-height: 65px;
    justify-content: center;
    border-top: none;
    margin-top: 5px;

    button {
      width: 100px;
      min-height: 45px;
    }
  }
}
</style>
