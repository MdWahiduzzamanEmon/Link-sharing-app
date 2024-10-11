import React from "react";

interface CustomButtonProps {
  children?: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: string;
  color?: string;
  width?: string;
  style?: React.CSSProperties;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  color,
  width,
  style,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`${color} ${width} ${className} 
        text-purple-600 font-semibold py-2 px-5 rounded-lg outline-none focus:shadow-outline border border-purple-400 hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out text-[13px]
        `}
    >
      {label}
    </button>
  );
};

export default CustomButton;
