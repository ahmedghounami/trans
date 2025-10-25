import { ChartDrawingArea } from "../hooks/index.js";
import { TickItemType } from "../hooks/useTicks.js";
import { ChartsYAxisProps } from "../models/index.js";
export declare function shortenLabels(visibleLabels: TickItemType[], drawingArea: Pick<ChartDrawingArea, 'top' | 'height' | 'bottom'>, maxWidth: number, isRtl: boolean, tickLabelStyle: ChartsYAxisProps['tickLabelStyle']): Map<TickItemType, string>;