import formatDate from './formatDate';

describe('date should format unix time to dd/mm/yyyy ', () => {
  it('should format date', () => {
    expect(formatDate(123123123)).toEqual('26/11/1973');
    expect(formatDate('123123123')).toEqual('26/11/1973');
    expect(formatDate('')).toEqual(`input is not unix`);
    expect(formatDate(null)).toEqual(`input is not unix`);
  });
});
