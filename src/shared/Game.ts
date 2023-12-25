import { Player } from '../modules/objects/Player';
import { Obstacle } from '../modules/objects/Obstacle';
import { Spawner } from '../modules/objects/Spawner';
import { Floor } from '../modules/objects/Floor';
import { Score } from '../modules/objects/Score';

export class Game {
  status: GameStatus;
  player: Player;
  spawner: Spawner;
  floor: Floor;
  acc: number;
  speed: number;
  score: Score;

  constructor (config: GameState) {
    this.status = config.status;
    this.player = config.player;
    this.spawner = config.spawner;
    this.floor = config.floor;
    this.acc = 20;
    this.speed = config.speed;
    this.score = config.score;
  };

  static async load () {
    await Promise.all([
      Player.load(),
      Obstacle.load(),
      Floor.load(),
    ])
  }

  static from (game: Game, config: Partial<GameState>) {
    return new Game({
      status: game.status,
      player: game.player,
      spawner: game.spawner,
      floor: game.floor,
      speed: game.speed,
      score: game.score,
      ...config,
    })
  }

  static initFromStatus (status: GameStatus) {
    return new Game({
      status,
      player: new Player(50,200), 
      spawner: new Spawner(
        3,
        300,
        [
          new Obstacle(800, 428, "sm-1"),
          new Obstacle(800, 388, "sm-2"),
          new Obstacle(800, 428, "sm-3"),
          new Obstacle(800, 388, "lg-1"),
          new Obstacle(800, 428, "lg-2"),
          new Obstacle(800, 388, "lg-4"),
        ],
        null,
        []
      ),
      floor: new Floor(0, Floor.WIDTH),
      speed: 200,
      score: new Score(),
    })
  }

  getState (): GameState {
    return {
      status: this.status,
      player: this.player,
      spawner: this.spawner,
      floor: this.floor,
      speed: this.speed,
      score: this.score,
    }
  }

  update (dt: number, keys: Set<string>) {
    let state: Game = this;

    state = this.score.update(dt, state, keys);
    state = this.floor.update(dt, state, keys);
    state = this.spawner.update(dt, state, keys);
    state = this.player.update(dt, state, keys);

    return state;
  }
}

export type GameState = {
  status: GameStatus,
  player: Player,
  spawner: Spawner,
  floor: Floor,
  speed: number,
  score: Score,
}

export enum GameStatus {
  Stop = "stop",
  Playing = "playing",
  Over = "over",
}