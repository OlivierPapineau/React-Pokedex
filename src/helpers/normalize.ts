const normalize = (string: string) => {
  if (!string) return "";
  let frags = string.replace(/[_-]/g, " ");
  return frags.charAt(0).toUpperCase() + frags.slice(1);
};

export default normalize;
