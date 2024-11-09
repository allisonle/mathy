import { type FC, useState } from "react";

interface Props {
  onKeyPress: (key: string) => void;
}

const Keypad: FC<Props> = ({ onKeyPress }) => {
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
    <div className="w-1/2 flex flex-wrap gap-2">
      {keys.map(key => (
        <button
          key={key}
          className="w-12 h-12 cursor-pointer text-black bg-white rounded-lg border-2 border-gray-400"
          onClick={() => onKeyPress(key)}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default Keypad;
