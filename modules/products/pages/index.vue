<template>
  <ui-templates-list :back-url="localePath('/')">
    <template #title>
      {{ $t('PRODUCTS.TITLE') }}
    </template>
    <template #description>
      {{ $t('PRODUCTS.DESCRIPTION') }}
    </template>
    <template #actions>
      <a-button
        class="btn-add"
        type="primary"
        @click="$router.push(localePath('products-add'))"
      >
        {{ $t('PRODUCTS.ADDPRODUCTS') }}
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
        :res="products"
        :filters="bodyFilter"
        :nb-elements="nbElements"
        :cols="columns"
        :has-edit-prem="true"
        :has-delete-prem="true"
        edit-path="products-id"
        :loading="loadingProducts"
        :search-placeholder="$t('PRODUCTS.SEARCHPRODUCTS')"
        :msg-no-data="$t('NODATA')"
        @removeItem="useRemoveProducts"
        @filterData="(data) => useFilterData(data)"
      />
    </template>
  </ui-templates-list>
</template>

<script lang="ts" setup>
import cols from '@PRODUCTS/assets/data/columns.json';

const store = useProductsStore();
const { useGetData } = useLanguagesList();
const columns = useTranslate(cols);
const { bodyFilter, loadingProducts, useRemoveProducts, useGetProductsList } = useProducts();

onMounted(() => {
  //get data of languages
  useGetData();
  //get data of tanslations
  useGetProductsList();
});

//computed products (props to the table)
const products = computed(() => {
  return store.products;
});
//get nb elments
const nbElements = computed(() => {
  return store.nbElements;
});

const useFilterData = (data: any) => {
  bodyFilter.value = { ...bodyFilter.value, ...data };
  useGetProductsList();
};
</script>
