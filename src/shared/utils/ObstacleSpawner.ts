import { CANVAS_WIDTH } from '../constants';
import { State } from '../State';
import { Entity, EntityFactory } from '../types';

export class ObstacleSpawner {
  obstacles: Array<EntityFactory>;
  obstaclesOnScreen: Array<Entity>;
  maxOnScreen: number;
  
  constructor (
    obstacles: Array<EntityFactory>,
    obstaclesOnScreen: Array<Entity>,
    maxOnScreen: number,
  ) {
    this.obstacles = obstacles;
    this.obstaclesOnScreen = obstaclesOnScreen;
    this.maxOnScreen = maxOnScreen;
  }

  update (dt: number, state: State, keys: Set<string>): ObstacleSpawner {
    let obstaclesOnScreen = this.obstaclesOnScreen
      .map(obstacles => obstacles.update(dt, state, keys))
      .filter(obstacles => (obstacles.x + obstacles.width) > 0);

    if (obstaclesOnScreen.length < this.maxOnScreen) {
      const { [obstaclesOnScreen.length - 1]: lastObstacle } = obstaclesOnScreen;

      if (!lastObstacle || (lastObstacle.x + lastObstacle.width) < CANVAS_WIDTH - 200) {
        const rand = Math.round(Math.random() * (this.obstacles.length - 1));
        const newObstacle = this.obstacles[rand]();

        obstaclesOnScreen.push(newObstacle);
      }
    }

    return new ObstacleSpawner(
      this.obstacles,
      obstaclesOnScreen,
      this.maxOnScreen,
    )
  }
}