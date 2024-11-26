import { State } from './State';

export class Game {
  state: State;

  constructor (state: State) {
    this.state = state;
  }

  update (dt: number, keys: Set<string>) {
    const obstacles = this.state.obstacles.update(dt, this.state, keys);
    const dinosaur = this.state.dinosaur.update(dt, this.state, keys);

    this.state = new State(dinosaur, obstacles);
  }
}