import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import next from 'next';
import { join } from 'path';
import { buildSchema } from 'type-graphql';
import { initDB } from './db';
import { resolvers } from './resolvers';
import { initSocket } from './socket';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, dir: join(__dirname, '../client') });
const handle = app.getRequestHandler();

async function main() {
  await initDB();
  await app.prepare();

  const server = express();

  const httpServer = createServer(server);

  initSocket(httpServer);

  // middleware
  server.use(express.json());
  server.use(morgan('tiny', { skip: (req) => req.url.startsWith('/_next') }));

  const schema = await buildSchema({ resolvers });

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
      // TODO: Handle user/sessions here
      // user: req.user,
    }),
  });
  apolloServer.applyMiddleware({ app: server, cors: false, path: '/graphql' });

  // client, next.js
  server.all('*', (req, res) => handle(req, res));

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}

main();
