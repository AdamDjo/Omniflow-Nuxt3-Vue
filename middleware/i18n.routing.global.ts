export default defineNuxtRouteMiddleware(async (to: any) => {
  // workaround to scape root path (i18n usecase)
  // to replace with nuxt@i18n stable version
  if (to.path == '/') {
    return navigateTo(useNuxtApp().$localePath('/'));
  }
});
