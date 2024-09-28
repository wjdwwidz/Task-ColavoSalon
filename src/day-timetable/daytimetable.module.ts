import { Module } from '@nestjs/common';
import { DayTimetableController } from './controllers/daytimetable.controller';
import { DayTimetableService } from './services/daytimetable.service';
import { EventRepository } from './repositories/event.repository';
import { WorkHourRepository } from './repositories/workhour.repository';

@Module({
  controllers: [DayTimetableController],
  providers: [DayTimetableService, EventRepository, WorkHourRepository],
})
export class DayTimetableModule {}
