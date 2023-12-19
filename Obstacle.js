class Obstacle {
  constructor (x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.xSpeed = 200;
  }

  update (dt) {
    let x = this.x;
    let y = this.y;

    if ((this.x + this.width) < 0) {
      x = 900;
    
    } else {
      x -= dt * this.xSpeed;
    }

    return new Obstacle(x, y, this.width, this.height);
  }

  draw (ctx) {
    ctx.save()

    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height)

    ctx.restore()
  }
}