import { State } from '../../shared/State';

export class Dinosaur {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 88;
    this.height = 94;
  }

  update (dt: number, state: State, keys: Set<string>): Dinosaur {
    return this;
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}