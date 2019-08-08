const getIdFromUrl = (url: string) => {
  const ID = url.split("/");
  const arrIds = ID[ID.length - 2];

  return arrIds;
};

export default getIdFromUrl;
