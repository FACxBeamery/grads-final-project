import sortArrayByProp from './sortArrayByProp';

describe('Sort array by prop key and in a specific order', () => {
  it('should sort array', () => {
    const arr = [
      { color: 'white', size: 'XXL' },
      { color: 'red', size: 'XL' },
      { color: 'black', size: 'M' },
    ];
    expect(sortArrayByProp(arr, 'color', 'descending')).toEqual([
      { color: 'white', size: 'XXL' },
      { color: 'red', size: 'XL' },
      { color: 'black', size: 'M' },
    ]);
    expect(sortArrayByProp(arr, 'color', 'ascending')).toEqual([
      { color: 'black', size: 'M' },
      { color: 'red', size: 'XL' },
      { color: 'white', size: 'XXL' },
    ]);

    expect(sortArrayByProp(arr, 'size', 'descending')).toEqual([
      { color: 'white', size: 'XXL' },
      { color: 'red', size: 'XL' },
      { color: 'black', size: 'M' },
    ]);
    expect(sortArrayByProp(arr, 'size', 'ascending')).toEqual([
      { color: 'black', size: 'M' },
      { color: 'red', size: 'XL' },
      { color: 'white', size: 'XXL' },
    ]);
    expect(sortArrayByProp([], 'size', 'descending')).toEqual([]);
    expect(sortArrayByProp([], 'siZe', 'desceding')).toEqual([]);
    expect(sortArrayByProp([], 'size', 'descending')).toEqual([]);
    expect(sortArrayByProp(undefined, 'size', 'descending')).toEqual(undefined);
  });
});
