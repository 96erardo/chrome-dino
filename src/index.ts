import Display from "./shared/Display";
import { Game } from "./shared/Game";
import { GameStatus } from "./shared/types";
import { MediaPlayer } from "./shared/media/MediaPlayer";
import './index.css';

const display = new Display();
let keys = new Set<string>();
let lastTime = 0;
let passed = 0;
let i = 0;
let game: Game;
let media: MediaPlayer;

document.addEventListener('click', () => {
  if (game && game.status === 'over') {
    game = Game.initFromStatus(GameStatus.Playing)
    keys.clear();
    lastTime = 0

    requestAnimationFrame(run);
  }
})

document.addEventListener('keydown', (event) => {
  keys.add(event.key)
})

document.addEventListener('keyup', (event) => {
  if (game.status === "stop" || game.status === "over") {
    if (event.code === "Space") {
      media =  media ? media : new MediaPlayer()

      game = Game.initFromStatus(GameStatus.Playing)
      keys.clear();
      lastTime = 0

      requestAnimationFrame(run);
    }
  } else {
    keys.delete(event.key)
  }
})

function run (time: DOMHighResTimeStamp) {
  const delta = lastTime ? (time - lastTime) / 1000 : 0; // Convert the time passed to seconds
  lastTime = time;

  passed += delta;
  i += 1;
  
  media?.before(game, keys);
  
  game = game.update(delta, keys);
  
  media?.after(game, keys);
  
  display.draw(game);

  if (game.status === "playing") {
    requestAnimationFrame(run)    
  }
}

Game.load()
  .then(() => {
    game = Game.initFromStatus(GameStatus.Stop);
    requestAnimationFrame(run)
  })