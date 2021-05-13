import http from 'http';
import { Server, Socket } from 'socket.io';

enum Events {
  MESSAGE = 'message',
  WELCOME = 'welcome',
  JOIN = 'join',
}

interface ReceiveMessage {
  id: string;
  content: string;
}

type SuccessCallback = Function;

export function initWS(server: http.Server) {
  const io = new Server(server);

  io.on('connection', (socket: Socket) => {
    console.log(socket.id, '>>>');

    socket.on(Events.MESSAGE, (data: ReceiveMessage, cb: SuccessCallback) => {
      socket.to(data.id).emit(Events.MESSAGE, {
        id: socket.id,
        avatar: `https://s.gravatar.com/avatar/${socket.id}`,
        content: data.content,
      });
      cb();
    });

    socket.on(Events.JOIN, (id: string) => {
      socket.join(id);

      socket.to(id).emit(Events.WELCOME, { id: socket.id });
    });

    socket.on('disconnect', () => {
      console.log(socket.id, '<<<');
    });
  });
}
