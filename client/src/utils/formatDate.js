const formatDate = (unixTime) => {
  if (unixTime) {
    // Convert timestamp to milliseconds
    const date = new Date(unixTime * 1000);

    // Year
    const year = date.getFullYear();

    // Month
    const month = date.getMonth() + 1;

    // Day
    const day = date.getDate();

    // Display date time in dd/mm/yyyy format
    const ddmmyyyyDate = `${day}/${month}/${year}`;

    return ddmmyyyyDate;
  } else {
    return null;
  }
};

export default formatDate;
