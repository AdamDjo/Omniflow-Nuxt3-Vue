<template>
  <div class="input-wrapper-upload-lang">
    <div class="label-item antformLabel">
      <div :class="rule && rule.length > 0 ? 'ant-form-item-required' : ''">
        {{ label }}
      </div>
      <div
        v-show="languagesData.length > 1"
        v-if="!showLangs || !hideLangsIcon"
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
      class="landscape-items input-localized-mark"
    >
      <a-form-item
        v-for="(language, index) in useSortLangs(languagesData).filter((e, i) => (clickBtn && i == i) || i == 0)"
        :key="index"
        class="model-item-wrapper"
        :label="language.isoCode"
        :rules="useSetRules(index, language.isoCode)"
        :name="
          relatedKey
            ? relatedKey + '.' + name + '[' + form.findIndex((a) => a.isoCode == language.isoCode) + '].value'
            : name + '[' + form.findIndex((a) => a.isoCode == language.isoCode) + '].value'
        "
      >
        <a-upload
          :accept="acceptOnly"
          list-type="picture"
          :action="useNuxtApp().$config.API + useNuxtApp().$config.WS_ADD_MEDIA + $i18n.locale + pathAssetManager"
          :headers="Object.keys(headerUpload).length == 0 ? header : headerUpload"
          :file-list="file[index].fileList"
          :read-only="readOnly"
          :disabled="disabled"
          :before-upload="(e) => useBeforeUploadFile(e, acceptOnly, errorMessage)"
          @change="
            useChangeFile(
              $event,
              index,
              form.findIndex((a) => a.isoCode == language.isoCode)
            )
          "
        >
          <a-button
            v-if="!file[index].fileList.length"
            @click="useBeforeUpload"
          >
            <template #icon>
              <upload-outlined />
            </template>
            {{ $t('upload') }}
          </a-button>
        </a-upload>
      </a-form-item>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { localeUploadfieldProps } from './props/localeUploadfield.props';
const props: any = defineProps(localeUploadfieldProps);
const clickBtn = ref(props.showLangs || props.hideLangsIcon);
const locale: any = useNuxtApp().$i18n.locale.value;
const form: any = ref([]);
const emit: any = defineEmits(formEvents(null).events);
const { useClearValidate, useFormDataChange }: any = formEvents(emit);
const isValid = ref(true);
const file = ref([]);
const headerUpload = {
  authorization: decodeURIComponent(useNuxtApp().$auth.token),
};
onMounted(() => {
  initForm();
  useFillIsoCodeValue(form.value);
});
/**
 * Watch props updates
 */
watch(props, (currentValue, newValue) => {
  form.value = [];
  if (newValue) {
    initForm();
    useFillIsoCodeValue(form.value);
  }
});
/**
 * Init populate form
 */
const initForm = () => {
  let valuesTab: any = [];
  props.languagesData.forEach((lng: any, index: number) => {
    file.value.push({ fileList: [] });
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
const useSetRules = (index: any, lang: any) => {
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
      useClearValidate(propField);
      return [];
    }
  } else {
    return [];
  }
};
/**
 * Sort data by the current language
 */
const useSortLangs = (dataSort: any) => {
  let data = Object.assign([], dataSort);
  const idx = data.findIndex((i: any) => i.isoCode == locale);
  if (idx > 0) {
    data.splice(1, 0, ...data.splice(0, idx));
  }
  return data;
};
const useBeforeUploadFile = (fileDate: any, accept: any, errorMessage: any) => {
  if (accept != '*' && accept != '') {
    let extension: string = fileDate.name.match(/\.[0-9a-z]+$/i)[0];
    let acceptedExtensions: Array<string> = accept.replace(/\s/g, '').split(',');
    isValid.value = false;
    if (acceptedExtensions.indexOf(extension.toLowerCase()) > -1) {
      isValid.value = true;
    } else {
      useOnError(useNuxtApp().$i18n.t(errorMessage));
    }
    return isValid.value;
  } else isValid.value = true;
};
const useChangeFile = (event: any, index: number, indexForm: number) => {
  if (isValid.value) {
    file.value[index].fileList = event.fileList;
    // Limit the number of uploaded files to one file
    //    Only to show the recent uploaded file, and old one will be replaced by the new
    file.value[index].fileList = file.value[index].fileList.slice(-1);
  }
  if (event.file.status === 'done') {
    let extension = file.value[index].fileList[0].name.match(/\.[0-9a-z]+$/i)[0];
    file.value[index].fileList[0].thumbUrl = useCustomThumbnail(extension, file.value[index].fileList[0].thumbUrl);
    form.value[indexForm].value = event.file.response.url;
    form.value[indexForm].type = event.file.type;
  } else if (event.file.status === 'error') {
    useOpenNotification(useNuxtApp().$i18n.t('uploadError'), 'error');
  } else {
    form.value[indexForm].value = '';
    form.value[indexForm].type = '';
  }
  useFormDataChange(form.value, props.name);
};
const useBeforeUpload = () => {
  if (props.disabled && props.errorDisabledMsg) {
    // message.error(props.errorDisabledMsg);
  }
};
const useFillIsoCodeValue = (array: any) => {
  if (props.listOfValues && props.listOfValues.length > 0) {
    let dataSorted = useSortLangs(array);
    dataSorted.forEach((element: any, index: any) => {
      if (element.value) {
        file.value[index].fileList = [
          {
            uid: index,
            name: element.value.match(/[^/]*$/)[0],
            status: 'done',
            thumbUrl: element.value,
          },
        ];
        let extension = file.value[index].fileList[0].name.match(/\.[0-9a-z]+$/i)[0];
        file.value[index].fileList[0].thumbUrl = useCustomThumbnail(extension, element.value);
      }
    });
  }
};
</script>
<style lang="less">
@import 'ant-design-vue/lib/upload/style/index.less';
</style>

<style lang="scss" scoped>
@import '@UI/assets/scss/languageInput';

:deep(.ant-form-item-label) {
  text-transform: uppercase;
}

:deep(.landscape-items) {
  display: flex;
  flex-wrap: wrap;
}
</style>
