import { Dinosaur } from '../modules/dinosaur/Dinosaur';
import { Spawner } from '../modules/obstacles/Spawner';
import { Speed } from './objects/Speed';
import { Score } from './objects/Score';

export class State {
  speed: Speed;
  score: Score;
  status: GameStatus;
  dinosaur: Dinosaur;
  obstacles: Spawner; 

  constructor (
    status: GameStatus,
    dinosaur: Dinosaur, 
    obstacles: Spawner, 
    speed: Speed,
    score: Score,
  ) { 
    this.status = status;
    this.speed = speed;
    this.dinosaur = dinosaur;
    this.obstacles = obstacles;
    this.score = score;
  }

  static initialState (): State {
    return new State(
      GameStatus.Running,
      new Dinosaur(0, 0),
      new Spawner([]),
      new Speed(),
      new Score(),
    )
  }
}

export enum GameStatus {
  Running = "Running",
  Ended = "Ended",
}