import React from "react";
import { cn } from "../../libs/utils";

interface CircularTextProps {
  text: string;
  radius?: number;
  fontSize?: number;
  textColor?: string;
  icon?: React.ReactNode;
  iconSize?: number;
  iconColor?: string;
  className?: string;
}

const CircularText = ({
  text,
  radius = 100,
  fontSize = 16,
  textColor = "black",
  icon,
  iconSize = 24,
  // iconColor = "black",
  className,
}: CircularTextProps) => {
  const characters = text.split("");
  const angleStep = 360 / characters.length;

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      className={cn(
        "bg-primaryBlue  lg:block lg:w-full lg:h-full w-1/2 h-1/2 rounded-full p-2 font-arsenal",
        className
      )}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius - fontSize}
        fill="none"
        // stroke="#ddd"
        // strokeWidth="1"
      />
      {characters.map((char, index) => {
        const angle = index * angleStep - 90; // Start at the top
        const x =
          radius + (radius - fontSize / 2) * Math.cos((angle * Math.PI) / 180);
        const y =
          radius + (radius - fontSize / 2) * Math.sin((angle * Math.PI) / 180);
        return (
          <text
            key={index}
            x={x}
            y={y}
            fontSize={fontSize}
            fill={textColor}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${angle + 90}, ${x}, ${y})`}
          >
            {char}
          </text>
        );
      })}
      {icon && (
        <foreignObject
          x={radius - iconSize / 2}
          y={radius - iconSize / 2}
          width={iconSize}
          height={iconSize}
          // fill="red"
        >
          {icon}
        </foreignObject>
      )}
    </svg>
  );
};

CircularText.displayName = "CircularText";

export default CircularText;
