import * as React from 'react';
import { ChartBaseButtonProps, ChartBaseIconButtonProps } from "./chartsBaseSlotProps.js";
export interface ChartsBaseSlots {
  baseButton: React.ComponentType<ChartBaseButtonProps>;
  baseIconButton: React.ComponentType<ChartBaseIconButtonProps>;
}