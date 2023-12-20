class Obstacle {
  constructor (x, y, type = "sm-1") {
    this.type = type;
    this.sprite = this.display[type]
    this.width = this.sprite.width;
    this.height = this.sprite.height;
    this.x = x;
    this.y = GAME_BASELINE_UPPER_LIMIT - this.height;
    this.xSpeed = 200;
  }

  static async load () {
    const img = elt('img', { src: './src/assets/img/cactus.png' })

    await new Promise ((res) => {
      function onLoad () {
        Obstacle.prototype.display = {
          'sm-1': new Sprite(0, 14, 17, 35, img),
          'sm-2': new Sprite(22, 14, 39, 35, img),
          'sm-3': new Sprite(66, 14, 61, 35, img),
          'lg-1': new Sprite(133, 0, 25, 50, img),
          'lg-2': new Sprite(163, 0, 55, 50, img),
          'lg-4': new Sprite(223, 0, 75, 49, img),
        }

        img.removeEventListener('load', onLoad);
        res()
      }

      img.addEventListener('load', onLoad)
    })
  }

  update (dt) {
    let x = this.x;
    let y = this.y;

    if ((this.x + this.width) < 0) {
      x = 900;
    
    } else {
      x -= dt * this.xSpeed;
    }

    return new Obstacle(x, y, this.type);
  }

  draw (ctx) {
    ctx.save()

    ctx.fillStyle = 'black';
    ctx.drawImage(
      this.sprite.image, 
      this.sprite.x, 
      this.sprite.y, 
      this.sprite.width, 
      this.sprite.height, 
      this.x, 
      this.y, 
      this.width, 
      this.height
    )

    ctx.restore()
  }
}