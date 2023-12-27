import { Game } from './Game';
import { Obstacle } from '../modules/objects/Obstacle';
import { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT,
  elt,
} from './utils';
import reset from '../assets/img/reset.png'

export default class Display {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  reset: HTMLImageElement;

  constructor () {
    this.canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    this.reset = elt('img', { src: reset }) as HTMLImageElement;
    
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

      this.ctx.font = 'normal 30px PressStart2P';
      this.ctx.fillStyle = 'rgb(83, 83, 83)';
      

      const { width } = this.ctx.measureText('GAME OVER');

      this.ctx.fillText(
        "GAME OVER", 
        (CANVAS_WIDTH / 2) - (width / 2), 
        (CANVAS_HEIGHT / 2) - (30 / 2)
      )

      this.ctx.drawImage(
        this.reset,
        0,
        0,
        72,
        64,
        CANVAS_WIDTH / 2 - 18,
        (CANVAS_HEIGHT + 20) / 2 - 16,
        36,
        32
      )

      this.ctx.restore()
    }
  }
}