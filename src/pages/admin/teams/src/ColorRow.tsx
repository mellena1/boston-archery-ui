import { useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { HiTrash } from "react-icons/hi";
import { useClickAway, useDebounce } from "react-use";

import { Button } from "@/components/ui/button";


export interface ColorRowProps {
  onDelete: () => void;
  color: string;
  setColor: (color: string) => void;
  colorPickerHidden: boolean;
  onClick: () => void;
  onClickAway: () => void;
}

export function ColorRow({
  color,
  setColor,
  onDelete,
  colorPickerHidden,
  onClick,
  onClickAway,
}: ColorRowProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useClickAway(divRef, onClickAway);

  return (
    <div className="flex">
      <div ref={divRef}>
        <ColorInput
          color={color}
          setColor={setColor}
          hidden={colorPickerHidden}
          onClick={onClick}
        />
      </div>
      <div className="pl-4">
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
  hidden: boolean;
  onClick: () => void;
}

function ColorInput({ color, setColor, hidden, onClick }: ColorInputProps) {
  const [selectedColor, setSelectedColor] = useState(color);

  useDebounce(
    () => {
      if (color !== selectedColor) {
        setColor(selectedColor);
      }
    },
    200,
    [selectedColor],
  );

  return (
    <>
      <div className="flex space-x-2">
        <div
          className="w-10 h-10 border-2 border-black dark:border-white"
          style={{
            backgroundColor: selectedColor,
          }}
          onClick={onClick}
        />
        <HexColorInput
          className="w-full"
          color={selectedColor}
          onChange={(newColor) => {
            setSelectedColor(newColor);
          }}
          prefixed
        />
      </div>
      {!hidden && (
        <div className="z-10 absolute">
          <HexColorPicker
            color={selectedColor}
            onChange={(newColor) => {
              setSelectedColor(newColor);
            }}
          />
        </div>
      )}
    </>
  );
}