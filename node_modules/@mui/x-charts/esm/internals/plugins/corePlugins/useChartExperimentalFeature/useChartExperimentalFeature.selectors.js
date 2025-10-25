import { createSelector } from "../../utils/selectors.js";
export const selectorChartExperimentalFeaturesState = state => state.experimentalFeatures;
export const selectorPreferStrictDomainInLineCharts = createSelector([selectorChartExperimentalFeaturesState], features => Boolean(features?.preferStrictDomainInLineCharts));