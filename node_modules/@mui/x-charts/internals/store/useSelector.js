"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelector = void 0;
var _withSelector = require("use-sync-external-store/shim/with-selector");
/* We need to import the shim because React 17 does not support the `useSyncExternalStore` API.
 * More info: https://github.com/mui/mui-x/issues/18303#issuecomment-2958392341 */

const defaultCompare = Object.is;
const useSelector = (store, selector, args = [], equals = defaultCompare) => {
  const selectorWithArgs = state => selector(state, ...args);
  return (0, _withSelector.useSyncExternalStoreWithSelector)(store.subscribe, store.getSnapshot, store.getSnapshot, selectorWithArgs, equals);
};
exports.useSelector = useSelector;