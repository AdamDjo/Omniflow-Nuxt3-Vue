<template>
  <a-layout-sider
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    collapsed-width="80"
    theme="light"
    class="sidebar"
  >
    <div class="hide">
      <div
        class="align-icon-text"
        :class="collapsed ? 'icon-position-colapse' : 'spacing-left nowrap'"
      >
        <img
          class="trigger"
          :src="collapsed ? icoHamburgerOn : icoHamburger"
          @click="
            () => {
              collapse = !collapsed;
              $emit('collapse-menu', collapse);
            }
          "
        >
        <span
          :class="{ collapsed: collapsed }"
          class="font-sf-regular grey-color close"
        >{{ $t('CLOSE') }}</span>
      </div>
    </div>

    <UiNavMenu
      :collapsed="collapsed"
      :nav-tree="navTree"
    />

    <div
      class="spacing-y hide"
      :class="collapsed ? 'icon-position-colapse' : 'nowrap'"
    >
      <span
        v-if="!collapsed"
        class="font-sf-regular dark-color spacing-ln opacity-50"
      >Nuxt-3 DDD</span>
    </div>
  </a-layout-sider>
</template>
<script lang="ts" setup>
import icoHamburger from '@UI/assets/img/iconMenuClose.svg';
import icoHamburgerOn from '@UI/assets/img/iconMenuOpen.svg';
defineProps({
  collapsed: {
    type: Boolean,
    default: () => false,
  },
  navTree: {
    type: Array,
    default: () => {
      return;
    },
  },
});
</script>
<style lang="less">
@import 'ant-design-vue/lib/layout/style/index.less';
</style>
<style scoped>
.collapsed {
  display: none;
}
</style>
