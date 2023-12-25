import { Game } from '../../shared/Game';
import floor from '../../assets/img/floor.png';
import { 
  elt,
  GAME_BASELINE_POSITION
} from '../../shared/utils';

export class Floor {
  x1: number;
  x2: number;
  xSpeed: number;
  image: HTMLImageElement;
  
  static WIDTH: number = 2400;
  static HEIGHT: number = 34;

  constructor (
    x1: number,
    x2: number,
  ) {
    this.x1 = x1;
    this.x2 = x2;
    this.xSpeed = 200;
  }

  static async load () {
    const img = elt('img', { src: floor }) as HTMLImageElement;

    await new Promise ((res) => {
      function onLoad () {
        Floor.prototype.image = img

        img.removeEventListener('load', onLoad);
        res('done')
      }

      img.addEventListener('load', onLoad)
    })
  }

  update (dt: number, state: Game, keys: Set<string>) {
    let x1 = this.x1 - (dt * this.xSpeed);
    let x2 = this.x2 - (dt * this.xSpeed);
    
    if ((x1 + Floor.WIDTH) < 0) {
      x1 = x2 + Floor.WIDTH;
    
    } else if ((x2 + Floor.WIDTH) < 0) {
      x2 = x1 + Floor.WIDTH;
    }

    return new Game(
      state.status,
      state.player,
      state.spawner,
      new Floor(x1, x2)
    )
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image, 
      0, 
      0, 
      Floor.WIDTH, 
      Floor.HEIGHT, 
      this.x1, 
      GAME_BASELINE_POSITION, 
      Floor.WIDTH, 
      Floor.HEIGHT
    );

    ctx.drawImage(
      this.image, 
      0, 
      0, 
      Floor.WIDTH, 
      Floor.HEIGHT, 
      this.x2, 
      GAME_BASELINE_POSITION, 
      Floor.WIDTH, 
      Floor.HEIGHT
    );
  }
}
