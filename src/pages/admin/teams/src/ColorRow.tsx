import { useState } from "react";

import { Button } from "flowbite-react";
import { HexColorPicker } from "react-colorful";
import { HiTrash } from "react-icons/hi";

export interface ColorRowProps {
  onDelete: () => void;
  color: string;
  setColor: (color: string) => void;
  colorPickerHidden: boolean;
  onClick: () => void;
}

export function ColorRow({
  color,
  setColor,
  onDelete,
  colorPickerHidden,
  onClick,
}: ColorRowProps) {
  return (
    <div className="flex">
      <div>
        <ColorInput
          color={color}
          setColor={setColor}
          hidden={colorPickerHidden}
          onClick={onClick}
        />
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
  hidden: boolean;
  onClick: () => void;
}

function ColorInput({ color, setColor, hidden, onClick }: ColorInputProps) {
  return (
    <>
      <div
        className="w-10 h-10 border-2 border-black dark:border-white"
        style={{
          backgroundColor: color,
        }}
        onClick={onClick}
      />
      {!hidden && (
        <div className="z-10 absolute">
          <HexColorPicker
            color={color}
            onChange={(newColor) => {
              setColor(newColor);
            }}
          />
        </div>
      )}
    </>
  );
}
