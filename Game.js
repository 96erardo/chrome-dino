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

  update (dt, keys) {
    let state;

    state = this.spawner.update(dt, this, keys);
    state = this.player.update(dt, state, keys);

    return state;
  }
}
