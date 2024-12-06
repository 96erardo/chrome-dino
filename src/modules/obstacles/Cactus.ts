import { CANVAS_HEIGHT, GRAVITY_ACC, JUMPING_TIME, JUMPING_SPEED } from '../../shared/constants';
import { Obstacle } from '../../shared/objects/Obstacle';
import { State } from '../../shared/State';
import { timeToHeight } from '../../shared/utils';

export class Cactus implements Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  xSpeed: number;
  ySpeed: number;
  type: CactusType;

  constructor (type: CactusType, x: number) {
    const { width, height } = sizes[type];

    this.type = type
    this.x = x;
    this.y = CANVAS_HEIGHT - height;
    this.width = width;
    this.height = height;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  canAppear (state: State) {
    const timeNotAbove = timeToHeight(GRAVITY_ACC, JUMPING_SPEED, this.height) * 2;
    const timeAbove = JUMPING_TIME - timeNotAbove;
    const distance = state.speed.value * timeAbove - state.dinosaur.width;

    return distance > this.width;
  }

  update (dt: number, state: State, keys: Set<string>): Cactus {
    let x = this.x;

    x -= state.speed.value * dt;

    return new Cactus(this.type, x);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export enum CactusType {
  SM1 = 'SM-1',
  SM2 = 'SM-2',
  SM3 = 'SM-3',
  LG1 = 'LG-1',
  LG2 = 'LG-2',
  LG3 = 'LG-3',
}

const sizes = {
  [CactusType.SM1]: { width: 34, height: 70 },
  [CactusType.SM2]: { width: 77, height: 70 },
  [CactusType.SM3]: { width: 118, height: 70 },
  [CactusType.LG1]: { width: 51, height: 108 },
  [CactusType.LG2]: { width: 108, height: 100 },
  [CactusType.LG3]: { width: 150, height: 100 },
}