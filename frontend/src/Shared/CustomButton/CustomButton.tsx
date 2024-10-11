import React from "react";

interface CustomButtonProps {
  children?: React.ReactNode;
  label: string;
  onClick?: () => void;
  color?: string;
  width?: string;
  style?: React.CSSProperties;
  className?: string;
  variant?: "outline" | "filled";
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  color,
  width,
  style,
  className,
  variant = "outline",
  disabled,
  loading,
}) => {
  return (
    <button
      onClick={onClick}
      style={style}
      disabled={loading || disabled}
      className={`${color} ${width} ${className} 
      ${disabled && "opacity-50 hover:opacity-50 cursor-not-allowed"}
        ${
          variant === "outline"
            ? "text-main_color font-semibold py-2 px-5 rounded-lg outline-none focus:shadow-outline border border-main_color/60 hover:bg-main_color hover:text-white transition duration-300 ease-in-out text-[13px]"
            : "bg-main_color text-white font-semibold py-2 px-5 rounded-lg focus:shadow-outline  transition duration-300 ease-in-out text-[13px] hover:opacity-90"
        }`}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};

export default CustomButton;
