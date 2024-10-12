import { IProfile } from "../Router/profile";
import { db } from "../utils/db.server";

export const createProfile = async (
  body: IProfile,
  userIdFromToken: string
) => {
  const result = await db.profile.upsert({
    where: {
      email: body?.email,
    },
    create: {
      first_name: body?.first_name,
      last_name: body?.last_name,
      email: body?.email,
      profile_image: body?.profile_image,
      userId: userIdFromToken,
    },
    update: {
      first_name: body?.first_name,
      last_name: body?.last_name,
      email: body?.email,
      profile_image: body?.profile_image,
      userId: userIdFromToken,
    },
  });

  return result;
};

//get all profile

export const getAllProfile = async () => {
  const result = await db.profile.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return result;
};

//get single profile by email

export const getProfileByEmail = async (email: string) => {
  // console.log(email);
  const result = await db.profile.findUnique({
    where: {
      email: email,
    },
    omit: {
      userId: true,
    },
    include: {
      user: {
        omit: {
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return result;
};
