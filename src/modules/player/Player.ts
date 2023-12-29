import { Sprite } from '../../shared/objects/Sprite';
import { Cactus } from '../obstacles/Cactus';
import dinosaur from '../../assets/img/dinosaur.png';
import { 
  loadImage,
  GAME_BASELINE_UPPER_LIMIT,
  rect_rect_collision,
} from '../../shared/utils';

import {
  Object,
  GameState,
  GameStatus,
} from "../../shared/types";

export class Player implements Object {
  x: number;
  y: number;
  width: number;
  height: number;
  ySpeed: number;
  status: PlayerStatus;
  sprite: Array<Sprite>;
  display: Record<string, Array<Sprite>>

  constructor (
    x: number, 
    y: number, 
    ySpeed: number = 0, 
    status: PlayerStatus = PlayerStatus.Jumping
  ) {
    const { 0: { width, height } } = this.display[status]

    this.x = x;
    this.y = y;
    this.status = status;
    this.width = width;
    this.height = height;
    this.sprite = this.display[status]
    this.ySpeed = ySpeed;
  }

  static async load () {
    const img = await loadImage(dinosaur);

    Player.prototype.display = {
      jumping: [
        new Sprite(102, 0, 88, 90, img),
      ],
      running: [
        new Sprite(294, 0, 88, 94, img),
        new Sprite(390, 0, 88, 94, img),
      ],
      down: [
        new Sprite(678, 34, 118, 60, img),
        new Sprite(804, 34, 118, 60, img),
      ],
      lost: [
        new Sprite(486, 0, 88, 94, img),
      ],
    }
  }

  update (dt: number, state: GameState, keys: Set<string>): GameState {
    let x = this.x;
    let y = this.y;
    let ySpeed = this.ySpeed;
    let status = this.status;

    if ((this.y + this.height) < GAME_BASELINE_UPPER_LIMIT) {
      ySpeed += dt * 2200;

    } else {
      status = PlayerStatus.Running;
      ySpeed = 0
    }
    
    if ((y + this.height) > GAME_BASELINE_UPPER_LIMIT) {
      ySpeed = 0;
      y = GAME_BASELINE_UPPER_LIMIT - this.height;
    }

    if ((y + this.height) === GAME_BASELINE_UPPER_LIMIT && keys.has('ArrowUp')) {
      status = PlayerStatus.Jumping;
      ySpeed += -800;
    }

    if (keys.has('ArrowDown')) {
      if (y + this.height === GAME_BASELINE_UPPER_LIMIT) {
        y = GAME_BASELINE_UPPER_LIMIT - 60;
      }

      status = PlayerStatus.Down;
    }

    y = y + dt * ySpeed;

    if (
      state.spawner.onScreenObstacles.some((o: Cactus) => rect_rect_collision(
        new Player(x, y, ySpeed, status),
        o
      ))
    ) {
      return Object.assign(state, {
        status: GameStatus.Over,
        player: new Player(x, y, ySpeed, PlayerStatus.Lost)
      })
    }

    return Object.assign(state, {
      player: new Player(x, y, ySpeed, status)
    })
  }

  draw (ctx: CanvasRenderingContext2D) {
    let tile = this.sprite[(Math.floor(Date.now() / 150) % this.sprite.length)];
    
    ctx.save()

    ctx.drawImage(this.sprite[0].image, tile.x, tile.y, tile.width, tile.height, this.x, this.y, this.width, this.height)

    ctx.restore()
  }
}

export enum PlayerStatus {
  Jumping = "jumping",
  Running = "running",
  Down = "down",
  Lost = "lost"
}