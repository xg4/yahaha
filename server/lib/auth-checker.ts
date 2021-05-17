import { GQLCtx } from 'server/types/gql';
import { AuthChecker } from 'type-graphql';

export const authChecker: AuthChecker<GQLCtx> = (
  { context: { user } },
  roles,
) => {
  console.log(roles, 'roles');
  if (roles.length === 0) {
    return user !== undefined;
  }

  if (!user) {
    return false;
  }

  const IS_ADMIN = user.id === 1;
  const userRoles = [IS_ADMIN ? 'ADMIN' : ''];
  if (userRoles.some((role) => roles.includes(role))) {
    return true;
  }

  // no roles matched, restrict access
  return false;
};
