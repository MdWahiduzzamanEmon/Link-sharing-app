import { FC } from "react";

interface CustomInputProps {
  name: string;
  type?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: FC<CustomInputProps> = ({
  name,
  type = "text",
  handleChange,
}) => {
  return (
    <section className="w-full flex flex-row space-x-5 justify-between items-center lg:gap-2 my-2 lg:px-8  bg-gray-100 rounded-xl">
      <span className="text-gray-600 text-[12px]">{name}</span>
      <input
        onChange={handleChange}
        type={type}
        className="w-4/6 p-2 rounded-md bg-white text-gray-500 border border-gray-300 focus:border-main_color/60 focus:shadow-md focus:shadow-main_color/30
       focus:outline-none focus:ring-1 focus:ring-main_color/60 
        "
      />
    </section>
  );
};

export default CustomInput;
