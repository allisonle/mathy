import { type FC, useEffect, useMemo, useState } from "react";

import Confetti from "@components/confetti";
import Keypad from "@components/keypad";

import { EXPR_LENGTH, KEY_CHARS, MAX_ATTEMPTS } from "@context/constants";
import { useGame } from "@context/game-provider";
import { type TGameState } from "@context/types";

import { triggerToast } from "@/helpers/toast";
import { commutativeCheck, judge } from "@/lib/utils";

const Board: FC = () => {
  const solution = useGame();
  const ans = useMemo(() => judge(solution), [solution]);

  const [attempts, setAttempts] = useState<number>(0);
  const [boardState, setBoardState] = useState<Array<Array<string>>>(
    Array(MAX_ATTEMPTS).fill(Array(EXPR_LENGTH).fill("")),
  );
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameState, setGameState] = useState<TGameState>("pending");
  const [guessedChars, setGuessedChars] = useState<string[]>([]);
  const [greenTiles, setGreenTiles] = useState<string[]>([]);
  const [yellowTiles, setYellowTiles] = useState<string[]>([]);

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

  const validateSubmission = () => {
    if (currentGuess.length < EXPR_LENGTH) {
      triggerToast("Expression must be 6 characters long", "error");
      return false;
    }

    const result = judge(currentGuess);

    if (result !== ans) {
      triggerToast("Expression must equal " + ans, "error");
      return false;
    }

    return true;
  };

  const submit = () => {
    if (!validateSubmission()) return;
    const updatedBoard = boardState.map((row, index) => {
      const greens = currentGuess
        .split("")
        .filter((char, idx) => char === solution[idx]);
      const yellows = currentGuess
        .split("")
        .filter(char => solution.includes(char) && !greens.includes(char));

      setGreenTiles(prev => [...prev, ...greens]);
      setYellowTiles(prev => [...prev, ...yellows]);
      setGuessedChars(prev => [...prev, ...currentGuess.split("")]);

      if (index === attempts) {
        return currentGuess.split("");
      }
      return row;
    });
    setBoardState(updatedBoard);

    if (currentGuess === solution || commutativeCheck(currentGuess, solution)) {
      setGameState("success");
      triggerToast("Congratulations! You have solved the puzzle!");
    } else if (attempts === MAX_ATTEMPTS - 1) {
      triggerToast("You have run out of attempts :(", "warning");
      setGameState("failure");
    } else {
      setAttempts(prev => prev + 1);
      setCurrentGuess("");
    }
  };

  const cellStyle = (character: string, index: number, rowIndex: number) => {
    if (gameState === "pending" && rowIndex >= attempts)
      return "text-gray-700 bg-tile";
    if (gameState === "success" && rowIndex === attempts) return "bg-green-500";
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
    <div className="flex flex-col items-center gap-4">
      {gameState === "success" && <Confetti />}
      <h2 className="text-xl font-medium">
        Find the expression that equals {ans}
      </h2>
      <div className="flex flex-col items-center">
        {boardState.map((row, idx) => (
          <div key={idx} className="flex gap-2">
            {row.map((cell: string, cellIdx: number) => (
              <div
                key={cellIdx}
                className={`flex items-center justify-center w-12 h-12 rounded-lg my-1 font-bold shadow-md box-border
                  ${cellStyle(
                    idx === attempts ? currentGuess[cellIdx] : cell,
                    cellIdx,
                    idx,
                  )}
                  ${gameState === "pending" && idx === attempts ? "border-2 border-white" : ""}
                `}
              >
                {idx === attempts ? currentGuess[cellIdx] : cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-4">
        <Keypad
          onBackspace={handleBackspace}
          onKeyPress={key => handleInputChar(key)}
          onSubmit={submit}
          guessedChars={guessedChars}
          greenTiles={greenTiles}
          yellowTiles={yellowTiles}
        />
      </div>
    </div>
  );
};

export default Board;
