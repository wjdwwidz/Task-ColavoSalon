import { Injectable } from '@nestjs/common';
import { EventRepository } from '../repositories/event.repository';
import { TimeSlot } from '../entities/daytimetable.entity';
import { Event } from '../entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EventRepository,
  ) {}

  async getTimeSlots(
    startOfDay: number,
    openInterval: number,
    closeInterval: number,
    timeslotInterval: number,
    isIgnoreSchedule: boolean,
  ): Promise<TimeSlot[]> {
    const timeSlots: TimeSlot[] = [];

    const events = await this.getEvents(
      startOfDay,
      closeInterval,
      openInterval,
      isIgnoreSchedule,
    );

    for (
      let time = openInterval;
      time + timeslotInterval <= closeInterval;
      time += timeslotInterval
    ) {
      const timeSlot = new TimeSlot();
      timeSlot.beginAt = startOfDay + time;
      timeSlot.endAt = startOfDay + time + timeslotInterval;

      // if events is empty, overlap is false
      const overlap = events.some((event) => {
        return (
          timeSlot.beginAt < event.end_at && timeSlot.endAt > event.begin_at
        );
      });

      if (!overlap) {
        timeSlots.push(timeSlot);
      }
    }
    return timeSlots;
  }

  private async getEvents(
    startOfDay: number,
    closeInterval: number,
    openInterval: number,
    isIgnoreSchedule: boolean,
  ): Promise<Event[]> {
    if (isIgnoreSchedule) {
      return [];
    }
    return await this.eventRepository.find({
      where: {
        begin_at: { $lt: startOfDay + closeInterval },
        end_at: { $gt: startOfDay + openInterval },
      },
    });
  }
}
