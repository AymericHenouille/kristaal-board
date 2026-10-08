import { Component, computed, effect, ElementRef, HostListener, inject, OnDestroy, PLATFORM_ID, viewChild } from '@angular/core';
import { BoardSceneStore, BoardStore, CameraStore } from './stores';
import { BoardEngine, BrowserBoardEngine } from './engine';
import { isPlatformBrowser } from '@angular/common';
import { SceneManager } from './scene';

@Component({
  selector: 'app-board',
  template: `
    <canvas #canvas class="size-full absolute top-0 left-0">
      <ng-content />
    </canvas>
  `,
  providers: [
    BoardStore,
    CameraStore,
    BoardSceneStore,
    BrowserBoardEngine,
    BoardEngine,
    SceneManager,
  ],
})
export class Board implements OnDestroy {
  private readonly platform = inject(PLATFORM_ID);
  private readonly boardStore = inject(BoardStore);
  private readonly boardEngine = inject(BrowserBoardEngine);

  private readonly canvasElement = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly canvas = computed(() => this.canvasElement().nativeElement);

  private _processId: number | null = null;

  public constructor() {
    effect(() => {
      const canvas = this.canvas();
      this.boardStore.setCanvas({ canvas });
      this.boardEngine.load();
      this.resize();
      if (isPlatformBrowser(this.platform))
        this.render();
    });
  }

  public render(): void {
    this._processId = requestAnimationFrame(this.render.bind(this));
    this.boardEngine.update();
    this.boardEngine.render();
  }

  @HostListener('window:resize')
  public resize(): void {
    const canvas = this.canvas();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.boardEngine.resize(width, height);
  }

  public pause(): void {
    if (this._processId === null) return;
    cancelAnimationFrame(this._processId);
    this.boardEngine.pause();
  }

  public resume(): void {
    if (!isPlatformBrowser(this.platform)) return;
    this.boardEngine.resume();
    this.render();
  }

  public ngOnDestroy(): void {
    this.pause();
    this.boardEngine.dispose();
  }
}
