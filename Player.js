class Player {
  constructor (x, y, ySpeed = 0, status = "jumping") {
    const { 0: { width, height } } = this.display[status]

    this.x = x;
    this.y = y;
    this.status = status;
    this.width = width;
    this.height = height;
    this.sprite = this.display[status]
    this.ySpeed = ySpeed;
  }

  static async load () {
    const img = elt('img', { src: './src/assets/img/dinosaur.png' })

    await new Promise ((res) => {
      function onLoad () {
        Player.prototype.display = {
          jumping: [
            new Sprite(102, 0, 88, 90, img),
          ],
          running: [
            new Sprite(294, 0, 88, 94, img),
            new Sprite(390, 0, 88, 94, img),
          ],
          down: [
            new Sprite(678, 34, 118, 60, img),
            new Sprite(804, 34, 118, 60, img),
          ],
          lost: [
            new Sprite(486, 0, 88, 94, img),
          ],
        }

        img.removeEventListener('load', onLoad);
        res()
      }

      img.addEventListener('load', onLoad)
    })
  }

  update (dt, state, keys) {
    let x = this.x;
    let y = this.y;
    let ySpeed = this.ySpeed;
    let status = this.status;

    if ((this.y + this.height) < GAME_BASELINE_UPPER_LIMIT) {
      ySpeed += dt * 2200;

    } else {
      status = "running";
      ySpeed = 0
    }
    
    if ((y + this.height) > GAME_BASELINE_UPPER_LIMIT) {
      ySpeed = 0;
      y = GAME_BASELINE_UPPER_LIMIT - this.height;
    }

    if ((y + this.height) === GAME_BASELINE_UPPER_LIMIT && keys.has('ArrowUp')) {
      status = "jumping";
      ySpeed += -800;
    }

    if (keys.has('ArrowDown')) {
      if (y + this.height === GAME_BASELINE_UPPER_LIMIT) {
        y = GAME_BASELINE_UPPER_LIMIT - 60;
      }

      status = "down"
    }

    y = y + dt * ySpeed;

    if (
      state.spawner.onScreenObstacles.some(o => rect_rect_collision(
        new Player(x, y, ySpeed, status),
        o
      ))
    ) {
      return new GameState("over", new Player(x, y, ySpeed, "lost"), state.spawner);
    }

    return new GameState(state.status, new Player(x, y, ySpeed, status), state.spawner);
  }

  draw (ctx) {
    let tile = this.sprite[(Math.floor(Date.now() / 150) % this.sprite.length)];
    
    ctx.save()
    
    ctx.fillStyle = 'rgba(31, 240, 77, .4)';
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(this.sprite[0].image, tile.x, tile.y, tile.width, tile.height, this.x, this.y, this.width, this.height)

    ctx.restore()
  }
}