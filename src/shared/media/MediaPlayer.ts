import { Jump } from './Jump';
import { Point } from './Point';
import { Die } from './Die';
import { Game } from '../Game';

export class MediaPlayer {
  ctx: AudioContext;
  jump: Jump;
  point: Point;
  die: Die;

  constructor () {
    this.ctx = new AudioContext();

    this.jump = new Jump(this.ctx);
    this.point = new Point(this.ctx);
    this.die = new Die(this.ctx);
  }

  static async load () {
    return await Promise.all([
      Jump.load(),
      Point.load(),
      Die.load(),
    ])
  }

  before (game: Game, keys: Set<string>) {
    this.jump.play(game, keys);
  }

  after (game: Game, keys: Set<string>) {
    this.point.play(game, keys);
    this.die.play(game, keys);
  }
}