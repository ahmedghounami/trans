type Listener<T> = (value: T) => void;
export declare class Store<State> {
  state: State;
  private listeners;
  private isUpdating;
  private needsReset;
  static create<T>(state: T): Store<T>;
  constructor(state: State);
  subscribe: (fn: Listener<State>) => () => void;
  getSnapshot: () => State;
  setState(newState: State): void;
  update(changes: Partial<State>): void;
  set<T>(key: keyof State, value: T): void;
}
export {};