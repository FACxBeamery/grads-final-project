import sortArrayByObjsKey from './sortArrayByObjsKey';

describe('Sort array by prop key and in a specific order', () => {
  it('should sort array', () => {
    const arr = [
      { color: 'white', size: 'XXL' },
      { color: 'red', size: 'XL' },
      { color: 'black', size: 'M' },
    ];
    expect(sortArrayByObjsKey(arr, 'color', 'descending')).toEqual([
      { color: 'white', size: 'XXL' },
      { color: 'red', size: 'XL' },
      { color: 'black', size: 'M' },
    ]);
    expect(sortArrayByObjsKey(arr, 'color', 'ascending')).toEqual([
      { color: 'black', size: 'M' },
      { color: 'red', size: 'XL' },
      { color: 'white', size: 'XXL' },
    ]);

    expect(sortArrayByObjsKey(arr, 'size', 'descending')).toEqual([
      { color: 'white', size: 'XXL' },
      { color: 'red', size: 'XL' },
      { color: 'black', size: 'M' },
    ]);
    expect(sortArrayByObjsKey(arr, 'size', 'ascending')).toEqual([
      { color: 'black', size: 'M' },
      { color: 'red', size: 'XL' },
      { color: 'white', size: 'XXL' },
    ]);
    expect(sortArrayByObjsKey([], 'size', 'descending')).toEqual([]);
    expect(sortArrayByObjsKey([], 'siZe', 'desceding')).toEqual([]);
    expect(sortArrayByObjsKey([], 'size', 'descending')).toEqual([]);
    expect(sortArrayByObjsKey(undefined, 'size', 'descending')).toEqual(
      undefined,
    );
  });
});
