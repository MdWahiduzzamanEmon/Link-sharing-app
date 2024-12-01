import { useEffect, useState } from "react";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import Swal from "sweetalert2";
import {
  useGetLinksQuery,
  usePostLinkMutation,
  useReorderLinkMutation,
} from "../../../Store/feature/Link/LinkApiSlice";
import LinkCard from "./LinkCard/LinkCard";
import Loader from "../../../Shared/Loader/Loader";
import { DEFAULT, validateLink } from "../../../constant";
import { useAppDispatch } from "../../../Store/Store";
import { setLinksStore } from "../../../Store/feature/globalSlice";

// Helper function to validate URLs based on platform

const GenerateLinks = () => {
  const dispatch = useAppDispatch();
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
  ) as any;

  useEffect(() => {
    if (getLinkSucess) {
      const newLinks = getLink?.data?.map((link: any) => ({
        id: link?.id,
        order: link?.order,
        platform: link?.platform,
        url: link?.link,
      }));

      if (newLinks?.length > 0) {
        setLinks(newLinks);
      } else {
        setLinks(links);
      }

      dispatch(setLinksStore(newLinks));
    }
  }, [getLinkSucess, getLink?.data, dispatch]);

  // Handle Add New Link
  const handleAddLink = () => {
    const newLink = {
      id: Date.now(),
      order: null,
      platform: "",
      url: "",
    };
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

  const [
    reorderLink,
    { isLoading: reorderLinkLoading, isError: reorderLinkError },
  ] = useReorderLinkMutation();

  // useEffect(() => {
  //   if (reorderLinkSuccess) {
  //     Swal.fire("Success", "Link Re-ordered Successfully", "success");
  //   }
  // }, [reorderLinkSuccess]);

  useEffect(() => {
    if (reorderLinkError) {
      setLinks(links);
    }
  }, [reorderLinkError]);

  // Handle drop
  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;
    const reorderedLinks = [...links];
    const [draggedLink] = reorderedLinks.splice(draggedIndex, 1);
    reorderedLinks.splice(index, 0, draggedLink);

    setLinks(reorderedLinks);
    // console.log("links", reorderedLinks);
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
        items: reorderedLinks?.map((link: any, index) => ({
          id: link?.id,
          newPosition: index + 1,
        })),
      };

      //debounce call
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(reorderLink(data));
        }, 1000);
      });
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

    const newArray: { order: any; id: any; platform: any; link: any }[] = [];

    const datas = links?.map((link: any) => {
      return {
        order: link?.order,
        id: link?.id,
        platform: link?.platform,
        link: link?.url,
      };
    });

    //only not null order id save in new array
    if (datas?.length > 0) {
      //only null order id save
      datas?.forEach((data: any) => {
        // console.log("data", data);
        if (data?.order === null || data?.order === undefined) {
          newArray.push(data);
        }
      });
    }

    // console.log("datas", newArray);

    if (newArray?.length === 0) {
      return;
    }

    try {
      const res = await postLink(newArray).unwrap();
      // console.log("res", res);
      if (res.status === 200) {
        Swal.fire({
          title: `${res?.data?.count} links saved successfully`,
          icon: "success",
          confirmButtonText: "Ok",
        });
        setLinks([{ id: 1, platform: "", url: "", order: null }]);
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
        {/* //top section */}
        <section>
          <h1 className="md:text-3xl text-2xl font-bold mb-1">
            Customize your links
            <span
              className={`${
                reorderLinkLoading
                  ? "text-blue-500 text-[10px] font-bold ml-5"
                  : "text-green-500 font-normal"
              }`}
            >
              {reorderLinkLoading && "Updating Order..."}
            </span>
          </h1>
          <small className="text-gray-400">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </small>
        </section>

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
