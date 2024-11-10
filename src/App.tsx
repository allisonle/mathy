import "./App.css";

import Board from "@components/board";

import GameProvider from "@context/game-provider";

function App() {
  return (
    <GameProvider>
      <h1 className="text-3xl font-bold">Mathler!!</h1>
      <Board />
    </GameProvider>
  );
}

export default App;
