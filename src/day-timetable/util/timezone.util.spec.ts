import { TimezoneUtil } from './timezone.util';
import { getDayOfWeekEnum } from '../entities/dayofweek.enum';

describe('TimezoneUtil', () => {
  it('getDayModifier', () => {
    const result = TimezoneUtil.getDayOfWeek(1727535600, 'Asia/Seoul'); // Sunday
    expect(result).toEqual('sun');
  });

  it('getUnixTimestampForDate', () => {
    const result = TimezoneUtil.getUnixTimestampForDate(
      '20240929',
      'Asia/Seoul',
    );
    expect(result).toEqual(1727535600);
  });

  it('getDayOfWeekEnum', () => {
    const result = getDayOfWeekEnum('sun');
    expect(result).toEqual(1);
  });
});
