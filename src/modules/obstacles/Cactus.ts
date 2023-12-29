import { Sprite } from "../../shared/objects/Sprite";
import cactus from '../../assets/img/cactus.png';
import { Object, GameState } from '../../shared/types';
import { 
  GAME_BASELINE_UPPER_LIMIT,
  loadImage
} from '../../shared/utils';

export class Cactus implements Object {
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
    this.y = GAME_BASELINE_UPPER_LIMIT - this.height;
  }

  static async load () {
    const img = await loadImage(cactus);
    
    Cactus.prototype.display = {
      'sm-1': new Sprite(0, 14, 17, 35, img),
      'sm-2': new Sprite(22, 14, 39, 35, img),
      'sm-3': new Sprite(66, 14, 61, 35, img),
      'lg-1': new Sprite(133, 0, 25, 50, img),
      'lg-2': new Sprite(163, 0, 55, 50, img),
      'lg-4': new Sprite(223, 0, 75, 49, img),
    }
  }

  update (dt: number, state: GameState): Object {
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