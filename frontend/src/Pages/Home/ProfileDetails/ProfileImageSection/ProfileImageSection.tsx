import React, { useState } from "react";
import Swal from "sweetalert2";

interface ProfileImageSectionProps {
  profileImage: File | null;
  setProfileImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const ProfileImageSection = ({
  profileImage,
  setProfileImage,
}: ProfileImageSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);

  // Handle Image Validation
  const handleGetImageWithValidation = (
    image: React.SetStateAction<File | null>
  ) => {
    if (image instanceof File) {
      if (image.size > 1024 * 1024) {
        Swal.fire("Error", "Image must be below 1MB", "error");
      } else if (
        image.type !== "image/png" &&
        image.type !== "image/jpg" &&
        image.type !== "image/bmp"
      ) {
        Swal.fire("Error", "Image must be PNG, JPG, or BMP format", "error");
      } else {
        setProfileImage(image);
      }
    }
  };

  // Handle drag-and-drop events
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true); // Set dragging state
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // Reset dragging state
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // Reset dragging state

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles[0]) {
      handleGetImageWithValidation(droppedFiles[0]);
    }
  };

  return (
    <section className="flex lg:flex-row flex-col space-y-5 justify-between items-center lg:gap-2 my-5 lg:px-8 py-8 bg-gray-100 rounded-xl">
      <span className="text-gray-500 text-[12px]">Profile Image</span>
      <section className="flex justify-center items-center gap-5">
        <input
          type="file"
          className="hidden"
          id="image"
          accept="image/png, image/jpg, image/bmp"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleGetImageWithValidation(e.target.files[0]);
            }
          }}
        />

        {/* Drag-and-Drop Area */}
        {!profileImage && (
          <label
            htmlFor="image"
            className={`lg:w-[180px] lg:h-[180px] w-[150px] h-[150px] border-2 border-dashed border-gray-400 rounded-lg flex flex-col justify-center items-center cursor-pointer text-center bg-main_color/20 overflow-hidden text-xs text-main_color font-bold ${
              isDragging ? "bg-gray-200 border-gray-600" : ""
            }`}
            onDragOver={handleDragOver} // Handle drag over event
            onDragLeave={handleDragLeave} // Handle drag leave event
            onDrop={handleDrop} // Handle drop event
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-main_color"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            Upload or drag and drop
          </label>
        )}

        {/* If profile image exists, show it */}
        {profileImage && (
          <div className="relative">
            <img
              src={
                profileImage instanceof File
                  ? URL.createObjectURL(profileImage)
                  : profileImage
              }
              alt="profile image"
              className="lg:w-[180px] lg:h-[180px] w-[150px] h-[150px] border-2 border-gray-400 rounded-lg object-cover"
            />
            {/* Change Image Overlay */}
            <label
              htmlFor="image"
              className="hover:absolute hover:cursor-pointer top-0 left-0 w-full h-full bg-black opacity-60 rounded-md"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div
                className="absolute top-0 left-0 w-full h-full hover:flex justify-center items-center flex-col opacity-0 hover:opacity-100 
                  transition-all duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-white text-sm">Change Image</p>
              </div>
            </label>

            {/* Cancel Button */}
            <button
              onClick={() => setProfileImage(null)}
              className="absolute top-1 right-1 hover:cursor-pointer bg-red-400 rounded-full w-5 h-5 flex justify-center items-center text-white hover:bg-red-500 transition-all duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.586l-4.293 4.293-1.414-1.414L8.586 11 4.293 6.707l1.414-1.414L10 9.172l4.293-4.293 1.414 1.414L11.414 11l4.293 4.293-1.414 1.414L10 12.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
        <section>
          <small className="text-gray-400 text-[10px]">
            Image must be below 1024 x 1024px.
            <br /> Use PNG, JPG or BMP format
          </small>
        </section>
      </section>
    </section>
  );
};

export default ProfileImageSection;
