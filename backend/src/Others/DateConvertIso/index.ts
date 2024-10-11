export const convertIsoDate = (date: string | Date) => {
  // return new Date(date).toISOString();
  if (date) {
    return new Date(date).toISOString();
  }
};
