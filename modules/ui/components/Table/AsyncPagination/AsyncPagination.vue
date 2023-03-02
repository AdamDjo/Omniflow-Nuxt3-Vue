<template>
  <div class="table-pager">
    <span class="sm-hide">
      {{ $t('PAGER.PAGE') }}
    </span>
    <a-pagination
      simple
      :default-current="parseInt(tableFilters.current)"
      :current="parseInt(tableFilters.current)"
      :page-size="parseInt(tableFilters.pagesize)"
      :total="parseInt(total)"
      @change="useFetchPageValue"
    />
  </div>
</template>
<script lang="ts" setup>
const props: any = defineProps({
  total: {
    type: Number,
    default: () => {
      return 1;
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

const $route = useRoute();
const useFetchPageValue = (page: any) => {
  let o: any = { current: page };
  if (props.pushQuery) {
    navigateTo({ path: $route.fullPath, query: o });
  }

  emit(`filterData`, o);
};
</script>
<style lang="less">
@import 'ant-design-vue/lib/pagination/style/index.less';
</style>
<style lang="scss">
.table-pagination-footer {
  .ant-select-selection {
    border: none;
  }
}
</style>
