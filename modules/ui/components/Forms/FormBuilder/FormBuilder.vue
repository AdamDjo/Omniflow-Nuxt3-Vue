<template>
  <a-row :gutter="24">
    <slot name="form-line-0" />

    <FormGroup
      v-if="formElts.length > 0"
      :form-items="formElts"
    >
      <template
        v-for="(fieldItem, index) in formElts"
        :key="'template' + index"
        #[useSlotName(fieldItem.slot,index)]
      >
        <a-col :span="fieldItem.span ? fieldItem.span : 24">
          <!-- input TEXT not localized -->
          <template v-if="(fieldItem.status == 'ACTIVATED' && fieldItem.status) || !fieldItem.status">
            <a-form-item
              v-if="(fieldItem.fieldType == 'TEXT' || fieldItem.fieldType == 'URL') && !fieldItem.isLocalized"
              :key="fieldItem.fieldName + index"
              :rules="useSetRule(fieldItem.fieldName, fieldItem)"
              :name="useSetName(fieldItem)"
              :label="fieldItem.label"
              :label-col="fieldItem.labelCol"
              :wrapper-col="fieldItem.wrapperCol"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
            >
              <a-input
                v-model:value="fieldItem.fieldValue"
                :disabled="fieldItem.disabled"
                :read-only="fieldItem.readOnly"
                :placeholder="fieldItem.placeholder"
                :class="fieldItem.className"
                @change="
                  (e) => {
                    useFormDataChange(e.target.value, fieldItem.fieldName, index);
                  }
                "
              />
              <span v-if="fieldItem.fieldType == 'URL' && fieldItem.urlPrefix.length">{{ fieldItem.urlPrefix }}{{ fieldItem.fieldValue }}</span>
            </a-form-item>
            <!-- END of input TEXT not localized -->
            <!-- input upload localized -->
            <LazyUiFormsLocaleUploadfield
              v-if="fieldItem.isUploadLocalized"
              :key="fieldItem.fieldName + index"
              :languages-data="langs"
              :list-of-values="
                data && data[fieldItem.fieldName] && Array.isArray(data[fieldItem.fieldName])
                  ? data[fieldItem.fieldName]
                  : null
              "
              :name="fieldItem.fieldName"
              :accept-only="fieldItem.acceptOnly ? fieldItem.acceptOnly : '*'"
              :error-message="fieldItem.errorMessage ? fieldItem.errorMessage : ''"
              :label="fieldItem.label"
              :path-asset-manager="fieldItem.PathAssetManager"
              :rule="useSetRule(fieldItem.fieldName, fieldItem)"
              :disabled="fieldItem.disabled ? fieldItem.disabled : false"
              :error-disabled-msg="fieldItem.errorDisabledMsg ? fieldItem.errorDisabledMsg : ''"
              :read-only="fieldItem.readOnly ? fieldItem.readOnly : false"
              :related-key="fieldItem.relatedKey ? fieldItem.relatedKey : null"
              :show-langs="fieldItem.showLangs ? fieldItem.showLangs : false"
              :hide-langs-icon="fieldItem.hideLangsIcon ? fieldItem.hideLangsIcon : false"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
              :class-name="fieldItem.className"
              @clearValidate="(a) => useClearValidate(a)"
              @updateData="
                (val, name) => {
                  fieldItem.fieldValue = val;
                  useFormDataChange(val, fieldItem.fieldName, index);
                }
              "
            />
            <!-- END input upload localized -->
            <!-- input TEXT localized -->
            <LazyUiFormsLocaleTextfield
              v-if="fieldItem.isLocalized"
              :key="fieldItem.fieldName + index"
              :languages-data="langs"
              :list-of-values="
                data && data[fieldItem.fieldName] && Array.isArray(data[fieldItem.fieldName])
                  ? data[fieldItem.fieldName]
                  : null
              "
              :name="fieldItem.fieldName"
              :label="fieldItem.label"
              :placeholder="fieldItem.placeholder"
              :rule="useSetRule(fieldItem.fieldName, fieldItem)"
              :type="fieldItem.fieldType.toLowerCase()"
              :read-only="fieldItem.readOnly"
              :disabled="fieldItem.disabled"
              :class-name="fieldItem.className"
              :label-col="fieldItem.labelCol"
              :array-value="index"
              :related-key="fieldItem.relatedKey ? fieldItem.relatedKey : null"
              :wrapper-col="fieldItem.wrapperCol"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
              @updateData="
                (val, name) => {
                  fieldItem.fieldValue = val;
                  useFormDataChange(val, fieldItem.fieldName, index);
                }
              "
              @clearValidate="useClearValidate"
            />
            <!-- END of input TEXT localized -->
            <!-- input TEXTAREA  -->
            <a-form-item
              v-if="fieldItem.fieldType == 'TEXTAREA' && !fieldItem.isLocalized"
              :key="fieldItem.fieldName + index"
              :rules="useSetRule(fieldItem.fieldName, fieldItem)"
              :name="useSetName(fieldItem)"
              :label="fieldItem.label"
              :label-col="fieldItem.labelCol"
              :wrapper-col="fieldItem.wrapperCol"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
            >
              <a-textarea
                v-model:value="fieldItem.fieldValue"
                :placeholder="fieldItem.placeholder"
                :disabled="fieldItem.disabled"
                :read-only="fieldItem.readOnly"
                :class="fieldItem.className"
                :rows="3"
                @change="(e) => useFormDataChange(e.target.value, fieldItem.fieldName, index)"
              />
            </a-form-item>
            <!-- END of input TEXTAREA  -->
            <!-- input NUMBER  -->
            <a-form-item
              v-if="fieldItem.fieldType == 'NUMBER' && !fieldItem.isLocalized"
              :key="fieldItem.fieldName + index"
              :rules="useSetRule(fieldItem.fieldName, fieldItem)"
              :name="useSetName(fieldItem)"
              :label="fieldItem.label"
              :label-col="fieldItem.labelCol"
              :wrapper-col="fieldItem.wrapperCol"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
            >
              <a-input-number
                v-model:value="fieldItem.fieldValue"
                :placeholder="fieldItem.placeholder"
                :disabled="fieldItem.disabled"
                :read-only="fieldItem.readOnly"
                :class="fieldItem.className"
                :min="0"
                @change="(e) => useFormDataChange(typeof e === 'number' ? e : '', fieldItem.fieldName, index)"
              />
            </a-form-item>
            <!-- END of input NUMBER  -->
            <!-- CHECKBOX  -->
            <a-form-item
              v-if="fieldItem.fieldType == 'CHECKBOX' && !fieldItem.isLocalized"
              :key="fieldItem.fieldName + index"
              :rules="useSetRule(fieldItem.fieldName, fieldItem)"
              :name="useSetName(fieldItem)"
              :label-col="fieldItem.labelCol"
              :wrapper-col="fieldItem.wrapperCol"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
            >
              <div class="label-item ant-form-item-label">
                <label :class="{ 'ant-form-item-required': useSetRule(fieldItem.fieldName, fieldItem).length }">
                  {{ fieldItem.label }}</label>
              </div>
              <!-- <div class="ant-form-item-label"> -->
              <a-checkbox
                v-model:checked="fieldItem.fieldValue"
                :disabled="fieldItem.disabled"
                :read-only="fieldItem.readOnly"
                :class="fieldItem.className"
                @change="
                  (e:any) => {
                    useClearCheckboxErrors(fieldItem);
                    useFormDataChange(e.target.checked, fieldItem.fieldName, index);
                  }
                "
              />
              <!-- </div> -->
            </a-form-item>
            <!-- END OF CHECKBOX  -->
            <!-- RADIO BUTTONS  -->
            <a-form-item
              v-if="fieldItem.fieldType == 'RADIO' && !fieldItem.isLocalized"
              :key="fieldItem.fieldName + index"
              :rules="useSetRule(fieldItem.fieldName, fieldItem)"
              :name="useSetName(fieldItem)"
              :label="fieldItem.label"
              :label-col="fieldItem.labelCol"
              :wrapper-col="fieldItem.wrapperCol"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
            >
              <a-radio-group
                v-model:value="fieldItem.fieldValue"
                class="radio-group spacing"
                :disabled="fieldItem.disabled"
                :read-only="fieldItem.readOnly"
                :default-value="fieldItem.defaultValue"
                @change="(e) => useFormDataChange(e.target.value, fieldItem.fieldName, index)"
              >
                <template
                  v-for="radio in fieldItem.selectOptions"
                  :key="radio.key + fieldItem.fieldName"
                >
                  <a-radio
                    :value="radio.value"
                    :class="fieldItem.className"
                  >
                    {{ radio.key }}
                  </a-radio>
                </template>
              </a-radio-group>
            </a-form-item>
            <!-- END OF RADIO BUTTONS  -->
            <!-- SELECT  -->
            <a-form-item
              v-if="
                fieldItem.fieldType == 'SELECT' || (fieldItem.fieldType == 'MULTIPLESELECT' && !fieldItem.isLocalized)
              "
              :key="fieldItem.fieldName + index"
              :rules="useSetRule(fieldItem.fieldName, fieldItem)"
              :name="useSetName(fieldItem)"
              :label="fieldItem.label"
              :label-col="fieldItem.labelCol"
              :wrapper-col="fieldItem.wrapperCol"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
            >
              <a-select
                v-model:value="fieldItem.fieldValue"
                :disabled="fieldItem.disabled"
                :read-only="fieldItem.readOnly"
                :class="fieldItem.className"
                :placeholder="fieldItem.placeholder"
                :mode="fieldItem.fieldType == 'MULTIPLESELECT' ? 'multiple' : 'single'"
                :show-arrow="true"
                size="default"
                @change="(e) => useFormDataChange(e, fieldItem.fieldName, index)"
              >
                <a-select-option
                  v-for="item in fieldItem.selectOptions"
                  :key="item.key"
                >
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <!-- END OF SELECT  -->
            <!-- UPLOAD NOT localized  -->
            <a-form-item
              v-if="fieldItem.fieldType == 'UPLOAD' && !fieldItem.isLocalized"
              :key="fieldItem.fieldName + index"
              :label="fieldItem.label"
              :rules="useSetRule(fieldItem.fieldName, fieldItem)"
              :name="useSetName(fieldItem)"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
              :label-col="fieldItem.labelCol"
              :wrapper-col="fieldItem.wrapperCol"
            >
              <a-upload
                :accept="fieldItem.accept"
                list-type="picture"
                :action="url + fieldItem.prefix"
                :headers="headersUpload"
                :file-list="file[fieldItem.fieldName].fileList"
                :before-upload="(e) => useBeforeUploadFile(e, fieldItem.accept, fieldItem.error)"
                @change="useChangeFile($event, fieldItem.fieldName)"
              >
                <a-button v-if="file[fieldItem.fieldName].fileList.length == 0">
                  <template #icon>
                    <upload-outlined />
                  </template>
                  {{ $t('upload') }}
                </a-button>
              </a-upload>
            </a-form-item>
            <!-- END of UPLOAD NOT localized -->
            <!-- TEXTEDITOR NOT LOCALIZED -->
            <a-form-item
              v-if="fieldItem.fieldType == 'TEXTEDITOR' && !fieldItem.isLocalized"
              :key="fieldItem.fieldName + index"
              :rules="useSetRule(fieldItem.fieldName, fieldItem)"
              :name="useSetName(fieldItem)"
              :label="fieldItem.label"
              :label-col="fieldItem.labelCol"
              :wrapper-col="fieldItem.wrapperCol"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
            >
              <client-only placeholder="Loading...">
                <LazyUiFormsTextEditor
                  :default-value="fieldItem.fieldValue"
                  :uploaded-file="textEditorUploadedFileUrl"
                  :disabled="fieldItem.disabled"
                  :read-only="fieldItem.readOnly"
                  :class="fieldItem.className"
                  :placeholder="fieldItem.placeholder"
                  @VEditChanged="
                    (e) => {
                      useClearValidate(useSetName(fieldItem));
                      useFormDataChange(e, fieldItem.fieldName, index);
                    }
                  "
                  @fileToUpload="useTextEditorFileUpload"
                />
              </client-only>
            </a-form-item>
            <!-- END OF TEXTEDITOR NOT LOCALIZED -->

            <!-- TAGS NOT LOCALIZED -->
            <a-form-item
              v-if="fieldItem.fieldType == 'TAGS'"
              :key="fieldItem.fieldName + index"
              :rules="useSetRule(fieldItem.fieldName, fieldItem)"
              :name="useSetName(fieldItem)"
              :label="fieldItem.label"
              :label-col="fieldItem.labelCol"
              :wrapper-col="fieldItem.wrapperCol"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
            >
              <a-select
                mode="tags"
                :placeholder="fieldItem.placeholder"
                :default-value="fieldItem.fieldValue"
                @change="(e) => useFormDataChange(e, fieldItem.fieldName, index)"
              />
            </a-form-item>
            <!-- END OF TAGS NOT LOCALIZED -->
            <!-- GROUPED LOCAL UPLOAD INPUTS -->
            <div
              v-if="fieldItem.fieldType == 'GROUPED-UPLOAD' && fieldItem.isGrouped"
              :key="fieldItem.fieldType + index + index"
              class="locale-upload-bg"
            >
              <div class="title-section font-sf-semibold grouped-upload-title">
                {{ fieldItem.label }}
              </div>
              <LazyUiFormsLocaleUploadfield
                v-for="(item, idx) in fieldItem.items"
                :key="item.fieldName + '-' + idx"
                :languages-data="langs"
                :list-of-values="
                  data && data[item.fieldName] && Array.isArray(data[item.fieldName]) ? data[item.fieldName] : null
                "
                :name="item.fieldName"
                :accept-only="item.acceptOnly ? item.acceptOnly : '*'"
                :error-message="item.errorMessage ? item.errorMessage : ''"
                :label="item.label"
                :path-asset-manager="item.PathAssetManager"
                :rule="useSetRule(item.fieldName, item)"
                :disabled="item.disabled ? item.disabled : false"
                :error-disabled-msg="item.errorDisabledMsg ? item.errorDisabledMsg : ''"
                :read-only="item.readOnly ? item.readOnly : false"
                :related-key="item.relatedKey ? item.relatedKey : null"
                :show-langs="item.showLangs ? item.showLangs : false"
                :hide-langs-icon="fieldItem.hideLangsIcon ? fieldItem.hideLangsIcon : false"
                :class="['form-item-' + item.fieldName, item.wrapperClass]"
                :class-name="item.className"
                @clearValidate="useClearValidate"
                @updateData="
                  (val, name) => {
                    item.fieldValue = val;
                    useFormDataChange(val, item.fieldName, index);
                  }
                "
              />
            </div>
            <!-- END GROUPED LOCAL UPLOAD INPUTS -->
            <!------start a-date-picker----->
            <a-form-item
              v-if="fieldItem.fieldType == 'DATEPICKER'"
              :key="fieldItem.fieldName + index"
              :rules="useSetRule(fieldItem.fieldName, fieldItem)"
              :name="useSetName(fieldItem)"
              :label="fieldItem.label"
              :label-col="fieldItem.labelCol"
              :wrapper-col="fieldItem.wrapperCol"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
            >
              <a-date-picker
                v-model="fieldItem.fieldValue"
                :show-time="fieldItem.showtime"
                :format="fieldItem.timeformat"
                @change="(e) => useFormDataChange(e, fieldItem.fieldName, index)"
              />
            </a-form-item>
            <!----end a-date-picker------->
            <!----start switch------->
            <a-form-item
              v-if="fieldItem.fieldType == 'SWITCH' && !fieldItem.isLocalized"
              :key="fieldItem.fieldName + index"
              :rules="useSetRule(fieldItem.fieldName, fieldItem)"
              :name="useSetName(fieldItem)"
              :label-col="fieldItem.labelCol"
              :wrapper-col="fieldItem.wrapperCol"
              :class="['form-item-' + fieldItem.fieldName, fieldItem.wrapperClass]"
            >
              <div>
                <span
                  class="label-item antformLabel switch-label"
                  :class="{ 'ant-form-item-required': useSetRule(fieldItem.fieldName, fieldItem).length }"
                >
                  <span>
                    {{ fieldItem.label }}
                  </span>
                  <a-tooltip
                    v-if="fieldItem.info"
                    placement="top"
                  >
                    <template #title>
                      <span> {{ fieldItem.info }} </span>
                    </template>
                    <img
                      src="@UI/assets/img/info.svg"
                      class="info-icon"
                      alt=""
                    >
                  </a-tooltip>
                </span>
                <a-switch
                  v-model:checked="fieldItem.fieldValue"
                  :disabled="fieldItem.disabled"
                  :read-only="fieldItem.readOnly"
                  :class="fieldItem.className"
                  @change="(e) => useFormDataChange(e, fieldItem.fieldName, index)"
                />
              </div>
            </a-form-item>
            <!-- END OF SWITCH  -->
            <slot :name="'form-line-' + (index + 1)" />
          </template>
        </a-col>
      </template>
    </FormGroup>
  </a-row>
