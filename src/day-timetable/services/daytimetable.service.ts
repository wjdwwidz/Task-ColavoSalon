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
      const timezone = request.timezoneIdentifier;
      const startOfDay = TimezoneUtil.getUnixTimestampForDate(
        request.startDayIdentifier,
        timezone,
      );

      const dayOfWeek = TimezoneUtil.getDayOfWeek(startOfDay, timezone);
      const dayModifier = getDayOfWeekEnum(dayOfWeek);

      const workHour = await this.getWorkHour(
        dayOfWeek,
        request.isIgnoreWorkHour,
      );

      const timeslots = await this.timeslotService.getTimeSlots(
        startOfDay,
        workHour.open_interval,
        workHour.close_interval,
        request.timeslotInterval,
        request.isIgnoreSchedule,
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
      where: { _id: dayOfWeek },
    });
  }
}
