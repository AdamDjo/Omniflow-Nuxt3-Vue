<template>
  <div class="extrafields-wrapper">
    <LazyUiFormsFormBuilder
      v-if="Object.entries(formSchema).length > 0"
      :langs="langs"
      :data="useArrayToObject(data)"
      :rules="rules"
      :form-model="formSchema"
      @updateData="useUpdateExtrafields"
      @clearValidate="useClearValidate"
    />
  </div>
</template>
<script lang="ts" setup>
import { extrafieldsProps } from './props/extrafields.props';
const props: any = defineProps(extrafieldsProps);
const formSchema: any = ref([]);
const emit: any = defineEmits(formEvents(null).events);
const { useClearValidate, useFormDataChange }: any = formEvents(emit);
const playloads: any = ref([]);
const enrichedSchema: any = [];

onMounted(() => {
  useFormDataChange([], 'extrafields');
  useInitExtrafields();
});

/** populate playload object & form object */
const useInitExtrafields = () => {
  props.schema.forEach((element: any, i: number) => {
    let o: any = {};
    let obj: any = {};
    let placeholder = element.placeholder.find((e: any) => e.isoCode == useNuxtApp().$i18n.locale.value);
    let label = element.label.find((e: any) => e.isoCode == useNuxtApp().$i18n.locale.value);
    let defautlSelect: any = element.isLocalized || element.fieldType == 'MULTIPLESELECT' ? [] : '';

    o.rule = element.isRequired ? [{ required: true, message: useNuxtApp().$i18n.t('required') }] : [];
    if (element.fieldType == 'CHECKBOX' && element.isRequired && !element.defaultValue) {
      defautlSelect = false;
    }
    o.placeholder = placeholder ? placeholder.value : '';
    o.label = label ? label.value : '';
    o.relatedKey = 'extrafields[' + i + '].fieldValue';

    obj.fieldName = element.fieldName;
    obj.fieldType = element.fieldType;
    obj.status = element.status;
    obj.isLocalized = element.isLocalized;
    obj.isFrontMob = element.isFrontMob;

    enrichedSchema.push({ ...element, ...o });
    playloads.value.push({ ...obj, ...{ fieldValue: { [obj.fieldName]: defautlSelect } } });
  });
  /** sort displayed fields */
  // formSchema.value = useSortByKey(enrichedSchema, 'position');
  formSchema.value = enrichedSchema;
  /** emit playload */
  useFormDataChange(playloads.value, 'extrafields');
};

/** update extrafield value */
const useUpdateExtrafields = (fieldValue: any, fieldName: string, fieldIndex: number) => {
  let field = playloads.value[fieldIndex];
  if (fieldName && field && field.fieldValue[fieldName] != undefined) {
    field.fieldValue[fieldName] = fieldValue;
  }
};

/** convert array data to object key/value */
const useArrayToObject = (dataForm: any) => {
  let ob: any = {};
  if (dataForm) {
    dataForm.forEach((element: any) => {
      let oData: any = formSchema.value.find(
        (o: any) =>
          o.fieldName == element.fieldName && o.fieldType == element.fieldType && o.isLocalized == element.isLocalized
      );
      if (oData) {
        ob[element.fieldName] = element['fieldValue'][element.fieldName];
      }
    });
    return ob;
  }
};
</script>
