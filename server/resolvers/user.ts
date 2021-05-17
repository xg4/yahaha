import { GQLCtx } from 'server/types/gql';
import {
  Authorized,
  Ctx,
  Field,
  Int,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';

@ObjectType()
class User {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Date, { nullable: true })
  emailVerified?: Date;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { user }: GQLCtx) {
    return user;
  }
}
