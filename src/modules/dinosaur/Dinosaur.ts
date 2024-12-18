import { State } from '../../shared/State';
import { 
  JUMPING_SPEED,
  CANVAS_HEIGHT, 
  GRAVITY_ACC, 
  DUCKING_ACC
} from '../../shared/constants';
import { Entity } from '../../shared/objects/Entity';

export class Dinosaur implements Entity {
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  width: number;
  height: number;
  status: DinoStatus;

  static STANDING_WIDTH = 88;
  static STANDING_HEIGHT = 94;

  static DUCKING_WIDTH = 118;
  static DUCKING_HEIGHT = 60;

  constructor (
    y: number, 
    ySpeed: number,
    status: DinoStatus = DinoStatus.Standing
  ) {
    this.x = 0;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = ySpeed;
    this.status = status;

    if (this.status === DinoStatus.Standing) {
      this.width = Dinosaur.STANDING_WIDTH;
      this.height = Dinosaur.STANDING_HEIGHT;
    } else {
      this.width = Dinosaur.DUCKING_WIDTH;
      this.height = Dinosaur.DUCKING_HEIGHT;
    }
  }

  update (dt: number, state: State, keys: Set<string>): Dinosaur {
    let y = this.y;
    let ySpeed = this.ySpeed;
    let status = this.status;
    let height = this.height;

    // Jumping
    if ((y + this.height) === CANVAS_HEIGHT && keys.has('ArrowUp')) { 
      ySpeed = JUMPING_SPEED;
    }

    if (keys.has('ArrowDown')) {
      status = DinoStatus.Ducking;
      height = Dinosaur.DUCKING_HEIGHT;
    } else {
      status = DinoStatus.Standing;
      height = Dinosaur.STANDING_HEIGHT;
    }

    if (this.status !== status) {
      if (y + this.height === CANVAS_HEIGHT) {
        y = CANVAS_HEIGHT - height;
      }
    }

    // Gravity
    if ((y + height) < CANVAS_HEIGHT) {
      if (keys.has('ArrowDown')) {
        ySpeed += DUCKING_ACC * dt;
      } else {
        ySpeed += GRAVITY_ACC * dt;
      }

      if ((y + height) + (ySpeed * dt) > CANVAS_HEIGHT) {
        y = CANVAS_HEIGHT - height;
        ySpeed = 0;
      }
    } else if ((y + height > CANVAS_HEIGHT)) {
      y = CANVAS_HEIGHT - height;
      ySpeed = 0;

    } else if (ySpeed > 0) {
      ySpeed = 0;
    }
    
    y += ySpeed * dt;
    
    return new Dinosaur(y, ySpeed, status);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export enum DinoStatus {
  Standing,
  Ducking,
}