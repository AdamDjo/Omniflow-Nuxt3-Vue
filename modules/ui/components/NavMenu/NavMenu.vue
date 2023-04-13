<template>
  <a-menu
    class="menu font-sf-regular margin-t-menu"
    theme="light"
    mode="inline"
  >
    <a-menu-item
      v-for="(nav, index) in navTree"
      :key="index"
      class="menu-item"
      :class="{ 'ant-menu-item-selected-custom': useActiveMenu(nav) }"
      @click="
        () => {
        
          if(localePath(nav.path.name)!='logout'){
         
          
          navigateTo(localePath(nav.path));
        }
        else{
       
          navigateTo('/login')
        }
        }
      "
    >
      <img
        v-if="nav.icon"
        class="menu-item-icon anticon"
        alt=""
        :src="
          useActiveMenu(nav) && nav.icon
            ? iconsNav[nav.icon.active] || nav.icon.active
            : iconsNav[nav.icon.default] || nav.icon.default
        "
      >
      <span>{{ $t(nav.name) }}</span>
      <div class="arrow-position">
        <img
          src="@UI/assets/img/arrowRight.svg"
          class="arrow-size"
          alt=""
        >
      </div>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts" setup>
defineProps({
  collapsed: {
    type: Boolean,
  },
  navTree: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
const $route = useRoute();
const locale = useNuxtApp().$i18n.locale.value;
const isocode = $route.params.isocode;
const prefix = '/' + locale + '/' + isocode;
const useActiveMenu = (item: any) => {
  let result;
  if (item.path == '/' && $route.path.replace(/\/$/, '') === prefix) {
    result = true;
  } else if (
    item.path != prefix &&
    $route.path.replace(/\/$/, '').includes(useNuxtApp().$localePath(item.path)) &&
    item.path != '/'
  ) {
    result = true;
  } else if (item.child) {
    result =
      item.child.findIndex((a: any) => {
        let path = useNuxtApp().$localePath(a).replace(/\/$/, '');
        return a != '/' && path && $route.path.replace(/\/$/, '').includes(path);
      }) > -1;
  }
  return result;
};
</script>
<style lang="less">
@import 'ant-design-vue/lib/menu/style/index.less';
</style>
<style lang="scss" scoped>
@import '@UI/assets/scss/variable';

.menu {
  @media only screen and (max-width: 767px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    overflow-y: hidden;
  }
  @media only screen and (min-width: 768px) {
    flex: 1;
    overflow-y: auto;
  }

  border: 0;
  overflow-x: hidden;
}

@media only screen and (max-width: 767px) {
  .menu-item div img {
    display: none;
  }

  .menu-item img {
    width: 20px;
    margin: 0;
  }

  .menu-item > span span {
    margin: 0;
    line-height: 30px;
  }
}
@media only screen and (min-width: 768px) {
  .margin-t-menu {
    margin-top: 40px;
  }
}

:deep(.ant-menu-item) {
  display: flex;
  align-items: center;
  @media only screen and (max-width: 767px) {
    width: 100%;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: stretch;
    justify-content: center;
    font-family: $sfMedium;
    font-size: 10px;

    .ant-menu.ant-menu-inline-collapsed > & {
      padding: 0;
    }

    > .ant-menu-title-content {
      height: 100%;
      flex-direction: column;
      flex-wrap: nowrap;
    }
  }

  > .ant-menu-title-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (min-width: 768px) {
    .ant-menu & {
      height: 52px;
    }

    img {
      .ant-menu-inline-collapsed & {
        margin-left: -12px;
      }
    }
  }
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected-custom {
  @media only screen and (max-width: 767px) {
    background-color: transparent;
  }
  @media only screen and (min-width: 768px) {
    background-color: $bgNavItem;
  }
}

:deep(.ant-menu-item-selected-custom) {
  background: $bgNavItem;
  color: $primaryColor;
}

.arrow-position {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  opacity: 0;
  transition: all 0.3s;
  visibility: hidden;

  .ant-menu-item-selected-custom & {
    opacity: 1;
    visibility: visible;
  }

  .ant-tooltip &,
  .ant-menu-inline-collapsed & {
    display: none;
  }
}

.arrow-size {
  width: 15px;
  min-width: 15px;
}

.ant-menu-item .menu-item-icon {
  width: 26px;
  min-width: 26px;
}
</style>
