<template>
  <a-form
    ref="usersForm"
    :model="usersPlayload"
    :rules="rules"
    layout="vertical"
    @finish="useAddUsers()"
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
            {{ $t('ADD') }}
          </a-button>
        </div>
      </template>
      <template #fieldsetTitle>
        {{ $t('USERS.ADDUSERS') }}
      </template>
      <template #form>
        <lazy-ui-forms-form-builder
          :langs="langs"
          :rules="rules"
          :form-model="formUsers"
          @updateData="useFormDataChange"
          @clearValidate="useClearValidate"
        />
      </template>
      <!--
      <template #footerCollapsable>
        <lazy-ui-forms-extrafields
          v-if="extraFields.length"
          :schema="extraFields"
          :rules="rules"
          :langs="langs"
          @updateData="useFormDataChange"
          @clearValidate="useClearValidate"
        />
      </template>-->
    </ui-templates-form>
  </a-form>
</template>

<script lang="ts" setup>
import form from '@USERS/assets/data/form.json';
const { useGetData, langs } = useLanguagesList();
const {
  usersPlayload,
  rules,
  usersForm,
  useGetExtraFieldsUsers,
  useAddUsers,
  useFormDataChange,
  useClearValidate,
} = useUsers();
const extraFields = computed(() => {
  return useUsersStore().extraFields;
});

const formUsers = useTranslate(form);
/** Products one currency item */
onMounted(() => {
  useGetData();
  useGetExtraFieldsUsers();
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
