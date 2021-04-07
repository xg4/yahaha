import http from 'http';
import { Server, Socket } from 'socket.io';

enum Events {
  CONNECT = 'connect',
  MESSAGE = 'message',
  WELCOME = 'welcome',
  JOIN = 'join',
  DISCONNECT = 'disconnect',
}

interface ReceiveMessage {
  id: string;
  content: string;
}

type SuccessCallback = Function;

export function initSocket(server: http.Server) {
  const io = new Server(server);

  io.on(Events.CONNECT, (socket: Socket) => {
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

    socket.on(Events.DISCONNECT, () => {
      console.log(socket.id, '<<<');
    });
  });
}
