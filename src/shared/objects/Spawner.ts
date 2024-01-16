import { Obstacle, GameState } from '../types';
import { CANVAS_WIDTH, DINO_TIME_IN_AIR } from '../utils';
import { Score } from './Score';

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

  update (dt: number, state: GameState, keys: Set<string>): GameState {
    if ((state.score as Score).points < 30) {
      return state
    }

    const distance = DINO_TIME_IN_AIR * state.speed + 125
    const onScreenObstacles = state.spawner.onScreenObstacles
      .map((o: Obstacle) => o.update(dt, state, keys))
      .filter((o: Obstacle) => (o.x + o.width) > 0)

    if (onScreenObstacles.length === this.max) {
      return Object.assign(state, {
        spawner: new Spawner(
          this.max,
          this.distance,
          this.obstacles,
          this.lastObstacle,
          onScreenObstacles,
        )
      })
    
    } else {
      const { [this.onScreenObstacles.length - 1]: last } = this.onScreenObstacles;

      if (last === undefined || (CANVAS_WIDTH - (last.x + last.width) > distance)) {
        const obstacles = this.obstacles.filter(o => o.canAppear(state))
        const next = obstacles[Math.round(Math.random() * (obstacles.length - 1))];

        this.lastObstacle = next;
        onScreenObstacles.push(next)
      }

      return Object.assign(state, {
        spawner: new Spawner(
          this.max,
          distance,
          this.obstacles,
          this.lastObstacle,
          onScreenObstacles,
        )
      })
    }
  }
}