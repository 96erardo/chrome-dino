import { Sprite } from "../../shared/objects/Sprite";
import cactus from '../../assets/img/cactus.png';
import { Obstacle, GameState } from '../../shared/types';
import { 
  ACT_FLOOR_POSITION,
  DINO_TIME_IN_AIR,
  loadImage
} from '../../shared/utils';

export class Cactus implements Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  sprite: Sprite;
  type: ObstacleType;

  display: Record<string, Sprite>;

  constructor (x: number, y: number, type: ObstacleType = "sm-1") {
    this.type = type;
    this.sprite = this.display[type]
    this.width = this.sprite.width;
    this.height = this.sprite.height;
    this.x = x;
    this.y = ACT_FLOOR_POSITION - this.height;
  }

  static async load () {
    const img = await loadImage(cactus);
    
    Cactus.prototype.display = {
      'sm-1': new Sprite(0, 30, 34, 70, img),
      'sm-2': new Sprite(42, 30, 77, 70, img),
      'sm-3': new Sprite(127, 30, 118, 70, img),
      'lg-1': new Sprite(255, 0, 51, 100, img),
      'lg-2': new Sprite(313, 0, 108, 100, img),
      'lg-4': new Sprite(429, 0, 150, 100, img),
    }
  }

  canAppear(state: GameState): boolean {
    const distance = state.speed * DINO_TIME_IN_AIR;

    return (distance) > this.sprite.width + 100; 
  }

  update (dt: number, state: GameState): Obstacle {
    let x = this.x;
    let y = this.y;

    if ((this.x + this.width) < 0) {
      x = 900;
    
    } else {
      x -= dt * state.speed;
    }

    return new Cactus(x, y, this.type);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.save()

    ctx.fillStyle = 'black';
    ctx.drawImage(
      this.sprite.image, 
      this.sprite.x, 
      this.sprite.y, 
      this.sprite.width, 
      this.sprite.height, 
      this.x, 
      this.y, 
      this.width, 
      this.height
    )

    ctx.restore()
  }
}

type ObstacleType = 'sm-1' | 'sm-2' | 'sm-3' | 'lg-1' | 'lg-2' | 'lg-4';