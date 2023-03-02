import { defineStore } from 'pinia';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useLanguageStore = defineStore('useLanguageStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      languages: [],
      language: {},
    };
  },
  actions: {
    async useLanguageList({
      onError = () => {
        /* */
      },
      onSuccess = () => {
        /* */
      },
    }: any) {
      try {
        const response: any = await fetch('/mock/lang.json', { headers: { 'Content-type': 'application/json' } });
        const res = await response.json();
        if (res) {
          this.languages = res;
          return onSuccess(res);
        } else {
          return onError('Server error');
        }
      } catch (e) {
        return onError(e);
      }
    },
  },
});
