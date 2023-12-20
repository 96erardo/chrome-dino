class Spawner {
  constructor (
    max,
    distance,
    obstacles,
    lastObstacle,
    onScreenObstacles,
  ) {
    this.max = max;
    this.distance = distance;
    this.obstacles = obstacles;
    this.lastObstacle = lastObstacle;
    this.onScreenObstacles = onScreenObstacles;
  }

  update (dt, state, keys) {
    const onScreenObstacles = state.spawner.onScreenObstacles
      .map(o => o.update(dt))
      .filter(o => (o.x + o.width) > 0)

    if (onScreenObstacles.length === this.max) {
      return new GameState(
        state.status,
        state.player,
        new Spawner (
          this.max,
          this.distance,
          this.obstacles,
          this.lastObstacle,
          onScreenObstacles,
        )
      )
    
    } else {
      const { [this.onScreenObstacles.length - 1]: last } = this.onScreenObstacles;

      if (last === undefined || (800 - (last.x + last.width) > this.distance)) {
        const next = this.obstacles[Math.round(Math.random() * (this.obstacles.length - 1))];

        this.lastObstacle = next;
        onScreenObstacles.push(next)
      }

      return new GameState(
        state.status,
        state.player,
        new Spawner(
          this.max,
          this.distance,
          this.obstacles,
          this.lastObstacle,
          onScreenObstacles,
        )
      )
    }
  }

  static create (max, distance, obstacles, lastObstacle) {
    return new Spawner(
      max,
      distance,
      obstacles,
      lastObstacle,
    )
  }
}