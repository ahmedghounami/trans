import type { ScaleBand, ScalePoint } from '@mui/x-charts-vendor/d3-scale';
import { AxisConfig, type AxisGroup } from "../models/axis.js";
import type { TickParams } from "./useTicks.js";
export type GroupedTickItemType = {
  /**
   * This property is undefined only if it's the tick closing the last band
   */
  value?: any;
  formattedValue?: string;
  offset: number;
  labelOffset: number;
  /**
   * In band scales, we remove some redundant ticks.
   */
  ignoreTick?: boolean;
  dataIndex?: number;
  /**
   * The index of the group this tick belongs to. If `getGrouping` returns `[[0, 1], [2, 3]]`
   * both ticks with value `0` and `2` will have `groupIndex: 0`, and both ticks with value `1` and `3` will have `groupIndex: 1`.
   */
  groupIndex?: number;
};
export declare function useTicksGrouped(options: {
  scale: ScaleBand<any> | ScalePoint<any>;
  valueFormatter?: AxisConfig['valueFormatter'];
  direction: 'x' | 'y';
  groups: AxisGroup[];
} & Pick<TickParams, 'tickNumber' | 'tickInterval' | 'tickPlacement' | 'tickLabelPlacement'>): GroupedTickItemType[];