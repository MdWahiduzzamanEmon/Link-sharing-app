import React, { FC, useEffect } from "react";
import ProfileImageSection from "./ProfileImageSection/ProfileImageSection";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import CustomInput from "../../../Shared/CustomInput/CustomInput";
import {
  useCreateProfileMutation,
  useGetProfileDataQuery,
} from "../../../Store/feature/profile/profileApiSlice";
import Swal from "sweetalert2";
import Loader from "../../../Shared/Loader/Loader";
import { useAppDispatch } from "../../../Store/Store";
import { setProfileData } from "../../../Store/feature/globalSlice";

const ProfileDetails: FC = () => {
  const dispatch = useAppDispatch();
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [data, setData] = React.useState<{
    firstName: string;
    lastName: string;
    email: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [error, setError] = React.useState<string | null>(null);

  //get profile data
  const {
    data: profileData,
    isLoading: isProfileDataLoading,
    // error: profileDataError,
    isSuccess: isProfileDataSuccess,
  } = useGetProfileDataQuery(
    {
      email: "wemon30@gmail.com",
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // console.log("profileData", profileData);

  useEffect(() => {
    if (isProfileDataSuccess) {
      setData({
        firstName: profileData?.data?.first_name || "",
        lastName: profileData?.data?.last_name || "",
        email: profileData?.data?.email || "",
      });
      setProfileImage(profileData?.data?.profile_image?.url || null);

      dispatch(setProfileData(profileData?.data));
    }
  }, [
    isProfileDataSuccess,
    profileData?.data?.email,
    profileData?.data?.first_name,
    profileData?.data?.last_name,
    profileData?.data?.profile_image?.url,
    dispatch,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  //create profile
  const [
    createProfile,
    { isLoading: isSaveLinkLoading, error: saveLinkError, data: saveLink },
  ] = useCreateProfileMutation();

  const handleSaveLinkInBackendAPI = async () => {
    try {
      const { firstName, lastName, email } = data;
      if (!firstName || !lastName || !email) {
        return setError("Please add all fields.");
      }
      const body = {
        first_name: firstName,
        last_name: lastName,
        email,
        profile_image: profileImage,
      };
      // console.log("body", body);

      const formData = new FormData();

      for (const [key, value] of Object.entries(body)) {
        if (value) {
          formData.append(key, value);
        }
      }

      const res = await createProfile(formData)?.unwrap();
      // console.log("response", res);
      if (res.status === 200) {
        Swal.fire({
          title: "Profile created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setProfileImage(null);
        setData({
          firstName: "",
          lastName: "",
          email: "",
        });
        setError(null);
      } else {
        Swal.fire({
          title: "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        });
        setError(null);
        setProfileImage(null);
      }
    } catch (err) {
      console.log("Error in creating profile: ", err);
    }
  };
  return (
    <>
      <main className="p-3">
        {/* //top section */}
        <section>
          <h1 className="text-3xl font-bold mb-1">Profile Details</h1>
          <small className="text-gray-400">
            Add your details to create a personal touch to your profile
          </small>
        </section>

        {/* //loader section */}
        {isProfileDataLoading ? (
          <section className="w-full h-[500px] flex items-center justify-center">
            <Loader />
          </section>
        ) : (
          <>
            {/* //image section  */}
            <ProfileImageSection
              profileImage={profileImage}
              setProfileImage={setProfileImage}
            />

            {/* //bottom section input section */}
            <section className="flex flex-col justify-between items-center lg:gap-2 lg:px-8 px-4  bg-gray-100 rounded-xl py-3">
              <CustomInput
                label="First Name*"
                name="firstName"
                value={data.firstName}
                handleChange={handleChange}
                error={error}
              />
              <CustomInput
                label="Last Name*"
                name="lastName"
                value={data.lastName}
                handleChange={handleChange}
                error={error}
              />
              <CustomInput
                label="Email*"
                type="email"
                name="email"
                value={data.email}
                handleChange={handleChange}
                error={error}
              />
            </section>
          </>
        )}

        {/* Save Button */}
        <section className="my-4 text-right border-t pt-4">
          <CustomButton
            label="Save"
            variant="filled"
            loading={isSaveLinkLoading}
            onClick={handleSaveLinkInBackendAPI}
          />
        </section>
      </main>
    </>
  );
};

export default ProfileDetails;
