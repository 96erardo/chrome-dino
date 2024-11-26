import { CANVAS_HEIGHT } from '../../shared/constants';
import { Entity } from '../../shared/objects/Entity';
import { State } from '../../shared/State';

export class Cactus implements Entity {
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

  update (dt: number, state: State, keys: Set<string>): Cactus {
    let x = this.x;

    x -= state.speed * dt;

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