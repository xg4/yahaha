import { Manager } from 'socket.io-client'

const manager = new Manager()

export const socket = manager.socket('/')
