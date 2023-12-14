const fps = 120;
let lastTime = 0;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let game = new GameState(
  "stop", 
  new Player(50,200), 
  new Spawner(
    3,
    300,
    [
      new Obstacle(800, 428, 20, 20),
      new Obstacle(800, 388, 20, 60)
    ],
    null,
    []
  )
);
let display = new Display();
let keys = new Set();
let passed = 0;
let i = 0;

document.addEventListener('keydown', (event) => {
  keys.add(event.key)
})

document.addEventListener('keyup', (event) => {
  keys.delete(event.key)
})

function run (time) {
  const delta = (time - lastTime) / 1000; // Convert the time passed to seconds
  lastTime = time;

  passed += delta;
  i += 1;

  game = game.update(delta, keys)

  display.draw(ctx, game)

  if (i === fps && passed < 1) {
    setTimeout(() => {
      console.log('frames per second', i, 'in', passed)
      passed = 0;
      i = 0;
      requestAnimationFrame(run)
    }, (1 - passed) * 1000);

  } else {
    requestAnimationFrame(run)
  }
}

requestAnimationFrame(run)