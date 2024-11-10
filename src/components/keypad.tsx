import { type FC, useState } from "react";
import { CornerDownLeft, MoveLeft } from "lucide-react";

import { KEY_CHARS } from "@context/constants";

interface Props {
  onBackspace: () => void;
  onKeyPress: (key: string) => void;
  onSubmit: () => void;
  guessedChars: string[];
  greenTiles: string[];
  yellowTiles: string[];
}

const Keypad: FC<Props> = ({
  onBackspace,
  onKeyPress,
  onSubmit,
  guessedChars,
  greenTiles,
  yellowTiles,
}) => {
  const getKeyColor = (key: string) => {
    if (greenTiles.includes(key)) return "bg-green-400";
    if (yellowTiles.includes(key)) return "bg-yellow-400";
    if (guessedChars.includes(key)) return "bg-gray-400";
    return "bg-white";
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-1/2 flex flex-wrap gap-1">
        {KEY_CHARS.map(key => (
          <button
            key={key}
            className={`w-12 h-12 cursor-pointer font-semibold text-black rounded-lg box-border border-2 border-border ${getKeyColor(key)}`}
            onClick={() => onKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          className="flex items-center justify-center w-[120px] h-12 cursor-pointer text-black bg-white rounded-lg"
          onClick={onBackspace}
        >
          <MoveLeft size={16} />
        </button>
        <button
          className="flex items-center justify-center w-[120px] h-12 cursor-pointer text-black bg-button rounded-lg"
          onClick={onSubmit}
        >
          <CornerDownLeft size={16} />
        </button>
      </div>
    </div>
  );
};

export default Keypad;
