"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";

const ThemePicker = () => {
  const [selectedColor, setSelectedColor] = useState("#3498db"); // Initial default color

  const colorOptions = [
    "#3498db",
    "#e74c3c",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#34495e",
    "#ecf0f1",
  ];

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="project_name" className="font- text-md">
        Theme
      </label>
      <div className="flex gap-1 justify-between items-center ">
        <div className="flex gap-2">
          {colorOptions.map((color, index) => (
            <div
              style={{
                border: `2px solid ${
                  selectedColor === color ? color : "transparent"
                }`,
              }}
              key={index}
              onClick={() => handleColorChange(color)}
              className="p-1 rounded-full"
            >
              <div
                className="w-8 h-8 rounded-full cursor-pointer "
                style={{ backgroundColor: color }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center h-fit w-fit">
          <Input
            type="text"
            label="Custom Color"
            labelPlacement="outside-left"
            placeholder="Enter your project name here..."
            description={""}
            id="project_color"
            name="project_color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-fit "
            classNames={{
              // base: ["max-w-[40rem]"],
              inputWrapper: ["bg-white", "dark:bg-stone-700"],
            }}
            variant="faded"
          />
        </div>
      </div>
    </div>
  );
};

export default ThemePicker;
