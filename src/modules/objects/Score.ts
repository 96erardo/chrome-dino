import { Game, GameStatus } from '../../shared/Game';
import { CANVAS_WIDTH } from '../../shared/utils';

export class Score {
  points: number;
  highest?: number;

  constructor (points: number = 0, highest?: number) {
    this.points = points;
    
    if (highest) {
      this.highest = highest;
    } else {
      const stored = sessionStorage.getItem("highest")
      this.highest = stored ? parseInt(stored) : undefined;
    }
  }

  update (dt: number, state: Game, keys: Set<string>): Game {
    let points = this.points + (dt * 10)

    console.log(this.highest);

    if (state.status === GameStatus.Over) {
      if (Math.floor(this.points) > (this.highest || 0)) {
        sessionStorage.setItem("highest", String(this.points))
      }
    }

    return Game.from(
      state,
      {
        score: new Score(points, this.highest)
      }
    )
  }

  draw (ctx: CanvasRenderingContext2D): void {
    ctx.save()

    ctx.font = '24px sans-serif';
    ctx.fillStyle = 'black';
    
    const text = String(Math.floor(this.points)).padStart(5, '0');

    const { width: scoreWidth } = ctx.measureText(text);

    ctx.fillText(
      text,
      CANVAS_WIDTH - scoreWidth - 10, 
      24 + 10
    )

    if (this.highest) {
      const highText = String(this.highest).padStart(5, '0');

      ctx.fillText(
        'HI ' + highText,
        10, 
        24 + 10
      )
    }

    ctx.restore()
  }
}