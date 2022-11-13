export const parseDate = (date) => {
  if (!date) return "Unknown date";
  return date.substring(0, 16).replace("T", " ");
};
