import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DayTimetableRequest {
  @IsNotEmpty()
  @IsString()
  start_day_identifier: string;

  @IsNotEmpty()
  @IsString()
  timezone_identifier: string;

  @IsNotEmpty()
  @IsNumber()
  service_duration: number;

  @IsNumber()
  days?: number;

  @IsNumber()
  timeslot_interval?: number;

  @IsBoolean()
  is_ignore_schedule?: boolean;

  @IsBoolean()
  is_ignore_workhour?: boolean;
}

export class DayTimetableResponse {
  start_of_day: number;

  day_modifier: number;

  is_day_off: boolean;

  timeslots: Timeslot[];
}

class Timeslot {
  begin_at: number;
  end_at: number;
}
