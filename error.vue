<template>
  <UiTemplatesError :error="error" />
</template>

<script lang="ts" setup>
defineProps({
  error: {
    type: [Object, Error],
    required: true,
  },
});
</script>
