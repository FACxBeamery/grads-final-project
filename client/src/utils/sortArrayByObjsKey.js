/**
 * Sort Array of Objects by obj key in ascending or descending order
 * returns sorted array
 *
 * @param {Array} arr array to sort
 * @param {String} key key to serve as the value to sort by
 * @param {String} order ascending or descending
 */
const sortArrayByObjsKey = (arr, key, order) => {
  if (arr) {
    const arrayToSort = [...arr];
    const ascending = order === 'ascending';
    const descending = order === 'descending';
    if (ascending) {
      arrayToSort.sort((a, b) => a[key].localeCompare(b[key]));
    } else if (descending) {
      arrayToSort.sort((a, b) => b[key].localeCompare(a[key]));
    }
    return arrayToSort;
  }
  return undefined;
};

export default sortArrayByObjsKey;
