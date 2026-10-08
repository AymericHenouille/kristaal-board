import { effect, EffectRef, inject, Injectable, Injector, runInInjectionContext, untracked } from '@angular/core';
import { BoardSceneStore } from '../stores';

@Injectable()
export class SceneManager {
  private readonly injector = inject(Injector);
  private readonly boardSceneStore = inject(BoardSceneStore);

  private _loadEffectRef: EffectRef | null = null;

  public load(): void {
    this.clearEffect();
    this._loadEffectRef = untracked(() => runInInjectionContext(this.injector, () => {
      return effect(() => {
        const scene = this.boardSceneStore.currentBoardScene();
        return runInInjectionContext(this.injector, scene.load.bind(scene));
      });
    }));
  }

  public update(delta: number): void {
    const scene = this.boardSceneStore.currentBoardScene();
    scene.update(delta);
  }

  public pause(): void {
    const scene = this.boardSceneStore.currentBoardScene();
    scene.pause();
  }

  public resume(): void {
    const scene = this.boardSceneStore.currentBoardScene();
    scene.resume();
  }

  public dispose(): void {
    const scene = this.boardSceneStore.currentBoardScene();
    scene.dispose();
    this.clearEffect();
  }

  private clearEffect(): void {
    if (this._loadEffectRef !== null)
      this._loadEffectRef.destroy();
  }
}

