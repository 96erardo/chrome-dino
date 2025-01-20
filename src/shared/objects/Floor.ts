import { State } from '../State';
import { Entity } from './Entity';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';
import { Sprite } from './Sprite';
import { loadImage } from '../utils';
import floor from '../../assets/img/floor.png';

export class Floor implements Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  xSpeed: number;
  ySpeed: number;
  sprite: Sprite;

  static WIDTH: number = 2400;
  static HEIGHT: number = 34;

  constructor (x: number) {
    this.x = x;
    this.y = CANVAS_HEIGHT - Floor.HEIGHT;
    this.width = Floor.WIDTH;
    this.height = Floor.HEIGHT;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  static async load () {
    const img = await loadImage(floor);

    Floor.prototype.sprite = new Sprite(
      0,
      0,
      Floor.WIDTH,
      Floor.HEIGHT,
      img
    )
  }

  update(dt: number, state: State, keys: Set<string>): Floor {
    let x = this.x - (dt * state.speed.value);
    
    if ((x + this.width) < 0) {
      x = x + (this.width * 2);
    }

    return  new Floor(x);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.sprite.image,
      0,
      0,
      Floor.WIDTH,
      Floor.HEIGHT,
      this.x,
      CANVAS_HEIGHT - Floor.HEIGHT,
      Floor.WIDTH,
      Floor.HEIGHT,
    )
  }
}