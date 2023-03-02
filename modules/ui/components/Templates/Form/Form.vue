<template>
  <div class="form-section">
    <UiNavigationBackButton :url="backUrl" />
    <div class="header-form-wrapper">
      <div class="title-postion">
        <h1 class="page-title">
          <slot name="title" />
        </h1>
      </div>
      <div class="btn-wrapper actions-footer">
        <slot name="actions">
          <slot />
        </slot>
      </div>
    </div>
    <slot name="steps" />
    <div class="content">
      <div
        v-if="!hasTabs"
        class="header-wrapper bg-title font-sf-medium"
      >
        <span>
          <h2 class="title">
            <slot name="fieldsetTitle" />
          </h2>
        </span>
      </div>
      <div
        :class="{
          'form-wrapper': !hasTabs,
          'form-wrapper-tabs': hasTabs,
        }"
      >
        <slot name="form" />
      </div>
    </div>
    <a-collapse
      v-if="footerVisible"
      v-model:activeKey="activeKey"
      class="collapse"
    >
      <a-collapse-panel
        :key="!footerCollapsabled ? '1' : '0'"
        :header="footerCollapsableTitle"
        style="border: 0"
      >
        <slot name="footerCollapsable" />
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  backUrl: {
    type: String,
    required: true,
  },
  hasTabs: {
    type: Boolean,
    required: false,
    default: false,
  },
  footerCollapsableTitle: {
    type: String,
    required: false,
    default: '',
  },
  footerCollapsabled: {
    type: Boolean,
    default: false,
  },
  footerVisible: {
    type: Boolean,
    default: false,
  },
});

const activeKey = ref(1);
</script>
<style lang="less">
@import 'ant-design-vue/lib/style/default.less';
@import 'ant-design-vue/lib/style/components.less';
@import 'ant-design-vue/lib/form/style/index.less';
@import 'ant-design-vue/lib/button/style/index.less';
@import 'ant-design-vue/lib/collapse/style/index.less';
</style>
<style lang="scss" scoped>
@import '@UI/assets/scss/form';

:deep(.form-wrapper-tabs) {
  .ant-tabs-tabpane {
    padding: 20px;
  }
}
</style>
