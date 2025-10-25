import { TickItemType } from "../hooks/useTicks.js";
import { ChartsXAxisProps, ComputedXAxis } from "../models/axis.js";
export declare function getVisibleLabels<T extends TickItemType>(xTicks: T[], {
  tickLabelStyle: style,
  tickLabelInterval,
  tickLabelMinGap,
  reverse,
  isMounted,
  isXInside
}: Pick<ChartsXAxisProps, 'tickLabelInterval' | 'tickLabelStyle'> & Pick<ComputedXAxis, 'reverse'> & {
  isMounted: boolean;
  tickLabelMinGap: NonNullable<ChartsXAxisProps['tickLabelMinGap']>;
  isXInside: (x: number) => boolean;
}): Set<T>;