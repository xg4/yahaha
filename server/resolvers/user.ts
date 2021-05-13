import { GQLCtx } from 'server/gql';
import { Ctx, Field, Int, ObjectType, Query, Resolver } from 'type-graphql';

@ObjectType()
class User {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => Date, { nullable: true })
  emailVerified: Date | null;

  @Field(() => String, { nullable: true })
  image: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { prisma }: GQLCtx) {
    return prisma.user.findMany();
  }
}
