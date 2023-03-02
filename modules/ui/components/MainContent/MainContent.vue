<template>
  <a-layout-content class="main-content">
    <slot />
  </a-layout-content>
</template>
<style lang="scss" scoped>
@import '@UI/assets/scss/variable';

.main-content {
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  margin: auto;
  @media only screen and (max-width: 767px) {
    padding: 15px;
    padding-bottom: 140px;
  }
  @media only screen and (min-width: 768px) {
    padding: 24px;
  }
}
</style>
