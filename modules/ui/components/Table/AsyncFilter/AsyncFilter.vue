<template>
  <div class="filter-buttons">
    <span
      class="border-title pb-1 mr-3"
      :class="{ 'filter-button': states.length > 0, active: isActive == '' }"
    >
      <h2
        id="filterAllResults"
        @click="useFetchInputValue('')"
      >
        {{ defaultFilter.value || defaultFilter }}
      </h2>
    </span>
    <div class="filter-buttons-secondary">
      <span
        v-for="(state, index) in states"
        :key="index"
        class="border-title filter-button pb-1 mr-3"
        :class="{ active: isActive == state.key || isActive == state }"
      >
        <h2
          :id="'filterResults_' + state.key || state"
          @click="useFetchInputValue(state.key || state)"
        >
          {{ $t(state.value || state) }}
        </h2>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props: any = defineProps({
  tableFilters: {
    type: Object,
    default: () => {
      return;
    },
  },
  defaultFilter: {
    type: String || Object,
    default: () => {
      return;
    },
  },
  states: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
const emit: any = defineEmits(['filterData']);

const $route = useRoute();
const $router = useRouter();
var isActive = ref('');
let filter: any = toRef(props, 'tableFilters').value;
isActive.value = $route.query.filter || filter.filter;
const useFetchInputValue = async (filterItem: any) => {
  if (props.states.length > 0) {
    isActive.value = filterItem;
    let o: any = { filter: filterItem, current: 1 };
    $router.push({ path: $route.fullPath, query: o });
    emit(`filterData`, o);
  }
};
</script>
<style lang="scss" scoped>
@import '@UI/assets/scss/variable';

.filter-buttons {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  a {
    margin: 0 10px;
    font-size: 14px;
  }
}

.filter-buttons-secondary {
  display: flex;

  span {
    margin: 0 10px;
  }
}

.border-title {
  border: none;

  &.filter-button {
    cursor: pointer;
  }

  &.active {
    border-bottom: 2px solid $greenColor;
  }
}
</style>
