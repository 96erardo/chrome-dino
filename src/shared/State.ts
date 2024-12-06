import { Dinosaur } from '../modules/dinosaur/Dinosaur';
import { Spawner } from '../modules/obstacles/Spawner';
import { Speed } from './objects/Speed';

export class State {
  speed: Speed;
  dinosaur: Dinosaur;
  obstacles: Spawner; 

  constructor (dinosaur: Dinosaur, obstacles: Spawner, speed: Speed) { 
    this.speed = speed;
    this.dinosaur = dinosaur;
    this.obstacles = obstacles;
  }

  static initialState (): State {
    return new State(
      new Dinosaur(0, 0),
      new Spawner([]),
      new Speed()
    )
  }
}