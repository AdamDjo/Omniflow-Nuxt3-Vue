<template>
  <div class="full-modal">
    <a-modal
      :visible="isVisible"
      :title="data.title"
      :destroy-on-close="true"
      :mask-closable="false"
      :closable="false"
      wrap-class-name="full-modal"
      :ok-text="data.confirmText"
      @ok="useSetfilters"
      @cancel="usecloseModal"
    >
      <div
        v-for="(section, index) in data.filtersSections"
        :key="index"
        class="container-row"
        :style="section.isHidden ? { display: 'none' } : ''"
      >
        <p class="underlined-Title">
          {{ section.label }}
        </p>
        <a-form-item>
          <a-row :gutter="[16, 8]">
            <a-col
              v-for="(filter, idx) in section.filters"
              :key="idx"
              :span="24"
              :md="6"
            >
              <a-checkbox
                :key="filter.value"
                :value="filter.value"
                :class="
                  Object.keys(formData).length && formData[section.name].includes(filter.value)
                    ? 'radio-selected'
                    : 'radio'
                "
                @change="(val) => usechangefilter(section.name, idx, val.target.value)"
              >
                {{ filter.key }}
              </a-checkbox>
            </a-col>
          </a-row>
        </a-form-item>
      </div>
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
          {{ data.confirmButtonText }}
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
const props: any = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: null,
  },
});
const emit: any = defineEmits(['useUpdateFilters', 'useCloseModal']);
const filters: any = reactive({});
const formData = ref({});

const useInitFormData = () => {
  if (props.data && props.data.filtersSections) {
    props.data.filtersSections.forEach((section: any) => {
      filters[section.name] = [];
    });
  }
  return filters;
};

const useSetfilters = () => {
  emit('useUpdateFilters', filters);
  emit('useCloseModal');
};

const usecloseModal = () => {
  emit('useCloseModal');
};

const usechangefilter = (sectionName: string, idx: number, val: string) => {
  if (filters[sectionName].includes(val)) {
    filters[sectionName].splice(filters[sectionName].indexOf(val), 1);
  } else {
    filters[sectionName].push(val);
  }
  formData.value = { ...formData.value, ...filters };
};

const useResetFilters = () => {
  //init filters
  for (const key in filters) {
    filters[key] = [];
  }
  formData.value = filters;
};

onMounted(() => {
  useInitFormData();
});
</script>

<style lang="scss">
@import '@UI/assets/scss/form';

.full-modal {
  .title-modal {
    color: $darkColor;
    font-family: $sfMedium;
    font-size: 16px;
  }

  .title-form {
    color: $darkColor;
    font-family: $sfMedium;
    font-size: 16px;
  }

  .ant-modal-wrap {
    overflow: hidden;
  }

  .ant-modal {
    top: 0;
    width: 90% !important;
    padding-bottom: 0;
    margin: 0 5%;

    .ant-modal-header {
      padding: 3% 8%;
    }

    .ant-modal-content {
      height: 100vh;
      border-radius: 0;

      .ant-modal-body {
        overflow: auto;
        height: 90vh;
      }

      .ant-modal-title {
        color: $colorTitle;
        font-family: $sfMedium;
        font-size: 23px;
      }
    }

    .ant-modal-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: $bgWhite;
    }

    .ant-checkbox-wrapper {
      align-items: center;
      justify-content: center;
    }

    .ant-checkbox-inner {
      display: none;
    }

    .ant-checkbox {
      display: none;
    }
  }
}

.underlined-Title {
  padding: 1% 0%;
  border-bottom: 1px solid $greyColor;
  color: $greyText;
  font-family: $sfMedium;
  font-size: 23px;
}

.container-row {
  margin: 1% 6%;
}

.filter-icon {
  margin-right: 10px;
}

.filter-button {
  &.ant-btn {
    &:focus {
      border: 1px solid $darkColor;
      background: $bgWhite;
      color: $darkColor;
    }

    border-radius: 5px;
    margin: 0 5px;
  }
}
</style>
