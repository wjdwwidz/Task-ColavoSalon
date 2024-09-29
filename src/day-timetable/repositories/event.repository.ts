import { MongoRepository } from 'typeorm';
import { Event } from '../entities/event.entity';

export class EventRepository extends MongoRepository<Event> {}
