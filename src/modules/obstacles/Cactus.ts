import { Entity } from '../../shared/types';
import { State } from '../../shared/State';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../shared/constants';

export class Cactus implements Entity {
  x: number;
  y: number;
  xSpeed: number;
  width: number;
  height: number;

  constructor (
    x: number,
    xSpeed: number,
    width: number,
    height: number,
  ) {
    this.x = x;
    this.y = CANVAS_HEIGHT - height;
    this.xSpeed = xSpeed;
    this.width = width;
    this.height = height;
  }

  update (dt: number, state: State, keys: Set<string>): Cactus {
    let x = this.x;

    x -= this.xSpeed * dt;

    return new Cactus(
      x, 
      this.xSpeed, 
      this.width, 
      this.height
    );
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export function smCactus (): Cactus {
  return new Cactus(CANVAS_WIDTH, 100, 30, 34)
}

export function mCactus (): Cactus {
  return new Cactus(CANVAS_WIDTH, 100, 118, 70)
}

export function lCactus (): Cactus {
  return new Cactus(CANVAS_WIDTH, 100, 150, 100)
}