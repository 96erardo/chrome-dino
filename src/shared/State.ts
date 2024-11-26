import { Dinosaur } from '../modules/dinosaur/Dinosaur';
import { Spawner } from '../modules/obstacles/Spawner';

export class State {
  speed: number;
  dinosaur: Dinosaur;
  obstacles: Spawner; 

  constructor (dinosaur: Dinosaur, obstacles: Spawner) { 
    this.speed = 300;
    this.dinosaur = dinosaur;
    this.obstacles = obstacles;
  }

  static initialState (): State {
    return new State(
      new Dinosaur(0, 0),
      new Spawner([]),
    )
  }
}