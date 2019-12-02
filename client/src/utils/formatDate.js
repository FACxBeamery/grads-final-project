const formatDate = (unixTime) => {
  if (unixTime) {
    let time = unixTime;
    if (typeof unixTime === 'string') {
      time = Number(time);
    }
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const ddmmyyyyDate = `${day}/${month}/${year}`;
    return ddmmyyyyDate;
  }
  return `input is not unix`;
};
export default formatDate;
