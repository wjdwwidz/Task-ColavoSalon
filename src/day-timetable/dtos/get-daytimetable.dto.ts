import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { DayTimetable, TimeSlot } from '../entities/daytimetable.entity';
import { Expose } from 'class-transformer';

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
  @IsOptional()
  days: number = 1;

  @IsNumber()
  @IsOptional()
  timeslot_interval: number = 1800;

  @IsBoolean()
  @IsOptional()
  is_ignore_schedule: boolean;

  @IsBoolean()
  is_ignore_workhour?: boolean;
}

export class DayTimetableResponse {
  @Expose({ name: 'start_of_day' })
  startOfDay: number;

  @Expose({ name: 'day_modifier' })
  dayModifier: number;

  @Expose({ name: 'is_day_off' })
  is_day_off: boolean;

  @Expose({ name: 'timeslots' })
  timeslots: TimeSlot[];

  constructor(dayTimeTable: DayTimetable) {
    this.startOfDay = dayTimeTable.startOfDay;
    this.dayModifier = dayTimeTable.dayModifier;
    this.is_day_off = dayTimeTable.isDayOff;
    this.timeslots = dayTimeTable.timeslots;
  }
}
