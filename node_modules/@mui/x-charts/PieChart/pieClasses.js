"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPieUtilityClass = getPieUtilityClass;
exports.useUtilityClasses = exports.pieClasses = void 0;
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
function getPieUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiPieChart', slot);
}
const pieClasses = exports.pieClasses = (0, _generateUtilityClasses.default)('MuiPieChart', ['root', 'series', 'seriesLabels']);
const useUtilityClasses = classes => {
  const slots = {
    root: ['root'],
    series: ['series'],
    seriesLabels: ['seriesLabels']
  };
  return (0, _composeClasses.default)(slots, getPieUtilityClass, classes);
};
exports.useUtilityClasses = useUtilityClasses;