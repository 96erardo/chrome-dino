import { Sprite } from "../../shared/objects/Sprite";
import bird from '../../assets/img/bird.png';
import { Obstacle, GameState } from '../../shared/types';
import { 
  loadImage,
  ACT_FLOOR_POSITION
} from '../../shared/utils';

export class Bird implements Obstacle {
  x: number;
  y: number;
  elevation: BirdElevation;
  width: number;
  height: number;
  tile: number;
  sprite: Sprite;

  display: Array<Sprite>;

  static WIDTH = 92;
  static HEIGHT = 80;

  constructor (elevation: BirdElevation, x: number, tile: number) {
    this.sprite = this.display[tile]
    this.width = this.sprite.width;
    this.height = this.sprite.height;
    this.elevation = elevation;
    this.x = x;
    this.y = birdPosition[this.elevation];
  }

  static async load () {
    const img = await loadImage(bird);
    
    Bird.prototype.display = [
      new Sprite(0, 0, Bird.WIDTH, Bird.HEIGHT, img),
      new Sprite(96, 0, Bird.WIDTH, Bird.HEIGHT, img)
    ]
  }

  canAppear (state: GameState): boolean {
    switch (this.elevation) {
      case "low":
        return state.speed > 750;
      case "medium":
        return state.speed > 500;      
      case "high":
        return state.speed >= 1100;
      default:
        return false;
    }
  }

  update (dt: number, state: GameState): Obstacle {
    let x = this.x;
    let tile = Math.floor(Date.now() / 150) % this.display.length;

    if ((this.x + this.width) < 0) {
      x = 900;
    
    } else {
      x -= dt * state.speed;
    }

    return new Bird(this.elevation, x, tile);
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

export type BirdElevation = 'low' | 'medium' | 'high';

const birdPosition: Record<BirdElevation, number> = {
  'low': ACT_FLOOR_POSITION - Bird.HEIGHT,
  'medium': ACT_FLOOR_POSITION - (Bird.HEIGHT * 2),
  'high': ACT_FLOOR_POSITION - (Bird.HEIGHT * 3),
}