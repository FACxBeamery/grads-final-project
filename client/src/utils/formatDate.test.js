import formatDate from './formatDate';

describe('date should format unix time to dd/mm/yyyy ', () => {
  it('should format date', () => {
    expect(formatDate(123123123)).toEqual('02/01/1970');
    expect(formatDate('123123123')).toEqual('02/01/1970');
    expect(formatDate('')).toEqual(undefined);
    expect(formatDate(null)).toEqual(undefined);
  });
});
