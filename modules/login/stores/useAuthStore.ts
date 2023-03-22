// store/auth.ts
import { defineStore } from 'pinia'


export const useAuthStore = defineStore('useAuthStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
     user:'',
     token:''
    };
  },
  actions: {
    async login(loginForm) {
      const URL_ENCODED_FORM = encodeURL({
        email: loginForm.email,
        password: loginForm.password,
      });
      console.log(URL_ENCODED_FORM)
      return await $fetch('/api/users/signin', {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        body: URL_ENCODED_FORM
      })
    } 

  },
});
