import { State } from '../../shared/State';
import { 
  JUMPING_SPEED,
  CANVAS_HEIGHT, 
  GRAVITY_ACC, 
  DUCKING_ACC
} from '../../shared/constants';
import { Entity } from '../../shared/objects/Entity';
import { Sprite } from '../../shared/objects/Sprite';
import { SpriteSheet } from '../../shared/objects/SpriteSheet';
import dinosaur from '../../assets/img/dinosaur.png';
import { loadImage } from '../../shared/utils';

export class Dinosaur implements Entity {
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  width: number;
  height: number;
  status: DinoStatus;
  display: SpriteSheet;

  static STANDING_WIDTH = 88;
  static STANDING_HEIGHT = 94;

  static DUCKING_WIDTH = 118;
  static DUCKING_HEIGHT = 60;

  constructor (
    y: number, 
    ySpeed: number,
    status: DinoStatus = DinoStatus.Running
  ) {
    this.x = 0;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = ySpeed;
    this.status = status;

    if (this.status === DinoStatus.Ducking) {
      this.width = Dinosaur.DUCKING_WIDTH;
      this.height = Dinosaur.DUCKING_HEIGHT;
    } else {
      this.width = Dinosaur.STANDING_WIDTH;
      this.height = Dinosaur.STANDING_HEIGHT;
    }
  }

  static async load () {
    const img = await loadImage(dinosaur);

    Dinosaur.prototype.display = new SpriteSheet({
      Running: {
        interval: 150,
        sprites: [
          new Sprite(294, 0, Dinosaur.STANDING_WIDTH, Dinosaur.STANDING_HEIGHT, img),
          new Sprite(390, 0, Dinosaur.STANDING_WIDTH, Dinosaur.STANDING_HEIGHT, img),
        ]
      },
      Jumping: {
        sprites: new Sprite(102, 0, Dinosaur.STANDING_WIDTH, Dinosaur.STANDING_HEIGHT, img),
      },
      Ducking: {
        interval: 150,
        sprites: [
          new Sprite(678, 34, Dinosaur.DUCKING_WIDTH, Dinosaur.DUCKING_HEIGHT, img),
          new Sprite(804, 34, Dinosaur.DUCKING_WIDTH, Dinosaur.DUCKING_HEIGHT, img)
        ]
      },
      Dead: {
        sprites: new Sprite(486, 0, Dinosaur.STANDING_WIDTH, Dinosaur.STANDING_HEIGHT, img)
      }
    })
  }

  update (dt: number, state: State, keys: Set<string>): Dinosaur {
    let y = this.y;
    let ySpeed = this.ySpeed;
    let status = this.status;
    let height = this.height;

    // Jumping
    if ((y + this.height) === CANVAS_HEIGHT && keys.has('ArrowUp')) {
      status = DinoStatus.Jumping;
      ySpeed = JUMPING_SPEED;
    }

    if (keys.has('ArrowDown')) {
      status = DinoStatus.Ducking;
      height = Dinosaur.DUCKING_HEIGHT;
    } else {
      height = Dinosaur.STANDING_HEIGHT;

      if ((y + height) < CANVAS_HEIGHT) {
        status = DinoStatus.Jumping;
      } else {
        status = DinoStatus.Running;
      }
    }

    if (this.status !== status) {
      if (y + this.height === CANVAS_HEIGHT) {
        y = CANVAS_HEIGHT - height;
      }
    }

    // Gravity
    if ((y + height) < CANVAS_HEIGHT) {
      if (keys.has('ArrowDown')) {
        status = DinoStatus.Ducking;
        ySpeed += DUCKING_ACC * dt;
      } else {
        status = DinoStatus.Jumping;
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

  died () {
    if (this.status === DinoStatus.Ducking) {
      this.y = this.y - (Dinosaur.STANDING_HEIGHT - Dinosaur.DUCKING_HEIGHT)
      this.x = this.x + (Dinosaur.DUCKING_WIDTH - Dinosaur.STANDING_WIDTH)
      this.width = Dinosaur.STANDING_WIDTH;
      this.height = Dinosaur.STANDING_HEIGHT;
    }

    this.status = DinoStatus.Dead;
  }

  draw (ctx: CanvasRenderingContext2D) {
    const sprite = this.display.getSprite(this.status);

    ctx.fillStyle = 'rgba(0,0,0,.1)';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.width, this.height)
  }
}

export enum DinoStatus {
  Running = "Running",
  Jumping = "Jumping",
  Ducking = "Ducking",
  Dead = "Dead"
}