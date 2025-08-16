export interface BarClasses {
  /** Styles applied to the bar plot element. */
  root: string;
  /** Styles applied to the group surrounding a series' bar elements. */
  series: string;
  /** Styles applied to the group surrounding a series' labels. */
  seriesLabels: string;
}
export type BarClassKey = keyof BarClasses;
export declare function getBarUtilityClass(slot: string): string;
export declare const barClasses: BarClasses;
export declare const useUtilityClasses: (classes?: Partial<BarClasses>) => Record<"series" | "root" | "seriesLabels", string>;