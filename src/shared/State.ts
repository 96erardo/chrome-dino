import { Dinosaur } from '../modules/dinosaur/Dinosaur';
import { Spawner } from '../modules/obstacles/Spawner';
import { Speed } from './objects/Speed';

export class State {
  speed: Speed;
  status: GameStatus;
  dinosaur: Dinosaur;
  obstacles: Spawner; 

  constructor (
    status: GameStatus,
    dinosaur: Dinosaur, 
    obstacles: Spawner, 
    speed: Speed
  ) { 
    this.status = status;
    this.speed = speed;
    this.dinosaur = dinosaur;
    this.obstacles = obstacles;
  }

  static initialState (): State {
    return new State(
      GameStatus.Running,
      new Dinosaur(0, 0),
      new Spawner([]),
      new Speed()
    )
  }
}

export enum GameStatus {
  Running = "Running",
  Ended = "Ended",
}