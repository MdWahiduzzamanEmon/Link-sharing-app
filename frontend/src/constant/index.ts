interface VALIDATE_LINK {
  platform: string;
  url: string;
}

export const validateLink = ({ platform, url }: VALIDATE_LINK) => {
  let isValid = false;
  const isMatched =
    url?.includes(platform?.toLowerCase()) &&
    url?.includes(".") &&
    url?.includes("://");
  if (isMatched) isValid = true;

  return isValid;
};

export const DEFAULT = [{ id: 1, platform: "", url: "", order: null }];

export const platforms = [
  "GitHub",
  "LinkedIn",
  "Facebook",
  "Twitter",
  "Instagram",
  "Youtube",
];

export const getStyle = (platform: string) => {
  // console.log(platform);
  switch (platform) {
    case "GitHub":
      return {
        style: "bg-black text-white",
        image:
          "https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png",
      };
    case "LinkedIn":
      return {
        style: "bg-sky-500 text-white",
        image: "https://img.icons8.com/color/48/000000/linkedin.png",
      };
    case "Youtube":
      return {
        style: "bg-red-500 text-white",
        image: "https://img.icons8.com/color/48/000000/youtube-play.png",
      };
    case "Instagram":
      return {
        style: "bg-pink-500 text-white",
        image: "https://img.icons8.com/color/48/000000/instagram-new.png",
      };
    case "Twitter":
      return {
        style: "bg-sky-500 text-white",
        image: "https://img.icons8.com/color/48/000000/twitter.png",
      };
    case "Facebook":
      return {
        style: "bg-blue-500 text-white",
        image: "https://img.icons8.com/color/48/000000/facebook.png",
      };
    default:
      return {
        style: "bg-black text-white",
        image: "https://img.icons8.com/ios/50/000000/link.png",
      };
  }
};
