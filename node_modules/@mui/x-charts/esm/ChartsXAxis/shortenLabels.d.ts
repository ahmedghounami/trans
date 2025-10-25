import { TickItemType } from "../hooks/useTicks.js";
import { ChartsXAxisProps } from "../models/axis.js";
import { ChartDrawingArea } from "../hooks/useDrawingArea.js";
export declare function shortenLabels(visibleLabels: Set<TickItemType>, drawingArea: Pick<ChartDrawingArea, 'left' | 'width' | 'right'>, maxHeight: number, isRtl: boolean, tickLabelStyle: ChartsXAxisProps['tickLabelStyle']): Map<TickItemType, string>;