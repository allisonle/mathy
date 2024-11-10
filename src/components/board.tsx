import { type FC, useEffect, useState } from "react";

import Keypad from "@components/keypad";

import { EXPR_LENGTH, KEY_CHARS, MAX_ATTEMPTS } from "@context/constants";

const Board: FC = () => {
  const solution = "12*4+3";
  const [boardState, setBoardState] = useState(
    Array(MAX_ATTEMPTS).fill(Array(EXPR_LENGTH).fill("")),
  );
  const [attempts, setAttempts] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);
    return () => window.removeEventListener("keydown", onKeyPress);
  });

  const handleBackspace = () => {
    setCurrentGuess(prev => prev.slice(0, prev.length - 1));
  };

  const handleInputChar = (key: string) => {
    setCurrentGuess(prev => prev + key);
  };

  const onKeyPress = (event: KeyboardEvent) => {
    const { key } = event;
    if (key === "Enter") submit();
    else if (key === "Backspace") handleBackspace();
    else if (KEY_CHARS.includes(key)) handleInputChar(key);
  };

  const submit = () => {
    if (currentGuess.length < 6) return;
    const updatedBoard = boardState.map((row, index) => {
      if (index === attempts) {
        return currentGuess.split("");
      }
      return row;
    });
    setBoardState(updatedBoard);

    if (currentGuess === solution) {
      console.log("yay");
    } else if (attempts === MAX_ATTEMPTS - 1) {
      console.log("boo");
    } else {
      setAttempts(prev => prev + 1);
      setCurrentGuess("");
    }
  };

  const cellStyle = (character: string, index: number, rowIndex: number) => {
    console.log("fill row: ", rowIndex, attempts);
    if (rowIndex >= attempts) return "text-gray-700 bg-tile";
    if (!character) return "bg-tile";

    if (character === solution[index]) {
      return "bg-green-500";
    }
    if (solution.includes(character)) {
      return "bg-yellow-500";
    }
    return "bg-gray-500";
  };

  return (
    <div className="flex flex-col items-center">
      {boardState.map((row, idx) => (
        <div key={idx} className="flex gap-2">
          {row.map((cell: string, cellIdx: number) => (
            <div
              key={cellIdx}
              className={`flex items-center justify-center w-12 h-12 rounded-lg my-1 font-bold shadow-md
                ${cellStyle(
                  idx === attempts ? currentGuess[cellIdx] : cell,
                  cellIdx,
                  idx,
                )}
              `}
            >
              {idx === attempts ? currentGuess[cellIdx] : cell}
            </div>
          ))}
        </div>
      ))}
      <div className="flex flex-col items-center mt-4">
        <Keypad
          onBackspace={handleBackspace}
          onKeyPress={key => handleInputChar(key)}
          onSubmit={submit}
        />
      </div>
    </div>
  );
};

export default Board;
