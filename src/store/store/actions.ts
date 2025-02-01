import { ActionContext, ActionTree } from 'vuex';

import { setRestaurant } from '@boot/axios';
import { getBaseStore, getStoreByURL } from '@api/store';

import { StateInterface } from '../index';
import { IStoreState } from './state';

const actions: ActionTree<IStoreState, StateInterface> = {
  async loadStore(
    context: ActionContext<IStoreState, StateInterface>,
  ) {
    try {
      const baseStore = getBaseStore();

      const restaurantURL = location.hostname.split('.')[0];

      const store = await getStoreByURL(restaurantURL);
      setRestaurant(store.id);

      context.commit('setStore', {
        ...baseStore,
        ...store,
        theme: {
          ...store.theme,
          banner: store.banner,
        },
      });
    } catch (error) {
      location.href = 'https://x-hub.co';
    }
  },
};

export default actions;
