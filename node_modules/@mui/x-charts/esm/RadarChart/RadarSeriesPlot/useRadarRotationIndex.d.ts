/**
 * This hook provides a function that from pointer event returns the rotation index.
 * @return {(event: { clientX: number; clientY: number }) => number | null} rotationIndexGetter Returns the rotation data index.
 */
export declare function useRadarRotationIndex(): (event: {
  clientX: number;
  clientY: number;
}) => number;