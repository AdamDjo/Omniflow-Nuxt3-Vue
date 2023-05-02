<template>
  <ui-templates-list :back-url="localePath('/')">
    <template #title>
      {{ $t('USERS.TITLE') }}
    </template>
    <template #description>
      {{ $t('USERS.DESCRIPTION') }}
    </template>
    <template #actions>
      <a-button
        class="btn-add"
        type="primary"
        @click="$router.push(localePath('users-add'))"
      >
        {{ $t('USERS.ADDUSERS') }}
      </a-button>
    </template>
    <template #filters>
      <LazyUiTableAsyncFilter
        :table-filters="bodyFilter"
        :default-filter="$t('PRODUCTS.FILTER.ALL')"
        :states="[
          { key: 'new', value: 'PRODUCTS.FILTER.NEWS' },
          { key: 'hightech', value: 'PRODUCTS.FILTER.TECH' },
        ]"
        @filterData="(data) => useFilterData(data)"
      />
    </template>
    <template #pager>
      <lazy-ui-table-async-pagination
        :total="nbElements"
        :table-filters="bodyFilter"
        @filterData="(data) => useFilterData(data)"
      />
    </template>
    <template #table>
      <lazy-ui-table-async-result-table
        :res="users"
        :filters="bodyFilter"
        :nb-elements="nbElements"
        :cols="columns"
        :has-edit-prem="true"
        :has-delete-prem="true"
        edit-path="user-id"
        :loading="loadingUsers"
        :search-placeholder="$t('PRODUCTS.SEARCHPRODUCTS')"
        :msg-no-data="$t('NODATA')"
        @removeItem="useRemoveUsers"
        @filterData="(data) => useFilterData(data)"
      />
    </template>
  </ui-templates-list>
</template>

<script lang="ts" setup>
import cols from '@USERS/assets/data/columns.json';

const store = useUsersStore();
const { useGetData } = useLanguagesList();
const columns = useTranslate(cols);
const { bodyFilter, loadingUsers, useRemoveUsers, useGetUsersList } = useUsers();

onMounted(() => {
  //get data of languages
  useGetData();
  //get data of tanslations
  useGetUsersList();
});

//computed products (props to the table)
const users = computed(() => {
  return store.users;
});
//get nb elments
const nbElements = computed(() => {
  return store.nbElements;
});

const useFilterData = (data: any) => {
  bodyFilter.value = { ...bodyFilter.value, ...data };
  useGetUsersList();
};
</script>
