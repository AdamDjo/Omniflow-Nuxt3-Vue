import useStatefulCookie from "~~/composable/useStatefulCookie";


export default defineNuxtRouteMiddleware(() => {
    // to complete with your own authentification mecanism (oath2, jswt...)
    if (process.client) {
     // to complete with your own authentification mecanism (oath2, jswt...)

     let userInfo = useStatefulCookie<{ token: String, userId: Number, mail: String, loggedIn: Boolean }>("jwt")
     //userInfo.value = userInfo.value || { token: "", userId: -1, mail: "", loggedIn: false }
   
     if (userInfo.value== undefined){
 
   
     }
     console.log("userinfo",userInfo)
  }
  });

