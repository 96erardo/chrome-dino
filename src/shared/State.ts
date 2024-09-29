import { Dinosaur } from '../modules/dinosaur/Dinosaur';

export class State {
  dinosaur: Dinosaur;

  constructor (dinosaur: Dinosaur) { 
    this.dinosaur = dinosaur;
  }

  static initialState (): State {
    return new State(
      new Dinosaur(0, 0)
    )
  }
}