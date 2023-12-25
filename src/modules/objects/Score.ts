import { Game } from '../../shared/Game';
import { CANVAS_WIDTH } from '../../shared/utils';

export class Score {
  points: number;

  constructor (points: number = 0) {
    this.points = points;
  }

  update (dt: number, state: Game, keys: Set<string>): Game {
    let points = this.points + (dt * 10)

    return Game.from(
      state,
      {
        score: new Score(points)
      }
    )
  }

  draw (ctx: CanvasRenderingContext2D): void {
    ctx.save()

    ctx.font = '24px sans-serif';
    ctx.fillStyle = 'black';
    
    const text = String(Math.floor(this.points)).padStart(5, '0');

    const { width } = ctx.measureText(text);

    ctx.fillText(
      text,
      CANVAS_WIDTH - width - 10, 
      24 + 10
    )

    ctx.restore()
  }
}