import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { CameraState } from '../stores/states';
import { isPlatformBrowser } from '@angular/common';

export const CAMERA_STORE_INITIAL_STATE_TOKEN = new InjectionToken<CameraState>('CAMERA_STORE_INITIAL_STATE_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const platform = inject(PLATFORM_ID);
    const ratio = isPlatformBrowser(platform)
      ? window.innerWidth / window.innerHeight
      : 1;
    return {
      ratio,
      fov: 70,
      near: 1,
      far: 2000,
    };
  },
});
