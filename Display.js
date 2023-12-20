class Display {
  constructor (elementId) {
    this.canvas = document.getElementById(elementId);
    this.ctx = canvas.getContext('2d');
  }

  draw (state) {
    this.ctx.fillStyle = 'rgb(247,247,247)';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.ctx.lineWidth = 4;
    this.ctx.moveTo(0, GAME_BASELINE_POSITION);
    this.ctx.lineTo(CANVAS_WIDTH, GAME_BASELINE_POSITION);
    this.ctx.stroke();

    // Player
    state.player.draw(this.ctx)
    // Obstacles
    state.spawner.onScreenObstacles.forEach(o => o.draw(this.ctx))

    if (state.status === "over") {
      this.ctx.save()

      this.ctx.font = '48px sans-serif';
      this.ctx.fillStyle = 'black';

      const { width } = this.ctx.measureText('GAME OVER');

      this.ctx.fillText(
        "GAME OVER", 
        (CANVAS_WIDTH / 2) - (width / 2), 
        (CANVAS_HEIGHT / 2) - (48 / 2)
      )

      this.ctx.restore()
    }
  }
}