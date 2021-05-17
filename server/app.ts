import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createServer } from 'http';
import next from 'next';
import { join } from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { getCurrentUser } from './lib/auth';
import { authChecker } from './lib/auth-checker';
import { resolvers } from './resolvers';
import { initWS } from './ws';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

const nextApp = next({ dev, dir: join(process.cwd(), './client') });
const handle = nextApp.getRequestHandler();

async function main() {
  const prisma = new PrismaClient();
  await nextApp.prepare();

  const app = express();

  const httpServer = createServer(app);

  initWS(httpServer);

  // middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const schema = await buildSchema({ resolvers, authChecker });

  const apolloServer = new ApolloServer({
    schema,
    async context({ req, res }) {
      const user = await getCurrentUser(req);
      return {
        req,
        res,
        prisma,
        user,
      };
    },
  });
  apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' });

  // client, next.js
  app.all('*', (req, res) => handle(req, res));

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}

main();
