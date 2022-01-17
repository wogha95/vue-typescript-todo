/* eslint-disable @typescript-eslint/no-namespace */
export namespace VueEvent {
  export interface Input<T extends EventTarget> extends InputEvent {
    target: T;
  }
}
