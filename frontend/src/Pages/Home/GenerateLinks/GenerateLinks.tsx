import React, { useState } from "react";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import CustomSelect from "../../../Shared/CustomSelect/CustomSelect";
import Swal from "sweetalert2";
import {
  useGetLinksQuery,
  usePostLinkMutation,
} from "../../../Store/feature/Link/LinkApiSlice";

// Helper function to validate URLs based on platform

interface VALIDATE_LINK {
  platform: string;
  url: string;
}

const validateLink = ({ platform, url }: VALIDATE_LINK) => {
  let isValid = false;
  const isMatched =
    url?.includes(platform?.toLowerCase()) &&
    url?.includes(".") &&
    url?.includes("://");
  if (isMatched) isValid = true;

  return isValid;
};

const GenerateLinks = () => {
  const [links, setLinks] = useState([
    { id: 1, platform: "", url: "" },
    // { id: 2, platform: "LinkedIn", url: "https://linkedin.com/in/myprofile" },
  ]);

  const { data } = useGetLinksQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(data, "data");

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Handle Add New Link
  const handleAddLink = () => {
    const newLink = { id: links?.length + 1, platform: "", url: "" };
    setLinks([newLink, ...links]);
  };

  // Handle Remove Link
  const handleRemoveLink = async (id: number) => {
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
      setLinks(links.filter((link) => link.id !== id));
    }
  };

  // Handle input change
  const handleInputChange = (id: number, field: string, value: string) => {
    setLinks(
      links?.map((link) =>
        link?.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  // Handle drag start
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  // Handle drop
  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;
    const reorderedLinks = [...links];
    const [draggedLink] = reorderedLinks.splice(draggedIndex, 1);
    reorderedLinks.splice(index, 0, draggedLink);

    setLinks(reorderedLinks);
    setDraggedIndex(null); // Reset the dragged index
  };

  // Handle drag over
  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Allow the drop by preventing default behavior
  };

  const [
    postLink,
    { isLoading: isSaveLinkLoading, isSuccess: isSaveLinkSuccess },
  ] = usePostLinkMutation();
  const handleSaveLinkInBackendAPI = async () => {
    // Save links in backend API

    // if links array has platform and url then only save the link
    if (links?.every((link) => !validateLink(link))) {
      return;
    }

    const datas = links?.map((link) => {
      return {
        platform: link?.platform,
        link: link?.url,
        // order: link?.id,
      };
    });

    try {
      const res = await postLink(datas).unwrap();
      // console.log("res", res);
      if (res.status === 200) {
        Swal.fire({
          title: `${res?.data?.count} links saved successfully`,
          icon: "success",
          confirmButtonText: "Ok",
        });
        // setLinks([{ id: 1, platform: "", url: "" }]);
      } else {
        Swal.fire({
          title: "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <>
      <main className="p-3">
        <h1 className="text-3xl font-bold mb-1">Customize your links</h1>
        <small className="text-gray-400">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </small>

        {/* Add new link button */}
        <section className="my-4">
          <CustomButton
            label="+ Add new link"
            onClick={handleAddLink}
            className="w-full"
          />
        </section>

        {/* Links List */}
        <section>
          {links?.length > 0 ? (
            links?.map((link, index) => (
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
                    <span className="mr-3 cursor-move">⠿</span>{" "}
                    {/* Drag Icon */}
                    <span>{`Link #${link?.id}`}</span>
                  </div>
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveLink(link.id)}
                    className="text-gray-500 ml-3 text-[13px] text-semibold hover:text-red-500"
                  >
                    Remove
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
                      onChange={(e) =>
                        handleInputChange(link.id, "url", e.target.value)
                      }
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
            ))
          ) : (
            <p className="text-gray-400 text-center">No links added</p>
          )}
        </section>

        {/* Save Button */}
        <section className="my-4 text-right border-t pt-4">
          <CustomButton
            label="Save"
            variant="filled"
            loading={isSaveLinkLoading}
            disabled={
              !links?.length ||
              links?.some(
                (link) =>
                  !validateLink({ platform: link.platform, url: link.url })
              )
            }
            onClick={handleSaveLinkInBackendAPI}
          />
        </section>
      </main>
    </>
  );
};

export default GenerateLinks;
