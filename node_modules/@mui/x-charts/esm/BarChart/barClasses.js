import generateUtilityClass from '@mui/utils/generateUtilityClass';
import composeClasses from '@mui/utils/composeClasses';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
export function getBarUtilityClass(slot) {
  return generateUtilityClass('MuiBar', slot);
}
export const barClasses = generateUtilityClasses('MuiBar', ['root', 'series', 'seriesLabels']);
export const useUtilityClasses = classes => {
  const slots = {
    root: ['root'],
    series: ['series'],
    seriesLabels: ['seriesLabels']
  };
  return composeClasses(slots, getBarUtilityClass, classes);
};