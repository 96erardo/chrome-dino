import { Game } from './Game';
import { Obstacle } from '../modules/objects/Obstacle';
import { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT,
  GAME_BASELINE_POSITION
} from './utils';

export default class Display {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  floor: HTMLImageElement;

  constructor () {
    this.canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);
  }

  draw (state: Game) {
    this.ctx.fillStyle = 'rgb(247,247,247)';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Background
    state.floor.draw(this.ctx);
    // Score
    state.score.draw(this.ctx);
    // Player
    state.player.draw(this.ctx);
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