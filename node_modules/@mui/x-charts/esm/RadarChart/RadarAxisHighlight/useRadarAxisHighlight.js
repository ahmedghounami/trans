import { useRadiusAxes } from "../../hooks/useAxis.js";
import { useRadarSeries } from "../../hooks/useRadarSeries.js";
import { useRotationScale } from "../../hooks/useScale.js";
import { useSelector } from "../../internals/store/useSelector.js";
import { useStore } from "../../internals/store/useStore.js";
import { useChartContext } from "../../context/ChartProvider/useChartContext.js";
import { selectorChartPolarCenter } from "../../internals/plugins/featurePlugins/useChartPolarAxis/index.js";
import { selectorChartsInteractionRotationAxisIndex, selectorChartsInteractionRotationAxisValue } from "../../internals/plugins/featurePlugins/useChartPolarAxis/useChartPolarInteraction.selectors.js";
export function useRadarAxisHighlight() {
  const radarSeries = useRadarSeries();
  const rotationScale = useRotationScale();
  const {
    radiusAxis,
    radiusAxisIds
  } = useRadiusAxes();
  const {
    instance
  } = useChartContext();
  const store = useStore();
  const rotationAxisIndex = useSelector(store, selectorChartsInteractionRotationAxisIndex);
  const rotationAxisValue = useSelector(store, selectorChartsInteractionRotationAxisValue);
  const center = useSelector(store, selectorChartPolarCenter);
  const highlightedIndex = rotationAxisIndex;
  if (!rotationScale) {
    return null;
  }
  if (highlightedIndex === null || highlightedIndex === -1) {
    return null;
  }
  if (radarSeries === undefined || radarSeries.length === 0) {
    return null;
  }
  const metric = radiusAxisIds[highlightedIndex];
  const radiusScale = radiusAxis[metric].scale;
  const angle = rotationScale(rotationAxisValue);
  const radius = radiusScale.range()[1];
  return {
    center,
    radius,
    instance,
    highlightedIndex,
    highlightedMetric: metric,
    highlightedAngle: angle,
    series: radarSeries,
    points: radarSeries.map(series => {
      const value = series.data[highlightedIndex];
      const r = radiusScale(value);
      const [x, y] = instance.polar2svg(r, angle);
      const returnedValue = {
        x,
        y,
        r,
        angle,
        value
      };
      return returnedValue;
    })
  };
}