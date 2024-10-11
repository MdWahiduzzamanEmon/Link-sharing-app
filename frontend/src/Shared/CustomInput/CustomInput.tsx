import { FC } from "react";

interface CustomInputProps {
  name: string;
  label: string;
  type?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
  value?: string;
}

const CustomInput: FC<CustomInputProps> = ({
  name,
  label,
  type = "text",
  handleChange,
  value,
  error,
}) => {
  return (
    <section className="w-full flex flex-row space-x-5 justify-between items-center lg:gap-2 my-2 lg:px-8  bg-gray-100 rounded-xl">
      <span className="text-gray-600 text-[12px]">{label}</span>
      <section className=" w-3/5 flex flex-col gap-2">
        <input
          onChange={handleChange}
          name={name}
          type={type}
          value={value || ""}
          className={`w-full p-2 rounded-md bg-white text-gray-500 border border-gray-300 focus:border-main_color/60 focus:shadow-md focus:shadow-main_color/30
       focus:outline-none focus:ring-1 focus:ring-main_color/60 ${
         error && "border-red-500"
       }
        `}
        />
        {error && <span className="text-red-500 text-[11px]">{error}</span>}
      </section>
    </section>
  );
};

export default CustomInput;
