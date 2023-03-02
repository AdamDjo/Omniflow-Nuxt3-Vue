<template>
  <div class="font-sf-regular">
    <span class="span-select">{{ $t('PAGER.RANGE') }}:</span>
    <a-select
      id="numberOfLines"
      class="ant-select-listpage"
      :default-value="lines[lines.indexOf(tableFilters.pagesize)]"
      @change="handleChange"
    >
      <template #suffixIcon>
        <caret-down-outlined :style="{ color: '#000' }" />
      </template>
      <a-select-option
        v-for="item in lines"
        :key="item"
      >
        {{ item }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script lang="ts" setup>
const props: any = defineProps({
  lines: {
    type: Array,
    default: () => {
      return [10, 20, 30, 50];
    },
  },
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
});
const emit: any = defineEmits(['filterData']);

const $router = useRouter();
const $route = useRoute();
const handleChange = (value: string) => {
  let o: any = { pagesize: value, current: 1 };
  if (props.pushQuery) {
    $router.push({ path: $route.fullPath, query: o });
  }

  emit(`filterData`, o);
};
</script>
<style lang="less">
@import 'ant-design-vue/lib/select/style/index.less';
</style>
<style lang="scss" scoped>
:deep(.ant-select:not(.ant-select-customize-input)) {
  .ant-select-selector {
    border: none;
  }
}
</style>
