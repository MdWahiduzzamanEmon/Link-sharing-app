import React from "react";
import CustomSelect from "../../../../Shared/CustomSelect/CustomSelect";
import { DEFAULT, validateLink } from "../GenerateLinks";
import { useDeleteOneLinkMutation } from "../../../../Store/feature/Link/LinkApiSlice";
import Swal from "sweetalert2";

interface Props {
  link: any;
  index: number;
  handleDragStart: (index: number) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (index: number) => void;
  handleInputChange: (id: number, field: string, value: string) => void;
  links: any[];
  setLinks: React.Dispatch<React.SetStateAction<any[]>>;
}

const LinkCard = ({
  link,
  index,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleInputChange,
  links,
  setLinks,
}: Props) => {
  const [deleteOneLink, { isLoading: isDeleteLinkLoading }] =
    useDeleteOneLinkMutation();
  // Handle Remove Link
  const handleRemoveLink = async (link: any) => {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this link!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (res.isConfirmed) {
      // delete link
      const result = await deleteOneLink(link?.id).unwrap();
      if (result?.status === 200) {
        Swal.fire("Deleted!", "Your link has been deleted.", "success");
        // remove link from state
        const newData = links.filter((l) => l.id !== link?.id);
        if (newData?.length > 0) {
          setLinks(newData);
        } else {
          setLinks(DEFAULT);
        }
      } else {
        Swal.fire("Failed!", "Something went wrong.", "error");
      }
    }
  };
  return (
    <div
      key={link.id}
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(index)}
      className="bg-gray-100 p-3 my-4 rounded-xl"
    >
      <section
        className="flex items-center justify-between mb-2"
        style={{ userSelect: "none" }}
      >
        {/* Drag Icon and Label */}
        <div className="flex items-center text-[13px] text-gray-500 font-bold">
          <span className="mr-3 cursor-move">⠿</span> {/* Drag Icon */}
          <span>{`Link #${link?.order}`}</span>
        </div>
        {/* Remove Button */}
        <button
          onClick={() => handleRemoveLink(link)}
          className="text-gray-500 ml-3 text-[13px] text-semibold hover:text-red-500"
        >
          {isDeleteLinkLoading ? "Deleting..." : "Remove"}
        </button>
      </section>
      <section className="flex justify-between flex-col gap-5 w-full">
        {/* Select Platform */}
        <CustomSelect
          label={`Platform`}
          value={link?.platform}
          onChange={(e) =>
            handleInputChange(link?.id, "platform", e.target.value)
          }
        />

        {/* URL Input */}
        <section>
          <label
            htmlFor="url"
            className="block font-medium text-gray-700 mb-2 text-[13px]"
          >
            Link
          </label>
          <input
            id="url"
            type="url"
            placeholder="Enter link URL"
            value={link.url}
            onChange={(e) => handleInputChange(link.id, "url", e.target.value)}
            className={`border p-2 rounded w-full ${
              link.platform &&
              !validateLink({
                platform: link.platform,
                url: link.url,
              })
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
        </section>
      </section>
    </div>
  );
};

export default LinkCard;
