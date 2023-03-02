<template>
  <QuillEditor
    ref="editor"
    :modules="externUploadUrl ? modules : null"
    :options="options"
    :read-only="disabled"
    :toolbar="toolbarEditor"
    @editorChange="useChangeVEdit"
  />
</template>

<script lang="ts" setup>
import toolbarEditor from './toolbar.json';
import ImageUploader from 'quill-image-uploader';
import { textEditor } from './props/textEditor.props';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.core.css';
const props: any = defineProps(textEditor);
const emit: any = defineEmits(['fileToUpload', 'VEditChanged']);
const editor: any = ref(null);
const options: any = ref({});
if (props.placeholder) {
  options.value.placeholder = toRef(props, 'placeholder');
}
options.value['modules'] = {};
options.value['modules']['toolbar'] = {
  container: toolbar,
};
const modules = {
  name: 'imageUploader ',
  module: ImageUploader,
  options: {
    async upload(file: any) {
      emit('fileToUpload', file);
      return new Promise((resolve) => {
        watch(props, (currentValue) => {
          resolve(currentValue.uploadedFile);
        });
      });
    },
  },
};
const useChangeVEdit = () => {
  emit('VEditChanged', editor.value.getHTML());
};
onMounted(() => {
  // workaround :content & v-model:content
  editor.value.setHTML(props.defaultValue);
});
watch(props, (currentValue) => {
  // workaround :content & v-model:content
  editor.value.setHTML(currentValue.defaultValue);
  // Workaround https://github.com/vueup/vue-quill/issues/52
  // move cursor to end
  nextTick(() => {
    let q = editor.value.getQuill();
    q.setSelection(currentValue.length, 0, 'api');
    q.focus();
  });
});
</script>
<style lang="scss" scoped>
.ql-disabled {
  background: #f5f5f5;
}

.ql-toolbar.ql-snow {
  border: none;
  border-radius: 15px 15px 0 0;
  background: #f2f6f7;
}

.ql-container {
  border: none;
  margin-top: 5px;
}

.ql-editor {
  border: 1px solid #ccc;
  border-radius: 6px;
}

.ql-picker {
  .ql-picker-label {
    &::before {
      position: relative;
      bottom: 8px;
    }
  }
}
</style>
