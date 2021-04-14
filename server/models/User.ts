import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { BaseModel } from './';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseModel {
  @Field(() => String)
  @Column({ unique: true })
  username: string;

  @Field(() => String)
  @Column({ unique: true, nullable: true })
  email?: string;

  @Field(() => String)
  @Column({ nullable: true })
  avatar?: string;
}
