<template>

<div class="custom-layout">
<slot />

</div>

   
 
  </template>
  <script lang="ts" setup>
  import nav from '@BASE/assets/data/nav.json';
  import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
  </script>
  <style>
  .custom-layout{
    width: 800px;
    
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        line-height: 30px;
  }
</style>