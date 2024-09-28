import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Event {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  begin_at: Date;

  @Column()
  end_at: Date;
}
