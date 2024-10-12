import { db } from "../utils/db.server";

//find
export const findUserByEmail = async (body: any) => {
  const result = await db.user.findUnique({
    where: {
      email: body?.email,
    },
  });

  return result;
};

//create
export const saveUser = async (body: any) => {
  const result = await db.user.create({
    data: body,
  });

  return result;
};
