import { MongoRepository } from 'typeorm';
import { WorkHour } from '../entities/workhour.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkHourRepository extends MongoRepository<WorkHour> {}
