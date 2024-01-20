import { Entity, GameState } from '../types';
import { loadImage, DRAWN_FLOOR_POSITION } from '../utils';
import floor from '../../assets/img/floor.png';

export class Floor implements Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;

  static WIDTH: number = 2400;
  static HEIGHT: number = 34;

  constructor (x: number) {
    this.x = x;
    this.y = DRAWN_FLOOR_POSITION;
    this.width = Floor.WIDTH;
    this.height = Floor.HEIGHT;
  }

  static async load () {
    const img = await loadImage(floor);

    Floor.prototype.image = img;
  }

  update (dt: number, state: GameState, keys: Set<string>): Entity {
    let x = this.x - (dt * state.speed);
    
    if ((x + this.width) < 0) {
      x = x + (this.width * 2);
    }

    return  new Floor(x);
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image, 
      0, 
      0, 
      this.width, 
      this.height, 
      this.x, 
      DRAWN_FLOOR_POSITION, 
      this.width, 
      this.height
    );
  }
}
