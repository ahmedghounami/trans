'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
export const useChartExperimentalFeatures = ({
  params,
  store
}) => {
  useEnhancedEffect(() => {
    store.update(prevState => {
      return _extends({}, prevState, {
        experimentalFeatures: params.experimentalFeatures
      });
    });
  }, [store, params.experimentalFeatures]);
  return {};
};
useChartExperimentalFeatures.params = {
  experimentalFeatures: true
};
useChartExperimentalFeatures.getInitialState = ({
  experimentalFeatures
}) => {
  return {
    experimentalFeatures
  };
};