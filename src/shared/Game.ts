import { Player } from '../modules/objects/Player';
import { Obstacle } from '../modules/objects/Obstacle';
import { Spawner } from '../modules/objects/Spawner';
import { Floor } from '../modules/objects/Floor';

export class Game {
  status: GameStatus;
  player: Player;
  spawner: Spawner;
  floor: Floor;

  constructor (
    status: GameStatus,
    player: Player,
    spawner: Spawner,
    floor: Floor,
  ) {
    this.status = status; // stop - playing - over
    this.player = player;
    this.spawner = spawner;
    this.floor = floor;
  };

  static async load () {
    await Promise.all([
      Player.load(),
      Obstacle.load(),
      Floor.load(),
    ])
  }

  static createFromStatus (status: GameStatus) {
    return new Game(
      status,
      new Player(50,200), 
      new Spawner(
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
      new Floor(0, Floor.WIDTH)
    )
  }

  update (dt: number, keys: Set<string>) {
    let state;

    state = this.floor.update(dt, this, keys);
    state = this.spawner.update(dt, state, keys);
    state = this.player.update(dt, state, keys);

    return state;
  }
}

export enum GameStatus {
  Stop = "stop",
  Playing = "playing",
  Over = "over",
}