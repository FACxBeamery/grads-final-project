const addLeadingZero = (num, places) => {
  return String(num).padStart(places, '0');
};

export default addLeadingZero;
