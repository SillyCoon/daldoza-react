import { OpponentCommand } from '../model/command';
import { GameState } from '../model/game-state';

export interface ReactOpponent {
  name: string;
  order: number;
  getCommandFor(state: GameState): Promise<OpponentCommand>;
  send(command: OpponentCommand | null): Promise<void>;
}
