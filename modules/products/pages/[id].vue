<template>
  <a-form
    ref="productsForm"
    :model="productsPlayload"
    :rules="rules"
    layout="vertical"
    @finish="useUpdateProducts()"
  >
    <ui-templates-form
      :back-url="localePath('products')"
      :footer-collapsable-title="$t('EXTRAFIELDS')"
      :footer-collapsabled="false"
      :footer-visible="Boolean(extraFields.length)"
    >
      <template #title>
        {{ $t('PRODUCTS.TITLE') }}
      </template>
      <template #actions>
        <div class="btn-content">
          <a-button
            class="cancel-btn ant-btn"
            @click="$router.push(localePath('products'))"
          >
            {{ $t('CANCEL') }}
          </a-button>
        </div>
        <div class="btn-content">
          <a-button
            class="save-btn"
            type="primary"
            html-type="submit"
          >
            {{ $t('EDIT') }}
          </a-button>
        </div>
      </template>
      <template #fieldsetTitle>
        {{ $t('PRODUCTS.ADDPRODUCTS') }}
      </template>
      <template #form>
        <lazy-ui-forms-form-builder
          :key="productsDetail.id"
          :data="productsDetail"
          :langs="langs"
          :rules="rules"
          :form-model="formProducts"
          @updateData="useFormDataChange"
          @clearValidate="useClearValidate"
        />
      </template>
      <template #footerCollapsable>
        <lazy-ui-forms-extrafields
          v-if="extraFields.length"
          :schema="extraFields"
          :rules="rules"
          :langs="langs"
          @updateData="useFormDataChange"
          @clearValidate="useClearValidate"
        />
      </template>
    </ui-templates-form>
  </a-form>
</template>

<script lang="ts" setup>
import form from '@PRODUCTS/assets/data/form.json';

const {
  productsPlayload,
  productsForm,
  rules,
  useUpdateProducts,
  useFormDataChange,
  useClearValidate,
  useGetProducts,
  useGetExtraFieldsProducts,
} = useProducts();
const $route = useRoute();
const formProducts = useTranslate(form);
const { useGetData, langs } = useLanguagesList();

/** Products one currency item */
onMounted(() => {
  useGetData();
  useGetProducts($route.params.id);
  useGetExtraFieldsProducts();
});

const productsDetail = computed(() => {
  return useProductsStore().product;
});

const extraFields = computed(() => {
  return useProductsStore().extraFields;
});
</script>
<style lang="scss" scoped>
::deep {
  @import '@UI/assets/scss/form';

  .textfield-number {
    width: 100%;
  }
}
</style>
