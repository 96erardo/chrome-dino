import { Object, GameState } from '../../shared/types';
import { CANVAS_WIDTH } from '../../shared/utils';

export class Empty implements Object {
  x: number;
  y: number;
  width: number;
  height: number;
  tile: number;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 1;
    this.height = 1;
  }

  update (dt: number, state: GameState): Object {
    let x = this.x;
    let y = this.y;

    if ((this.x + this.width) < 0) {
      x = CANVAS_WIDTH;
    
    } else {
      x -= dt * state.speed;
    }

    return new Empty(x, y);
  }

  draw (ctx: CanvasRenderingContext2D) {}
}