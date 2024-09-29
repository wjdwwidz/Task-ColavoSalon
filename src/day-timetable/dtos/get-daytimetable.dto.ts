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
  @Expose({ name: 'start_day_identifier' })
  startDayIdentifier: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'timezone_identifier' })
  timezoneIdentifier: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'service_duration' })
  serviceDuration: number;

  @IsNumber()
  @IsOptional()
  days: number = 1;

  @IsNumber()
  @IsOptional()
  timeslotInterval: number = 1800;

  @IsBoolean()
  @IsOptional()
  @Expose({ name: 'is_ignore_schedule' })
  isIgnoreSchedule: boolean;

  @IsBoolean()
  @Expose({ name: 'is_ignore_workhour' })
  isIgnoreWorkHour?: boolean;
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
