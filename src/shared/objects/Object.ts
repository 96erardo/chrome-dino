import { GameState } from "../types";

export interface Object {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly xSpeed?: number;
  readonly ySpeed?: number;
  
  update<T>(dt: number, state: GameState, keys: Set<string>): T

  draw(ctx: CanvasRenderingContext2D): void 
}