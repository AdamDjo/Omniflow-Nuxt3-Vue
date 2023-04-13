<template>
  <div class="container">
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    
    @finishFailed="onFinishFailed"
    @submit="userLogin"
  >
    <a-form-item
      label="Email"
      name="Email"
      :rules="[{ required: true, message: 'Please input your Email!' }]"
    >
      <a-input v-model:value="formState.Email" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</div>
</template>
<script lang="ts">

import { defineComponent, reactive } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';


const authStore = useAuthStore();
interface FormState {
  Email: string;
  password: string;
  remember: boolean;
}
definePageMeta({
  layout: "custom",
   
});
export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      Email: '',
      password: '',
      remember: true,
    });
  
    const onFinish = (values: any) => {
      authStore.auth()
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
     const userLogin =async ()=> {
      authStore.login(formState).then(()=>{
        authStore.auth()
      })
    } 
    return {
      formState,
      onFinish,
      onFinishFailed,
      userLogin
    };
  },
});
</script>