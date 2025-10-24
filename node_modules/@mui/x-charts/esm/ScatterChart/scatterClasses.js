import generateUtilityClass from '@mui/utils/generateUtilityClass';
import composeClasses from '@mui/utils/composeClasses';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
export function getScatterUtilityClass(slot) {
  return generateUtilityClass('MuiScatter', slot);
}
export const scatterClasses = generateUtilityClasses('MuiScatter', ['root']);
export const useUtilityClasses = classes => {
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getScatterUtilityClass, classes);
};