import { HighlightScope } from "./highlightConfig.types.js";
import { HighlightItemData } from "./useChartHighlight.types.js";
export declare function createIsFaded(highlightScope: HighlightScope | null | undefined, highlightedItem: HighlightItemData | null): (item: HighlightItemData | null) => boolean;