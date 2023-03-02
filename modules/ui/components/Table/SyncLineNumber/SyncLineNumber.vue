<template>
  <div class="font-sf-regular">
    <span class="span-select">{{ $t('numberoflines') }}:</span>
    <a-select
      :default-value="lines[0]"
      @change="useSendChange"
    >
      <template #suffixIcon>
        <caret-down-outlined :style="{ color: '#000' }" />
      </template>
      <a-select-option
        v-for="item in lines"
        :key="item"
      >
        {{ item }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script lang="ts" setup>
const props: any = defineProps({
  lines: {
    type: Array,
    default: () => {
      return [1, 2, 3, 4];
    },
  },
});
const emit: any = defineEmits(['dataChanged']);

onMounted(() => {
  useSendChange(props.lines[0]);
});
const useSendChange = (value: any) => {
  emit('dataChanged', value);
};
</script>
