import { Query, Resolver } from 'type-graphql';
import { User } from '../models';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    console.log('server users');
    return User.find();
  }
}
