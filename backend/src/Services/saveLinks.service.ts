import { db } from "../utils/db.server";

export const postSaveLinks = async (body: any[]) => {
  const maxOrder = await db.saveSocialLinks.aggregate({
    _max: {
      order: true,
    },
  });

  const result = db.saveSocialLinks.createMany({
    data: body.map((link) => {
      return {
        ...link,
        order: (maxOrder._max.order || 0) + 1,
      };
    }),
  });

  return result;
};

export const getSaveLinks = () => {
  const result = db.saveSocialLinks.findMany();

  return result;
};

//delete all
export const deleteAllLinks = async () => {
  const result = db.saveSocialLinks.deleteMany();

  return result;
};
