import { Modal, notification } from 'ant-design-vue';
import dayjs from 'dayjs';

export const headers: any = {
  // 'Content-Type': 'application/json',
};
export const errorServer = 'error server';

import icoConfig from '@UI/assets/img/iconConfig.svg';
import icoConfigOn from '@UI/assets/img/iconConfigActive.svg';
import thumbExcel from '@UI/assets/img/thumbexcel.svg';
import thumbPdf from '@UI/assets/img/pdfThumb.svg';
import thumbDoc from '@UI/assets/img/docThumb.svg';
import icoProducts from '@UI/assets/img/iconProducts.svg';
import icoProductsOn from '@UI/assets/img/iconProductsActive.svg';

const iconsMenu: any = {
  icoConfigOn: icoConfigOn,
  icoConfig: icoConfig,
  icoProducts: icoProducts,
  icoProductsOn: icoProductsOn,
};

export const iconsNav: any = iconsMenu;

export const useSelectFilterOption = (input: any, option: any) => {
  const data = option.componentOptions.children[0].text.toLowerCase();
  const dataInput = input.toLowerCase();
  return data.indexOf(dataInput) >= 0;
};

export const useFilters = (payLoad: any, $filters: any, keys: any) => {
  payLoad['query'] = {};
  payLoad['search'] = {
    term: $filters.search || '',
    fields: keys,
  };
  if ($filters.sort.order != undefined) {
    payLoad['sort'] = { [$filters.sort.field]: $filters.sort.order == 'ascend' ? 1 : -1 };
  } else {
    payLoad['sort'] = { 'audit.modifiedTime': -1 };
  }
  if ($filters.period?.length) {
    payLoad['startDate'] = $filters.startDate;
    payLoad['endDate'] = $filters.endDate;
  }
};

export const useSortByKey = (array: any, key: any) => {
  return array.sort(function (a: any, b: any) {
    const x = a[key];
    const y = b[key];
    if (x < y) {
      return -1;
    }
    return x > y ? 1 : 0;
  });
};

export const useGetExtraFieldsList = async ({ body, onError, onSuccess }: any) => {
  const api =
    process.env.NODE_ENV != 'production' && !useNuxtApp().$config.public.DEBUG
      ? useNuxtApp().$config.public.API_COMMON
      : useNuxtApp().$config.public.API;
  try {
    const response: any = await fetch(api + useNuxtApp().$config.WS_EXTRA_FIELDS_LIST, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });
    const res = await response.json();
    if (response.status == 200) {
      return onSuccess(res);
    } else {
      return onError(errorServer);
    }
  } catch (e) {
    return onError(e);
  }
};

export const useTranslate = (data: any) => {
  const translate = (obj: any) => {
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        if (typeof obj[property] == 'object') {
          if (obj[property].localePath) {
            obj[property] = useNuxtApp().$localePath(obj[property].localePath);
          } else {
            translate(obj[property]);
          }
        } else if (typeof obj[property] == 'string' && /\$i18n/.test(obj[property])) {
          const translatedText = useNuxtApp().$i18n.t(obj[property].replace('$i18n.', ''));
          obj[property] = translatedText;
        }
      }
    }
  };
  translate(data);
  return data;
};

export const useOpenNotification = (name: any, type: any) => {
  notification[type]({
    message: name,
    description: '',
    duration: 3,
    class: type,
  });
};

export const useCustomModifiedTime = (a: Array<any>, b: any) => {
  return dayjs(dayjs(b['audit.modifiedTime'])).isValid()
    ? dayjs(b['audit.modifiedTime']).format(useNuxtApp().$i18n.t('dateFormat'))
    : '';
};

export const useCustomDate = (record: any) => {
  return dayjs(dayjs(record.value)).isValid() ? dayjs(record.value).format(useNuxtApp().$i18n.t('dateFormat')) : '';
};

export const useCustomName = (record: any) => {
  const idx = record.find(
    (e: Record<string, unknown>) => e.isoCode == useNuxtApp().$i18n.locale.value && e.value != ''
  );
  if (idx !== undefined) {
    return idx.value;
  } else {
    const idy = record.find((e: Record<string, unknown>) => e.value != '');
    return idy ? idy.value : '';
  }
};

export const useCustomLocalList = (record: any) => {
  const value = record.value ? record.value : record;
  const idx = value.find((e: Record<string, unknown>) => e.isoCode == useNuxtApp().$i18n.locale.value && e.value != '');
  return idx ? idx.value : '';
};

const useResultNofitication = (message: string, path: any, type: string) => {
  if (message) {
    useOpenNotification(message, type);
  } else {
    useOpenNotification(useNuxtApp().$i18n.t('error'), type);
  }
  if (path) {
    navigateTo(path);
  }
};
export const useOnError: any = (message: string, path: any) => {
  useResultNofitication(message, path, 'error');
};

export const useOnSuccess: any = (message: string, path: any) => {
  useResultNofitication(message, path, 'success');
};

export const useOnWarning = (message: string, path: any) => {
  useResultNofitication(message, path, 'warning');
};

export const useRateFormatter = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
};

export const useModalConfirm = (
  title: string,
  content: string,
  okText: string,
  cancelText: string,
  useOnOk: any,
  data: any,
  useOnCancel: any
) => {
  Modal.confirm({
    title: title,
    content: content,
    onOk() {
      useOnOk(data);
    },
    okText: okText,
    cancelText: cancelText,
    onCancel() {
      useOnCancel(data);
    },
  });
};

export const useCustomThumbnail = (extension: string, defaultUrl: string) => {
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

export const useCustomFilters = (filters: any, payLoad: any) => {
  if (filters.customFilters) {
    for (const [key, value] of Object.entries(filters.customFilters)) {
      if (value.length) {
        payLoad['query'][key] = { operator: 'IN', value: value };
      }
    }
  }
  return payLoad;
};

export const useTriggerTabError = (tabNumber) => {
  setTimeout(function () {
    const elem = document.getElementsByClassName('ant-tabs-tabpane');
    for (let i = elem.length - 1; i >= 0; i--) {
      const errors = elem[i].getElementsByClassName('ant-form-item-explain-error');
      const errorInfo = elem[i].getElementsByClassName('error-required-fields');
      if (errors.length || errorInfo.length) tabNumber.value = (i + 1).toString();
    }
  }, 100);
};

export const useGoToPrev = (bodyFilter, size) => {
  const $router: any = useRouter();
  const $route: any = useRoute();
  if ((bodyFilter.value.current - 1) * bodyFilter.value.pagesize + 1 == size && bodyFilter.value.current > 1) {
    bodyFilter.value.current--;
    $router.push({ path: $route.fullPath, query: { current: bodyFilter.value.current } });
  }
};
