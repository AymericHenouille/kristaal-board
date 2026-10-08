import { Injectable, signal } from '@angular/core';
import { BoxGeometry, Color, Mesh, MeshBasicMaterial, Scene } from 'three';
import { BoardScene } from './board-scene';

@Injectable({
  providedIn: 'root',
})
export class KristaalBoardScene implements BoardScene {
  public readonly scene = signal(new Scene()).asReadonly();

  private mesh!: Mesh;

  public load(): void {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: Color.NAMES.aliceblue });
    this.mesh = new Mesh(geometry, material);
    this.scene().add(this.mesh);
  }

  public update(delta: number): void {
  }

  public pause(): void {
  }

  public resume(): void {
  }

  public dispose(): void {
    this.mesh.dispose();
    const scene = this.scene();
    scene.dispose();
  }
}
