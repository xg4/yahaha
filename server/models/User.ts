import { Column, Entity } from 'typeorm';
import { BaseModel } from './';

@Entity({ name: 'users' })
export class User extends BaseModel {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  avatar?: string;
}
