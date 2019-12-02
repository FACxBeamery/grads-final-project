import formatDate from './formatDate';

describe('date should format unix time to dd/mm/yyyy ', () => {
  it('should format date', () => {
    expect(formatDate(123123123)).toEqual('2/1/1970');
    expect(formatDate('123123123')).toEqual('2/1/1970');
    expect(formatDate('')).toEqual(`input is not unix`);
    expect(formatDate(null)).toEqual(`input is not unix`);
  });
});
