"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRadarRotationIndex = useRadarRotationIndex;
var React = _interopRequireWildcard(require("react"));
var _useChartPolarAxis = require("../../internals/plugins/featurePlugins/useChartPolarAxis");
var _getSVGPoint = require("../../internals/getSVGPoint");
var _coordinateTransformation = require("../../internals/plugins/featurePlugins/useChartPolarAxis/coordinateTransformation");
var _useSelector = require("../../internals/store/useSelector");
var _getAxisIndex = require("../../internals/plugins/featurePlugins/useChartPolarAxis/getAxisIndex");
var _useStore = require("../../internals/store/useStore");
var _useSvgRef = require("../../hooks/useSvgRef");
var _useAxis = require("../../hooks/useAxis");
/**
 * This hook provides a function that from pointer event returns the rotation index.
 * @return {(event: { clientX: number; clientY: number }) => number | null} rotationIndexGetter Returns the rotation data index.
 */
function useRadarRotationIndex() {
  const svgRef = (0, _useSvgRef.useSvgRef)();
  const store = (0, _useStore.useStore)();
  const rotationAxis = (0, _useAxis.useRotationAxis)();
  const center = (0, _useSelector.useSelector)(store, _useChartPolarAxis.selectorChartPolarCenter);
  const rotationIndexGetter = React.useCallback(function rotationIndexGetter(event) {
    const element = svgRef.current;
    if (!element || !rotationAxis) {
      // Should never append
      throw new Error(`MUI X Charts: The ${!element ? 'SVG' : 'rotation axis'} was not found to compute radar dataIndex.`);
    }
    const svgPoint = (0, _getSVGPoint.getSVGPoint)(element, event);
    const rotation = (0, _coordinateTransformation.generateSvg2rotation)(center)(svgPoint.x, svgPoint.y);
    const rotationIndex = (0, _getAxisIndex.getAxisIndex)(rotationAxis, rotation);
    return rotationIndex;
  }, [center, rotationAxis, svgRef]);
  return rotationIndexGetter;
}