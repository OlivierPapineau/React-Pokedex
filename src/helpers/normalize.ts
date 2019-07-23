const normalize = (string: string) => {
  let frags = string.replace(/[_-]/g, ' ');
  return frags.charAt(0).toUpperCase() + frags.slice(1);
};

export default normalize;
