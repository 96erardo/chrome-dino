import { CANVAS_WIDTH } from '../utils';
import { Object, GameStatus, GameState } from "../types";

export class Score implements Object {
  x: number;
  y: number;
  width: number;
  height: number;
  points: number;
  highest?: number;

  constructor (points: number = 0, highest?: number) {
    this.points = points;
    
    if (highest) {
      this.highest = highest;
    } else {
      const stored = sessionStorage.getItem("highest")
      this.highest = stored ? parseInt(stored) : 0;
    }
  }

  update (dt: number, state: GameState, keys: Set<string>): GameState {
    let points = this.points + (dt * 10)
    let highest = points > this.highest ? points : this.highest;

    if (state.status === GameStatus.Over) {
      if (Math.floor(this.points) >= Math.floor(this.highest)) {
        sessionStorage.setItem("highest", String(this.points))
      }
    }

    return Object.assign(
      state,
      { score: new Score(points, highest) }
    );
  }

  draw (ctx: CanvasRenderingContext2D): void {
    ctx.save()

    ctx.font = '16px PressStart2P';
    ctx.fillStyle = 'rgb(83, 83, 83)';
    
    const highText = 'HI ' + String(Math.floor(this.highest)).padStart(5, '0');
    const pointsText = String(Math.floor(this.points)).padStart(5, '0');

    const { width: scoreWidth } = ctx.measureText(pointsText);
    const { width: highWidth } = ctx.measureText(highText);

    ctx.fillStyle = 'rgb(83, 83, 83)';

    ctx.fillText(
      pointsText,
      CANVAS_WIDTH - scoreWidth - 10, 
      16 + 10
    )

    ctx.fillStyle = 'rgb(116, 116, 116)';
    
    ctx.fillText(
      highText,
      CANVAS_WIDTH - highWidth - scoreWidth - 20, 
      16 + 10
    )

    ctx.restore()
  }
}