import { Injectable } from '@nestjs/common';
import { DayTimetableRequest } from '../dtos/get-daytimetable.dto';
import { WorkHourRepository } from '../repositories/workhour.repository';
import { EventRepository } from '../repositories/event.repository';
import { DayTimetable } from '../entities/daytimetable.entity';

@Injectable()
export class DayTimetableService {
  constructor(
    private readonly workHourRepository: WorkHourRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  getDayTimetable(request: DayTimetableRequest): DayTimetable {
    return null;
  }
}
