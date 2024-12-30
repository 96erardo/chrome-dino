import { State, GameStatus } from './State';
import { Collision } from './objects/Collision';
import { Dinosaur } from '../modules/dinosaur/Dinosaur';
import { Cactus } from '../modules/obstacles/Cactus';

export class Game {
  state: State;
  collision: Collision;

  constructor (state: State) {
    this.state = state;
    this.collision = new Collision();
  }

  async load () {
    return Promise.all([
      Dinosaur.load(),
      Cactus.load(),
    ])
  }

  update (dt: number, keys: Set<string>) {
    const speed = this.state.speed.update(dt, this.state, keys);
    const obstacles = this.state.obstacles.update(dt, this.state, keys);
    const dinosaur = this.state.dinosaur.update(dt, this.state, keys);
    const score = this.state.score.update(dt, this.state, keys);
    const status = this.collision.detect(dinosaur, obstacles);

    if (status === GameStatus.Ended) {
      dinosaur.died();
    }

    this.state = new State(status, dinosaur, obstacles, speed, score);
  }

  restart () {
    this.state = State.initialState();
  }

  end () {
    const highest = parseInt(sessionStorage.getItem('highest')) || 0;

    if (this.state.score.points > highest) {
      sessionStorage.setItem('highest', this.state.score.points.toString());
    }
  }
}