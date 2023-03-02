<template>
  <uiTemplatesCollapsable :nav-tree="nav">
    <slot />
  </uiTemplatesCollapsable>
</template>

<script lang="ts" setup>
import nav from '@BASE/assets/data/nav.json';
</script>
