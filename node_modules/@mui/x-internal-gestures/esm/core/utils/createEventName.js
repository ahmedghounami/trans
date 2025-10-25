/**
 * Creates the event name for a specific gesture and phase
 */
export function createEventName(gesture, phase) {
  return `${gesture}${phase === 'ongoing' ? '' : phase.charAt(0).toUpperCase() + phase.slice(1)}`;
}