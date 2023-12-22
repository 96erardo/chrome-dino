import { Game } from './Game';
import { Obstacle } from '../modules/objects/Obstacle';

export default class Display {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor (elementId: string) {
    this.canvas = document.getElementById(elementId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
  }

  draw (state: Game) {
    this.ctx.fillStyle = 'rgb(247,247,247)';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.ctx.lineWidth = 4;
    this.ctx.moveTo(0, GAME_BASELINE_POSITION);
    this.ctx.lineTo(CANVAS_WIDTH, GAME_BASELINE_POSITION);
    this.ctx.stroke();

    // Player
    state.player.draw(this.ctx)
    // Obstacles
    state.spawner.onScreenObstacles.forEach((o: Obstacle) => o.draw(this.ctx))

    if (state.status === "over") {
      this.ctx.save()

      this.ctx.font = '48px sans-serif';
      this.ctx.fillStyle = 'black';
      

      const { width } = this.ctx.measureText('GAME OVER');

      this.ctx.fillText(
        "GAME OVER", 
        (CANVAS_WIDTH / 2) - (width / 2), 
        (CANVAS_HEIGHT / 2) - (48 / 2)
      )

      this.ctx.restore()
    }
  }
}