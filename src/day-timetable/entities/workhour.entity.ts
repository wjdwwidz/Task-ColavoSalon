import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { isBoolean } from 'class-validator';

@Entity()
export class WorkHour {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  is_day_off: boolean;

  @Column()
  open_interval: number;

  @Column()
  close_interval: number;

  @Column()
  weekday: number;
}
