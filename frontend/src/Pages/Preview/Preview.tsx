import { useEffect, useState } from "react";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import { useAppDispatch, useAppSelector } from "../../Store/Store";
import { useNavigate } from "react-router-dom";
import { useGetLinksQuery } from "../../Store/feature/Link/LinkApiSlice";
import { useGetProfileDataQuery } from "../../Store/feature/profile/profileApiSlice";
import { setLinksStore, setProfileData } from "../../Store/feature/globalSlice";
import { getStyle } from "../../constant";
import Loader from "../../Shared/Loader/Loader";

const Preview = () => {
  const [copySuccess, setCopySuccess] = useState<string>(""); // To track copy success status

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { links, profileData } = useAppSelector(
    (state) => state.globalSlice
  ) as any;

  const {
    data: getLink,
    isSuccess: getLinkSucess,
    isLoading: getLinkLoading,
  } = useGetLinksQuery({}) as any;

  //get profile data
  const {
    data: profileDatas,
    isSuccess: isProfileDataSuccess,
    isLoading: isProfileDataLoading,
  } = useGetProfileDataQuery({
    email: "wemon30@gmail.com",
  });

  useEffect(() => {
    if (getLinkSucess) {
      const newLinks = getLink?.data?.map((link: any) => ({
        id: link?.id,
        order: link?.order,
        platform: link?.platform,
        url: link?.link,
      }));

      if (newLinks?.length > 0) {
        dispatch(setLinksStore(newLinks));
      }
    }

    if (isProfileDataSuccess) {
      dispatch(setProfileData(profileDatas?.data));
    }
  }, [dispatch, getLinkSucess, isProfileDataSuccess]);

  // Function to handle the "Share Link" click
  const handleShareLink = async () => {
    if (!navigator?.clipboard?.writeText) {
      return;
    }

    if (!profileData) {
      return;
    }

    const profileLink = `${window?.location?.origin}/preview`; // Generate the profile URL based on some identifier
    navigator.clipboard
      .writeText(profileLink) // Copy to clipboard
      .then(() => {
        setCopySuccess("Profile link copied to clipboard!");
        setTimeout(() => {
          setCopySuccess("");
        }, 3000);
      })
      .catch(() => {
        setCopySuccess("Failed to copy the link. Please try again.");
      });
  };

  return (
    <>
      <main className="container mx-auto relative">
        {/* //top section  */}
        <section
          className="h-[300px] bg-main_color
            rounded-br-3xl rounded-bl-3xl relative
        "
        >
          <section
            className="flex justify-between items-center bg-white
            rounded-lg absolute top-2 left-5 right-5 p-3
            "
          >
            <CustomButton
              label="Back to Editor"
              onClick={() => {
                navigate(-1);
              }}
            />
            <CustomButton
              label="Share Link"
              variant="filled"
              onClick={handleShareLink}
            />
          </section>
        </section>

        {/* //center profile card section  */}
        <section
          className="flex justify-center flex-col items-center bg-white
          rounded-2xl absolute top-[130%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] py-8 shadow-lg 
          "
        >
          {!isProfileDataLoading && (
            <>
              <img
                src={profileData?.profile_image?.url}
                alt="Profile Image"
                className="w-[100px] h-[100px] object-cover rounded-full border-2 border-main_color"
              />
              <h3 className="text-center mt-3 text-xl font-bold">{`${profileData?.first_name} ${profileData?.last_name}`}</h3>
              <p className="text-center text-sm mt-2 text-gray-500">
                {profileData?.email}
              </p>
            </>
          )}
          {/* // Display copy success message */}
          {copySuccess && (
            <p className="text-green-500 text-[14px] mt-2">{copySuccess}</p>
          )}

          {/* //link  */}
          <section className="h-[350px] w-[250px] mt-8 overflow-y-scroll space-y-2">
            {getLinkLoading ? (
              <section>
                <Loader />
              </section>
            ) : (
              links?.map((link: any) => (
                <SmallLinkCard key={link?.id} link={link} />
              ))
            )}
          </section>
        </section>
      </main>
    </>
  );
};

export default Preview;

const SmallLinkCard = ({ link }: any) => {
  return (
    <>
      <section
        className={`flex justify-between items-center 
        ${getStyle(link?.platform)?.style}
        rounded-lg py-2 px-4 
        hover:cursor-pointer
        `}
        onClick={() => {
          window.open(link?.url, "_blank");
        }}
      >
        <section className="flex items-center space-x-2 text-white">
          <img
            src={getStyle(link?.platform)?.image}
            alt="icon"
            className="w-[30px] h-[30px] object-cover"
          />
          <p className="text-sm">{link?.platform}</p>
        </section>
        <p className="text-sm">{">"}</p>
      </section>
    </>
  );
};
