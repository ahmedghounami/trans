/* We need to import the shim because React 17 does not support the `useSyncExternalStore` API.
 * More info: https://github.com/mui/mui-x/issues/18303#issuecomment-2958392341 */
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector';
const defaultCompare = Object.is;
export const useSelector = (store, selector, args = [], equals = defaultCompare) => {
  const selectorWithArgs = state => selector(state, ...args);
  return useSyncExternalStoreWithSelector(store.subscribe, store.getSnapshot, store.getSnapshot, selectorWithArgs, equals);
};