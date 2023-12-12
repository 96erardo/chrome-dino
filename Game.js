class GameState {
  constructor (
    status, 
    player, 
    obstacles,
  ) {
    this.status = status;
    this.player = player;
    this.obstacles = obstacles;
  };

  update (dt, keys) {
    return this.player.update(dt, this, keys);
  }
}
