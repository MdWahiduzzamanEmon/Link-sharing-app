import React from "react";

export const platforms = [
  "GitHub",
  "LinkedIn",
  "Facebook",
  "Twitter",
  "Instagram",
  "Youtube",
];

const platformIcons: { [key in (typeof platforms)[number]]: string } = {
  GitHub: "🌐",
  LinkedIn: "🔗",
  Facebook: "🔗",
  Twitter: "🔗",
  Instagram: "🔗",
  Youtube: "🔗",
};

const CustomSelect: React.FC<{
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, value, onChange }) => {
  return (
    <div className="">
      {/* Label */}
      {label && (
        <label className="block font-medium text-gray-700 mb-2 text-[13px]">
          {label}
        </label>
      )}

      {/* Icon + Select */}
      <div className="relative flex items-center border border-gray-300 rounded-md shadow-sm">
        {/* Icon on the left */}
        <span className="absolute left-2">{platformIcons[value] || "🌐"}</span>

        {/* Select Dropdown */}
        <select
          value={value}
          onChange={onChange}
          className="block w-full pl-8 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select Platform</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomSelect;
