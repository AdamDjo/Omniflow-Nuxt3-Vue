<template>
  <div>
    <LazyUiTableAsyncSearch
      item="name.value"
      :table-filters="filters"
      :placeholder="searchPlaceholder"
      :has-modalfilters="hasModalfilters"
      @filterData="(data) => useFilterTable(data)"
      @useTriggerModal="useOpenFiltersModal"
    >
      <template #search-right-side>
        <slot name="search-right-side" />
      </template>
    </LazyUiTableAsyncSearch>

    <a-config-provider>
      <template v-if="res && res.length == 0 && !loading">
        <a-empty :description="msgNoData" />
      </template>
      <a-table
        v-else
        :pagination="false"
        :columns="columns"
        :data-source="res"
        :row-key="(record: any) => record.id"
        :loading="loading"
        :show-sorter-tooltip="false"
        @change="useHandleTableChange"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-for="col in customCols">
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
          </template>

          <template v-if="column.key === 'action'">
            <slot :name="'actions-left-side' + index" />
            <slot
              v-if="customEdit"
              :name="'custom-edit' + index"
            />
            <template v-else>
              <a
                v-if="hasEditPrem || readOnlyPerm"
                class="btn-edit"
                @click="
                  navigateTo(localePath({ name: editPath, params: { id: record[customId] }, query: editQueryPath }))
                "
              ><img
                 v-if="hasEditPrem"
                 src="@UI/assets/img/iconEdit.svg"
                 class="icon-size btn-edit"
                 :title="$t('edit')"
                 alt=""
               >
                <img
                  v-else
                  src="@UI/assets/img/eyeIcon.svg"
                  class="icon-size btn-eye"
                  alt=""
                >
              </a>
            </template>
            <slot
              v-if="customDelete"
              :name="'custom-delete' + index"
            />
            <template v-else>
              <a
                v-if="hasDeletePrem"
                class="btn-delete"
              ><img
                v-if="hasDeletePrem"
                src="@UI/assets/img/iconDelete.svg"
                class="icon-size"
                :title="$t('delete')"
                alt=""
                @click="useOpenConfirmationModal(record)"
              ></a>
            </template>
            <LazyUiTableAsyncStatus
              v-if="hasPublish"
              :data="record"
              :is-not-checked="isNotChecked"
              :is-checked="isChecked"
              :key-status="keyStatus"
              :sure-publish="surePublish"
              :sure-unpublish="sureUnpublish"
              :status="record[keyStatus] == isChecked"
              @putStatus="usePutStatus"
            />
            <slot :name="'actions-right-side' + index" />
            <slot
              v-if="hasToggleActions"
              :name="'toggle' + index"
            >
              <a-popover
                title="Title"
                trigger="click"
              >
                <template #content>
                  <template
                    v-for="(action, index) in actionList"
                    :key="index"
                  >
                    <div>{{ action }}</div>
                  </template>
                </template>
                <a-button>
                  <img
                    src="@UI/assets/img/iconEdit.svg"
                    class="icon-size btn-edit"
                    :title="$t('edit')"
                    alt=""
                  >
                </a-button>
              </a-popover>
            </slot>
            <slot
              v-else
              :name="'custom-toggle' + index"
            />
          </template>
        </template>
      </a-table>
    </a-config-provider>
    <div class="table-pagination-footer">
      <LazyUiTableAsyncLineNumber
        :total="nbElements"
        :table-filters="filters"
        :lines="[10, 20, 30, 40, 50]"
        @filterData="(data) => useFilterTable(data)"
      />
      <LazyUiTableAsyncPagination
        :total="nbElements"
        :table-filters="filters"
        @filterData="(data) => useFilterTable(data)"
      />
    </div>
    <LazyUiModalFiltersModal
      v-if="hasModalfilters && filtersModalData"
      :is-visible="filtersModalState"
      :data="filtersModalData"
      @useUpdateFilters="(filters: any) => $emit('useUpdateFilters', filters)"
      @useCloseModal="useCloseFiltersModal"
    />
    <LazyUiModalConfirmationModal
      :is-visible="isDeleteFromPopover ? isConfirmationModalVisible : confirmationModalState"
      :content="customDeleteMsg"
      @onCloseModal="useCloseConfirmationModal"
      @onConfirmModal="useOnRemoveItem()"
    />
  </div>
</template>
<script lang="ts" setup>
import { asyncResultTableProps } from './props/asyncResultTable.props';
const props: any = defineProps(asyncResultTableProps);
const emit: any = defineEmits(['useOnCloseConfirmationModal', 'filterData', 'removeItem', 'putStatus']);
const { useRemoveItem, useHandleTableChange, useFilterTable, usePutStatus } = tableEvents(emit);
const filtersModalState = ref(false);
const confirmationModalState = ref(false);
const itemToDelete: any = ref({});
let defaultCOls = [
  {
    title: '',
    key: 'action',
    className: 'action',
  },
];
let colsClone = Object.assign([], props.cols);
const columns = ref([...colsClone, ...defaultCOls]);
const useOpenFiltersModal = () => {
  filtersModalState.value = true;
};
const useCloseFiltersModal = () => {
  filtersModalState.value = false;
};
const useOpenConfirmationModal = (record: any) => {
  confirmationModalState.value = true;
  itemToDelete.value = record;
};

const useCloseConfirmationModal = () => {
  if (props.isDeleteFromPopover) {
    emit('useOnCloseConfirmationModal');
  } else {
    confirmationModalState.value = false;
  }
};

const useOnRemoveItem = () => {
  useRemoveItem(itemToDelete.value);
  confirmationModalState.value = false;
};
</script>
<style lang="less">
@import 'ant-design-vue/lib/table/style/index.less';
@import 'ant-design-vue/lib/popover/style/index.less';
@import 'ant-design-vue/lib/notification/style/index.less';
@import 'ant-design-vue/lib/empty/style/index.less';
</style>

<style lang="scss">
@import '@UI/assets/scss/table';
</style>
