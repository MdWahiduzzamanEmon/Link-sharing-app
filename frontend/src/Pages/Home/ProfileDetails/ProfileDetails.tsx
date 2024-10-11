import React, { FC } from "react";
import ProfileImageSection from "./ProfileImageSection/ProfileImageSection";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import CustomInput from "../../../Shared/CustomInput/CustomInput";

const ProfileDetails: FC = () => {
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [data, setData] = React.useState<any>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSaveLinkInBackendAPI = async () => {};
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

        {/* //image section  */}
        <ProfileImageSection
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />

        {/* //bottom section input section */}
        <section className="flex flex-col justify-between items-center lg:gap-2 lg:px-8 px-4  bg-gray-100 rounded-xl py-3">
          <CustomInput name="First Name*" handleChange={handleChange} />
          <CustomInput name="Last Name*" handleChange={handleChange} />
          <CustomInput name="Email*" type="email" handleChange={handleChange} />
        </section>

        {/* Save Button */}
        <section className="my-4 text-right border-t pt-4">
          <CustomButton
            label="Save"
            variant="filled"
            // loading={isSaveLinkLoading}

            onClick={handleSaveLinkInBackendAPI}
          />
        </section>
      </main>
    </>
  );
};

export default ProfileDetails;
