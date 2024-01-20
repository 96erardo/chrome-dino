import { Spawner } from './objects/Spawner';

export interface Entity {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly xSpeed?: number;
  readonly ySpeed?: number;
  
  update(dt: number, state: GameState, keys: Set<string>): GameState | Entity

  draw(ctx: CanvasRenderingContext2D): void 
}

export interface Obstacle extends Entity {  

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
  player: Entity,
  spawner: Spawner,
  objects: Array<Entity>,
  score: Entity,
  speed: number,
}