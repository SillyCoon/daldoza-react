import { useEffect, useState } from 'react';
import './game.css';
import { GameModeEnum } from '../game/models/game-elements/enums/game-mode';
import { Opponent } from '../game/logic/opponent/opponent';
import { CanvasDrawer } from '../game/logic/drawer';
import { InteractiveBoard } from '../game/logic/control/Interactive-board';
import { Size } from '../game/models/draw/size';
import { ColorScheme } from '../game/models/draw/color-scheme';
import { Board } from './Board';
import { Controls } from './Controls';
import { Logger } from './Logger';
import { GameState } from '../game/logic/game-state';
import { Command } from '../game/logic/commands/command';
import { Color } from '../game/models/game-elements/color';
import styled from 'styled-components';

const colorScheme = new ColorScheme();
const size = new Size();
const board = new InteractiveBoard(size);
const drawer = new CanvasDrawer(board, colorScheme, size);

const GameWrapper = styled.div`
  display: flex;
`;

export interface DaldozaProps {
  myName: string;
  mode: GameModeEnum;
  opponent: Opponent;
}

export const Game = (props: DaldozaProps) => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [gameState, setGameState] = useState(GameState.start(size.fieldSize));
  const [events, setEvents] = useState<any[]>([]);
  const [currentColor, setCurrentColor] = useState<Color>(1);

  const [isMyTurn, setIsMyTurn] = useState(true);

  const playerStatistics = (gameState: GameState) => {
    return {
      name:
        gameState.currentPlayerColor === 1 ? props.myName : props.opponent.name,
      win: false,
    };
  };

  useEffect(() => {
    const draw = (state: GameState) => {
      drawer.draw(state, playerStatistics(state));
    };

    draw(gameState);
  });

  const handleRoll = () => {};

  return (
    <GameWrapper>
      <Board
        size={size}
        disabled={!isMyTurn}
        statistic={playerStatistics(gameState)}
        gameState={gameState}
      ></Board>
      <Controls onRoll={() => handleRoll()}></Controls>
      <Logger events={events}></Logger>
    </GameWrapper>
  );
};

// export const RawGame = () => {

//   // useEffect(() => {
//   //   const container = new Container('game-container');
//   //   document.body.appendChild(container.nativeElement);
//   //   const app = new Daldoza(container, 'player', { mode: 0 }, new PrimitiveAI());
//   //   app.start();
//   // });

//   return <></>;
// };

// export const Game = styled(RawGame)`
// `;
