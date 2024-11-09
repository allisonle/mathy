import { type FC, useState } from "react";

const EMPTY_ROW = ["", "", "", "", "", ""];
const MAX_ATTEMPTS = 6;

const Board: FC = () => {
  const solution = "12*4+3";
  const [boardState, setBoardState] = useState(
    Array(MAX_ATTEMPTS).fill(EMPTY_ROW),
  );
  const [attempts, setAttempts] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");

  const submit = () => {
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
    if (rowIndex >= attempts) return "text-gray-700 bg-gray-200";
    if (!character) return "bg-gray-200";

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
              className={`flex items-center justify-center w-12 h-12 rounded-lg my-1 font-bold 
                ${cellStyle(
                  idx === attempts ? currentGuess[cellIdx] : cell,
                  cellIdx,
                  idx,
                )}
                ${idx === attempts ? "border-gray-400" : "border-gray-200"}
              `}
            >
              {idx === attempts ? currentGuess[cellIdx] : cell}
            </div>
          ))}
        </div>
      ))}
      <div className="flex flex-col items-center mt-4">
        <button onClick={() => setCurrentGuess("48+5-2")}>test guess</button>
        <button onClick={submit}>submit guess</button>
      </div>
    </div>
  );
};

export default Board;
