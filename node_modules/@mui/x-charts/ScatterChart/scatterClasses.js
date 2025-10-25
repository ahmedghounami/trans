"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScatterUtilityClass = getScatterUtilityClass;
exports.useUtilityClasses = exports.scatterClasses = void 0;
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
function getScatterUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiScatter', slot);
}
const scatterClasses = exports.scatterClasses = (0, _generateUtilityClasses.default)('MuiScatter', ['root']);
const useUtilityClasses = classes => {
  const slots = {
    root: ['root']
  };
  return (0, _composeClasses.default)(slots, getScatterUtilityClass, classes);
};
exports.useUtilityClasses = useUtilityClasses;