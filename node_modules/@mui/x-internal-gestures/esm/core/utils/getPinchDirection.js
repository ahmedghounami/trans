const DIRECTION_THRESHOLD = 0;
export const getPinchDirection = velocity => {
  if (velocity > DIRECTION_THRESHOLD) {
    return 1; // Zooming in
  }
  if (velocity < -DIRECTION_THRESHOLD) {
    return -1; // Zooming out
  }
  return 0; // No significant movement
};