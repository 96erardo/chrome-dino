import { CANVAS_HEIGHT, GRAVITY_ACC, JUMPING_TIME, JUMPING_SPEED, GAME_FLOOR } from '../../shared/constants';
import { Obstacle } from '../../shared/objects/Obstacle';
import { State } from '../../shared/State';
import { Sprite } from '../../shared/objects/Sprite';
import { SpriteSheet } from '../../shared/objects/SpriteSheet';
import { loadImage, timeToHeight } from '../../shared/utils';
import bird from '../../assets/img/bird.png';

export class Bird implements Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  xSpeed: number;
  ySpeed: number;
  position: BirdPosition;
  display: SpriteSheet;

  static WIDTH = 92;
  static HEIGHT = 80;

  constructor (x: number, position: BirdPosition) {
    this.width = Bird.WIDTH;
    this.height = Bird.HEIGHT;

    this.x = x;
    this.y = GAME_FLOOR - (this.height * (position + 1));

    this.position = position;
  }

  static async load () {
    const img = await loadImage(bird);

    Bird.prototype.display = new SpriteSheet({
      'original': {
        interval: 500,
        sprites: [
          new Sprite(0, 0, Bird.WIDTH, Bird.HEIGHT, img),
          new Sprite(96, 0, Bird.WIDTH, Bird.HEIGHT, img),
        ]
      }
    })
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
    const sprite = this.display.getSprite('original');

    ctx.fillStyle = 'rgba(0,0,0,.1)';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
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

export enum BirdPosition {
  Low,
  Medium,
  High
}