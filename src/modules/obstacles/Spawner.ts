import { Cactus, CactusType } from './Cactus';
import { State } from '../../shared/State';
import { MAX_ON_SCREEN } from './constants';
import { CANVAS_WIDTH } from '../../shared/constants';
import { Entity } from '../../shared/objects/Entity';

export class Spawner {
  obstacles: Array<Entity>

  constructor (obstacles: Array<Entity>) {
    this.obstacles = obstacles;
  }

  update (dt: number, state: State, keys: Set<string>): Spawner {
    const obstacles = this.obstacles
      .map(obstacle => obstacle.update(dt, state, keys))
      .filter(obstacle => obstacle.x + obstacle.width > 0);
    
    if (
      this.obstacles.length < MAX_ON_SCREEN
    ) {
      if (this.obstacles.length === 0) {
        const index = Math.round(Math.random() * (factory.length - 1));
  
        obstacles.push(factory[index]());

      } else {
        const { [this.obstacles.length - 1]: last } = this.obstacles;
  
        if ((last.x + last.width) + 300 < CANVAS_WIDTH) {
          const index = Math.round(Math.random() * (factory.length - 1));
  
          obstacles.push(factory[index]());
        }
      }
    }

    return new Spawner(obstacles);
  }

  draw (ctx: CanvasRenderingContext2D) {
    this.obstacles.forEach(obstacle => obstacle.draw(ctx));
  }
}

const factory: Array<() => Entity> = [
  () => new Cactus(CactusType.SM1, CANVAS_WIDTH),
  () => new Cactus(CactusType.SM2, CANVAS_WIDTH),
  () => new Cactus(CactusType.SM3, CANVAS_WIDTH),
  () => new Cactus(CactusType.LG1, CANVAS_WIDTH),
  () => new Cactus(CactusType.LG2, CANVAS_WIDTH),
  () => new Cactus(CactusType.LG3, CANVAS_WIDTH),
]