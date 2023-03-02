<h1 align="center">Module Products</h1>

> This module is made to manage products

---

## Detailed Start

### 📦 Npm packages used

- [pinia] (v2.x)

### 🚀 Module dependencies

- [modules][language] - required
- [modules][ui] - optionally

---

## Setup Module

Add the module in global nuxt.config.js

```js
  export default defineNuxtConfig({
    ...
    modules: [
      ...
      '~/modules/products',
    ],
    ...
  }
```

## DEV Environnement

- [DEMO](https://???/)
- [env]
  - WS_PRODUCTS_ADD = /products
  - WS_PRODUCTS_UPDATE = /products
  - WS_PRODUCTS_GET = /products
  - WS_PRODUCTS_LIST = /products
  - WS_PRODUCTS_DELETE = /products