</template>
<script lang="ts" setup>
import thumbExcel from '@UI/assets/img/thumbexcel.svg';
import thumbPdf from '@UI/assets/img/pdfThumb.svg';
import thumbDoc from '@UI/assets/img/docThumb.svg';
import { formBuilderProps } from './props/formBuilder.props';
const props: any = defineProps(formBuilderProps);
const FormGroup = defineAsyncComponent(() => import('./FormGroup.vue'));
const formElts: any = ref([]);
const emit: any = defineEmits(formEvents(null).events);
const { useClearValidate, useFormDataChange, useTextEditorFileUpload }: any = formEvents(emit);
let formReactiveKey: any = {};
const url = useNuxtApp().$config.API + useNuxtApp().$config.WS_ADD_MEDIA + useNuxtApp().$i18n.locale.value;
const file: any = ref({});
const headersUpload = {
  authorization: decodeURIComponent(useNuxtApp().$auth.token),
};
onMounted(() => {
  useInitForm();
});
/** populate upload file */
const useChangeFile = (event: any, name: any) => {
  /** Limit the number of uploaded files to one file  */
  file.value[name].fileList = event.fileList;
  file.value[name].fileList = file.value[name].fileList.slice(-1);
  if (event.file.status === 'done') {
    let extension = file.value[name].fileList[0].name.match(/\.[0-9a-z]+$/i)[0];
    file.value[name].fileList[0].thumbUrl = useCustomThumbnail(extension, file.value[name].fileList[0].thumbUrl);
    useFormDataChange(event.file.response.url, name);
  } else if (event.file.status === 'error') {
    useOpenNotification(useNuxtApp().$i18n.t('uploadError'), 'error');
  } else {
    useFormDataChange('', name);
  }
};
/** check type before uplaod file */
const useBeforeUploadFile = (fileDate: any, accept: any, errorMessage: any) => {
  let extension: string = fileDate.name.match(/\.[0-9a-z]+$/i)[0];
  let acceptedExtensions: Array<string> = accept.replace(/\s/g, '').split(',');
  let isValidFile = false;
  if (acceptedExtensions.indexOf(extension.toLowerCase()) > -1) {
    isValidFile = true;
  } else {
    useOnError(useNuxtApp().$i18n.t(errorMessage));
  }
  return isValidFile;
};
const useInitForm = () => {
  props.formModel.forEach((element: any) => {
    let defaultValue: any = {};
    if (element.defaultValue) {
      defaultValue.fieldValue = element.defaultValue;
    }
    if (element.fieldType == 'UPLOAD') {
      file.value[element.fieldName] = { fileList: [] };
    }
    if (element.fieldType == 'CHECKBOX' && !element.defaultValue) {
      element.defaultValue = false;
    }
    formElts.value.push(Object.assign({ ...defaultValue }, element));
    let defaultType = element.isLocalized || element.fieldType == 'MULTIPLESELECT' ? [] : '';
    formReactiveKey[element.fieldName] = element.defaultValue != undefined ? element.defaultValue : defaultType;
  });
  /** dyamic build reactive key */
  useFormDataChange(formReactiveKey);
  if (props.data) {
    useSetDataValues();
  }
};

