<template>
  <a-modal
    :visible="showModal"
    :title="$t('filterPeriod')"
    :destroy-on-close="true"
    :mask-closable="false"
    @ok="useSetfilters"
    @cancel="usecloseModal"
  >
    <a-form-item class="period-input">
      <a-range-picker
        v-model="period"
        :show-time="{
          format: 'HH:mm',
        }"
        format="YYYY-MM-DD HH:mm"
        :placeholder="[$t('startDate'), $t('endDate')]"
        :allow-clear="false"
        size="large"
        @change="useOnChangePeriod"
      />
    </a-form-item>
    <template #footer>
      <a-button
        key="back"
        @click="usecloseModal"
      >
        {{ $t('return') }}
      </a-button>
      <a-button
        key="reset"
        @click="useResetFilters"
      >
        {{ $t('reset') }}
      </a-button>
      <a-button
        key="submit"
        type="primary"
        @click="useSetfilters"
      >
        {{ $t('filterapply') }}
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { filterPeriodModal } from './props/filterPeriodModal.props';
const props: any = defineProps(filterPeriodModal);
const emit: any = defineEmits(['useUpdateFilters', 'useCloseModal']);
const period = ref([]);
const filter = ref({
  startDate: '',
  endDate: '',
  period: [],
});

const useSetfilters = () => {
  if (period.value.length == 0) {
    filter.value = {
      startDate: '',
      endDate: '',
      period: [],
    };
  }
  emit('useUpdateFilters', filter.value);
  emit('useCloseModal');
};

const usecloseModal = () => {
  if (props.filters.period?.length) {
    period.value = props.filters.period;
  }
  emit('useCloseModal');
};

const useResetFilters = () => {
  period.value = [];
};

const useOnChangePeriod = (date: any) => {
  filter.value.period = date;
  filter.value.startDate = date[0]['_d'];
  filter.value.endDate = date[1]['_d'];
};
</script>

<style lang="scss" scoped>
.period-input {
  display: flex;
  justify-content: center;
  margin: auto;
}
</style>
