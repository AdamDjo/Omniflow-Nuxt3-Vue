<template>
  <tbody ref="tablebody">
    <slot />
  </tbody>
</template>
<script lang="ts" setup>
import Sortable, { Swap } from 'sortablejs';
import { defineStore } from 'pinia';
try {
  Sortable?.mount(new Swap());
} catch (error) {
  //
}
const tablebody = ref();
const list: any = inject('listSwap');
const table: any = ref([]);
table.value = list.value;
onMounted(() => {
  Sortable.create(tablebody.value, {
    handle: '.my-handle',
    swap: true,
    swapClass: 'highlight',
    animation: 300,
    onEnd: function (/**Event*/ evt: any) {
      let movedRow = list.value[evt.oldIndex];
      let movedOnRow = list.value[evt.newIndex];
      table.value[evt.oldIndex] = movedOnRow;
      table.value[evt.newIndex] = movedRow;
      table.value[evt.oldIndex].order = evt.oldIndex + 1;
      table.value[evt.newIndex].order = evt.newIndex + 1;
      const main = useWrapper();
      main.useGetTable(table.value);
    },
  });
});

const useWrapper = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: 'WrapperID',
  state: () => {
    return {
      product: [],
    };
  },
  getters: {},
  actions: {
    async useGetTable(array: any) {
      this.product = array;
    },
  },
});
</script>
