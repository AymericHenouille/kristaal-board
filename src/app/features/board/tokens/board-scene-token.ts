import { inject, InjectionToken } from '@angular/core';
import { BoardSceneState } from '../stores/states';
import { KristaalBoardScene } from '../scene/kristaal-board-scene';
import { BoardScene } from '../scene';

export const INITIAL_BOARD_SCENE_TOKEN = new InjectionToken<BoardScene>('INITIAL_BOARD_SCENE_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const scene = inject(KristaalBoardScene);
    return scene;
  }
});

export const BOARD_SCENE_INITIAL_VALUE_TOKEN = new InjectionToken<BoardSceneState>('BOARD_SCENE_STATE_INITIAL_VALUE_TOKEN', {
  providedIn: 'root',
  factory: () => {
    const currentBoardScene = inject(INITIAL_BOARD_SCENE_TOKEN);
    return { currentBoardScene };
  },
});
