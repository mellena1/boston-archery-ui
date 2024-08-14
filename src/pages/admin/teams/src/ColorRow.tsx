import { useState } from "react";

import { Button } from "flowbite-react";
import { HexColorPicker } from "react-colorful";
import { HiTrash } from "react-icons/hi";

export interface ColorRowProps {
  onDelete: () => void;
}

export function ColorRow({ onDelete }: ColorRowProps) {
  const [color, setColor] = useState<string>("#FF0000");
  return (
    <div className="flex">
      <div>
        <ColorInput color={color} setColor={setColor} />
      </div>
      <div className="pl-2">
        <Button onClick={onDelete} className="p-1">
          <HiTrash />
        </Button>
      </div>
    </div>
  );
}

interface ColorInputProps {
  color: string;
  setColor: React.Dispatch<string>;
}

function ColorInput({ color, setColor }: ColorInputProps) {
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <div
        className="w-10 h-10 border-2 border-black dark:border-white"
        style={{
          backgroundColor: color,
        }}
        onClick={() => {
          setHidden(!hidden);
        }}
      />
      {!hidden && (
        <HexColorPicker
          color={color}
          onChange={(newColor) => {
            setColor(newColor);
          }}
        />
      )}
    </>
  );
}
