import React, { useEffect, useState } from "react";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import Swal from "sweetalert2";
import {
  useGetLinksQuery,
  usePostLinkMutation,
} from "../../../Store/feature/Link/LinkApiSlice";
import LinkCard from "./LinkCard/LinkCard";
import Loader from "../../../Shared/Loader/Loader";

// Helper function to validate URLs based on platform

interface VALIDATE_LINK {
  platform: string;
  url: string;
}

export const validateLink = ({ platform, url }: VALIDATE_LINK) => {
  let isValid = false;
  const isMatched =
    url?.includes(platform?.toLowerCase()) &&
    url?.includes(".") &&
    url?.includes("://");
  if (isMatched) isValid = true;

  return isValid;
};

export const DEFAULT = [{ id: 1, platform: "", url: "" }];

const GenerateLinks = () => {
  const [links, setLinks] = useState(DEFAULT);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const {
    data: getLink,
    isSuccess: getLinkSucess,
    isLoading: getLinkLoading,
  } = useGetLinksQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (getLinkSucess) {
      const newLinks = getLink?.data?.map((link: any) => ({
        deleteId: link?.id,
        id: link?.order,
        platform: link?.platform,
        url: link?.link,
      }));

      if (newLinks?.length > 0) {
        setLinks(newLinks);
      } else {
        setLinks(links);
      }
    }
  }, [getLinkSucess, getLink?.data]);

  // Handle Add New Link
  const handleAddLink = () => {
    const newLink = { id: links?.length + 1, platform: "", url: "" };
    setLinks([newLink, ...links]);
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
    console.log("links", reorderedLinks);
    // get current position and new position
    // {
    //   "items": [
    //     { "id": 1, "newPosition": 1 },
    //     { "id": 3, "newPosition": 2 },
    //     { "id": 2, "newPosition": 3 }
    //   ]
    // }

    if (reorderedLinks?.length > 0) {
      const data = {
        items: reorderedLinks?.map((link: any, index: number) => {
          return {
            ...link,
            newPosition: index + 1,
          };
        }),
      };

      console.log("data", data);
    }

    setDraggedIndex(null); // Reset the dragged index
  };

  // Handle drag over
  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Allow the drop by preventing default behavior
  };

  const [postLink, { isLoading: isSaveLinkLoading }] = usePostLinkMutation();
  const handleSaveLinkInBackendAPI = async () => {
    // Save links in backend API

    // if links array has platform and url then only save the link
    if (links?.every((link) => !validateLink(link))) {
      return;
    }

    const datas = links?.map((link: any) => {
      return {
        id: link?.deleteId,
        platform: link?.platform,
        link: link?.url,
        // order: getLink?.data?.length + 1,
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
        setLinks([{ id: 1, platform: "", url: "" }]);
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
        <section className="h-[500px] overflow-y-auto">
          {/* show loading */}
          {getLinkLoading && <Loader />}

          {!getLinkLoading && links?.length > 0
            ? links?.map((link, index) => (
                <LinkCard
                  key={link?.id}
                  link={link}
                  index={index}
                  links={links}
                  setLinks={setLinks}
                  handleInputChange={handleInputChange}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  handleDragOver={handleDragOver}
                />
              ))
            : !getLinkLoading && (
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
