import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createServer } from 'http';
import next from 'next';
import { join } from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { resolvers } from './resolvers';
import { initWS } from './ws';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

const nextApp = next({ dev, dir: join(process.cwd(), './client') });
const handle = nextApp.getRequestHandler();

async function main() {
  await nextApp.prepare();

  const app = express();

  const httpServer = createServer(app);

  initWS(httpServer);

  // middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const schema = await buildSchema({ resolvers });

  const prisma = new PrismaClient();

  const apolloServer = new ApolloServer({
    schema,
    context: ({
      req,
      res,
    }: {
      req: Express.Request;
      res: Express.Response;
    }) => ({
      req,
      res,
      prisma,
      // TODO: Handle user/sessions here
      // user: req.user,
    }),
  });
  apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' });

  // client, next.js
  app.all('*', (req, res) => handle(req, res));

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}

main();
