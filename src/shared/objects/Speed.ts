import { GAME_ACC, GAME_MAX_SPEED } from '../constants';
import { State } from '../State';

export class Speed {
  value: number;

  constructor (speed: number = 200) {
    this.value = speed;
  }

  update (dt: number, state: State, keys: Set<string>): Speed {
    const value = Math.min(GAME_MAX_SPEED, this.value + (GAME_ACC * dt))

    return new Speed(value);
  }
}