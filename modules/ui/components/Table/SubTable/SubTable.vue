<template>
  <div class="table-wrapper secondery-table-style">
    <a-config-provider>
      <template v-if="data && data.length == 0">
        <a-empty :description="descriptionEmpty" />
      </template>
      <a-table
        v-else
        :columns="cols"
        :data-source="data"
        :components="hasDraggable ? components : {}"
        :row-key="(record) => record.id"
        :pagination="lineNumber ? lineNumber : null"
        class="language-table"
      >
        <template #bodyCell="{ column, record, index }">
          <template
            v-for="(col, idx) in customCols"
            :key="'col' + idx"
          >
            <template v-if="column.key === col">
              <slot
                :name="col"
                :value="record[col]"
                :record="record"
                :index="index"
              >
                {{ record[col] }}
              </slot>
            </template>
            <span v-if="column.isSwitch">
              <a-switch
                size="small"
                :checked="record[column.key]"
                :disabled="disabled"
                @change="useChangeToggle(data, record)"
              />
            </span>
          </template>
          <template v-if="column.key === 'action' && !disabled">
            <span class="wrapper">
              <a @click="useEditItem(record)"><img
                src="@UI/assets/img/iconEdit.svg"
                class="icon-size"
                alt=""
              ></a>
              <a-popconfirm
                v-if="data.length"
                :title="$t('SUREDELETE')"
                :cancel-text="$t('CANCEL')"
                @confirm="useRemoveItem(data, record.id)"
              >
                <template #icon>
                  <img
                    src="@UI/assets/img/confirm.svg"
                    alt=""
                    class="icon"
                  >
                </template>

                <template #title>
                  <slot name="title" />
                </template>
                <a><img
                  src="@UI/assets/img/iconDelete.svg"
                  class="icon-size"
                  alt=""
                ></a>
              </a-popconfirm>
              <img
                src="@UI/assets/img/move.svg"
                class="icon-size my-handle"
                alt=""
              >
            </span>
          </template>
        </template>
      </a-table>
    </a-config-provider>
  </div>
</template>
<script lang="ts" setup>
import { SubTableProps } from './props/subTable.props';
import wrapper from '@UI/components/Table/DraggableRows/DraggableRows.vue';
const props: any = defineProps(SubTableProps);
const emit: any = defineEmits(['removeItem', 'editItem', 'useChangeToggle']);
let defaultCOls = [
  {
    title: '',
    key: 'action',
    className: 'action',
  },
];
let colsClone = Object.assign([], props.columns);
const cols = ref([...colsClone, ...defaultCOls]);
provide(
  'listSwap',
  computed(() => props.data)
);
const components = {
  body: {
    wrapper: wrapper,
  },
};
/** emit one item data to be Deleted */
const useRemoveItem = (data: any, id: string) => {
  emit('removeItem', data, id);
};
/** emit one item data to be Edit */
const useEditItem = (record: any) => {
  emit('editItem', record, true);
};
const useChangeToggle = (data: any, record: any) => {
  emit('useChangeToggle', data, record);
};
</script>
<style lang="scss" scoped>
@import '@UI/assets/scss/form';
@import '@UI/assets/scss/table';

.wrapper {
  display: flex;
  justify-content: flex-end;
}

.ellipsis {
  display: block;
  overflow: hidden;
  max-width: 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.ant-table-content) {
  background-color: $bgBodyColor;
}
</style>
