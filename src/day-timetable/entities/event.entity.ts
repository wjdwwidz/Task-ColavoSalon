import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('events')
export class Event {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  created_at: number;

  @Column()
  updated_at: number;

  @Column()
  begin_at: number;

  @Column()
  end_at: number;
}
