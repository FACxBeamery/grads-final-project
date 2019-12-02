const formatDate = (unixTime) => {
  if (unixTime) {
    const date = new Date(unixTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const ddmmyyyyDate = `${day}/${month}/${year}`;

    return ddmmyyyyDate;
  }
  return `input is not unix`;
};

export default formatDate;
