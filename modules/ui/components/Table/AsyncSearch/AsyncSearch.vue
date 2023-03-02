<template>
  <div class="search-input">
    <a-button
      v-if="hasModalfilters"
      class="filter-button"
      @click="useTriggerModal"
    >
      <img
        src="@UI/assets/img/filter.svg"
        alt=""
        class="filter-icon"
      >
      {{ $t('filter') }}
    </a-button>
    <a-input
      :default-value="tableFilters.search"
      :placeholder="placeholder"
      :value="tableFilters.search"
      @change="useFetchInputValue"
    >
      <template #prefix>
        <search-outlined />
      </template>
    </a-input>
    <slot name="search-right-side" />
  </div>
</template>
<script lang="ts" setup>
const props: any = defineProps({
  placeholder: { type: String, required: true },
  tableFilters: {
    type: Object,
    default: () => {
      return;
    },
  },
  pushQuery: {
    type: Boolean,
    default: () => true,
  },
  hasModalfilters: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
});
const emit: any = defineEmits(['filterData', 'useTriggerModal']);

const $router = useRouter();
const $route = useRoute();

const useFetchInputValue = (e: any) => {
  let o: any = { search: e.target.value, current: 1 };

  if (props.pushQuery) {
    $router.push({ path: $route.fullPath, query: o });
  }

  emit(`filterData`, o);
};

const useTriggerModal = () => {
  emit(`useTriggerModal`);
};
</script>
<style lang="less">
@import 'ant-design-vue/lib/input/style/index.less';
</style>
