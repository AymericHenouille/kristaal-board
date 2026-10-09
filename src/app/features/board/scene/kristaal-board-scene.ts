import { inject, Injectable, signal } from '@angular/core';
import { BoxGeometry, Color, Light, Mesh, MeshPhongMaterial, PointLight, Scene } from 'three';
import { BoardScene } from './board-scene';
import { CameraStore } from '../stores';

@Injectable({
  providedIn: 'root',
})
export class KristaalBoardScene implements BoardScene {
  public readonly scene = signal(new Scene()).asReadonly();

  private mesh!: Mesh;
  private light!: Light;

  public load(): void {
    const cameraStore = inject(CameraStore);
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshPhongMaterial({ color: Color.NAMES.purple });
    this.mesh = new Mesh(geometry, material);

    this.light = new PointLight(Color.NAMES.white, 3);
    this.light.position.z = 2

    this.scene().add(this.mesh, this.light);

    cameraStore.camera().position.z = 4;
    console.log('load end')
  }

  public update(delta: number): void {
    this.mesh.rotation.y += 0.1 * delta;
    this.mesh.rotation.x += 0.5 * delta;
  }

  public pause(): void {
  }

  public resume(): void {
  }

  public dispose(): void {
    this.mesh.dispose();
    this.light.dispose();

    const scene = this.scene();
    scene.dispose();
  }
}
