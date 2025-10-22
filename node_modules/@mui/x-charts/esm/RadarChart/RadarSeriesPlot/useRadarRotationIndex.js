import * as React from 'react';
import { selectorChartPolarCenter } from "../../internals/plugins/featurePlugins/useChartPolarAxis/index.js";
import { getSVGPoint } from "../../internals/getSVGPoint.js";
import { generateSvg2rotation } from "../../internals/plugins/featurePlugins/useChartPolarAxis/coordinateTransformation.js";
import { useSelector } from "../../internals/store/useSelector.js";
import { getAxisIndex } from "../../internals/plugins/featurePlugins/useChartPolarAxis/getAxisIndex.js";
import { useStore } from "../../internals/store/useStore.js";
import { useSvgRef } from "../../hooks/useSvgRef.js";
import { useRotationAxis } from "../../hooks/useAxis.js";

/**
 * This hook provides a function that from pointer event returns the rotation index.
 * @return {(event: { clientX: number; clientY: number }) => number | null} rotationIndexGetter Returns the rotation data index.
 */
export function useRadarRotationIndex() {
  const svgRef = useSvgRef();
  const store = useStore();
  const rotationAxis = useRotationAxis();
  const center = useSelector(store, selectorChartPolarCenter);
  const rotationIndexGetter = React.useCallback(function rotationIndexGetter(event) {
    const element = svgRef.current;
    if (!element || !rotationAxis) {
      // Should never append
      throw new Error(`MUI X Charts: The ${!element ? 'SVG' : 'rotation axis'} was not found to compute radar dataIndex.`);
    }
    const svgPoint = getSVGPoint(element, event);
    const rotation = generateSvg2rotation(center)(svgPoint.x, svgPoint.y);
    const rotationIndex = getAxisIndex(rotationAxis, rotation);
    return rotationIndex;
  }, [center, rotationAxis, svgRef]);
  return rotationIndexGetter;
}