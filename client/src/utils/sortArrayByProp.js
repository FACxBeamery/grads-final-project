const sortArrayByProp = (arr, prop, order) => {
  if (arr) {
    const arrayToSort = [...arr];
    const ascending = order === 'ascending';
    const descending = order === 'descending';
    if (ascending) {
      arrayToSort.sort((a, b) => a[prop].localeCompare(b[prop]));
    } else if (descending) {
      arrayToSort.sort((a, b) => b[prop].localeCompare(a[prop]));
    }
    return arrayToSort;
  }
  return undefined;
};

export default sortArrayByProp;
