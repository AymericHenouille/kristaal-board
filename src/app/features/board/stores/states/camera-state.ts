/**
 * The state used by the camera store.
 */
export interface CameraState {
  /**
   * The fov used by the camera.
   */
  fov: number;
  /**
   * The ratio used by the camera.
   */
  ratio: number;
  /**
   * The near used by the camera.
   */
  near: number;
  /**
   * The far used by the camera.
   */
  far: number;
}
