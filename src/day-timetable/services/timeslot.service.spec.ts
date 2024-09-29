import { TimeSlotService } from './timeslot.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';

describe('TimeSlotService', () => {
  let timeSlotService: TimeSlotService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    timeSlotService = module.get(TimeSlotService);
  });

  it('getTimeSlots', async () => {
    const result = await timeSlotService.getTimeSlots(
      1620486000,
      36000,
      72000,
      1800,
      false,
    );

    const firstSlot = result[0];

    expect(firstSlot.beginAt).toBe(1620522000);
    expect(firstSlot.endAt).toBe(1620523800);
  });
});
