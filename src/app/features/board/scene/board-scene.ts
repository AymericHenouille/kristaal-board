import { Signal } from '@angular/core';
import { Scene } from 'three';

export interface BoardScene {
  readonly scene: Signal<Scene>;
  load(): void;
  update(delta: number): void;
  pause(): void;
  resume(): void;
  dispose(): void;
}
