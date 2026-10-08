import { Component } from '@angular/core';
import { Board } from './features/board/board';

@Component({
  selector: 'app-root',
  imports: [Board],
  template: '<app-board />',
})
export class App {
}
