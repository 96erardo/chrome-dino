import { Sprite } from "../../shared/objects/Sprite";
import bird from '../../assets/img/bird.png';
import { Object, GameState } from '../../shared/types';
import { 
  loadImage
} from '../../shared/utils';

export class Bird implements Object {
  x: number;
  y: number;
  width: number;
  height: number;
  tile: number;
  sprite: Sprite;

  display: Array<Sprite>;

  constructor (x: number, y: number, tile: number) {
    this.sprite = this.display[tile]
    this.width = this.sprite.width;
    this.height = this.sprite.height;
    this.x = x;
    this.y = y;
  }

  static async load () {
    const img = await loadImage(bird);
    
    Bird.prototype.display = [
      new Sprite(0, 12, 92, 68, img),
      new Sprite(96, 0, 92, 68, img)
    ]
  }

  update (dt: number, state: GameState): Object {
    let x = this.x;
    let tile = Math.floor(Date.now() / 500) % this.display.length;

    if ((this.x + this.width) < 0) {
      x = 900;
    
    } else {
      x -= dt * state.speed;
    }

    return new Bird(x, this.y, tile);
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