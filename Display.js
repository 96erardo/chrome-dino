const dinosaur = new Image()
dinosaur.src = './src/assets/img/dinosaur.png'

const sprite = {
  0: {
    x: 6,
    y: 4,
    width: 88,
    height: 90,
  },
  1: {
    x: 102,
    y: 0,
    width: 88,
    height: 94,
  },
  2: {
    x: 198,
    y: 0,
    width: 88,
    height: 94,
  },
  3: {
    x: 294,
    y: 0,
    width: 88,
    height: 94,
  },
  4: {
    x: 390,
    y: 0,
    width: 88,
    height: 94,
  },
}

class Display {
  draw (ctx, state) {
    ctx.fillStyle = 'rgb(247,247,247)';
    ctx.fillRect(0, 0, 800, 480);

    ctx.lineWidth = 4;
    ctx.moveTo(0, 450);
    ctx.lineTo(800, 450);
    ctx.stroke();

    // Player
    this.drawPlayer(state.player)
    // Obstacles
    this.drawObstacles(state.spawner.onScreenObstacles);
  }

  drawPlayer (player) {
    let tile;

    if ((player.y + player.height) < 448) {
      tile = sprite[1]
    } else {
      tile = sprite[(Math.floor(Date.now() / 150) % 2) + 3];
    }    
    
    ctx.save()
    
    ctx.drawImage(dinosaur, tile.x, tile.y, tile.width, tile.height, player.x, player.y, tile.width, tile.height)

    ctx.restore()
  }

  drawObstacles (obstacles) {    
    for (const ob of obstacles) {
      ctx.save()

      ctx.fillStyle = 'black';
      ctx.fillRect(ob.x, ob.y, ob.width, ob.height)

      ctx.restore()
    }
  }
}