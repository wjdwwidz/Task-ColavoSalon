export class DayTimetable {
  start_of_day: number;

  day_modifier: number;

  is_day_off: boolean;

  timeslots: Timeslot[];
}

export class Timeslot {
  begin_at: number;
  end_at: number;
}
