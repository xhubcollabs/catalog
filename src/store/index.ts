import { store as storeWrapper } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex';

import store from './store';
import cart from './cart';
import user from './user';
import products from './products';
import { IStoreState } from './store/state';
import { ICartState } from './cart/state';
import { IUserState } from './user/state';
import { IProductsState } from './products/state';

// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  store: IStoreState;
  cart: ICartState;
  user: IUserState;
  products: IProductsState;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> =
  Symbol('vuex-key');

export default storeWrapper(function(/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      store,
      cart,
      user,
      products,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
