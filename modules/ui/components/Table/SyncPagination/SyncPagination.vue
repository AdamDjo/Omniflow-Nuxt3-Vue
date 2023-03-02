<template>
  <div class="table-pager">
    <span class="sm-hide">
      {{ $t('PAGER.PAGE') }}
    </span>
    <a-pagination
      simple
      :current="pagesize.current"
      :page-size="pagesize.pageSize"
      :total="data.length"
      :show-size-changer="false"
      @change="useSendChange"
    />
  </div>
</template>
<script lang="ts" setup>
defineProps({
  data: {
    type: Array,
    default: () => {
      return;
    },
  },
  pagesize: {
    type: Object,
    default: () => {
      return;
    },
  },
});
const emit: any = defineEmits(['dataChanged']);
const current = ref(1);
const useSendChange = (value) => {
  current.value = value;
  emit('dataChanged', value);
};
</script>
<style lang="scss">
.table-pagination-footer {
  .ant-select-selection {
    width: auto;
    border: none;
    background-color: transparent;
  }
}
</style>
