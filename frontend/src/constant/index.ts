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

export const DEFAULT = [{ id: 1, platform: "", url: "" }];
