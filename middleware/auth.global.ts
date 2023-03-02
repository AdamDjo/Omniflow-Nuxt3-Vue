export default defineNuxtRouteMiddleware(() => {
  // to complete with your own authentification mecanism (oath2, jswt...)
  useNuxtApp().$auth = {};
  useNuxtApp().$auth.token = useCookie('auth.token').value;
});
