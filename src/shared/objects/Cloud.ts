import { Entity, GameState } from '../types';
import { Sprite } from './Sprite';
import { CANVAS_WIDTH, loadImage } from '../utils';
import cloud from '../../assets/img/cloud.png';

export class Cloud implements Entity {
  x: number;
  y: number;
  nro: number;
  width: number;
  height: number;
  display: Sprite;

  static SPEED = 50;
  static WIDTH = 92;
  static HEIGHT = 27;

  constructor (x?: number, y?: number) {
    this.x = x ? x : CANVAS_WIDTH + (Math.random() * 300);
    this.y = y ? y : Math.random() * 100 + 200;
    this.width = Cloud.WIDTH;
    this.height = Cloud.HEIGHT;
  }

  static async load () {
    const img = await loadImage(cloud);

    Cloud.prototype.display = new Sprite(0, 0, 92, 27, img);
  }

  update (dt: number, state: GameState, keys: Set<string>): Entity {
    let x = this.x;
    let y = this.y;

    if ((x + this.width) < 0) {
      x = CANVAS_WIDTH + (Math.random() * 300);
      y = Math.random() * 100 + 200
    
    } else {
      x -= dt * Cloud.SPEED;
    }

    return new Cloud(x, y);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.save()

    ctx.drawImage(this.display.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height)

    ctx.restore()
  }
}