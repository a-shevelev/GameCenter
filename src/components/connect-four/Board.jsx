import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./Board.css";

const Board = () => {
  const initialBoard = Array(7)
    .fill()
    .map(() => Array(6).fill(null));
  //let winningCombination = Array();
  const [board, setBoard] = useState(initialBoard);
  const [winningCombination, setWinningCombination] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [winner, setWinner] = useState(null);
  const [isNewGame, setIsNewGame] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [currentCol, setCurrentCol] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

  const [falling, setFalling] = useState(null);
  const [fallingCoords, setFallingCoords] = useState({ x: 0, y: 0 });

  const handleStartFalling = (columnIndex) => {
    if (winner || isNewGame || isColumnFull(columnIndex)) return;

    setFallingCoords({ x: 0, y: 0 });

    const boardCopy = board.map((col) => [...col]);
    const rowIndexToInsert = boardCopy[columnIndex].lastIndexOf(null);

    boardCopy[columnIndex][rowIndexToInsert] = currentPlayer;
    setBoard(boardCopy);
    setCurrentCol(columnIndex);
    setCurrentRow(rowIndexToInsert);
    setFalling({ column: columnIndex, rowIndex: rowIndexToInsert });

    const nextPlayer = currentPlayer === "red" ? "yellow" : "red";
    setCurrentPlayer(nextPlayer);
    setWinner(checkWinner(boardCopy, columnIndex, rowIndexToInsert));
    console.log(winningCombination);
  };

  const isColumnFull = (columnIndex) => {
    return board[columnIndex][0] !== null;
  };

  const checkWinner = (board, columnIndex, rowIndex) => {
    const directions = [
      [1, 0], // horizontal
      [0, 1], // vertical
      [1, 1], // diagonal left-up to right-down
      [-1, 1], // diagonal right-up to left-down
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      let combination = [{ x: columnIndex, y: rowIndex }];

      const player = board[columnIndex][rowIndex];
      //count += checkCombination(columnIndex, rowIndex, dx, dy, 1, board);
      //count += checkCombination(columnIndex, rowIndex, dx, dy, -1, board);

      // Check positive direction
      for (let i = 1; i <= 3; i++) {
        const x = columnIndex + i * dx;
        const y = rowIndex + i * dy;

        if (
          x >= 0 &&
          x < board.length &&
          y >= 0 &&
          y < board[x].length &&
          board[x][y] === player
        ) {
          if (count !== 4) {
            combination.push({ x, y });
            count++;
          }
        } else {
          break;
        }
      }

      // Check negative direction
      for (let i = 1; i <= 3; i++) {
        const x = columnIndex - i * dx;
        const y = rowIndex - i * dy;

        if (
          x >= 0 &&
          x < board.length &&
          y >= 0 &&
          y < board[x].length &&
          board[x][y] === player
        ) {
          if (count !== 4) {
            combination.push({ x, y });
            count++;
          }
        } else {
          break;
        }
      }

      if (count >= 4) {
        setWinningCombination(JSON.parse(JSON.stringify(combination)));
        //console.log(winningCombination);
        return player;
      }
    }

    return null;
  };
  const checkCombination = (
    columnIndex,
    rowIndex,
    dx,
    dy,
    direction,
    board
  ) => {
    const player = board[columnIndex][rowIndex];
    let count = 0;
    for (let i = 1; i <= 3; i++) {
      const x = columnIndex + direction * i * dx;
      const y = rowIndex + direction * i * dy;

      if (
        x >= 0 &&
        x < board.length &&
        y >= 0 &&
        y < board[x].length &&
        board[x][y] === player
      ) {
        //combination.push({ x, y });
        count++;
      } else {
        break;
      }
    }
    return count;
  };

  const handleNewGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer("red");
    setWinner(null);
    setIsNewGame(false);
    setWinningCombination([]);
  };
  const AnimatedBall = ({ columnIndex, rowIndex, isWinningCell }) => {
    const isFalling =
      falling &&
      falling.column === columnIndex &&
      falling.rowIndex === rowIndex;

    const springProps = useSpring({
      from: {
        translateY: -500,
      },
      to: {
        translateY: 0,
      },
    });

    return (
      <>
        <animated.div
          className={`animated-cell ${
            board[columnIndex][rowIndex] === "red"
              ? "red"
              : board[columnIndex][rowIndex] === "yellow"
              ? "yellow"
              : ""
          } ${
            isWinningCell
              ? "winner_ball" // Добавьте класс для подсветки победной комбинации
              : "classic_ball"
          } `}
          style={{
            top: `${rowIndex * 70}px`,
            background:
              board[columnIndex][rowIndex] === "red"
                ? "radial-gradient(circle at center, #ff5656, #cc0000)"
                : board[columnIndex][rowIndex] === "yellow"
                ? "radial-gradient(circle at center, #ffe54c, #cc9900)"
                : "none",

            ...(columnIndex === currentCol && rowIndex === currentRow
              ? {
                  transform: springProps.translateY.interpolate(
                    (y) => `translate(0, ${y}px)`
                  ),
                }
              : {
                  top: `${rowIndex * 70}px`,
                }),
          }}
        ></animated.div>
      </>
    );
  };

  return (
    <div>
      <div className="wrapper">
        <h1>Connect Four</h1>
        <div className="header">
          <button className="button_new" onClick={handleNewGame}>
            New Game
          </button>{" "}
          {/* Кнопка начала новой игры */}
          {winner ? (
            <div className="winner">
              <div>Winner: </div> <div className={`circle ${winner}`}></div>
            </div>
          ) : (
            <div className="current-player">
              <div>Current Player:</div>
              <div className={`circle ${currentPlayer}`}></div>
            </div>
          )}
        </div>
        <div className="board">
          {board.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="column"
              onClick={() => handleStartFalling(columnIndex)}
            >
              {Array(6)
                .fill()
                .map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="hole"
                    style={{
                      top: `${rowIndex * 70}px`,
                    }} /* Установите абсолютное позиционирование для дырок */
                  ></div>
                ))}

              {column.map((cell, rowIndex) => (
                <AnimatedBall
                  key={rowIndex}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  isWinningCell={winningCombination.some(
                    (coord) => coord.x === columnIndex && coord.y === rowIndex
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
