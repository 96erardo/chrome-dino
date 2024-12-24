import { State } from '../State';
import { Entity } from './Entity';
import { CANVAS_WIDTH } from '../constants';

export class Score implements Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  xSpeed: number;
  ySpeed: number;

  points: number;
  highest: number;

  constructor (points: number = 0, highest: number = 0) {
    this.points = points;

    if (highest) {
      this.highest = highest;

    } else {
      const saved = parseInt(sessionStorage.getItem('highest')) || 0;

      this.highest = saved;
    }
  }

  update(dt: number, state: State, keys: Set<string>): Score {
    const points = this.points + (dt * 10);
    const highest = Math.max(points, this.highest);
    
    return new Score(points, highest)
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save()

    ctx.font = '20px Sans-Serif';
    ctx.fillStyle = 'rgb(83, 83, 83)';
    
    const highText = 'HI ' + String(Math.floor(this.highest)).padStart(5, '0');
    const pointsText = String(Math.floor(this.points)).padStart(5, '0');

    const { width: pointsWidth } = ctx.measureText(pointsText);
    const { width: highWidth } = ctx.measureText(highText);

    ctx.fillStyle = 'rgb(83, 83, 83)';

    ctx.fillText(
      pointsText,
      CANVAS_WIDTH - pointsWidth - 10, 
      16 + 10
    )

    ctx.fillStyle = 'rgb(116, 116, 116)';
    
    ctx.fillText(
      highText,
      CANVAS_WIDTH - highWidth - pointsWidth - 20, 
      16 + 10
    )

    ctx.restore()
  }
}