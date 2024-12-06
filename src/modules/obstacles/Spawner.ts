import { Cactus, CactusType } from './Cactus';
import { State } from '../../shared/State';
import { MAX_ON_SCREEN } from './constants';
import { CANVAS_WIDTH, JUMPING_TIME } from '../../shared/constants';
import { Obstacle } from '../../shared/objects/Obstacle';

export class Spawner {
  obstacles: Array<Obstacle>
  nextAt: number;

  constructor (obstacles: Array<Obstacle>, nextAt: number = 0) {
    this.obstacles = obstacles;
    this.nextAt = nextAt;
  }

  update (dt: number, state: State, keys: Set<string>): Spawner {
    const obstacles = this.obstacles
      .map(obstacle => obstacle.update(dt, state, keys))
      .filter(obstacle => obstacle.x + obstacle.width > 0);
    
    let nextAt = Math.max(0, this.nextAt - (state.speed.value * dt));

    if (nextAt === 0 && obstacles.length < MAX_ON_SCREEN) {
      const index = Math.round(Math.random() * (factory.length - 1));
      const newObstacle = factory[index]();

      if (newObstacle.canAppear(state)) {
        nextAt = (JUMPING_TIME * state.speed.value) + (Math.random() * CANVAS_WIDTH);
        obstacles.push(factory[index]());
      }
    }

    return new Spawner(obstacles, nextAt);
  }

  draw (ctx: CanvasRenderingContext2D) {
    this.obstacles.forEach(obstacle => obstacle.draw(ctx));
  }
}

const factory: Array<() => Obstacle> = [
  () => new Cactus(CactusType.SM1, CANVAS_WIDTH),
  () => new Cactus(CactusType.SM2, CANVAS_WIDTH),
  () => new Cactus(CactusType.SM3, CANVAS_WIDTH),
  () => new Cactus(CactusType.LG1, CANVAS_WIDTH),
  () => new Cactus(CactusType.LG2, CANVAS_WIDTH),
  () => new Cactus(CactusType.LG3, CANVAS_WIDTH),
]