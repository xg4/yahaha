import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseModel, User } from './';

@Entity({ name: 'messages' })
export class Message extends BaseModel {
  @OneToOne(() => User)
  @JoinColumn()
  to: User;

  @OneToOne(() => User)
  @JoinColumn()
  from: User;

  @Column()
  content: string;
}
