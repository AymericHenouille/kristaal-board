import { computed, effect, inject, untracked } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { CAMERA_STORE_INITIAL_STATE_TOKEN } from '../tokens';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, tap } from 'rxjs';
import { PerspectiveCamera } from 'three';

export const CameraStore = signalStore(
  withState(() => inject(CAMERA_STORE_INITIAL_STATE_TOKEN)),
  withComputed((store) => ({
    camera: computed(() => {
      const fov = store.fov();
      const aspect = untracked(() => store.ratio());
      const near = store.near();
      const far = store.far();
      return new PerspectiveCamera(fov, aspect, near, far);
    }),
  })),
  withMethods((store) => ({
    setSize: rxMethod<{ width: number, height: number }>(
      pipe(
        map(({ width, height }) => {
          if (height > 0) return width / height;
          return 1;
        }),
        tap((ratio) => {
          patchState(store, (state) => ({
            ...state,
            ratio,
          }));
        }),
      ),
    ),
  })),
  withHooks((store) => ({
    onInit: () => {
      effect(() => {
        const ratio = store.ratio();
        const camera = store.camera();
        if (camera.aspect !== ratio) {
          camera.aspect = ratio;
          camera.updateProjectionMatrix();
        }
      });
    },
  }))
);
