<template>
  <div class="input-wrapper-lang">
    <div class="label-item ant-form-item-label">
      <label :class="rule && rule.length > 0 ? 'ant-form-item-required' : ''">
        {{ label }}
      </label>
      <div
        v-show="languagesData.length > 1"
        class="lang-btn font-sf-bold"
        @click="() => (clickBtn = !clickBtn)"
      >
        <img
          v-if="clickBtn"
          src="@UI/assets/img/openlocalized.svg"
          class="gloab-btn-icon"
          type="global"
          alt="Icon lang"
          :title="$t('languageSelect')"
        >
        <img
          v-else
          src="@UI/assets/img/langue.svg"
          class="gloab-btn-icon closed-icon"
          type="global"
          alt="Icon lang"
          :title="$t('languageSelect')"
        >
      </div>
    </div>
    <div
      v-if="form && form.length > 0"
      class="input-localized-mark"
    >
      <a-form-item
        v-for="(language, index) in useSortLangs().filter((e:any, i:any) => (clickBtn && i == i) || i == 0)"
        :key="index"
        class="model-item-wrapper"
        :label="language.isoCode"
        :rules="useSetRules(index, language.isoCode)"
        :name="
          relatedKey
            ? relatedKey + '.' + name + '[' + form.findIndex((a) => a.isoCode == language.isoCode) + '].value'
            : name + '[' + form.findIndex((a:any) => a.isoCode == language.isoCode) + '].value'
        "
      >
        <a-textarea
          v-if="type == 'textarea'"
          v-model:value="form.find((a:any) => a.isoCode == language.isoCode).value"
          :disabled="disabled"
          :placeholder="placeholder"
          :read-only="readOnly"
          :class="className"
        />
        <div
          v-else-if="type == 'editor'"
          class="ant-form-item-control v-editor-item-control has-error"
        >
          <client-only placeholder="Loading...">
            <LazyUiFormsTextEditor
              :key="'superinput' + name"
              :default-value="form.find((a:any) => a.isoCode == language.isoCode).value"
              :disabled="disabled"
              :read-only="readOnly"
              :class="className"
              :placeholder="placeholder"
              @VEditChanged="
                (value) => {
                  vEditorChange = true;
                  form.find((a:any) => a.isoCode == language.isoCode).value = value;
                }
              "
            />
          </client-only>
          <div
            v-if="useSetRules(index).length > 0 && vEditorChange"
            class="ant-form-explain"
          >
            {{ useSetRules(index)[0].message }}
          </div>
        </div>
        <a-input
          v-else
          v-model:value="form.find((a:any) => a.isoCode == language.isoCode).value"
          :placeholder="placeholder"
          :disabled="disabled"
          :read-only="readOnly"
          :class="className"
        />
      </a-form-item>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { localeTextfieldProps } from './props/localeTextfield.props';
const props: any = defineProps(localeTextfieldProps);
const clickBtn = ref(false);
const locale: any = useNuxtApp().$i18n.locale.value;
const form: any = ref([]);
const vEditorChange: any = ref(false);
const emit: any = defineEmits(formEvents(null).events);
const { useClearValidate, useFormDataChange }: any = formEvents(emit);
onMounted(() => {
  initForm();
});

/**
 * Watch props updates
 */
watch(props, (currentValue, newValue) => {
  form.value = [];
  if (newValue) {
    initForm();
  }
});

/**
 * Init populate form
 */
const initForm = () => {
  let valuesTab: any = [];
  props.languagesData.forEach((lng: any, index: number) => {
    valuesTab.push({ isoCode: lng.isoCode, value: '' });
    if (props.listOfValues && props.listOfValues.length > 0) {
      let obj = props.listOfValues.find((e: any) => e.isoCode === lng.isoCode);
      if (obj) {
        valuesTab[index] = { isoCode: obj.isoCode, value: obj.value };
      }
    }
  });
  form.value = valuesTab;
  useFormDataChange(valuesTab, props.name);
};
/**
 * Set/unset rule to first textfield
 * @param {Number} index - index of textfield
 */
const useSetRules = (index: any, lang) => {
  if (index === 0 && props.rule.length) {
    let checkEmptyValue = form.value.findIndex((e: any) => e.value != '');
    if (checkEmptyValue == -1) {
      return props.rule;
    } else {
      let propField =
        (props.relatedKey ? props.relatedKey + '.' : '') +
        props.name +
        '[' +
        form.value.findIndex((a: any) => a.isoCode == lang) +
        '].value';
      console.log(propField);
      useClearValidate(propField);
      return [];
    }
  } else {
    return [];
  }
};
/**
 * Sort languages by the current language
 */
const useSortLangs = () => {
  let data = Object.assign([], props.languagesData);
  const idx = data.findIndex((i: any) => i.isoCode == locale);
  if (idx > 0) {
    data.splice(1, 0, ...data.splice(0, idx));
  }
  return data;
};
</script>

<style lang="scss" scoped>
@import '@UI/assets/scss/languageInput';

.v-editor-item-control {
  .ant-form-explain {
    margin-top: 5px;
  }
}

.input-localized-mark {
  :deep(.ant-form-item-label > label) {
    text-transform: uppercase;

    &::before {
      display: none;
    }
  }
}
</style>
