import { IProfile } from "../Router/profile";
import { db } from "../utils/db.server";

export const createProfile = async (body: IProfile) => {
  const result = await db.profile.create({
    data: {
      first_name: body?.first_name,
      last_name: body?.last_name,
      email: body?.email,
      profile_image: body?.profile_image,
    },
  });

  return result;
};
