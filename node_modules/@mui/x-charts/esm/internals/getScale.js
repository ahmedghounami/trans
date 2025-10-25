import { scaleLog, scalePow, scaleSqrt, scaleTime, scaleUtc, scaleLinear } from '@mui/x-charts-vendor/d3-scale';
import { scaleSymlog } from "./symlogScale.js";
export function getScale(scaleType, domain, range) {
  switch (scaleType) {
    case 'log':
      return scaleLog(domain, range);
    case 'pow':
      return scalePow(domain, range);
    case 'sqrt':
      return scaleSqrt(domain, range);
    case 'time':
      return scaleTime(domain, range);
    case 'utc':
      return scaleUtc(domain, range);
    case 'symlog':
      return scaleSymlog(domain, range);
    default:
      return scaleLinear(domain, range);
  }
}