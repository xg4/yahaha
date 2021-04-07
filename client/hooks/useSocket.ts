import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { socket } from "../lib/socket";

function useSocket(): Socket;

function useSocket(event: string, listener: Function): Socket;

function useSocket(event: Record<string, Function>): Socket;

function useSocket(event?: any, listener?: any) {
  useEffect(() => {
    if (!event) {
      return () => {};
    }
    if (typeof event === "string") {
      socket.on(event, listener);
      return () => {
        socket.off(event, listener);
      };
    }

    for (const key in event) {
      socket.on(key, event[key]);
    }
    return () => {
      for (const key in event) {
        socket.off(key, event[key]);
      }
    };
  }, [event, listener]);

  return socket;
}

export default useSocket;
