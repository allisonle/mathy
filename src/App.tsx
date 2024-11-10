import "./App.css";

import Board from "@components/board";

import GameProvider from "@context/game-provider";

function App() {
  return (
    <GameProvider>
      <h1 className="text-amber-400 text-4xl font-semibold font-fredoka">
        Mathler
      </h1>
      <Board />
    </GameProvider>
  );
}

export default App;
