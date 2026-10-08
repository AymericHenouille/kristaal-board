import { InjectionToken } from '@angular/core';
import { BoardState } from '../stores/states';

/**
 * The initial state used for the board store.
 */
export const BOARD_STORE_INITIAL_STATE_TOKEN = new InjectionToken<BoardState>('BOARD_STORE_INITIAL_STATE_TOKEN', {
  factory: () => ({
    canvas: null,
    options: {
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    },
  }),
});
