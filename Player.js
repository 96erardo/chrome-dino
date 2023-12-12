class Player {
  constructor (x, y, ySpeed = 0, xSpeed = 0) {
    this.width = 50;
    this.height = 80;
    this.x = x;
    this.y = y;
    this.ySpeed = ySpeed;
    this.xSpeed = xSpeed;
  }

  update (dt, state, keys) {
    let x = this.x;
    let y = this.y;
    let ySpeed = this.ySpeed;

    if ((this.y + this.height) < 448) {
      ySpeed += dt * 500

    } else {
      ySpeed = 0
    }
    
    if ((y + this.height) > 448) {
      y = 448 - this.height;
    }

    if ((y + this.height) === 448 && keys.has('ArrowUp')) {
      ySpeed += -300;
    }

    y = y + dt * ySpeed;

    const player = new Player(x, y, ySpeed)

    return new GameState("stop", player, [])
  }
}