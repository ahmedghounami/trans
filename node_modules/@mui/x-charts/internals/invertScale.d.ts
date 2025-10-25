import { D3Scale } from "../models/axis.js";
export declare function invertScale<T>(scale: D3Scale, data: readonly T[], value: number): number | Date | T;