import generateUtilityClass from '@mui/utils/generateUtilityClass';
import composeClasses from '@mui/utils/composeClasses';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
export function getPieUtilityClass(slot) {
  return generateUtilityClass('MuiPieChart', slot);
}
export const pieClasses = generateUtilityClasses('MuiPieChart', ['root', 'series', 'seriesLabels']);
export const useUtilityClasses = classes => {
  const slots = {
    root: ['root'],
    series: ['series'],
    seriesLabels: ['seriesLabels']
  };
  return composeClasses(slots, getPieUtilityClass, classes);
};