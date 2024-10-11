import { db } from "../utils/db.server";

export const postSaveLinks = async (body: any[]) => {
  const result = db.saveSocialLinks.createMany({
    data: body,
  });

  return result;
};

export const getSaveLinks = () => {
  const result = db.saveSocialLinks.findMany({
    orderBy: {
      order: "asc",
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
      id: id,
    },
  });

  return result;
};

export const reorderLinks = async (data: any[]) => {
  const [result] = await Promise.all(
    data?.map((link: any) => {
      return db.saveSocialLinks.update({
        where: {
          order: link?.orderIdNewPosition,
        },
        data: {
          order: link?.orderIdNewPosition,
        },
      });
    })
  );

  return result;
};
