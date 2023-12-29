import { Object, GameState } from '../types';

export class Spawner {
  max: number;
  distance: number;
  obstacles: Array<Object>;
  lastObstacle: Object;
  onScreenObstacles: Array<Object>;

  constructor (
    max: number,
    distance: number,
    obstacles: Array<Object>,
    lastObstacle: Object,
    onScreenObstacles: Array<Object>,
  ) {
    this.max = max;
    this.distance = distance;
    this.obstacles = obstacles;
    this.lastObstacle = lastObstacle;
    this.onScreenObstacles = onScreenObstacles;
  }

  update (dt: number, state: GameState, keys: Set<string>): GameState {
    const onScreenObstacles = state.spawner.onScreenObstacles
      .map((o: Object) => o.update(dt, state, keys) as Object)
      .filter((o: Object) => (o.x + o.width) > 0)

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

      if (last === undefined || (800 - (last.x + last.width) > this.distance)) {
        const next = this.obstacles[Math.round(Math.random() * (this.obstacles.length - 1))];

        this.lastObstacle = next;
        onScreenObstacles.push(next)
      }

      return Object.assign(state, { 
        spawner: new Spawner(
          this.max,
          this.distance,
          this.obstacles,
          this.lastObstacle,
          onScreenObstacles,
        )
      })
    }
  }
}