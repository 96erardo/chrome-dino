import { State } from '../State';
import { Entity } from './Entity';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';
import { Sprite } from './Sprite';
import { loadImage } from '../utils';
import cloud from '../../assets/img/cloud.png';

export class Cloud implements Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  xSpeed: number;
  ySpeed: number;
  
  sprite: Sprite;

  static SPEED = 50;
  static WIDTH: number = 92;
  static HEIGHT: number = 27;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = Cloud.WIDTH;
    this.height = Cloud.HEIGHT;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  static async load () {
    const img = await loadImage(cloud);

    Cloud.prototype.sprite = new Sprite(
      0,
      0,
      Cloud.WIDTH,
      Cloud.HEIGHT,
      img
    )
  }

  update(dt: number, state: State, keys: Set<string>): Cloud {
    let x = this.x;
    let y = this.y;

    if ((x + this.width) > 0) {
      x -= dt * Cloud.SPEED;
    
    } else {
      x = CANVAS_WIDTH + (Math.random() * 300);
      y = Math.random() * 100 + 200
    }

    return new Cloud(x, y);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.sprite.image,
      0,
      0,
      Cloud.WIDTH,
      Cloud.HEIGHT,
      this.x,
      this.y ,
      Cloud.WIDTH,
      Cloud.HEIGHT,
    )
  }
}