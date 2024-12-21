import io from 'socket.io-client';

const socket = io(`https://100.113.230.100:3001`, {
    transports: ['websocket', 'polling']
});

export default socket;