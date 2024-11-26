import { State } from '../../shared/State';
import { CANVAS_HEIGHT, GRAVITY_ACC } from '../../shared/constants';

export class Dinosaur {
  x: number;
  y: number;
  ySpeed: number;
  width: number;
  height: number;

  constructor (x: number, y: number, ySpeed: number) {
    this.x = x;
    this.y = y;
    this.ySpeed = ySpeed;
    this.width = 88;
    this.height = 94;
  }

  update (dt: number, state: State, keys: Set<string>): Dinosaur {
    let x = this.x;
    let y = this.y;
    let ySpeed = this.ySpeed;

    if ((y + this.height) === CANVAS_HEIGHT && keys.has('ArrowUp')) {
      ySpeed = -900;
    }

    // Gravity
    if ((y + this.height) < CANVAS_HEIGHT) {
      ySpeed += GRAVITY_ACC * dt;

      if ((y + this.height) + (ySpeed * dt) > CANVAS_HEIGHT) {
        y = CANVAS_HEIGHT - this.height;
        ySpeed = 0;
      }
    } else if (ySpeed > 0) {
      ySpeed = 0;
    }
    
    y += ySpeed * dt;
    
    return new Dinosaur(x, y, ySpeed);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}