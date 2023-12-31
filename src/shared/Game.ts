import { Player } from '../modules/player/Player';
import { Cactus } from '../modules/obstacles/Cactus';
import { Bird } from '../modules/obstacles/Bird';
import { Empty } from '../modules/obstacles/Empty';
import { Spawner } from './objects/Spawner';
import { Floor } from './objects/Floor';
import { Score } from './objects/Score';
import { font, loadImage, CANVAS_WIDTH, GAME_BASELINE_POSITION } from './utils';
import { Object, GameStatus, GameState } from './types';
import reset from '../assets/img/reset.png';

export class Game {
  status: GameStatus;
  player: Object;
  spawner: Spawner;
  objects: Array<Object>;
  score: Object;
  acc: number;
  speed: number;
  maxSpeed: number;

  constructor (config: GameState) {
    this.status = config.status;
    this.player = config.player;
    this.spawner = config.spawner;
    this.objects = config.objects;
    this.score = config.score;
    this.speed = config.speed;
    
    this.acc = 5;
    this.maxSpeed = 1000;
  };

  static async load () {
    await Promise.all([
      Player.load(),
      Cactus.load(),
      Bird.load(),
      Floor.load(),
      font.load(),
      loadImage(reset),
    ])
  }

  static from (game: Game, config: Partial<GameState>) {
    return new Game({
      status: game.status,
      player: game.player,
      spawner: game.spawner,
      objects: game.objects,
      score: game.score,
      speed: game.speed,
      ...config,
    })
  }

  static initFromStatus (status: GameStatus) {
    return new Game({
      status,
      player: new Player(50,200), 
      spawner: new Spawner(
        3,
        350,
        [
          new Cactus(CANVAS_WIDTH, 428, "sm-1"),
          new Cactus(CANVAS_WIDTH, 388, "sm-2"),
          new Cactus(CANVAS_WIDTH, 428, "sm-3"),
          new Empty(CANVAS_WIDTH, GAME_BASELINE_POSITION),
          new Cactus(CANVAS_WIDTH, 388, "lg-1"),
          new Cactus(CANVAS_WIDTH, 428, "lg-2"),
          new Empty(CANVAS_WIDTH, GAME_BASELINE_POSITION),
          new Cactus(CANVAS_WIDTH, 388, "lg-4"),
          new Bird(CANVAS_WIDTH, 200, 0),
          new Empty(CANVAS_WIDTH, GAME_BASELINE_POSITION),
        ],
        null,
        []
      ),
      objects: [
        new Floor(0), 
        new Floor(Floor.WIDTH),
      ],
      score: new Score(),
      speed: 200,
    })
  }

  getState (): GameState {
    return {
      status: this.status,
      player: this.player,
      spawner: this.spawner,
      objects: this.objects,
      score: this.score,
      speed: this.speed,
    }
  }

  update (dt: number, keys: Set<string>): Game {
    this.speed = Math.min(this.maxSpeed, this.speed + (this.acc * dt));
    let state = this.getState();

    console.log(this.speed)

    let objects = this.objects.map((o) => o.update(dt, state, keys));
    
    state = Object.assign(state, { objects });
    state = this.spawner.update(dt, state, keys);
    state = this.player.update(dt, state, keys) as GameState;
    state = this.score.update(dt, state, keys) as GameState;

    return Game.from(this, state);
  }
}