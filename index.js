const fps = 30;
let lastTime = 0;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let game = new GameState("stop", new Player(50,200), []);
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

  if (i === 30 && passed < 1) {
    setTimeout(() => {
      console.log('frames per second', i, 'in', passed)
      passed = 0;
      i = 0;
      requestAnimationFrame(run)
    }, (1 - passed));

  } else {
    requestAnimationFrame(run)
  }
}

requestAnimationFrame(run)