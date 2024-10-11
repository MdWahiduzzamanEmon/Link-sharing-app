import { db } from "../utils/db.server";

export const postSaveLinks = () => {
  const result = db.saveSocialLinks.createMany({
    data: [
      {
        link: "https://github.com/MdWahiduzzamanEmon",
        platform: "GitHub",
        order: 0,
      },
      {
        link: "https://www.linkedin.com/in/mdwahiduzzamanemon/",
        platform: "LinkedIn",
        order: 0,
      },
      {
        link: "https://www.facebook.com/mdwahiduzzamanemon/",
        platform: "Facebook",
        order: 0,
      },
      {
        link: "https://twitter.com/mdwahiduzzamanemon",
        platform: "Twitter",
        order: 0,
      },
      {
        link: "https://www.instagram.com/mdwahiduzzamanemon/",
        platform: "Instagram",
        order: 0,
      },
    ],
  });

  return result;
};
