import { Expose } from 'class-transformer';

export class DayTimetable {
  startOfDay: number;

  dayModifier: number;

  isDayOff: boolean;

  timeslots: TimeSlot[];
}

export class TimeSlot {
  @Expose({ name: 'begin_at' })
  beginAt: number;

  @Expose({ name: 'end_at' })
  endAt: number;
}
