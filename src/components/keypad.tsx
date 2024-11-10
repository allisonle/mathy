import { type FC, useState } from "react";
import { CornerDownLeft, MoveLeft } from "lucide-react";

interface Props {
  onBackspace: () => void;
  onKeyPress: (key: string) => void;
  onSubmit: () => void;
}

const Keypad: FC<Props> = ({ onBackspace, onKeyPress, onSubmit }) => {
  const [keys, setKeys] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "+",
    "-",
    "*",
    "/",
  ]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-1/2 flex flex-wrap gap-1">
        {keys.map(key => (
          <button
            key={key}
            className="w-12 h-12 cursor-pointer text-black bg-white rounded-lg box-border border-2 border-gray-400"
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
