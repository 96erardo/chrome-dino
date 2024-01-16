import { Spawner } from './objects/Spawner';

export interface Object {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly xSpeed?: number;
  readonly ySpeed?: number;
  
  update(dt: number, state: GameState, keys: Set<string>): GameState | Object

  draw(ctx: CanvasRenderingContext2D): void 
}

export interface Obstacle extends Object {  

  update (dt: number, state: GameState, keys: Set<string>): Obstacle

  canAppear (state: GameState): boolean
}

export enum GameStatus {
  Stop = "stop",
  Playing = "playing",
  Over = "over",
}

export type GameState = {
  status: GameStatus,
  player: Object,
  spawner: Spawner,
  objects: Array<Object>,
  score: Object,
  speed: number,
}