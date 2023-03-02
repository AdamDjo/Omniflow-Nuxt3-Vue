<template>
  <div>
    <UiNavigationBackButton
      v-if="showBackBtn"
      :url="backUrl"
    />
    <div
      v-if="multiBtn"
      class="form-section"
    >
      <div class="header-form-wrapper">
        <div class="title-postion">
          <div>
            <h1 class="page-title">
              <slot name="title" />
            </h1>
            <div class="font-sf-medium">
              <slot name="description" />
            </div>
          </div>
        </div>
        <div class="btn-wrapper actions-footer">
          <slot name="actions" />
        </div>
      </div>
    </div>
    <div
      v-else
      class="title-btn-position"
    >
      <div>
        <h1 class="page-title">
          <slot name="title" />
        </h1>
        <div class="font-sf-medium">
          <slot name="description" />
        </div>
      </div>
      <slot name="actions" />
    </div>

    <div class="content">
      <div class="header-wrapper">
        <div class="bg-title font-sf-medium">
          <div class="filter-pagination">
            <slot name="filters" />
            <slot name="pager" />
          </div>
        </div>
      </div>
      <slot name="table" />
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  backUrl: {
    type: String,
    required: true,
  },
  multiBtn: {
    type: Boolean,
    default: false,
  },
  showBackBtn: {
    type: Boolean,
    default: true,
  },
});
</script>
<style lang="less">
@import 'ant-design-vue/lib/button/style/index.less';
</style>

<style lang="scss" scoped>
@import '@UI/assets/scss/form';
</style>
