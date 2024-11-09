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
    let x = this.x;
    let y = this.y;
    
    const speed = 100;

    if (keys.has('ArrowUp')) {
      y -= speed * dt;
    }

    if (keys.has('ArrowDown')) {
      y += speed * dt;
    }

    if (keys.has('ArrowLeft')) {
      x -= speed * dt;
    }

    if (keys.has('ArrowRight')) {
      x += speed * dt;
    }

    return new Dinosaur(x, y);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}