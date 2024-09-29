import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('work_hours')
export class WorkHour {
  @ObjectIdColumn()
  key: string;

  @Column()
  is_day_off: boolean;

  @Column()
  open_interval: number;

  @Column()
  close_interval: number;

  @Column()
  weekday: number;
}
