import { Dinosaur } from '../modules/dinosaur/Dinosaur';
import { Spawner } from '../modules/obstacles/Spawner';
import { Speed } from './objects/Speed';
import { Score } from './objects/Score';
import { Floor } from './objects/Floor';
import { Cloud } from './objects/Cloud';
import { CANVAS_WIDTH } from './constants';

export class State {
  speed: Speed;
  score: Score;
  status: GameStatus;
  dinosaur: Dinosaur;
  obstacles: Spawner;
  floor: Array<Floor>;
  clouds: Array<Cloud>

  constructor (
    status: GameStatus,
    dinosaur: Dinosaur, 
    obstacles: Spawner, 
    speed: Speed,
    score: Score,
    floor: Array<Floor>,
    clouds: Array<Cloud>
  ) { 
    this.status = status;
    this.speed = speed;
    this.dinosaur = dinosaur;
    this.obstacles = obstacles;
    this.score = score;
    this.floor = floor;
    this.clouds = clouds
  }

  static initialState (): State {
    return new State(
      GameStatus.Running,
      new Dinosaur(0, 0),
      new Spawner([]),
      new Speed(),
      new Score(),
      [new Floor(0), new Floor(Floor.WIDTH)],
      [
        new Cloud(200, 100),
        new Cloud(450, 250),
        new Cloud(CANVAS_WIDTH, 150),
      ]
    )
  }
}

export enum GameStatus {
  Running = "Running",
  Ended = "Ended",
}