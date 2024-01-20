import { Sprite } from '../../shared/objects/Sprite';
import { Cactus } from '../obstacles/Cactus';
import { Empty } from '../obstacles/Empty';
import dinosaur from '../../assets/img/dinosaur.png';
import { 
  loadImage,
  ACT_FLOOR_POSITION,
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

  static STANDING_WIDTH = 88;
  static STANDING_HEIGHT = 94;
  
  static DOWN_WIDTH = 118;
  static DOWN_HEIGHT = 60;

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
        new Sprite(102, 0, Player.STANDING_WIDTH, Player.STANDING_HEIGHT, img),
      ],
      running: [
        new Sprite(294, 0, Player.STANDING_WIDTH, Player.STANDING_HEIGHT, img),
        new Sprite(390, 0, Player.STANDING_WIDTH, Player.STANDING_HEIGHT, img),
      ],
      down: [
        new Sprite(678, 34, Player.DOWN_WIDTH, Player.DOWN_HEIGHT, img),
        new Sprite(804, 34, Player.DOWN_WIDTH, Player.DOWN_HEIGHT, img),
      ],
      lost: [
        new Sprite(486, 0, Player.STANDING_WIDTH, Player.STANDING_HEIGHT, img),
      ],
    }
  }

  update (dt: number, state: GameState, keys: Set<string>): GameState {
    let x = this.x;
    let y = this.y;
    let ySpeed = this.ySpeed;
    let status = PlayerStatus.Running;

    if ((this.y + this.height) < ACT_FLOOR_POSITION) {
      status = PlayerStatus.Jumping;
      ySpeed += dt * 2200;

    } else {
      status = PlayerStatus.Running;
      ySpeed = 0
    }
    
    if ((y + this.height) > ACT_FLOOR_POSITION) {
      ySpeed = 0;
      y = ACT_FLOOR_POSITION - this.height;
    }

    if ((y + this.height) === ACT_FLOOR_POSITION && keys.has('ArrowUp')) {
      ySpeed += -900;
    }

    if (keys.has('ArrowDown')) {
      if (y + this.height >= ACT_FLOOR_POSITION) {
        y = ACT_FLOOR_POSITION - Player.DOWN_HEIGHT;
      
      } else {
        ySpeed += dt * 3000;
      }

      status = PlayerStatus.Down;
    }

    if (
      !keys.has('ArrowDown') && 
      this.status === PlayerStatus.Down &&
      y + this.height >= ACT_FLOOR_POSITION
    ) {
      y -= (Player.STANDING_HEIGHT - Player.DOWN_HEIGHT)
    }

    y = y + dt * ySpeed;

    if (
      state.spawner.onScreenObstacles
      .filter((o: Object) => o instanceof Empty === false)
      .some((o: Cactus) => rect_rect_collision(
        new Player(x, y, ySpeed, status),
        o
      ))
    ) {

      if (
        status === PlayerStatus.Down &&
        (y + this.height) >= ACT_FLOOR_POSITION
      ) {
        y = ACT_FLOOR_POSITION - Player.STANDING_HEIGHT
      }
      
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