import type * as React from 'react';
import { ChartsBaseSlots } from "../../models/slots/chartsBaseSlots.js";
import { ChartsIconSlots } from "../../models/slots/chartsIconSlots.js";
export type ChartsSlots = ChartsBaseSlots & ChartsIconSlots;
export type ChartsSlotProps = { [key in keyof ChartsSlots]: React.ComponentProps<ChartsSlots[key]> };
export declare const defaultSlotsMaterial: ChartsSlots;