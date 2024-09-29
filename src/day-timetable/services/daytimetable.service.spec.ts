import { Test, TestingModule } from '@nestjs/testing';
import { DayTimetableService } from './daytimetable.service';
import { DayTimetableRequest } from '../dtos/get-daytimetable.dto';
import { AppModule } from '../../app.module';
import { INestApplication } from '@nestjs/common';

describe('DayTimetableService', () => {
  let app: INestApplication;
  let service: DayTimetableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    service = module.get<DayTimetableService>(DayTimetableService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', async () => {
    const request: DayTimetableRequest = {
      start_day_identifier: '20210509',
      timeslot_interval: 1800,
      is_ignore_schedule: false,
      is_ignore_workhour: false,
      service_duration: 1800,
      timezone_identifier: 'Asia/Seoul',
      days: 1,
    };

    const result = await service.getDayTimetables(request);

    const firstDayTimetable = result[0];
    expect(firstDayTimetable.startOfDay).toBe(1620486000);
  });
});
