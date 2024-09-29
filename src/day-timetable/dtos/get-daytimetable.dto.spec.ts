import { DayTimetableRequest } from './get-daytimetable.dto';

describe('DayTimetableRequest', () => {
  it('should be defined', () => {
    const request: DayTimetableRequest = {
      startDayIdentifier: '20210910',
      days: 3,
      serviceDuration: 1800,
      timeslotInterval: 1800,
      timezoneIdentifier: 'Asia/Seoul',
      isIgnoreSchedule: false,
      isIgnoreWorkHour: false,
    };
    expect(request.days).toEqual(3);
  });
});
