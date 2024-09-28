import { Column, Entity, ObjectId, ObjectIdColumn, Timestamp } from 'typeorm';

@Entity()
export class Event {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  created_at: Timestamp;

  @Column()
  updated_at: Timestamp;

  @Column()
  begin_at: Timestamp;

  @Column()
  end_at: Timestamp;
}
