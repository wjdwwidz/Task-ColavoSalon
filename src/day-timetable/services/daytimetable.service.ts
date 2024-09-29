import { Injectable } from '@nestjs/common';
import { DayTimetableRequest } from '../dtos/get-daytimetable.dto';
import { DayTimetable } from '../entities/daytimetable.entity';
import { TimezoneUtil } from '../util/timezone.util';
import { getDayOfWeekEnum } from '../entities/dayofweek.enum';
import { WorkHourRepository } from '../repositories/workhour.repository';
import { TimeSlotService } from './timeslot.service';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkHour } from '../entities/workhour.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class DayTimetableService {
  constructor(
    private readonly timeslotService: TimeSlotService,
    @InjectRepository(WorkHour)
    private readonly workHourRepository: WorkHourRepository,
  ) {}

  async getDayTimetables(
    request: DayTimetableRequest,
  ): Promise<Array<DayTimetable>> {
    const dayTimetables: Array<DayTimetable> = [];
    for (let i = 0; i < request.days; i++) {
      const timezone = request.timezone_identifier;
      const startOfDay = TimezoneUtil.getUnixTimestampForDate(
        request.start_day_identifier,
        timezone,
      );

      const dayOfWeek = TimezoneUtil.getDayOfWeek(startOfDay, timezone);
      const dayModifier = getDayOfWeekEnum(dayOfWeek);

      const workHour = await this.getWorkHour(
        dayOfWeek,
        request.is_ignore_workhour,
      );

      const timeslots = await this.timeslotService.getTimeSlots(
        startOfDay,
        workHour.open_interval,
        workHour.close_interval,
        request.timeslot_interval,
        request.is_ignore_schedule,
      );

      const dayTimetable: DayTimetable = {
        startOfDay: startOfDay,
        dayModifier: dayModifier,
        isDayOff: workHour.is_day_off,
        timeslots: timeslots,
      };

      dayTimetables.push(dayTimetable);
    }
    return dayTimetables;
  }

  private async getWorkHour(dayOfWeek: string, isIgnoreWorkHour: boolean) {
    if (isIgnoreWorkHour) {
      return {
        open_interval: 0,
        close_interval: 86400,
        is_day_off: false,
      };
    }
    return await this.workHourRepository.findOne({
      where: { key: dayOfWeek },
    });
  }
}
