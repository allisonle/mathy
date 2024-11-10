import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getDailyTimestamp, generateExpression } from "@/lib/gameUtils";

type GameContextType = string;

const GameContext = createContext<GameContextType>("");

const GameProvider: FC<PropsWithChildren> = ({ children }) => {
  const [game, setGame] = useState<string>("");

  useEffect(() => {
    if (!window) return;
    const gamesStr = window.localStorage.getItem("games");
    const games = JSON.parse(gamesStr || "{}");
    const timestamp = getDailyTimestamp();

    const todaysPuzzle = games[timestamp];
    console.log("existing puzzle: ", todaysPuzzle);

    if (!todaysPuzzle) {
      const newPuzzle = generateExpression();
      console.log("new puzzle: ", newPuzzle);
      setGame(newPuzzle);
      window.localStorage.setItem(
        "games",
        JSON.stringify({ ...games, [timestamp]: newPuzzle }),
      );
    } else {
      setGame(todaysPuzzle);
    }
  }, []);

  const value = useMemo(() => game, [game]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);

export default GameProvider;
