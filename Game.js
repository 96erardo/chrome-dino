class GameState {
  constructor (
    status, 
    player, 
    spawner,
  ) {
    this.status = status; // stop - playing - over
    this.player = player;
    this.spawner = spawner;
  };

  static async load () {
    await Promise.all([
      Player.load(),
      Obstacle.load(),
    ])
  }

  static createFromStatus (status) {
    return new GameState(
      status,
      new Player(50,200), 
      new Spawner(
        3,
        300,
        [
          new Obstacle(800, 428, "sm-1"),
          new Obstacle(800, 388, "sm-2"),
          new Obstacle(800, 428, "sm-3"),
          new Obstacle(800, 388, "lg-1"),
          new Obstacle(800, 428, "lg-2"),
          new Obstacle(800, 388, "lg-4"),
        ],
        null,
        []
      )
    )
  }

  update (dt, keys) {
    let state;

    state = this.spawner.update(dt, this, keys);
    state = this.player.update(dt, state, keys);

    return state;
  }
}
