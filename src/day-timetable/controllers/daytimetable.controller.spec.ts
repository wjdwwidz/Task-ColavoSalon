import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import * as request from 'supertest';
import { DayTimetableRequest } from '../dtos/get-daytimetable.dto';

describe('DayTimetableController /getTimeSlots', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('when 20210509', async () => {
    const requestBody: DayTimetableRequest = {
      start_day_identifier: '20210509',
      timeslot_interval: 1800,
      is_ignore_schedule: false,
      is_ignore_workhour: false,
      service_duration: 1800,
      timezone_identifier: 'Asia/Seoul',
      days: 1,
    };

    const response = await request(app.getHttpServer())
      .post('/getTimeSlots')
      .send(requestBody)
      .expect(HttpStatus.CREATED);

    console.log(response.body);
    expect(response.body.length).toBe(1);

    const firstElement = response.body[0];
    expect(firstElement.startOfDay).toBe(1620486000);
    expect(firstElement.dayModifier).toBe(1);
    expect(firstElement.is_day_off).toBe(false);
    expect(firstElement.timeslots.length).toBe(20);
  });

  it('when 20210510', async () => {
    const requestBody: DayTimetableRequest = {
      start_day_identifier: '20210510',
      timeslot_interval: 1800,
      is_ignore_schedule: false,
      is_ignore_workhour: false,
      service_duration: 1800,
      timezone_identifier: 'Asia/Seoul',
      days: 1,
    };

    const response = await request(app.getHttpServer())
      .post('/getTimeSlots')
      .send(requestBody)
      .expect(HttpStatus.CREATED);

    console.log(response.body);
    expect(response.body.length).toBe(1);

    const firstElement = response.body[0];
    expect(firstElement.startOfDay).toBe(1620572400);
    expect(firstElement.dayModifier).toBe(2);
    expect(firstElement.is_day_off).toBe(false);
    expect(firstElement.timeslots.length).toBe(0);
  });

  it('when 20210511', async () => {
    const requestBody: DayTimetableRequest = {
      start_day_identifier: '20210511',
      timeslot_interval: 1800,
      is_ignore_schedule: false,
      is_ignore_workhour: false,
      service_duration: 1800,
      timezone_identifier: 'Asia/Seoul',
      days: 1,
    };

    const response = await request(app.getHttpServer())
      .post('/getTimeSlots')
      .send(requestBody)
      .expect(HttpStatus.CREATED);

    console.log(response.body);
    expect(response.body.length).toBe(1);

    const firstElement = response.body[0];
    expect(firstElement.startOfDay).toBe(1620658800);
    expect(firstElement.dayModifier).toBe(3);
    expect(firstElement.is_day_off).toBe(false);
    expect(firstElement.timeslots.length).toBe(20);
  });
});
