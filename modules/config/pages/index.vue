<template>
  <ui-templates-navigation-page
    :data-cards="dataCards"
    :title="$t('CONFIG.TITLE')"
    :description="$t('CONFIG.DESCRIPTION')"
    :back-url="localePath('/')"
  />
</template>

<script lang="ts" setup>
console.log(useNuxtApp());
const dataCards = computed(() => {
  return [
    {
      title: useNuxtApp().$i18n.t('CONFIG.PREFERENCES.TITLE'),
      description: useNuxtApp().$i18n.t('CONFIG.PREFERENCES.DESCRIPTION'),
      url: useNuxtApp().$localePath('/config/preferences'),
      show: true,
    },
    {
      title: useNuxtApp().$i18n.t('CONFIG.APPS.TITLE'),
      description: useNuxtApp().$i18n.t('CONFIG.APPS.DESCRIPTION'),
      url: useNuxtApp().$localePath('/config/apps'),
      show: true,
    },
    {
      title: useNuxtApp().$i18n.t('CONFIG.USERS.TITLE'),
      description: useNuxtApp().$i18n.t('CONFIG.USERS.DESCRIPTION'),
      url: useNuxtApp().$localePath('/config/users'),
      show: true,
    },
  ];
});
</script>
