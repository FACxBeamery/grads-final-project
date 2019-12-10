import addLeadingZero from './addLeadingZero';

const formatDateWithTime = (unixTime) => {
  if (unixTime) {
    let time = unixTime;
    if (typeof unixTime === 'string') {
      time = Number(time);
    }
    const date = new Date(time);
    const year = date.getFullYear();
    const month = addLeadingZero(date.getMonth() + 1, 2);
    const day = addLeadingZero(date.getDate(), 2);
    const hours = addLeadingZero(date.getHours(), 2);
    const minutes = addLeadingZero(date.getMinutes(), 2);

    const ddmmyyyyhhmmDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return ddmmyyyyhhmmDate;
  }
  return undefined;
};
export default formatDateWithTime;
