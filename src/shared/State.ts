import { Dinosaur } from '../modules/dinosaur/Dinosaur';
import { ObstacleSpawner } from './utils/ObstacleSpawner';
import { smCactus, mCactus, lCactus } from '../modules/obstacles/Cactus';
import { CANVAS_WIDTH } from './constants';

export class State {
  dinosaur: Dinosaur;
  obstacles: ObstacleSpawner;

  constructor (
    dinosaur: Dinosaur,
    obstacles: ObstacleSpawner,
  ) { 
    this.dinosaur = dinosaur;
    this.obstacles = obstacles;
  }

  static initialState (): State {
    return new State(
      new Dinosaur(0, 0, 0),
      new ObstacleSpawner(
        [smCactus, mCactus, lCactus],
        [],
        3
      )
    )
  }
}