<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <NuxtLoadingIndicator />
    <UiSideBar
      v-if="showMenu"
      :collapsed="collapsed"
      :nav-tree="navTree"
      @collapse-menu="
        (e) => {
          collapsed = e;
        }
      "
    />
    <a-layout>
      <UiMainContent>
        <slot />
      </UiMainContent>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
defineProps({
  navTree: {
    type: Array,
    default: () => {
      return;
    },
  },
  showMenu: {
    type: Boolean,
    default: () => true,
  },
});

const collapsed = ref(false);
if (!process.server && window.innerWidth < 992 && 767 < window.innerWidth) {
  collapsed.value = true;
}
</script>
<style lang="less">
@import 'ant-design-vue/lib/style/default.less';
@import 'ant-design-vue/lib/grid/style/index.less';
</style>
<style lang="scss">
@import '@UI/assets/scss/theme';
</style>

<style lang="scss" scoped>
:deep() {
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.2s;
  }

  .page-enter,
  .page-leave-to {
    opacity: 0;
  }

  .ant-layout {
    transition: all 0.2s;
  }
}
</style>
