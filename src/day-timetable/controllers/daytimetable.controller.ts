import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  DayTimetableRequest,
  DayTimetableResponse,
} from '../dtos/get-daytimetable.dto';
import { DayTimetableService } from '../services/daytimetable.service';
import { DayTimetable } from '../entities/daytimetable.entity';

@Controller()
export class DayTimetableController {
  constructor(private readonly dayTimetableService: DayTimetableService) {}

  @Post('/getTimeSlots')
  @HttpCode(HttpStatus.CREATED)
  async getDayTimetable(
    @Body() request: DayTimetableRequest,
  ): Promise<Array<DayTimetableResponse>> {
    const dayTimetables =
      await this.dayTimetableService.getDayTimetables(request);
    return dayTimetables.map(
      (dayTimetable: DayTimetable) => new DayTimetableResponse(dayTimetable),
    );
  }
}
