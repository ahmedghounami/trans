"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChartExperimentalFeatures = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _useEnhancedEffect = _interopRequireDefault(require("@mui/utils/useEnhancedEffect"));
const useChartExperimentalFeatures = ({
  params,
  store
}) => {
  (0, _useEnhancedEffect.default)(() => {
    store.update(prevState => {
      return (0, _extends2.default)({}, prevState, {
        experimentalFeatures: params.experimentalFeatures
      });
    });
  }, [store, params.experimentalFeatures]);
  return {};
};
exports.useChartExperimentalFeatures = useChartExperimentalFeatures;
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