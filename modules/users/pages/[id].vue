<template>
  <a-form
    ref="usersForm"
    :model="usersPlayload"
    :rules="rules"
    layout="vertical"
    @finish="useUpdateUsers()"
  >
    <ui-templates-form
      :back-url="localePath('users')"
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
            @click="$router.push(localePath('users'))"
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
          :key="usersDetail.id"
          :data="usersDetail"
          :langs="langs"
          :rules="rules"
          :form-model="formUsers"
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
import form from '@USERS/assets/data/form.json';

const {
  usersPlayload,
  usersForm,
  rules,
  useUpdateUsers,
  useFormDataChange,
  useClearValidate,
  useGetUsers,
  useGetExtraFieldsUsers,
} = useUsers();
const $route = useRoute();
const formUsers = useTranslate(form);
const { useGetData, langs } = useLanguagesList();

/** Products one currency item */
onMounted(() => {
  useGetData();
  useGetUsers($route.params.id);
  useGetExtraFieldsUsers();
});

const usersDetail = computed(() => {
  return useUsersStore().users;
});

const extraFields = computed(() => {
  return useUsersStore().extraFields;
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
