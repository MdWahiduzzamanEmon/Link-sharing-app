import { db } from "../utils/db.server";

export const postSaveLinks = async (body: any[], userIdFromToken: string) => {
  // Fetch the number of existing records for the user
  const existingLinks = await db.saveSocialLinks.findMany({
    where: { userId: userIdFromToken },
    orderBy: { order: "asc" }, // Ensure you're ordering correctly
  });

  const nextOrder = existingLinks.length + 1;

  // console.log("Calculated nextOrder:", nextOrder); // Log the starting point for order
  // console.log("Orders for bulk insert:");

  const dataModify = body?.map((link: any, index: number) => {
    return {
      userId: userIdFromToken,
      platform: link?.platform,
      link: link?.link,
      order: nextOrder + index,
    };
  });

  const result = await db.saveSocialLinks.createMany({
    data: dataModify,
  });

  return result;
};

export const getSaveLinks = (id: string) => {
  const result = db.saveSocialLinks.findMany({
    orderBy: {
      order: "asc",
    },
    where: {
      userId: id,
    },
    omit: {
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    include: {
      User: {
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

//delete all
export const deleteAllLinks = async () => {
  const result = db.saveSocialLinks.deleteMany();

  return result;
};

// delete one

export const deleteOneLink = async (id: string) => {
  const result = db.saveSocialLinks.delete({
    where: {
      id: parseInt(id),
    },
  });

  return result;
};

export const reorderLinks = async (data: any[]) => {
  //   console.log(data);
  const [result] = await Promise.all(
    data?.map((link: any) => {
      return db.saveSocialLinks.update({
        where: {
          id: parseInt(link?.id),
        },
        data: {
          order: link?.newPosition,
        },
      });
    })
  );

  return result;
};
