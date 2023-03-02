<template>
  <a-form
    ref="productsForm"
    :model="productsPlayload"
    :rules="rules"
    layout="vertical"
    @finish="useAddProducts()"
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
            {{ $t('ADD') }}
          </a-button>
        </div>
      </template>
      <template #fieldsetTitle>
        {{ $t('PRODUCTS.ADDPRODUCTS') }}
      </template>
      <template #form>
        <lazy-ui-forms-form-builder
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
const { useGetData, langs } = useLanguagesList();
const {
  productsPlayload,
  rules,
  productsForm,
  useGetExtraFieldsProducts,
  useAddProducts,
  useFormDataChange,
  useClearValidate,
} = useProducts();
const extraFields = computed(() => {
  return useProductsStore().extraFields;
});

const formProducts = useTranslate(form);
/** Products one currency item */
onMounted(() => {
  useGetData();
  useGetExtraFieldsProducts();
});
</script>

<style lang="scss" scoped>
::deep {
  @import '@UI/assets/scss/form';

  :deep(.textfield-number) {
    width: 100%;
  }
}
</style>
