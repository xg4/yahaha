import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel, User } from './';

@Entity({ name: 'messages' })
export class Message extends BaseModel {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'to_id' })
  to: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'from_id' })
  from: User;

  @Column()
  content: string;
}
