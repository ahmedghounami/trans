"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChartInteraction = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _fastObjectShallowCompare = require("@mui/x-internals/fastObjectShallowCompare");
const useChartInteraction = ({
  store
}) => {
  const cleanInteraction = (0, _useEventCallback.default)(function cleanInteraction() {
    store.update(prev => {
      return (0, _extends2.default)({}, prev, {
        interaction: {
          pointer: null,
          item: null
        }
      });
    });
  });
  const removeItemInteraction = (0, _useEventCallback.default)(function removeItemInteraction(itemToRemove) {
    store.update(prev => {
      const prevItem = prev.interaction.item;
      if (!itemToRemove) {
        // Remove without taking care of the current item
        return prevItem === null ? prev : (0, _extends2.default)({}, prev, {
          interaction: (0, _extends2.default)({}, prev.interaction, {
            item: null
          })
        });
      }
      if (prevItem === null || Object.keys(itemToRemove).some(key => itemToRemove[key] !== prevItem[key])) {
        // The current item is already different from the one to remove. No need to clean it.
        return prev;
      }
      return (0, _extends2.default)({}, prev, {
        interaction: (0, _extends2.default)({}, prev.interaction, {
          item: null
        })
      });
    });
  });
  const setItemInteraction = (0, _useEventCallback.default)(function setItemInteraction(newItem) {
    store.update(prev => {
      if ((0, _fastObjectShallowCompare.fastObjectShallowCompare)(prev.interaction.item, newItem)) {
        return prev;
      }
      return (0, _extends2.default)({}, prev, {
        interaction: (0, _extends2.default)({}, prev.interaction, {
          item: newItem
        })
      });
    });
  });
  const setPointerCoordinate = (0, _useEventCallback.default)(function setPointerCoordinate(coordinate) {
    store.update(prev => (0, _extends2.default)({}, prev, {
      interaction: (0, _extends2.default)({}, prev.interaction, {
        pointer: coordinate
      })
    }));
  });
  return {
    instance: {
      cleanInteraction,
      setItemInteraction,
      removeItemInteraction,
      setPointerCoordinate
    }
  };
};
exports.useChartInteraction = useChartInteraction;
useChartInteraction.getInitialState = () => ({
  interaction: {
    item: null,
    pointer: null
  }
});
useChartInteraction.params = {};