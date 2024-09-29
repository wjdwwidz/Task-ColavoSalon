import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventRepository } from '../repositories/event.repository';
import { WorkHour } from '../entities/workhour.entity';
import { WorkHourRepository } from '../repositories/workhour.repository';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'node:process';

@Injectable()
export class BootstrapService implements OnModuleInit {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EventRepository,

    @InjectRepository(WorkHour)
    private readonly workHourRepository: WorkHourRepository,
  ) {
  }
  onModuleInit(): any {
    this.loadEventDataFromJson()
    this.loadWorkHourDataFromJson()
  }

  private async loadEventDataFromJson() {
    const filePath = path.join(process.cwd(), 'events.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // 데이터베이스에 데이터 삽입
    await this.eventRepository.save(data)
    console.log('Data loaded into the database');
  }

  private async loadWorkHourDataFromJson() {
    const filePath = path.join(process.cwd(), 'workhours.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // 데이터베이스에 데이터 삽입
    await this.workHourRepository.save(data)
    console.log('Data loaded into the database');
  }
}