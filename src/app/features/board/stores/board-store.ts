import { computed, inject } from '@angular/core';
import { pipe, tap } from 'rxjs';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { WebGLRenderer } from 'three';
import { BOARD_STORE_INITIAL_STATE_TOKEN } from '../tokens';
import { BoardState } from './states';

export const BoardStore = signalStore(
  withState(() => inject(BOARD_STORE_INITIAL_STATE_TOKEN)),
  withComputed((store) => ({
    renderer: computed(() => {
      const canvas = store.canvas();
      const options = store.options();
      return new WebGLRenderer({
        canvas: canvas !== null ? canvas : undefined,
        ...options,
      });
    }),
  })),
  withMethods((store) => ({
    setCanvas: rxMethod<{ canvas: HTMLCanvasElement }>(
      pipe(
        tap(({ canvas }) => {
          patchState(store, (state) => ({
            ...state,
            canvas,
          }));
        }),
      ),
    ),
    setOptions: rxMethod<Partial<BoardState['options']>>(
      pipe(
        tap((options) => {
          patchState(store, (state) => ({
            ...state,
            options: {
              ...state.options,
              ...options,
            },
          }));
        }),
      ),
    ),
  }))
);
