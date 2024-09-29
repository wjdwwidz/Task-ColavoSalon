import * as moment from 'moment-timezone';
import { format, toZonedTime } from 'date-fns-tz';

export class TimezoneUtil {
  static getUnixTimestampForDate(date: string, timezone: string): number {
    const dateTime = moment.tz(date, 'YYYYMMDD', timezone);
    return dateTime.unix();
  }

  static getDayOfWeek(timestamp: number, time_zone: string): string {
    const date = new Date(timestamp * 1000);
    const zonedDate = toZonedTime(date, time_zone);
    return format(zonedDate, 'EEE').toLowerCase();
  }
}
