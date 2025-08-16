"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.barClasses = void 0;
exports.getBarUtilityClass = getBarUtilityClass;
exports.useUtilityClasses = void 0;
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
function getBarUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiBar', slot);
}
const barClasses = exports.barClasses = (0, _generateUtilityClasses.default)('MuiBar', ['root', 'series', 'seriesLabels']);
const useUtilityClasses = classes => {
  const slots = {
    root: ['root'],
    series: ['series'],
    seriesLabels: ['seriesLabels']
  };
  return (0, _composeClasses.default)(slots, getBarUtilityClass, classes);
};
exports.useUtilityClasses = useUtilityClasses;