import { Obstacle } from './Obstacle';
import { Game } from '../../shared/Game';

export class Spawner {
  max: number;
  distance: number;
  obstacles: Array<Obstacle>;
  lastObstacle: Obstacle;
  onScreenObstacles: Array<Obstacle>;

  constructor (
    max: number,
    distance: number,
    obstacles: Array<Obstacle>,
    lastObstacle: Obstacle,
    onScreenObstacles: Array<Obstacle>,
  ) {
    this.max = max;
    this.distance = distance;
    this.obstacles = obstacles;
    this.lastObstacle = lastObstacle;
    this.onScreenObstacles = onScreenObstacles;
  }

  update (dt: number, state: Game, keys: Set<string>) {
    const onScreenObstacles = state.spawner.onScreenObstacles
      .map((o: Obstacle) => o.update(dt))
      .filter((o: Obstacle) => (o.x + o.width) > 0)

    if (onScreenObstacles.length === this.max) {
      return Game.from(
        state,
        {
          spawner: new Spawner (
            this.max,
            this.distance,
            this.obstacles,
            this.lastObstacle,
            onScreenObstacles,
          )
        }
      )
    
    } else {
      const { [this.onScreenObstacles.length - 1]: last } = this.onScreenObstacles;

      if (last === undefined || (800 - (last.x + last.width) > this.distance)) {
        const next = this.obstacles[Math.round(Math.random() * (this.obstacles.length - 1))];

        this.lastObstacle = next;
        onScreenObstacles.push(next)
      }

      return Game.from(
        state,
        {
          spawner: new Spawner(
            this.max,
            this.distance,
            this.obstacles,
            this.lastObstacle,
            onScreenObstacles,
          ),
        }
      )
    }
  }
}