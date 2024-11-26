import { State } from './State';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

export class Display {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor () {
    this.canvas = document.createElement('canvas');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);
  }

  draw (state: State) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    state.obstacles.draw(this.ctx);
    state.dinosaur.draw(this.ctx);
  }
}