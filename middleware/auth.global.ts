import useStatefulCookie from "~~/composable/useStatefulCookie";

export default defineNuxtRouteMiddleware(() => {
    // to complete with your own authentification mecanism (oath2, jswt...)

    if (process.client) {
     // to complete with your own authentification mecanism (oath2, jswt...)
     const token= useCookie('jwt').value
      if(!token){
         // return navigateTo('/login');
            
  
      }
      console.log(token)
  

  }
  });

