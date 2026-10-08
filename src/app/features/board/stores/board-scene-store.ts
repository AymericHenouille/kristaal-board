import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { BOARD_SCENE_INITIAL_VALUE_TOKEN } from '../tokens';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { BoardScene } from '../scene';
import { pipe, tap } from 'rxjs';

export const BoardSceneStore = signalStore(
  withState(() => inject(BOARD_SCENE_INITIAL_VALUE_TOKEN)),
  withComputed((store) => ({
    currentScene: computed(() => {
      const currentBoardScene = store.currentBoardScene();
      return currentBoardScene.scene();
    }),
  })),
  withMethods((store) => ({
    setBoardScene: rxMethod<BoardScene>(
      pipe(
        tap((scene) => {
          const currentScene = store.currentBoardScene();
          currentScene.dispose();
          patchState(store, (state) => ({
            ...state,
            currentBoardScene: scene,
          }));
        }),
      ),
    ),
  })),
);
