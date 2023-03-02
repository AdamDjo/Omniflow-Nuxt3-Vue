<h1 align="center">NavigationPage</h1>

> Description of component & how us it

---

## Usage

This component is used for the navigation page. The component contains the back button, title, title description and the cards for the navigation.

import:
const NavigationPage = () => import('@UI/components/Templates/NavigationPage/NavigationPage.vue');

## API

...

### Props

    dataCards: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    backUrl: {
      type: String,
      required: true,
    },

#### :propExample <sup>Array - default: [] - Required prop<sup>

:data-cards="dataCards"
:title="$t('rating.rating')"
:description="$t('engage.description')"
:back-url="localePath('isocode-engage')"

3 cards data example:

const dataCards = computed(() => {
return [
{
title: useNuxtApp().$i18n.t('rating.blackList'),
description: useNuxtApp().$i18n.t('engage.description'),
url: useNuxtApp().$localePath('isocode-rating-blacklist'),
id: 'engagePageBlock1',
tag: useGetConfig('engage', 'storie').diasbled,
show: useGetPermissions('view-story') && useGetConfig('engage', 'storie').visible,
disabled: useGetConfig('engage', 'storie').diasbled,
},
{
title: useNuxtApp().$i18n.t('rating.stopWords'),
description: useNuxtApp().$i18n.t('engage.collectionsStories'),
},
{
title: useNuxtApp().$i18n.t('rating.moderate'),
description: useNuxtApp().$i18n.t('engage.collectionsStories'),
},
];
});

### Events

#### @eventExample <sup>()<sup>

...

## Dependencies

...

## Roadmap

...
