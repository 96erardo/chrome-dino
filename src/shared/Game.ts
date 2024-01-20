import { Player } from '../modules/player/Player';
import { Cactus } from '../modules/obstacles/Cactus';
import { Bird } from '../modules/obstacles/Bird';
import { Empty } from '../modules/obstacles/Empty';
import { Spawner } from './objects/Spawner';
import { Floor } from './objects/Floor';
import { Cloud } from './objects/Cloud';
import { Score } from './objects/Score';
import { font, loadImage, CANVAS_WIDTH, DRAWN_FLOOR_POSITION } from './utils';
import { Entity, GameStatus, GameState } from './types';
import reset from '../assets/img/reset.png';

export class Game {
  status: GameStatus;
  player: Entity;
  spawner: Spawner;
  objects: Array<Entity>;
  score: Entity;
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
    
    this.acc = 20;
    this.maxSpeed = 1100;
  };

  static async load () {
    await Promise.all([
      Player.load(),
      Cactus.load(),
      Bird.load(),
      Floor.load(),
      Cloud.load(),
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
          new Cactus(CANVAS_WIDTH, 388, "lg-1"),
          new Cactus(CANVAS_WIDTH, 428, "lg-2"),
          new Cactus(CANVAS_WIDTH, 388, "lg-4"),
          new Bird("low", CANVAS_WIDTH, 0),
          new Bird("medium", CANVAS_WIDTH, 0),
          new Bird("high", CANVAS_WIDTH, 0),
          new Empty(CANVAS_WIDTH, DRAWN_FLOOR_POSITION),
          new Empty(CANVAS_WIDTH, DRAWN_FLOOR_POSITION),
        ],
        null,
        []
      ),
      objects: [
        new Floor(0), 
        new Floor(Floor.WIDTH),
        new Cloud(CANVAS_WIDTH + 0, 124),
        new Cloud(CANVAS_WIDTH + 300, 315),
        new Cloud(CANVAS_WIDTH + 500, 275),
        new Cloud(CANVAS_WIDTH + 900, 200),
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

    let objects = this.objects.map((o) => o.update(dt, state, keys));
    
    state = Object.assign(state, { objects });
    state = this.spawner.update(dt, state, keys);
    state = this.player.update(dt, state, keys) as GameState;
    state = this.score.update(dt, state, keys) as GameState;

    return Game.from(this, state);
  }
}