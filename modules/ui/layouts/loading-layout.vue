<template>
  <a-layout
    id="components-layout-demo-custom-trigger"
    class="main-wrapper"
  >
    <slot />
  </a-layout>
</template>
<style lang="less">
@import 'ant-design-vue/lib/style/default.less';
@import 'ant-design-vue/lib/grid/style/index.less';
</style>
<style lang="scss" scoped>
.main-wrapper {
  height: 100vh;
}
</style>
