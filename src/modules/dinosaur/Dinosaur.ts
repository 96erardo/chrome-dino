import { State } from '../../shared/State';
<<<<<<< HEAD
import { CANVAS_HEIGHT, GRAVITY_ACC } from '../../shared/constants';
import { Entity } from '../../shared/types';
=======
import { 
  JUMPING_SPEED,
  CANVAS_HEIGHT, 
  GRAVITY_ACC 
} from '../../shared/constants';
import { Entity } from '../../shared/objects/Entity';
>>>>>>> correction

export class Dinosaur implements Entity {
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  width: number;
  height: number;

  constructor (y: number, ySpeed: number) {
    this.x = 0;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = ySpeed;
    this.width = 88;
    this.height = 94;
  }

  update (dt: number, state: State, keys: Set<string>): Dinosaur {
    let x = this.x;
    let y = this.y;
    let ySpeed = this.ySpeed;

    if ((y + this.height) === CANVAS_HEIGHT && keys.has('ArrowUp')) {
      ySpeed = JUMPING_SPEED;
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
    
    return new Dinosaur(y, ySpeed);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}