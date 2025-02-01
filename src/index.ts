import { Game } from './shared/Game'; 
import { State, GameStatus } from './shared/State'; 
import { MediaPlayer } from './shared/MediaPlayer';
import { Display } from './shared/Display';
import './index.css';

const keys = new Set<string>();
const game = new Game(State.initialState())
const display = new Display();
const media = new MediaPlayer();

let lastTime = 0;

document.addEventListener('keydown', (e) => {
  keys.add(e.key)

  if (
    game.state.status === GameStatus.Ended &&
    e.code === 'Space'
  ) {
    game.restart()
    game.state.status = GameStatus.Running;

    lastTime = 0;
    requestAnimationFrame(run)
  
  } else if (
    game.state.status === GameStatus.Stopped &&
    e.code === 'Space'
  ) {
    game.state.status = GameStatus.Running;

    lastTime = 0;
    requestAnimationFrame(run);
  }
});

document.addEventListener('keyup', (e) => {
  keys.delete(e.key)
});

function run (timestamp: DOMHighResTimeStamp) {
  const dt = lastTime === 0 ? 0 : (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  media.playBefore(game.state, keys);

  game.update(dt, keys);

  media.playAfter(game.state, keys);

  display.draw(game.state);

  if (game.state.status === GameStatus.Running) {
    requestAnimationFrame(run);
  } else {
    game.end();
  }
}

game.load().then(() => requestAnimationFrame(run));