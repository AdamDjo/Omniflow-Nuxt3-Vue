<template>
  <div class="errorPage">
    <div class="errorMain">
      <div class="container">
        <h1 v-if="error.statusCode === 404">
          {{ $t('ERROR_404') }}
        </h1>
        <h1 v-else>
          {{ $t('ERROR_OCCURED') }}
        </h1>
        <a-button
          class="btn-add ErrorGoHome"
          type="primary"
          @click="$router.push(localePath('/'))"
        >
          {{ $t('HOME.BACKTOHOME') }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  error: {
    type: [Object, Error],
    required: true,
  },
});
</script>
<style lang="less">
@import 'ant-design-vue/lib/style/default.less';
@import 'ant-design-vue/lib/grid/style/index.less';
</style>
<style lang="scss">
@import '@UI/assets/scss/theme';
@import '@UI/assets/scss/error';
</style>
