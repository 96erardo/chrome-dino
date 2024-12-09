import { State } from './State';
import { Collision } from './objects/Collision';

export class Game {
  state: State;
  collision: Collision;

  constructor (state: State) {
    this.state = state;
    this.collision = new Collision();
  }

  update (dt: number, keys: Set<string>) {
    const speed = this.state.speed.update(dt, this.state, keys);
    const obstacles = this.state.obstacles.update(dt, this.state, keys);
    const dinosaur = this.state.dinosaur.update(dt, this.state, keys);
    const status = this.collision.detect(dinosaur, obstacles);

    this.state = new State(status, dinosaur, obstacles, speed);
  }

  restart () {
    this.state = State.initialState();
  }
}