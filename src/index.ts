import { Game } from './shared/Game'; 
import { State } from './shared/State'; 
import { Display } from './shared/Display'; 
import './index.css';

const keys = new Set<string>();
const game = new Game(State.initialState())
const display = new Display();
let lastTime = 0;

document.addEventListener('keydown', (e) => {
  keys.add(e.key)
});

document.addEventListener('keyup', (e) => {
  keys.delete(e.key)
});

function run (timestamp: DOMHighResTimeStamp) {
  const dt = lastTime === 0 ? 0 : (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  game.update(dt, keys);

  display.draw(game.state);

  requestAnimationFrame(run);
}

requestAnimationFrame(run);