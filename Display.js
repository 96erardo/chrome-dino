class Display {
  draw (ctx, state) {
    ctx.fillStyle = 'rgb(247,247,247)';
    ctx.fillRect(0, 0, 800, 480);

    ctx.lineWidth = 4;
    ctx.moveTo(0, 450);
    ctx.lineTo(800, 450);
    ctx.stroke();

    // Player
    ctx.fillStyle = 'blue';
    ctx.fillRect(state.player.x, state.player.y, state.player.width, state.player.height)
  }
}