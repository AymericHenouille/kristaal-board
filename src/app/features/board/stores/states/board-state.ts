/**
 * State object that represent a board.
 */
export interface BoardState {
  /**
   * The canvas element.
   */
  canvas: HTMLCanvasElement | null;
  /**
   * The options used to build the renderer.
   */
  options: {
    /**
     * Enable or Disable the antialiasing.
     */
    antialias: boolean;
    /**
     * Enable or Disable the alpha gesture.
     */
    alpha: boolean;
    /**
     * The power preference instruction send to the system.
     */
    powerPreference: WebGLPowerPreference,
  };
}
