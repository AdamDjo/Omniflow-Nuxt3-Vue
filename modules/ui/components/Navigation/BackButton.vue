<template>
  <a
    id="btn-back"
    class="btn-back dark-color font-sf-bold"
    @click="useGoBack"
  >
    <left-outlined />
    <span class="text"> {{ $t('BACK') }} </span>
  </a>
</template>
<script lang="ts" setup>
const props: any = defineProps({
  url: {
    type: String,
    required: true,
  },
});
/** Navigate to a specific route passed by parent */
const useGoBack = () => {
  return navigateTo(props.url);
};
</script>
<style lang="scss" scoped>
.btn-back {
  display: flex;
  width: fit-content;
  align-items: center;
  @media only screen and (max-width: 767px) {
    font-size: 14px;
  }
  @media only screen and (min-width: 768px) {
    font-size: 16px;
  }
}

.arrow-back {
  @media only screen and (max-width: 767px) {
    width: 14px;
  }
  @media only screen and (min-width: 768px) {
    width: 20px;
  }
}

.text {
  margin-left: 8px;
}
</style>
