// store/auth.ts
import { defineStore } from 'pinia'


export const useAuthStore = defineStore('useAuthStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
     user:'',
     token: "",
    };
  },
  actions: {
    async login(loginForm:any) {
      const URL_ENCODED_FORM = {
        email: loginForm.Email,
        password: loginForm.password,
      };
      console.log(URL_ENCODED_FORM)
      return await $fetch('http://localhost:3000/api/users/signin', {
       
        method: 'POST',
        body: URL_ENCODED_FORM
      })
    }, 
    
   async auth(this: any) {
      const headers: any = {};
      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }
      try {
        const response = await fetch('http://localhost:3000/api/users/auth', {
          method: 'GET',
          headers,
        });
        if (response.status === 200) {
          navigateTo ("http://localhost:3000", { external: true })
        }
        console.log(response.status)
        return response.status;
      } catch (error) {
        console.error(error);
      }
    },
    async logout(){
   
      return await $fetch('http://localhost:3000/api/users/logout', {
        method: 'POST',
      
      })
    }
  },
  
});
