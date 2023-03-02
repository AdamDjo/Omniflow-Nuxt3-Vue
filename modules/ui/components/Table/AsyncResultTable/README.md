<h1 align="center">Component AsyncResultTable</h1>

> Return a result table

---

## API

### Props

#### :propExample <sup>Array - default: [] - Required prop<sup>

DEtail prop
...

### Events

#### @eventExample <sup>()<sup>

Detail

- `param1`: description param
- `param1`: description param
  ...

## Dependencies

...

## Example

<LazyUiTableAsyncResultTable
v-if="langs.length > 0"
:res="translations"
:filters="bodyFilter"
:nb-elements="nbElements"
:cols="useAddLangCols()"
:custom-cols="['key', 'type']"
:has-edit-prem="useGetPermissions('res:e-translation')"
:has-delete-prem="useGetPermissions('res:d-translation')"
edit-path="translate-id"
:search-placeholder="$t('translate.searchConstant')"
        :msg-no-data="$t('translate.Nodata')"
@removeItem="useRemoveTranslate"
@filterData="(data) => useFilterData(data)" >
<template #key="{ value, record, index }">

<p><h1> A bold item title: </h1><strong>{{ value }}</strong></p>
<p>Item type for some reason: {{ record.type }}</p>
<p>with index : {{index}}</p>
</template>

        <template #type="{ value, record, index }">
          <p> {{ value == 'B2B' ? ('type : '+ value) : 'not B2B type' }}</p>
        </template>

</LazyUiTableAsyncResultTable>
