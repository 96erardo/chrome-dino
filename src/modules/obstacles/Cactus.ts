import { GAME_FLOOR, GRAVITY_ACC, JUMPING_TIME, JUMPING_SPEED } from '../../shared/constants';
import { Obstacle } from '../../shared/objects/Obstacle';
import { State } from '../../shared/State';
import { loadImage, timeToHeight } from '../../shared/utils';
import { Sprite } from '../../shared/objects/Sprite';
import { SpriteSheet } from '../../shared/objects/SpriteSheet';
import cactus from '../../assets/img/cactus.png';

export class Cactus implements Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  xSpeed: number;
  ySpeed: number;
  type: CactusType;
  display: SpriteSheet;

  constructor (type: CactusType, x: number) {
    const { width, height } = sizes[type];

    this.type = type
    this.x = x;
    this.y = GAME_FLOOR - height;
    this.width = width;
    this.height = height;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  static async load () {
    const img = await loadImage(cactus);

    Cactus.prototype.display = new SpriteSheet({
      [CactusType.SM1]: {
        sprites: new Sprite(0, 30, 34, 70, img)
      },
      [CactusType.SM2]: {
        sprites: new Sprite(42, 30, 77, 70, img)
      },
      [CactusType.SM3]: {
        sprites: new Sprite(127, 30, 118, 70, img)
      },
      [CactusType.LG1]: {
        sprites: new Sprite(255, 0, 51, 100, img)
      },
      [CactusType.LG2]: {
        sprites: new Sprite(313, 0, 108, 100, img)
      },
      [CactusType.LG3]: {
        sprites: new Sprite(429, 0, 150, 100, img)
      },
    })
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
    const sprite = this.display.getSprite(this.type);

    ctx.drawImage(
      sprite.image, 
      sprite.x, 
      sprite.y, 
      sprite.width, 
      sprite.height, 
      this.x, 
      this.y, 
      this.width, 
      this.height
    )
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