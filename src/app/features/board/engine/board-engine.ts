import { inject, Injectable } from '@angular/core';
import { BoardSceneStore, BoardStore, CameraStore } from '../stores';
import { ACESFilmicToneMapping, PCFShadowMap, SRGBColorSpace, Timer } from 'three';
import { SceneManager } from '../scene';

@Injectable()
export class BoardEngine {
  private readonly boardStore = inject(BoardStore);
  private readonly cameraStore = inject(CameraStore);
  private readonly boardSceneStore = inject(BoardSceneStore);
  private readonly sceneManager = inject(SceneManager);

  private readonly timer = new Timer();

  public load(): void {
    const renderer = this.boardStore.renderer();
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    renderer.setPixelRatio(pixelRatio);

    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;
    this.sceneManager.load();
  }

  public update(): void {
    const delta = this.timer.update().getDelta();
    this.sceneManager.update(delta);
  }

  public render(): void {
    const renderer = this.boardStore.renderer();
    const camera = this.cameraStore.camera();
    const scene = this.boardSceneStore.currentScene();
    renderer.render(scene, camera);
  }

  public resize(width: number, height: number): void {
    const renderer = this.boardStore.renderer();
    this.cameraStore.setSize({ width, height });
    renderer.setSize(width, height, false);
  }

  public pause(): void {
    this.sceneManager.pause();
  }

  public resume(): void {
    this.sceneManager.resume();
  }

  public dispose(): void {
    const renderer = this.boardStore.renderer();
    this.sceneManager.dispose();
    renderer.dispose();
  }
}
