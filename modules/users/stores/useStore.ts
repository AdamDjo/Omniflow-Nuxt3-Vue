import { defineStore } from 'pinia';

const getHeaders = () => {
  return headers;
};

export const useUsersStore = defineStore('useUsersStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      product: {},
      users: [],
      nbElements: 0,
      extraFields: [],
      loading: false,
      // all these properties will have their type inferred automatically
    };
  },
  actions: {
    async useAddUsers({ $data, onError, onSuccess }: any) {
      this.loading = true;
      try {
        const response: any = await fetch(useNuxtApp().$config.API + useNuxtApp().$config.WS_USERS_ADD, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify($data),
        });
        const res = await response.json();
        this.loading = false;
        if (response.status == 201 || response.status == 200) {
          return onSuccess(res);
        } else {
          return onError(res);
        }
      } catch (e) {
        this.loading = false;
        return onError(e);
      }
    },

    async useGetUsers({ $id, onError, onSuccess }: any) {
      this.product = {};
      this.loading = true;
      try {
        const response: any = await fetch(useNuxtApp().$config.API + useNuxtApp().$config.WS_USERS_GET + '/' + $id, {
          method: 'GET',
          headers: getHeaders(),
        });
        const res = await response.json();
        this.loading = false;
        if (response.status == 200) {
          this.product = res;
          return onSuccess(res);
        } else {
          return onError(errorServer);
        }
      } catch (e) {
        this.loading = false;
        return onError(e);
      }
    },

    async useUsersList({ onError, onSuccess }: any) {
      this.loading = true;
      try {
        const response: any = await fetch(useNuxtApp().$config.API + useNuxtApp().$config.WS_USERS_LIST, {
          method: 'GET',
          headers: getHeaders(),
        });
        const res = await response.json();

        this.loading = false;
        if (response.status == 200) {
          this.users = res.statusMessage.slice(0, 10);
          return onSuccess(res);
        } else {
          return onError(errorServer);
        }
      } catch (e) {
        this.loading = false;
        return onError(e);
      }
    },
    async useUsersItemsNumber({ $filters, onError, onSuccess }: any) {
      this.loading = true;
      try {
        useNuxtApp;
        const response: any = await fetch(useNuxtApp().$config.API + useNuxtApp().$config.WS_USERS_LIST, {
          method: 'GET',
          headers: { ...getHeaders(), ...$filters },
        });
        const res = await response.json();
        this.loading = false;
        if (response.status == 200) {
          this.nbElements = res.length();
          return onSuccess(res);
        } else {
          return onError(errorServer);
        }
      } catch (e) {
        this.loading = false;
        return onError(e);
      }
    },

    async useUpdateUsers({ $data, onError, onSuccess }: any) {
      this.loading = true;
      try {
        const response: any = await fetch(
          useNuxtApp().$config.API + useNuxtApp().$config.WS_USERS_UPDATE + '/' + $data.id,
          {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify($data),
          }
        );
        const res = await response.json();
        this.loading = false;
        if (response.status == 200) {
          return onSuccess(res);
        } else {
          return onError(res);
        }
      } catch (e) {
        this.loading = false;
        return onError(e);
      }
    },
    async useDeleteUsers({ $id, onError, onSuccess }: any) {
      this.loading = true;
   
      try {
        const response: any = await fetch(
          useNuxtApp().$config.API + useNuxtApp().$config.WS_USERS_DELETE + '/' + $id ,
          {
            method: 'DELETE',
            headers: getHeaders(),
          }
        );
        this.loading = false;
        if (response.status == 200) {
          return onSuccess();
        } else {
          return onError('error');
        }
      } catch (e) {
        this.loading = false;
        return onError(e);
      }
    },

    async useGetExtraFieldsUsers() {
      this.loading = true;
      const body = {};
      await useGetExtraFieldsList({
        headers: getHeaders(),
        body: body,
        onError: () => {
          this.loading = false;
        },
        onSuccess: (res: any) => {
          this.loading = false;
          if (res[0]) {
            this.extraFields = res[0].extraField;
          }
        },
      });
    },
  },
});
