<template>
  <template v-if="items.length">
    <template
      v-for="(slot, index) in items"
      :key="index"
    >
      <template v-if="slot.includes('collapse')">
        <a-col :span="24">
          <a-collapse
            :active-key="[slot]"
            :bordered="false"
          >
            <a-collapse-panel
              :key="slot"
              class="font-sf-bold"
              :header="$t(slot)"
            >
              <a-row>
                <slot
                  v-for="(item, i) in slotsRender[slot]"
                  :name="slot + (i + useGetprev(index))"
                />
              </a-row>
            </a-collapse-panel>
          </a-collapse>
          <div
            v-if="index != items.length - 1 || slotsRender['default']"
            class="divider-collapse-form"
          >
            <div class="divider-bottom" />
            <div class="divider-top" />
          </div>
        </a-col>
      </template>
      <template v-else>
        <slot
          v-for="(item, i) in slotsRender['default']"
          :name="'default' + (i + useGetprev(index))"
        />
      </template>
    </template>
  </template>
</template>
<script lang="ts" setup>
const props = defineProps({
  formItems: {
    type: Array,
    default: () => [],
  },
});
const slotsRender: any = ref({});
const allSlots: any = ref();
allSlots.value = props.formItems.map((e) => {
  if (e.slot) {
    return e.slot;
  } else {
    return 'default';
  }
});
const useGetSlots = (formEls: any) => {
  const slots: any = [];
  // slotsRender.value["default"]=-1;
  formEls.forEach((el: any) => {
    if (el.slot && slots.indexOf(el.slot) == -1) {
      slots.push(el.slot);
      slotsRender.value[el.slot] = 1;
    } else if (el.slot && slots.indexOf(el.slot) != -1) {
      slotsRender.value[el.slot] += 1;
    } else if (!el.slot && slots.indexOf('default') == -1) {
      slots.push('default');
      slotsRender.value['default'] = 1;
    } else {
      slotsRender.value['default'] += 1;
    }
  });
  return slotsRender.value;
};
const useGetprev = (index) => {
  let vals = Object.values(slotsRender.value);
  // console.log(obj,vals)
  let startFrom = 0;
  for (let i = 0; i < index; i++) {
    startFrom += vals[i];
  }
  if (index == 0) {
    return 0;
  } else {
    return startFrom;
  }
};
const items = ref(Object.keys(useGetSlots(props.formItems)));
</script>
