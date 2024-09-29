import { Module } from '@nestjs/common';
import { DayTimetableController } from './controllers/daytimetable.controller';
import { DayTimetableService } from './services/daytimetable.service';
import { EventRepository } from './repositories/event.repository';
import { WorkHourRepository } from './repositories/workhour.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkHour } from './entities/workhour.entity';
import { Event } from './entities/event.entity';
import { TimeSlotService } from './services/timeslot.service';
import { BootstrapService } from './services/bootstrap.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkHour, Event])],
  controllers: [DayTimetableController],
  providers: [
    DayTimetableService,
    TimeSlotService,
    EventRepository,
    WorkHourRepository,
    BootstrapService,
  ],
  exports: [WorkHourRepository, EventRepository],
})
export class DayTimetableModule {}
