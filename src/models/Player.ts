export class Player {
  constructor(
    public name: string,
    public currentPlayer: boolean,
    public scores: number,
    public type: string,
    public clickedSquares: number[]
  ) {}
}
