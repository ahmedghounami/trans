import * as React from 'react';
import { ChartsTooltipContainerProps } from "./ChartsTooltipContainer.js";
import { TriggerOptions } from "./utils.js";
export interface ChartsTooltipProps<T extends TriggerOptions = TriggerOptions> extends Omit<ChartsTooltipContainerProps<T>, 'children'> {}
/**
 * Demos:
 *
 * - [ChartsTooltip](https://mui.com/x/react-charts/tooltip/)
 *
 * API:
 *
 * - [ChartsTooltip API](https://mui.com/x/api/charts/charts-tool-tip/)
 */
declare function ChartsTooltip(props: ChartsTooltipProps): React.JSX.Element;
declare namespace ChartsTooltip {
  var propTypes: any;
}
export { ChartsTooltip };