# Nuxt-3 DDD backoffice

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn preview

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxt.com).

## Special Directories

You can create the following extra directories, some of which have special behaviors.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.
Every component placed in this folder will be imported automatically.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/pages).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`.
Your can also use nuxt plugins to create custom vue directives or accede to nuxt hooks to create global vars

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/plugins).

### `public`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/public/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/public).

### `composables`

Nuxt 3 uses the `composables/` directory to automatically import your Vue composables into your application using auto-imports!

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/composables).

### `utils`

Nuxt 3 uses the utils/ directory to automatically import helper functions and other utilities throughout your application using auto-imports!

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/utils).

### `middleware`

Nuxt provides a customizable route middleware framework you can use throughout your application, ideal for extracting code that you want to run before navigating to a particular route.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/middleware).

### `modules`

The `modules` directory contains all needed modules features in the app. Inspired by the Domain-driven Design logique, each module contain the same folder structure of nuxt.

### `stores` (autoimported in modules with nuxt-3 DDD)

Pinia is a store library for Vue, it allows you to share a state across components/pages. If you are familiar with the Composition API, you might be thinking you can already share a global state with a simple export `const state = reactive({})`. This is true for single page applications but exposes your application to security vulnerabilities if it is server side rendered

More information about the usage of this directory in [the documentation](https://pinia.vuejs.org/ssr/nuxt.html).

## Setup Module with nuxt-3 DDD

Place the nuxt.modules.ts file in your root project.

Create your module and place this code in your index.ts module file as following

```ts
import { defineNuxtModule } from '@nuxt/kit';
import util from '../../nuxt.modules';
util.dirname = __dirname;

export default defineNuxtModule({
  // Default configuration options for your module
  defaults: {},
  // register routes, components, autoimports...
  hooks: util.hooks(),
  // set layouts, global plugins, middleware
  setup(options: any, nuxt: any) {
    util.setup(options, nuxt);
  },
});
```

Finally, add the module in global nuxt.config.js

```js
  export default defineNuxtConfig({
    ...
    modules: [
      ...
      '~/modules/login',
    ],
    ...
  }
```

After that all files placed in le special directory of your module (like special folder) will be autoimmported and routes will be created with prefix your module name : `/login`, `/login/verify`...
