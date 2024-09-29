import { Game } from './shared/Game'; 
import { State } from './shared/State'; 
import { Display } from './shared/Display'; 

const keys = new Set<string>();
const game = new Game(State.initialState())
const display = new Display();

document.addEventListener('keydown', (e) => {
  keys.add(e.key)
});

document.addEventListener('keyup', (e) => {
  keys.delete(e.key)
});

game.update(0, keys);

display.draw(game.state);