/** populate fields values */
const useSetDataValues = () => {
  Object.keys(props.data).forEach((key: string, idx: number) => {
    let oData: any = formElts.value.find((e: any) => e.fieldName == key);
    if (oData) {
      oData.fieldValue = props.data[key];
      try {
        useSetUploadValues(oData);
      } catch (error) {
        console.log(error);
      }
    }
    useFormDataChange(props.data[key], key, idx);
  });
};

/** set rule from global rules or item rule */
const useSetRule = (fieldName: string, fieldItem: any) => {
  if (fieldItem.fieldType == 'CHECKBOX' && fieldItem.rule && fieldItem.rule[0].required && !fieldItem.relatedKey) {
    fieldItem.rule = [{ pattern: /true/, message: fieldItem.rule[0].message }];
  }
  return fieldItem.rule ? fieldItem.rule : props.rules[fieldName];
};

const useSetUploadValues = (fileData: any) => {
  if (fileData.fieldType == 'UPLOAD') {
    file.value[fileData.fieldName].fileList = [
      {
        uid: fileData.fieldName,
        name: fileData.fieldValue.match(/[^\\/]+\.[^\\/]+$/)[0],
        status: 'done',
        thumbUrl: fileData.fieldValue,
      },
    ];
    let extension = file.value[fileData.fieldName].fileList[0].name.match(/\.[0-9a-z]+$/i)[0];
    file.value[fileData.fieldName].fileList[0].thumbUrl = useCustomThumbnail(extension, fileData.fieldValue);
  }
};

