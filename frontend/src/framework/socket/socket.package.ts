import { io, type Socket as LibrarySocket } from 'socket.io-client';

class Socket {
    public getInstance = (namespace: string): LibrarySocket => {
        return io(namespace, {
            transports: ['websocket'],
        });
    };
}

export { Socket };
