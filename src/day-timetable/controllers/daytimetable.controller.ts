import { Body, Controller, Post } from '@nestjs/common';
import {
  DayTimetableRequest,
  DayTimetableResponse,
} from '../dtos/get-daytimetable.dto';
import { DayTimetableService } from '../services/daytimetable.service';

@Controller()
export class DayTimetableController {
  constructor(private readonly dayTimetableService: DayTimetableService) {}
  @Post('/getTimeSlots')
  getDayTimetable(
    @Body() request: DayTimetableRequest,
  ): Array<DayTimetableResponse> {
    const r = this.dayTimetableService.getDayTimetable(request);
    return null;
  }
}