const useCustomThumbnail = (extension: string, defaultUrl: string) => {
  switch (extension) {
    case '.csv':
    case '.xlsx':
    case '.xlsm':
    case '.excel':
      return thumbExcel;
    case '.pdf':
      return thumbPdf;
    case '.doc':
    case '.docx':
      return thumbDoc;
    default:
      return defaultUrl;
  }
};

const useSetName = (fieldItem: any) => {
  if (fieldItem.relatedKey) {
    let formatName = fieldItem.relatedKey
      .replace(/\[((?:[a-z|0-9|'|"]*))+\]/g, '.$1')
      .replace(/'|"/g, '')
      .split('.');
    formatName.push(fieldItem.fieldName);
    return fieldItem.fieldType == 'CHECKBOX' ? fieldItem.relatedKey + '.' + fieldItem.fieldName : formatName;
  } else {
    return fieldItem.fieldName;
  }
};

const useSlotName = (name: string | undefined, index: any) => {
  return name ? name + index : 'default' + index;
};

/** workaround reset error checkbox having array name */
const useClearCheckboxErrors = (fieldItem: any) => {
  let propField = (fieldItem.relatedKey ? fieldItem.relatedKey + '.' : '') + fieldItem.fieldName;
  if (fieldItem.isRequired) {
    if (!fieldItem.fieldValue) {
      fieldItem.rule[0].required = true;
    } else {
      fieldItem.rule[0].required = false;
    }
  }
  useClearValidate(propField);
};
</script>
<style lang="less">
@import 'ant-design-vue/lib/select/style/index.less';
@import 'ant-design-vue/lib/input/style/index.less';
@import 'ant-design-vue/lib/input-number/style/index.less';
@import 'ant-design-vue/lib/checkbox/style/index.less';
@import 'ant-design-vue/lib/radio/style/index.less';
@import '../../../assets/less/antd.less';
@import 'ant-design-vue/lib/date-picker/style/index.less';
@import 'ant-design-vue/lib/switch/style/index.less';
</style>
<style lang="scss" scoped>
.ant-input-number {
  width: 100%;
}

.checkbox {
  display: flex;
  flex-direction: row;

  span {
    padding-right: 10px;
  }
}

.switch-label {
  margin-right: 20px;
}

.ant-form-item-required::before {
  display: inline-block;
  margin-right: 4px;
  color: #ff4d4f;
  content: '*';
  font-family: SimSun, sans-serif;
  font-size: 14px;
  line-height: 1;
}

.info-icon {
  width: 17px;
  height: 17px;
  margin-bottom: 10px;
  margin-left: 4px;
  cursor: pointer;
}
</style>
