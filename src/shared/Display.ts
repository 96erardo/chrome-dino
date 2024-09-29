import { State } from './State';

export class Display {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor () {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 840;
    this.canvas.height = 480;

    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);
  }

  draw (state: State) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    state.dinosaur.draw(this.ctx)
  }
}