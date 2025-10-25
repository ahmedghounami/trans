import _extends from "@babel/runtime/helpers/esm/extends";
import useEventCallback from '@mui/utils/useEventCallback';
import { fastObjectShallowCompare } from '@mui/x-internals/fastObjectShallowCompare';
export const useChartInteraction = ({
  store
}) => {
  const cleanInteraction = useEventCallback(function cleanInteraction() {
    store.update(prev => {
      return _extends({}, prev, {
        interaction: {
          pointer: null,
          item: null
        }
      });
    });
  });
  const removeItemInteraction = useEventCallback(function removeItemInteraction(itemToRemove) {
    store.update(prev => {
      const prevItem = prev.interaction.item;
      if (!itemToRemove) {
        // Remove without taking care of the current item
        return prevItem === null ? prev : _extends({}, prev, {
          interaction: _extends({}, prev.interaction, {
            item: null
          })
        });
      }
      if (prevItem === null || Object.keys(itemToRemove).some(key => itemToRemove[key] !== prevItem[key])) {
        // The current item is already different from the one to remove. No need to clean it.
        return prev;
      }
      return _extends({}, prev, {
        interaction: _extends({}, prev.interaction, {
          item: null
        })
      });
    });
  });
  const setItemInteraction = useEventCallback(function setItemInteraction(newItem) {
    store.update(prev => {
      if (fastObjectShallowCompare(prev.interaction.item, newItem)) {
        return prev;
      }
      return _extends({}, prev, {
        interaction: _extends({}, prev.interaction, {
          item: newItem
        })
      });
    });
  });
  const setPointerCoordinate = useEventCallback(function setPointerCoordinate(coordinate) {
    store.update(prev => _extends({}, prev, {
      interaction: _extends({}, prev.interaction, {
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
useChartInteraction.getInitialState = () => ({
  interaction: {
    item: null,
    pointer: null
  }
});
useChartInteraction.params = {};