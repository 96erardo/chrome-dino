let display = new Display('canvas');
let keys = new Set();
let lastTime = 0;
let passed = 0;
let i = 0;
let game;

document.addEventListener('keydown', (event) => {
  keys.add(event.key)
})

document.addEventListener('keyup', (event) => {
  if (game.status === "stop" || game.status === "over") {
    if (event.code === "Space") {

      game = GameState.createFromStatus("playing")
      keys.clear();
      lastTime = 0

      requestAnimationFrame(run);
    }
  } else {
    keys.delete(event.key)
  }
})

function run (time) {
  const delta = lastTime ? (time - lastTime) / 1000 : 0; // Convert the time passed to seconds
  lastTime = time;

  passed += delta;
  i += 1;

  game = game.update(delta, keys)

  display.draw(game)

  if (game.status === "playing") {
    requestAnimationFrame(run)    
  }
}

GameState.load()
  .then(() => {
    game = GameState.createFromStatus("stop");
    requestAnimationFrame(run)
  })