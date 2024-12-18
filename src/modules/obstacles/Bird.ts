import { CANVAS_HEIGHT, GRAVITY_ACC, JUMPING_TIME, JUMPING_SPEED } from '../../shared/constants';
import { Obstacle } from '../../shared/objects/Obstacle';
import { State } from '../../shared/State';
import { timeToHeight } from '../../shared/utils';

export class Bird implements Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  xSpeed: number;
  ySpeed: number;
  position: BirdPosition;

  static WIDTH = 92;
  static HEIGHT = 80;

  constructor (x: number, position: BirdPosition) {
    this.width = Bird.WIDTH;
    this.height = Bird.HEIGHT;

    this.x = x;
    this.y = CANVAS_HEIGHT - (this.height * (position + 1));

    this.position = position;
  }

  canAppear (state: State): boolean {
    if (this.position === BirdPosition.High) {
      return true;
    }

    const timeNotAbove = timeToHeight(GRAVITY_ACC, JUMPING_SPEED, CANVAS_HEIGHT - this.y) * 2;
    const timeAbove = JUMPING_TIME - timeNotAbove;
    const distance = state.speed.value * timeAbove - state.dinosaur.width;

    return distance > this.width;
  }
 
  update (dt: number, state: State, keys: Set<string>): Bird {
    let x = this.x;

    x -= dt * state.speed.value;

    return new Bird(x, this.position);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export enum BirdPosition {
  Low,
  Medium,
  High
}