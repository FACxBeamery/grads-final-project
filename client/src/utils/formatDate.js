import addLeadingZero from './addLeadingZero';

const formatDate = (unixTime) => {
  if (unixTime) {
    let time = unixTime;
    if (typeof unixTime === 'string') {
      time = Number(time);
    }
    const date = new Date(time);
    const year = date.getFullYear();
    const month = addLeadingZero(date.getMonth() + 1, 2);
    const day = addLeadingZero(date.getDate(), 2);
    const ddmmyyyyDate = `${day}/${month}/${year}`;
    return ddmmyyyyDate;
  }
  return undefined;
};
export default formatDate;
