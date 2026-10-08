import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BoardEngine } from './board-engine';

@Injectable()
export class BrowserBoardEngine {
  private readonly platform = inject(PLATFORM_ID);
  private readonly boardEngine = inject(BoardEngine);

  public load(): void {
    if (!isPlatformBrowser(this.platform)) return;
    return this.boardEngine.load();
  }

  public update(): void {
    if (!isPlatformBrowser(this.platform)) return;
    return this.boardEngine.update();
  }

  public render(): void {
    if (!isPlatformBrowser(this.platform)) return;
    return this.boardEngine.render();
  }

  public resize(width: number, height: number): void {
    if (!isPlatformBrowser(this.platform)) return;
    return this.boardEngine.resize(width, height);
  }

  public pause(): void {
    if (!isPlatformBrowser(this.platform)) return;
    return this.boardEngine.pause();
  }

  public resume(): void {
    if (!isPlatformBrowser(this.platform)) return;
    return this.boardEngine.resume();
  }

  public dispose(): void {
    if (!isPlatformBrowser(this.platform)) return;
    return this.boardEngine.dispose();
  }
}
